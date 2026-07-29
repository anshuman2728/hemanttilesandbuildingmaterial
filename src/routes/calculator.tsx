import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator as CalcIcon, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Tile Calculator — Hemant Tiles and Building Materials" },
      {
        name: "description",
        content:
          "Estimate how many tiles you need for your room. Free tile area calculator by Hemant Tiles, Varanasi.",
      },
      {
        property: "og:title",
        content: "Tile Calculator — Hemant Tiles and Building Materials",
      },
      {
        property: "og:description",
        content:
          "Estimate how many tiles you need for your room. Free tile area calculator.",
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

function CalculatorPage() {
  const [roomUnit, setRoomUnit] = useState<Unit>("ft");
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("10");
  const [tileUnit, setTileUnit] = useState<Unit>("cm");
  const [tileL, setTileL] = useState("60");
  const [tileW, setTileW] = useState("60");
  const [wastage, setWastage] = useState("10");

  const result = useMemo(() => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const tL = parseFloat(tileL);
    const tW = parseFloat(tileW);
    const waste = parseFloat(wastage) || 0;
    if (!L || !W || !tL || !tW) return null;

    const roomAreaM2 = toMeters(L, roomUnit) * toMeters(W, roomUnit);
    const tileAreaM2 = toMeters(tL, tileUnit) * toMeters(tW, tileUnit);
    if (tileAreaM2 <= 0) return null;

    const tilesExact = roomAreaM2 / tileAreaM2;
    const withWaste = tilesExact * (1 + waste / 100);
    return {
      roomAreaM2,
      roomAreaFt2: roomAreaM2 * 10.7639,
      tilesNeeded: Math.ceil(withWaste),
      tilesExact: Math.ceil(tilesExact),
    };
  }, [length, width, tileL, tileW, roomUnit, tileUnit, wastage]);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CalcIcon className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground">
            Tile Area Calculator
          </h1>
          <p className="mt-3 text-muted-foreground">
            Enter your room and tile dimensions to estimate how many tiles you
            need.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
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
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-card-foreground">
                Tile size
              </h2>
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
              <div className="mt-4 space-y-2">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="wastage">Wastage / cutting allowance (%)</Label>
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
          </div>

          <div className="rounded-2xl border border-border bg-primary p-6 text-primary-foreground shadow-sm">
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              <h2 className="font-display text-xl font-semibold">Estimate</h2>
            </div>
            {result ? (
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm text-primary-foreground/70">
                    Total floor area
                  </p>
                  <p className="font-display text-3xl font-bold">
                    {result.roomAreaM2.toFixed(2)} m²
                  </p>
                  <p className="text-sm text-primary-foreground/70">
                    ({result.roomAreaFt2.toFixed(2)} sq ft)
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
                <Button asChild variant="secondary" className="w-full">
                  <a href="/contact">Request a quote for these tiles</a>
                </Button>
              </div>
            ) : (
              <p className="mt-6 text-sm text-primary-foreground/80">
                Enter valid dimensions to see your estimate.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
