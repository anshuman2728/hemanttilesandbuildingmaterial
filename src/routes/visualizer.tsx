import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Download,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/CtaBanner";
import { ShowroomMap } from "@/components/ShowroomMap";
import { tileSwatches, type TileSwatch } from "@/lib/tile-swatches";
import { WhatsAppIcon, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/visualizer")({
  head: () => ({
    meta: [
      { title: "AI Room Visualizer — Hemant Tiles and Building Materials" },
      {
        name: "description",
        content:
          "Upload a photo of your room, try premium tiles and granite on the floor or wall, compare designs and download the preview.",
      },
      { property: "og:title", content: "AI Room Visualizer — Hemant Tiles" },
      {
        property: "og:description",
        content:
          "See how our tiles look in your own room before you buy — upload, preview, compare and share.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://hemanttilesandbuildingmaterial.lovable.app/visualizer" },
    ],
    links: [{ rel: "canonical", href: "https://hemanttilesandbuildingmaterial.lovable.app/visualizer" }],
  }),
  component: VisualizerPage,
});

type Surface = "floor" | "wall";

interface Settings {
  swatch: TileSwatch;
  surface: Surface;
  /** Horizon line as a fraction of image height. */
  horizon: number;
  /** Tile scale in px at the near edge. */
  scale: number;
  opacity: number;
}

const DEFAULTS = {
  surface: "floor" as Surface,
  horizon: 0.55,
  scale: 130,
  opacity: 0.82,
};

/* ------------------------------ render engine ----------------------------- */

function drawPreview(
  canvas: HTMLCanvasElement,
  room: HTMLImageElement,
  tile: HTMLImageElement | null,
  s: Omit<Settings, "swatch">,
) {
  const maxW = 1400;
  const ratio = room.naturalHeight / room.naturalWidth;
  const w = Math.min(maxW, room.naturalWidth);
  const h = Math.round(w * ratio);
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(room, 0, 0, w, h);
  if (!tile) return;

  const pattern = ctx.createPattern(tile, "repeat");
  if (!pattern) return;

  const y = Math.round(h * s.horizon);

  ctx.save();
  ctx.beginPath();
  if (s.surface === "floor") {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
  } else {
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, y);
    ctx.lineTo(0, y);
  }
  ctx.closePath();
  ctx.clip();

  // Perspective-ish bands: tiles get smaller towards the horizon.
  const bandCount = 22;
  const regionH = s.surface === "floor" ? h - y : y;
  ctx.globalAlpha = s.opacity;
  for (let i = 0; i < bandCount; i++) {
    const t = i / bandCount;
    const nextT = (i + 1) / bandCount;
    const depth = s.surface === "floor" ? t : 1 - t;
    const bandY =
      s.surface === "floor" ? y + regionH * t : regionH * t;
    const bandH = regionH * (nextT - t) + 1;
    const scale = (s.scale / 100) * (0.35 + depth * 0.95);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, bandY, w, bandH);
    ctx.clip();
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.fillStyle = pattern;
    ctx.fillRect(0, bandY / scale, w / scale, bandH / scale + 2);
    ctx.restore();
  }
  ctx.globalAlpha = 1;

  // Preserve original shading so the tile sits in the room's light.
  ctx.globalCompositeOperation = "soft-light";
  ctx.globalAlpha = 0.85;
  ctx.drawImage(room, 0, 0, w, h);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.restore();
}

/* -------------------------------- component ------------------------------- */

