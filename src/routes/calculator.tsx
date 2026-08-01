import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator as CalcIcon, Ruler, Package, Layers, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon, whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Tile Calculator — Hemant Tiles and Building Materials" },
      {
        name: "description",
        content:
          "Estimate tiles, boxes, adhesive, grout and total cost for your room. Free tile calculator by Hemant Tiles, Varanasi.",
      },
      {
        property: "og:title",
        content: "Tile Calculator — Hemant Tiles and Building Materials",
      },
      {
        property: "og:description",
        content:
          "Estimate tiles, boxes, adhesive, grout and total cost for your room — including cutting wastage.",
      },
      { property: "og:url", content: "/calculator" },
    ],
    links: [{ rel: "canonical", href: "/calculator" }],
  }),
  component: CalculatorPage,
});

type Unit = "ft" | "m" | "cm";

const toMeters = (v: number, u: Unit) =>
  u === "ft" ? v * 0.3048 : u === "cm" ? v / 100 : v;

const PRESETS: { label: string; unit: Unit; l: string; w: string }[] = [
  { label: "60 × 60 cm", unit: "cm", l: "60", w: "60" },
  { label: "80 × 80 cm", unit: "cm", l: "80", w: "80" },
  { label: "2 × 2 ft", unit: "ft", l: "2", w: "2" },
  { label: "2 × 4 ft", unit: "ft", l: "4", w: "2" },
  { label: "30 × 60 cm", unit: "cm", l: "60", w: "30" },
];

const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

