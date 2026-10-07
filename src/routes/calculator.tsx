import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Calculator as CalcIcon,
  CalendarCheck,
  Copy,
  FileDown,
  Grid2x2,
  HardHat,
  Layers,
  Package,
  Ruler,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/CtaBanner";
import { WhatsAppIcon, whatsappLink } from "@/lib/whatsapp";
import { BUSINESS } from "@/lib/business";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Tile Calculator — Hemant Tiles and Building Materials" },
      {
        name: "description",
        content:
          "Advanced tile calculator: area, boxes, tiles, adhesive, grout, labour, delivery and total cost. Download a PDF or send it on WhatsApp.",
      },
      {
        property: "og:title",
        content: "Advanced Tile Calculator — Hemant Tiles",
      },
      {
        property: "og:description",
        content:
          "Estimate area, boxes, tiles, adhesive, grout, labour and delivery for any room — instantly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://hemanttilesandbuildingmaterial.lovable.app/calculator" },
    ],
    links: [{ rel: "canonical", href: "https://hemanttilesandbuildingmaterial.lovable.app/calculator" }],
  }),
  component: CalculatorPage,
});

/* ------------------------------- calculation ------------------------------ */

type Unit = "ft" | "m" | "cm";
type Surface = "floor" | "wall" | "both";
type PatternId = "straight" | "brick" | "diagonal" | "herringbone";

const toMeters = (v: number, u: Unit) =>
  u === "ft" ? v * 0.3048 : u === "cm" ? v / 100 : v;

const M2_TO_FT2 = 10.7639;

const TILE_PRESETS: { label: string; unit: Unit; l: string; w: string; perBox: string }[] = [
  { label: "60 × 60 cm", unit: "cm", l: "60", w: "60", perBox: "4" },
  { label: "80 × 80 cm", unit: "cm", l: "80", w: "80", perBox: "3" },
  { label: "30 × 60 cm", unit: "cm", l: "60", w: "30", perBox: "8" },
  { label: "2 × 2 ft", unit: "ft", l: "2", w: "2", perBox: "4" },
  { label: "2 × 4 ft", unit: "ft", l: "4", w: "2", perBox: "2" },
  { label: "1 × 1 ft", unit: "ft", l: "1", w: "1", perBox: "20" },
];

const PATTERNS: {
  id: PatternId;
  label: string;
  note: string;
  /** Extra cutting wastage typical for the layout, in %. */
  wastage: number;
}[] = [
  { id: "straight", label: "Straight / grid", note: "Standard aligned joints", wastage: 8 },
  { id: "brick", label: "Brick / offset", note: "Staggered half-tile joints", wastage: 10 },
  { id: "diagonal", label: "Diagonal 45°", note: "More edge cuts", wastage: 15 },
  { id: "herringbone", label: "Herringbone", note: "Highest cutting loss", wastage: 20 },
];

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

const ROOM_TYPES = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Balcony", "Office", "Commercial", "Outdoor"] as const;

/* --------------------------------- pieces --------------------------------- */

function Card({
  title,
  step,
  children,
}: {
  title: string;
  step: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border border-border bg-card p-6 shadow-luxe sm:p-7">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 text-xs text-gold">
          {step}
        </span>
        <h2 className="font-display text-xl">{title}</h2>
      </div>
      <div className="mt-5 space-y-5">{children}</div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-1.5 text-ink-foreground/60">
        {icon}
        <span className="text-[0.7rem] uppercase tracking-[0.16em]">{label}</span>
      </div>
      <p className="mt-1.5 font-display text-2xl text-ink-foreground">{value}</p>
      {sub && <p className="text-xs text-ink-foreground/50">{sub}</p>}
    </div>
  );
}