function VisualizerPage() {
  const [roomSrc, setRoomSrc] = useState<string | null>(null);
  const [swatch, setSwatch] = useState<TileSwatch>(tileSwatches[0]!);
  const [surface, setSurface] = useState<Surface>(DEFAULTS.surface);
  const [horizon, setHorizon] = useState(DEFAULTS.horizon);
  const [scale, setScale] = useState(DEFAULTS.scale);
  const [opacity, setOpacity] = useState(DEFAULTS.opacity);
  const [compare, setCompare] = useState(false);
  const [split, setSplit] = useState(50);
  const [saved, setSaved] = useState<{ id: string; url: string; name: string }[]>([]);
  const [dragging, setDragging] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roomImgRef = useRef<HTMLImageElement | null>(null);
  const tileImgRef = useRef<HTMLImageElement | null>(null);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const room = roomImgRef.current;
    if (!canvas || !room) return;
    drawPreview(canvas, room, tileImgRef.current, {
      surface,
      horizon,
      scale,
      opacity,
    });
  }, [surface, horizon, scale, opacity]);

  // Load the uploaded room photo.
  useEffect(() => {
    if (!roomSrc) return;
    const img = new Image();
    img.onload = () => {
      roomImgRef.current = img;
      render();
    };
    img.src = roomSrc;
  }, [roomSrc, render]);

  // Load the selected tile texture.
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      tileImgRef.current = img;
      render();
    };
    img.src = swatch.image;
  }, [swatch, render]);

  useEffect(() => {
    render();
  }, [render]);

  const handleFile = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      toast.error("Image is too large — please use one under 12 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setRoomSrc(String(reader.result));
    reader.readAsDataURL(file);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/jpeg", 0.92);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hemant-tiles-${swatch.id}-preview.jpg`;
    a.click();
    toast.success("Preview downloaded");
  };

  const saveDesign = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/jpeg", 0.75);
    setSaved((prev) => [
      { id: `${swatch.id}-${Date.now()}`, url, name: swatch.name },
      ...prev,
    ].slice(0, 4));
    toast.success("Design saved to compare");
  };

  const reset = () => {
    setSurface(DEFAULTS.surface);
    setHorizon(DEFAULTS.horizon);
    setScale(DEFAULTS.scale);
    setOpacity(DEFAULTS.opacity);
    setCompare(false);
  };

  const shareMessage = `Hello, I designed my room on your website using ${swatch.name} (${swatch.family}, from ${swatch.priceFrom}) on the ${surface}. Please share availability and the best price — I will send the preview image here.`;

  return (
    <>
      {/* header */}
      <section className="relative overflow-hidden bg-ink pt-32 pb-16 text-ink-foreground sm:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
        />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <p className="eyebrow flex items-center gap-2 text-gold">
              <Sparkles className="h-3.5 w-3.5" /> AI Room Visualizer
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">
              See the surface in your own room
            </h1>
            <p className="mt-5 max-w-xl text-ink-foreground/65">
              Upload a photo, drop in a tile, adjust the floor line and compare
              finishes side by side — then download or send it to us on WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          {/* stage */}
          <Reveal direction="left">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-luxe">
              {!roomSrc ? (
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    handleFile(e.dataTransfer.files?.[0]);
                  }}
                  className={cn(
                    "flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed p-8 text-center transition-colors",
                    dragging
                      ? "border-gold bg-gold/5"
                      : "border-border hover:border-gold/50",
                  )}
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold">
                    <Upload className="h-5 w-5" />
                  </span>
                  <span className="font-display text-2xl text-foreground">
                    Upload your room photo
                  </span>
                  <span className="max-w-sm text-sm text-muted-foreground">
                    Drag &amp; drop or tap to browse. A straight-on photo with the
                    floor visible works best. Your image stays on your device.
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />
                </label>
              ) : (
                <div className="relative">
                  <canvas ref={canvasRef} className="block w-full" />
                  {compare && (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 0 0 ${split}%)` }}
                      >
                        <img
                          src={roomSrc}
                          alt="Original room"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div
                        className="pointer-events-none absolute inset-y-0 w-px bg-gold"
                        style={{ left: `${split}%` }}
                      />
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={split}
                        onChange={(e) => setSplit(Number(e.target.value))}
                        aria-label="Compare original and preview"
                        className="absolute inset-x-0 bottom-4 mx-auto w-[85%] accent-[var(--gold)]"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-ink-foreground">
                        New tile
                      </span>
                      <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-ink-foreground">
                        Original
                      </span>
                    </>
                  )}
                </div>
              )}

              {roomSrc && (
                <div className="flex flex-wrap items-center gap-2 border-t border-border p-4">
                  <button
                    type="button"
                    onClick={() => setCompare((v) => !v)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs transition-colors",
                      compare
                        ? "border-gold bg-gold/10 text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Compare with original
                  </button>
                  <button
                    type="button"
                    onClick={saveDesign}
                    className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Save this design
                  </button>
                  <button
                    type="button"
                    onClick={download}
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-medium text-ink transition-transform hover:-translate-y-0.5"
                  >
                    <Download className="h-3.5 w-3.5" /> Download preview
                  </button>
                  <a
                    href={whatsappLink(shareMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium text-white transition-transform hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" /> Share on WhatsApp
                  </a>
                  <label className="ml-auto inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground hover:text-foreground">
                    <ImageIcon className="h-3.5 w-3.5" /> Change photo
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                  </label>
                </div>
              )}
            </div>

            {saved.length > 0 && (
              <div className="mt-6">
                <p className="eyebrow text-muted-foreground">Saved designs</p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {saved.map((d) => (
                    <figure
                      key={d.id}
                      className="overflow-hidden rounded-xl border border-border bg-card"
                    >
                      <img src={d.url} alt={d.name} className="h-24 w-full object-cover" />
                      <figcaption className="px-2 py-1.5 text-[0.7rem] text-muted-foreground">
                        {d.name}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          {/* controls */}
          <Reveal direction="right" className="lg:sticky lg:top-24">
            <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-luxe">
              <div>
                <h2 className="font-display text-xl">Choose a surface</h2>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {tileSwatches.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSwatch(s)}
                      className={cn(
                        "group overflow-hidden rounded-xl border text-left transition-transform hover:-translate-y-0.5",
                        swatch.id === s.id ? "border-gold" : "border-border",
                      )}
                    >
                      <img
                        src={s.image}
                        alt={s.name}
                        loading="lazy"
                        className="h-16 w-full object-cover"
                      />
                      <span className="block px-2 py-1.5 text-[0.7rem] leading-tight text-foreground">
                        {s.name}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {swatch.family} · from{" "}
                  <span className="text-foreground">{swatch.priceFrom}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Label>Apply to</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(["floor", "wall"] as Surface[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSurface(s)}
                      className={cn(
                        "rounded-xl border px-3 py-2.5 text-xs capitalize transition-colors",
                        surface === s
                          ? "border-gold bg-gold/10 text-foreground"
                          : "border-border text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Floor / wall line</Label>
                    <span className="text-muted-foreground">
                      {Math.round(horizon * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[horizon * 100]}
                    min={15}
                    max={90}
                    step={1}
                    onValueChange={(v) => setHorizon((v[0] ?? 55) / 100)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Tile size</Label>
                    <span className="text-muted-foreground">{scale}%</span>
                  </div>
                  <Slider
                    value={[scale]}
                    min={40}
                    max={260}
                    step={5}
                    onValueChange={(v) => setScale(v[0] ?? 130)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Blend strength</Label>
                    <span className="text-muted-foreground">
                      {Math.round(opacity * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[opacity * 100]}
                    min={30}
                    max={100}
                    step={1}
                    onValueChange={(v) => setOpacity((v[0] ?? 82) / 100)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
                <Link
                  to="/calculator"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Calculate quantity
                </Link>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                This is a visual guide, not a photo-real render. Shade, gloss and
                grout width look slightly different in person — see the full-size
                display at our showroom.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <CtaBanner
        eyebrow="Build your dream home"
        title="Loved a look? We'll confirm stock and pricing today"
        body="Send us your preview and room size — we'll reply with availability, box count and the best showroom price."
        whatsappMessage="Hello, I created a room preview on your website and would like a quote."
        primaryLabel="Get Instant Quote"
        secondary={{ to: "/products", label: "Browse collections" }}
      />

      <ShowroomMap />
    </>
  );
}