function CalculatorPage() {
  const [roomUnit, setRoomUnit] = useState<Unit>("ft");
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("10");
  const [tileUnit, setTileUnit] = useState<Unit>("cm");
  const [tileL, setTileL] = useState("60");
  const [tileW, setTileW] = useState("60");
  const [wastage, setWastage] = useState("10");
  const [perBox, setPerBox] = useState("4");
  const [rate, setRate] = useState("45");
  const [includeWalls, setIncludeWalls] = useState(false);
  const [wallHeight, setWallHeight] = useState("3");
  const [includeSkirting, setIncludeSkirting] = useState(false);
  const [skirtingHeight, setSkirtingHeight] = useState("4");

  const result = useMemo(() => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const tL = parseFloat(tileL);
    const tW = parseFloat(tileW);
    const waste = parseFloat(wastage) || 0;
    const box = parseFloat(perBox) || 0;
    const ratePerSqFt = parseFloat(rate) || 0;
    if (!L || !W || !tL || !tW) return null;

    const lm = toMeters(L, roomUnit);
    const wm = toMeters(W, roomUnit);
    const floorAreaM2 = lm * wm;
    const tileAreaM2 = toMeters(tL, tileUnit) * toMeters(tW, tileUnit);
    if (tileAreaM2 <= 0) return null;

    const perimeterM = 2 * (lm + wm);
    const wallAreaM2 = includeWalls
      ? perimeterM * toMeters(parseFloat(wallHeight) || 0, roomUnit)
      : 0;
    const skirtingAreaM2 = includeSkirting
      ? perimeterM * ((parseFloat(skirtingHeight) || 0) * 0.0254)
      : 0;

    const totalAreaM2 = floorAreaM2 + wallAreaM2 + skirtingAreaM2;
    const tilesExact = totalAreaM2 / tileAreaM2;
    const tilesNeeded = Math.ceil(tilesExact * (1 + waste / 100));
    const areaWithWasteFt2 = totalAreaM2 * 10.7639 * (1 + waste / 100);

    return {
      floorAreaM2,
      wallAreaM2,
      skirtingAreaM2,
      totalAreaM2,
      totalAreaFt2: totalAreaM2 * 10.7639,
      tilesExact: Math.ceil(tilesExact),
      tilesNeeded,
      boxes: box > 0 ? Math.ceil(tilesNeeded / box) : null,
      adhesiveKg: Math.ceil(totalAreaM2 * 4),
      groutKg: Math.ceil(totalAreaM2 * 0.5 * 10) / 10,
      cost: ratePerSqFt > 0 ? areaWithWasteFt2 * ratePerSqFt : null,
    };
  }, [
    length,
    width,
    tileL,
    tileW,
    roomUnit,
    tileUnit,
    wastage,
    perBox,
    rate,
    includeWalls,
    wallHeight,
    includeSkirting,
    skirtingHeight,
  ]);

  const summary = result
    ? [
        `Tile estimate from Hemant Tiles calculator:`,
        `Room: ${length} × ${width} ${roomUnit}`,
        `Tile size: ${tileL} × ${tileW} ${tileUnit}`,
        `Area to cover: ${result.totalAreaFt2.toFixed(1)} sq ft (${result.totalAreaM2.toFixed(2)} m²)`,
        `Tiles needed (incl. ${wastage || 0}% wastage): ${result.tilesNeeded}`,
        result.boxes ? `Boxes: ${result.boxes}` : "",
        `Adhesive: ~${result.adhesiveKg} kg · Grout: ~${result.groutKg} kg`,
        result.cost ? `Approx. tile cost: ${inr(result.cost)}` : "",
        `Please confirm availability and final price.`,
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success("Estimate copied");
    } catch {
      toast.error("Couldn't copy — please select and copy manually.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal direction="up">
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalcIcon className="h-6 w-6" />
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold text-foreground">
              Tile & Material Calculator
            </h1>
            <p className="mt-3 text-muted-foreground">
              Get tiles, boxes, adhesive, grout and an approximate cost for your
              room in seconds.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <Reveal direction="left" className="space-y-6">
            <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div>
                <h2 className="font-display text-xl font-semibold text-card-foreground">
                  Room dimensions
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Length</Label>
                    <Input
                      id="length"
                      type="number"
                      min="0"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      type="number"
                      min="0"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label>Unit</Label>
                  <Select
                    value={roomUnit}
                    onValueChange={(v) => setRoomUnit(v as Unit)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ft">Feet</SelectItem>
                      <SelectItem value="m">Meters</SelectItem>
                      <SelectItem value="cm">Centimeters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-5 space-y-4 rounded-xl bg-muted/50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <Label htmlFor="walls">Also tile the walls</Label>
                      <p className="text-xs text-muted-foreground">
                        Adds wall area based on room perimeter.
                      </p>
                    </div>
                    <Switch
                      id="walls"
                      checked={includeWalls}
                      onCheckedChange={setIncludeWalls}
                    />
                  </div>
                  {includeWalls && (
                    <div className="space-y-2">
                      <Label htmlFor="wallHeight">
                        Wall height ({roomUnit})
                      </Label>
                      <Input
                        id="wallHeight"
                        type="number"
                        min="0"
                        value={wallHeight}
                        onChange={(e) => setWallHeight(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <Label htmlFor="skirting">Include skirting</Label>
                      <p className="text-xs text-muted-foreground">
                        Border strip along the walls.
                      </p>
                    </div>
                    <Switch
                      id="skirting"
                      checked={includeSkirting}
                      onCheckedChange={setIncludeSkirting}
                    />
                  </div>
                  {includeSkirting && (
                    <div className="space-y-2">
                      <Label htmlFor="skirtingHeight">
                        Skirting height (inches)
                      </Label>
                      <Input
                        id="skirtingHeight"
                        type="number"
                        min="0"
                        value={skirtingHeight}
                        onChange={(e) => setSkirtingHeight(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div>
                <h2 className="font-display text-xl font-semibold text-card-foreground">
                  Tile size
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PRESETS.map((p) => {
                    const active =
                      tileUnit === p.unit && tileL === p.l && tileW === p.w;
                    return (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => {
                          setTileUnit(p.unit);
                          setTileL(p.l);
                          setTileW(p.w);
                        }}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tileL">Length</Label>
                    <Input
                      id="tileL"
                      type="number"
                      min="0"
                      value={tileL}
                      onChange={(e) => setTileL(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tileW">Width</Label>
                    <Input
                      id="tileW"
                      type="number"
                      min="0"
                      value={tileW}
                      onChange={(e) => setTileW(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Unit</Label>
                    <Select
                      value={tileUnit}
                      onValueChange={(v) => setTileUnit(v as Unit)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">Centimeters</SelectItem>
                        <SelectItem value="m">Meters</SelectItem>
                        <SelectItem value="ft">Feet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="perBox">Tiles per box</Label>
                    <Input
                      id="perBox"
                      type="number"
                      min="1"
                      value={perBox}
                      onChange={(e) => setPerBox(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="wastage">Wastage / cutting (%)</Label>
                  <Input
                    id="wastage"
                    type="number"
                    min="0"
                    value={wastage}
                    onChange={(e) => setWastage(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    We recommend 10% extra for cuts and breakage.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate per sq. ft. (₹)</Label>
                  <Input
                    id="rate"
                    type="number"
                    min="0"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Tiles start from ₹32/sq. ft. at our showroom.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-primary p-6 text-primary-foreground shadow-sm">
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                <h2 className="font-display text-xl font-semibold">Estimate</h2>
              </div>
              {result ? (
                <div className="mt-6 space-y-6">
                  <div>
                    <p className="text-sm text-primary-foreground/70">
                      Area to cover
                    </p>
                    <p className="font-display text-3xl font-bold">
                      {result.totalAreaFt2.toFixed(1)} sq ft
                    </p>
                    <p className="text-sm text-primary-foreground/70">
                      ({result.totalAreaM2.toFixed(2)} m²
                      {result.wallAreaM2 > 0
                        ? ` · incl. walls ${(result.wallAreaM2 * 10.7639).toFixed(0)} sq ft`
                        : ""}
                      {result.skirtingAreaM2 > 0
                        ? ` · incl. skirting ${(result.skirtingAreaM2 * 10.7639).toFixed(0)} sq ft`
                        : ""}
                      )
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">
                      Tiles needed (with {wastage || 0}% wastage)
                    </p>
                    <p className="font-display text-5xl font-bold">
                      {result.tilesNeeded}
                    </p>
                    <p className="text-sm text-primary-foreground/70">
                      Without wastage: {result.tilesExact}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-primary-foreground/10 p-3">
                      <div className="flex items-center gap-1.5 text-primary-foreground/70">
                        <Package className="h-4 w-4" />
                        <span className="text-xs">Boxes</span>
                      </div>
                      <p className="mt-1 font-display text-2xl font-bold">
                        {result.boxes ?? "—"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-primary-foreground/10 p-3">
                      <div className="flex items-center gap-1.5 text-primary-foreground/70">
                        <Layers className="h-4 w-4" />
                        <span className="text-xs">Adhesive</span>
                      </div>
                      <p className="mt-1 font-display text-2xl font-bold">
                        ~{result.adhesiveKg} kg
                      </p>
                    </div>
                    <div className="rounded-xl bg-primary-foreground/10 p-3">
                      <p className="text-xs text-primary-foreground/70">Grout</p>
                      <p className="mt-1 font-display text-2xl font-bold">
                        ~{result.groutKg} kg
                      </p>
                    </div>
                    <div className="rounded-xl bg-primary-foreground/10 p-3">
                      <p className="text-xs text-primary-foreground/70">
                        Approx. tile cost
                      </p>
                      <p className="mt-1 font-display text-2xl font-bold">
                        {result.cost ? inr(result.cost) : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button asChild variant="secondary" className="w-full">
                      <Link to="/contact">Request a quote for these tiles</Link>
                    </Button>
                    <a
                      href={whatsappLink(summary)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Send estimate on WhatsApp
                    </a>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={copySummary}
                      className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy estimate
                    </Button>
                  </div>
                  <p className="text-xs text-primary-foreground/60">
                    Adhesive and grout figures are typical site averages
                    (~4 kg/m² adhesive, ~0.5 kg/m² grout). Final quantities may
                    vary with substrate and joint width.
                  </p>
                </div>
              ) : (
                <p className="mt-6 text-sm text-primary-foreground/80">
                  Enter valid dimensions to see your estimate.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