function UnitToggle({
  value,
  onChange,
  id,
}: {
  value: Unit;
  onChange: (u: Unit) => void;
  id: string;
}) {
  return (
    <div className="inline-flex rounded-full border border-border p-0.5" role="group">
      {(["ft", "m", "cm"] as Unit[]).map((u) => (
        <button
          key={u}
          id={`${id}-${u}`}
          type="button"
          onClick={() => onChange(u)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] transition-colors",
            value === u
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {u}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

function CalculatorPage() {
  const [roomUnit, setRoomUnit] = useState<Unit>("ft");
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("10");
  const [height, setHeight] = useState("9");
  const [surface, setSurface] = useState<Surface>("floor");
  const [pattern, setPattern] = useState<PatternId>("straight");

  const [tileUnit, setTileUnit] = useState<Unit>("cm");
  const [tileL, setTileL] = useState("60");
  const [tileW, setTileW] = useState("60");
  const [perBox, setPerBox] = useState("4");

  const [wastage, setWastage] = useState("8");
  const [rate, setRate] = useState("");
  const [labourRate, setLabourRate] = useState("");
  const [roomType, setRoomType] = useState<(typeof ROOM_TYPES)[number]>("Living Room");
  const [roomCount, setRoomCount] = useState("1");
  const rooms = Math.max(1, Math.floor(parseFloat(roomCount) || 1));
  const [includeSkirting, setIncludeSkirting] = useState(false);
  const [skirtingHeight, setSkirtingHeight] = useState("4");
  const [distanceKm, setDistanceKm] = useState("8");

  const applyPattern = (id: PatternId) => {
    setPattern(id);
    const p = PATTERNS.find((x) => x.id === id);
    if (p) setWastage(String(p.wastage));
  };

  const result = useMemo(() => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const H = parseFloat(height);
    const tL = parseFloat(tileL);
    const tW = parseFloat(tileW);
    const waste = parseFloat(wastage) || 0;
    const box = parseFloat(perBox) || 0;
    const ratePerSqFt = parseFloat(rate) || 0;
    const labour = parseFloat(labourRate) || 0;
    const km = parseFloat(distanceKm) || 0;
    if (!L || !W || !tL || !tW) return null;

    const lm = toMeters(L, roomUnit);
    const wm = toMeters(W, roomUnit);
    const hm = toMeters(H || 0, roomUnit);
    const tileAreaM2 = toMeters(tL, tileUnit) * toMeters(tW, tileUnit);
    if (tileAreaM2 <= 0) return null;

    const perimeterM = 2 * (lm + wm);
    // Same per-room formulas as before, multiplied by the number of identical rooms.
    const floorAreaM2 = (surface === "wall" ? 0 : lm * wm) * rooms;
    const wallAreaM2 = (surface === "floor" ? 0 : perimeterM * hm) * rooms;
    const skirtingAreaM2 =
      (includeSkirting && surface !== "wall"
        ? perimeterM * ((parseFloat(skirtingHeight) || 0) * 0.0254)
        : 0) * rooms;

    const totalAreaM2 = floorAreaM2 + wallAreaM2 + skirtingAreaM2;
    if (totalAreaM2 <= 0) return null;

    const tilesExact = Math.ceil(totalAreaM2 / tileAreaM2);
    const tilesNeeded = Math.ceil((totalAreaM2 / tileAreaM2) * (1 + waste / 100));
    const boxes = box > 0 ? Math.ceil(tilesNeeded / box) : null;
    const areaWithWasteFt2 = totalAreaM2 * M2_TO_FT2 * (1 + waste / 100);

    const materialCost = ratePerSqFt > 0 ? areaWithWasteFt2 * ratePerSqFt : 0;
    const labourCost = labour > 0 ? totalAreaM2 * M2_TO_FT2 * labour : 0;
    const delivery =
      boxes === null
        ? 0
        : km <= 10 && boxes >= 25
          ? 0
          : Math.max(250, boxes * 18 + km * 22);

    return {
      floorAreaFt2: floorAreaM2 * M2_TO_FT2,
      wallAreaFt2: wallAreaM2 * M2_TO_FT2,
      skirtingAreaFt2: skirtingAreaM2 * M2_TO_FT2,
      totalAreaM2,
      totalAreaFt2: totalAreaM2 * M2_TO_FT2,
      areaWithWasteFt2,
      tilesExact,
      tilesNeeded,
      boxes,
      adhesiveKg: Math.ceil(totalAreaM2 * 4),
      groutKg: Math.ceil(totalAreaM2 * 0.5 * 10) / 10,
      spacerPacks: boxes ? Math.max(1, Math.ceil(boxes / 4)) : 1,
      materialCost,
      labourCost,
      delivery,
      total: materialCost + labourCost + delivery,
      deliveryFree: delivery === 0,
    };
  }, [
    length,
    width,
    height,
    surface,
    tileL,
    tileW,
    roomUnit,
    tileUnit,
    wastage,
    perBox,
    rate,
    labourRate,
    includeSkirting,
    skirtingHeight,
    distanceKm,
    rooms,
  ]);

  const patternLabel = PATTERNS.find((p) => p.id === pattern)?.label ?? "";
  const roomLabel = roomType.toLowerCase();
  const surfaceLabel = surface === "both" ? "floor + walls" : surface === "wall" ? "walls" : "floor";

  const waMessage = result
    ? `Hello, I calculated approximately ${result.totalAreaFt2.toFixed(0)} sq.ft (${surfaceLabel}) for my ${roomLabel}${rooms > 1 ? ` × ${rooms} rooms` : ""} using ${tileL}×${tileW} ${tileUnit} tiles in a ${patternLabel.toLowerCase()} pattern. Estimate: ${result.tilesNeeded} tiles${result.boxes ? `, ${result.boxes} boxes` : ""} incl. ${wastage || 0}% wastage. I would like a quotation.`
    : "";
  const visitMessage = result
    ? `Hello, I'd like to book a showroom visit. I'm planning about ${result.totalAreaFt2.toFixed(0)} sq.ft of tiles for my ${roomLabel}.`
    : "";

  const summaryLines = result
    ? [
        `Tile estimate — ${BUSINESS.name}`,
        `Room type: ${roomType}${rooms > 1 ? ` × ${rooms} rooms` : ""}`,
        `Room: ${length} × ${width}${surface !== "floor" ? ` × ${height} (H)` : ""} ${roomUnit}`,
        `Surface: ${surface === "both" ? "Floor + walls" : surface === "wall" ? "Walls" : "Floor"}`,
        `Tile: ${tileL} × ${tileW} ${tileUnit} · ${patternLabel} · ${wastage || 0}% wastage`,
        `Area: ${result.totalAreaFt2.toFixed(1)} sq ft (${result.totalAreaM2.toFixed(2)} m²)`,
        `Tiles: ${result.tilesNeeded}${result.boxes ? ` · Boxes: ${result.boxes}` : ""}`,
        `Adhesive: ~${result.adhesiveKg} kg · Grout: ~${result.groutKg} kg`,
        result.materialCost ? `Tiles cost: ${inr(result.materialCost)}` : "",
        result.labourCost ? `Labour: ${inr(result.labourCost)}` : "",
        `Delivery: ${result.deliveryFree ? "Free" : inr(result.delivery)}`,
        result.total ? `Estimated total: ${inr(result.total)}` : "",
        "Please confirm availability and final price.",
      ].filter(Boolean)
    : [];

  const summary = summaryLines.join("\n");

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success("Estimate copied");
    } catch {
      toast.error("Couldn't copy — please select and copy manually.");
    }
  };

  const downloadPdf = () => {
    if (!result) return;
    const rows: [string, string][] = [
      ["Room size", `${length} × ${width}${surface !== "floor" ? ` × ${height} (H)` : ""} ${roomUnit}`],
      ["Surface", surface === "both" ? "Floor + walls" : surface === "wall" ? "Walls" : "Floor"],
      ["Tile size", `${tileL} × ${tileW} ${tileUnit}`],
      ["Laying pattern", patternLabel],
      ["Wastage allowance", `${wastage || 0}%`],
      ["Floor area", `${result.floorAreaFt2.toFixed(1)} sq ft`],
      ["Wall area", `${result.wallAreaFt2.toFixed(1)} sq ft`],
      ["Skirting area", `${result.skirtingAreaFt2.toFixed(1)} sq ft`],
      ["Total area", `${result.totalAreaFt2.toFixed(1)} sq ft (${result.totalAreaM2.toFixed(2)} m²)`],
      ["Tiles required", `${result.tilesNeeded} (without wastage ${result.tilesExact})`],
      ["Boxes", result.boxes ? String(result.boxes) : "—"],
      ["Adhesive", `~${result.adhesiveKg} kg`],
      ["Grout", `~${result.groutKg} kg`],
      ["Spacer packs", String(result.spacerPacks)],
      ["Tiles cost", result.materialCost ? inr(result.materialCost) : "—"],
      ["Labour", result.labourCost ? inr(result.labourCost) : "—"],
      ["Delivery", result.deliveryFree ? "Free" : inr(result.delivery)],
      ["Estimated total", result.total ? inr(result.total) : "—"],
    ];

    const html = `<!doctype html><html><head><meta charset="utf-8">
<title>Tile Estimate — ${BUSINESS.name}</title>
<style>
  @page { margin: 18mm; }
  body { font-family: Georgia, 'Times New Roman', serif; color:#1c1a17; }
  h1 { font-size: 24px; margin:0 0 4px; }
  .gold { color:#a3813f; letter-spacing:.24em; text-transform:uppercase; font-size:10px; font-family: Arial, sans-serif; }
  .meta { font-family: Arial, sans-serif; font-size:11px; color:#57534e; line-height:1.6; margin-top:10px; }
  hr { border:0; border-top:2px solid #a3813f; margin:16px 0; }
  table { width:100%; border-collapse:collapse; font-family: Arial, sans-serif; font-size:12px; }
  td { padding:8px 4px; border-bottom:1px solid #e7e5e4; }
  td:last-child { text-align:right; font-weight:600; }
  tr:last-child td { border-bottom:0; border-top:2px solid #1c1a17; font-size:14px; }
  .note { margin-top:18px; font-family: Arial, sans-serif; font-size:10px; color:#78716c; line-height:1.6; }
</style></head><body>
<p class="gold">Estimate</p>
<h1>${BUSINESS.name}</h1>
<div class="meta">${BUSINESS.address}<br>${BUSINESS.phone} · ${BUSINESS.email}<br>Generated ${new Date().toLocaleDateString("en-IN")}</div>
<hr>
<table>${rows.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}</table>
<p class="note">Quantities are calculated from the dimensions provided. Adhesive ~4 kg/m² and grout ~0.5 kg/m² are typical site averages and vary with substrate and joint width. Prices are indicative and subject to final confirmation at the showroom.</p>
</body></html>`;

    const w = window.open("", "_blank");
    if (!w) {
      toast.error("Please allow pop-ups to download the PDF.");
      return;
    }
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 350);
    toast.success("Choose “Save as PDF” in the print dialog");
  };

  return (
    <>
      {/* header */}
      <section className="relative overflow-hidden bg-ink pt-32 pb-16 text-ink-foreground sm:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
        />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <p className="eyebrow text-gold">Planning tool</p>
            <h1 className="mt-4 max-w-3xl display-hero">
              Plan your tiles with confidence
            </h1>
            <p className="lede mt-6 max-w-xl text-ink-foreground/65">
              Measure your space, choose a tile and get recommended tiles, boxes
              and material quantities — then ask us for an exact quotation.
            </p>
            <ol className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[0.7rem] uppercase tracking-[0.18em] text-ink-foreground/60">
              {["Your space", "Choose material", "Calculate", "Your estimate", "Get quote"].map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="text-gold">0{i + 1}</span> {s}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          {/* inputs */}
          <div className="space-y-6">
            <Reveal direction="left">
              <Card step="01" title="Your space">
                <div className="space-y-2">
                  <Label>Room type</Label>
                  <div className="flex flex-wrap gap-2">
                    {ROOM_TYPES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRoomType(r)}
                        className={cn(
                          "rounded-sm border px-3.5 py-1.5 text-xs transition-colors",
                          roomType === r
                            ? "border-gold bg-gold/10 text-foreground"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rooms">Number of identical rooms</Label>
                  <Input
                    id="rooms"
                    type="number"
                    min="1"
                    step="1"
                    value={roomCount}
                    onChange={(e) => setRoomCount(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
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
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      type="number"
                      min="0"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Label className="text-muted-foreground">Measured in</Label>
                  <UnitToggle id="room" value={roomUnit} onChange={setRoomUnit} />
                </div>

                <div className="space-y-2">
                  <Label>Surface to tile</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        ["floor", "Floor"],
                        ["wall", "Walls"],
                        ["both", "Floor + walls"],
                      ] as [Surface, string][]
                    ).map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSurface(id)}
                        className={cn(
                          "rounded-xl border px-3 py-2.5 text-xs transition-colors",
                          surface === id
                            ? "border-gold bg-gold/10 text-foreground"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  {surface !== "floor" && (
                    <p className="text-xs text-muted-foreground">
                      Wall area uses room perimeter × height.
                    </p>
                  )}
                </div>

                <div className="space-y-4 rounded-xl bg-muted/50 p-4">
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
                      <Label htmlFor="skirtingHeight">Skirting height (inches)</Label>
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
              </Card>
            </Reveal>

            <Reveal direction="left">
              <Card step="02" title="Choose material — tile & pattern">
                <div className="flex flex-wrap gap-2">
                  {TILE_PRESETS.map((p) => {
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
                          setPerBox(p.perBox);
                        }}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                          active
                            ? "border-gold bg-gold/10 text-foreground"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tileL">Tile length</Label>
                    <Input
                      id="tileL"
                      type="number"
                      min="0"
                      value={tileL}
                      onChange={(e) => setTileL(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tileW">Tile width</Label>
                    <Input
                      id="tileW"
                      type="number"
                      min="0"
                      value={tileW}
                      onChange={(e) => setTileW(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Label className="text-muted-foreground">Tile unit</Label>
                    <UnitToggle id="tile" value={tileUnit} onChange={setTileUnit} />
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

                <div className="space-y-2">
                  <Label>Laying pattern</Label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {PATTERNS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => applyPattern(p.id)}
                        className={cn(
                          "rounded-xl border p-3 text-left transition-colors",
                          pattern === p.id
                            ? "border-gold bg-gold/10"
                            : "border-border hover:border-gold/40",
                        )}
                      >
                        <span className="block text-sm text-foreground">{p.label}</span>
                        <span className="block text-xs text-muted-foreground">
                          {p.note} · suggests {p.wastage}%
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal direction="left">
              <Card step="03" title="Calculate — wastage & optional rates">
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Tile rate per sq. ft. (₹)</Label>
                    <Input
                      id="rate"
                      type="number"
                      min="0"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="labourRate">Labour per sq. ft. (₹)</Label>
                    <Input
                      id="labourRate"
                      type="number"
                      min="0"
                      value={labourRate}
                      onChange={(e) => setLabourRate(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Typical laying charge in Varanasi: ₹22–₹35.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="distance">Delivery distance (km)</Label>
                    <Input
                      id="distance"
                      type="number"
                      min="0"
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Free within 10 km on orders of 25+ boxes.
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>

          {/* results */}
          <Reveal direction="right" className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-sm border border-white/10 bg-ink text-ink-foreground shadow-luxe">
              <div className="flex items-center gap-2 border-b border-white/10 px-6 py-5">
                <Ruler className="h-4 w-4 text-gold" />
                <h2 className="font-display text-xl">04 · Your estimate</h2>
              </div>

              {result ? (
                <div className="space-y-6 p-6">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-foreground/50">
                      Total area · {roomLabel}{rooms > 1 ? ` × ${rooms}` : ""}
                    </p>
                    <p className="font-display text-4xl">
                      {result.totalAreaFt2.toFixed(1)}{" "}
                      <span className="text-lg text-ink-foreground/60">sq ft</span>
                    </p>
                    <p className="text-xs text-ink-foreground/50">
                      {result.totalAreaM2.toFixed(2)} m²
                      {result.wallAreaFt2 > 0 &&
                        ` · walls ${result.wallAreaFt2.toFixed(0)} sq ft`}
                      {result.skirtingAreaFt2 > 0 &&
                        ` · skirting ${result.skirtingAreaFt2.toFixed(0)} sq ft`}
                      {` · with ${wastage || 0}% wastage ${result.areaWithWasteFt2.toFixed(0)} sq ft`}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Stat
                      icon={<Grid2x2 className="h-3.5 w-3.5" />}
                      label="Recommended tiles"
                      value={String(result.tilesNeeded)}
                      sub={`without wastage ${result.tilesExact}`}
                    />
                    <Stat
                      icon={<Package className="h-3.5 w-3.5" />}
                      label="Estimated boxes"
                      value={result.boxes ? String(result.boxes) : "—"}
                      sub={`${perBox || 0} per box`}
                    />
                    <Stat
                      icon={<Layers className="h-3.5 w-3.5" />}
                      label="Wastage"
                      value={`${Math.max(0, result.tilesNeeded - result.tilesExact)} tiles`}
                      sub={`${wastage || 0}% allowance`}
                    />
                    <Stat
                      icon={<Layers className="h-3.5 w-3.5" />}
                      label="Adhesive · grout"
                      value={`~${result.adhesiveKg} kg`}
                      sub={`grout ~${result.groutKg} kg`}
                    />
                  </div>

                  {result.materialCost > 0 ? (
                  <div className="space-y-2 rounded-sm border border-white/10 bg-white/5 p-4 text-sm">
                    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-foreground/50">
                      Estimated material cost · at your entered rate
                    </p>
                    <div className="flex justify-between">
                      <span className="text-ink-foreground/60">Tiles</span>
                      <span>{inr(result.materialCost)}</span>
                    </div>
                    {result.labourCost > 0 && (
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1.5 text-ink-foreground/60">
                          <HardHat className="h-3.5 w-3.5" /> Labour
                        </span>
                        <span>{inr(result.labourCost)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5 text-ink-foreground/60">
                        <Truck className="h-3.5 w-3.5" /> Delivery
                      </span>
                      <span className={result.deliveryFree ? "text-gold" : ""}>
                        {result.deliveryFree ? "Free" : inr(result.delivery)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-white/15 pt-3">
                      <span className="text-ink-foreground/70">Estimated total</span>
                      <span className="font-display text-2xl text-gold">{inr(result.total)}</span>
                    </div>
                  </div>
                  ) : (
                    <p className="rounded-sm border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-ink-foreground/60">
                      Prices vary by brand and finish, so we don't guess them. Enter a tile rate in step 03 for a cost estimate, or ask us for an exact quotation.
                    </p>
                  )}

                  <div className="space-y-3 border-t border-white/10 pt-6">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-gold">05 · Get quote</p>
                    <p className="font-display text-2xl">Want an exact quotation?</p>
                    <Link
                      to="/contact"
                      className="btn btn-primary w-full justify-center"
                    >
                      <CalcIcon className="h-4 w-4" /> Get Exact Quote
                    </Link>
                    <a
                      href={whatsappLink(waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary-dark w-full justify-center"
                    >
                      <WhatsAppIcon className="h-4 w-4" /> Send to WhatsApp
                    </a>
                    <a
                      href={whatsappLink(visitMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary-dark w-full justify-center"
                    >
                      <CalendarCheck className="h-4 w-4" /> Book Showroom Visit
                    </a>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button type="button" onClick={downloadPdf} className="btn btn-utility justify-center text-ink-foreground/70">
                        <FileDown className="h-3.5 w-3.5" /> Save PDF
                      </button>
                      <button type="button" onClick={copySummary} className="btn btn-utility justify-center text-ink-foreground/70">
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </button>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-ink-foreground/45">
                    Adhesive, grout and labour are typical site averages. Final
                    quantities and price are confirmed at the showroom.
                  </p>
                </div>
              ) : (
                <p className="p-6 text-sm text-ink-foreground/70">
                  Enter valid dimensions to see your estimate.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <CtaBanner
        eyebrow="Next step"
        title="Book a free consultation with our surface expert"
        body="Share your estimate and we'll help you pick the right tile, finish and quantity — no obligation."
        whatsappMessage="Hello, I used the tile calculator and would like a free consultation."
        primaryLabel="Book Free Consultation"
        secondary={{ to: "/visualizer", label: "Try the Room Visualizer" }}
      />
    </>
  );
}
