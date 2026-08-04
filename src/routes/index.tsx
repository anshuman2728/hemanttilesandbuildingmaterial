import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Star,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Counter,
  Marquee,
  Parallax,
  Reveal,
  SplitHeading,
  useScrollProgress,
} from "@/components/motion";
import { BeforeAfter } from "@/components/BeforeAfter";
import {
  brands,
  categoryGroups,
  faqs,
  gallery,
  spaces,
  stats,
  testimonials,
  whyChooseUs,
} from "@/lib/catalog";
import {
  LegacyTimeline,
  MaterialsMatter,
  RoomExplorer,
} from "@/components/story-sections";
import { CollectionsStory } from "@/components/CollectionsStory";
import { whatsappLink, WhatsAppIcon } from "@/lib/whatsapp";
import { CtaBanner } from "@/components/CtaBanner";
import { ShowroomMap } from "@/components/ShowroomMap";
import heroImg from "@/assets/hero-cinematic.jpg";
import livingImg from "@/assets/space-living.jpg";
import tilesImg from "@/assets/tiles.jpg";
import { cn } from "@/lib/utils";

const MAPS_LINK = "https://maps.app.goo.gl/A71gEFAMbxpNEU4WA";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Sankar+Nagar+Colony+661/2+Ram+Nagar+Industrial+Area+Ramnagar+Varanasi+221008&output=embed";
const PHONE = "+919451365107";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Hemant Tiles & Building Materials — Premium Tiles, Granite & Bathware in Varanasi",
      },
      {
        name: "description",
        content:
          "Building beautiful spaces that last. Premium tiles, granite, marble, bathware and building materials in Ramnagar, Varanasi. Open from 9 AM — free tile estimator and instant WhatsApp quotes.",
      },
      {
        property: "og:title",
        content: "Premium Tiles, Granite & Bathware — Hemant Tiles, Varanasi",
      },
      {
        property: "og:description",
        content:
          "A curated showroom of tiles, granite, marble and bathware in Ramnagar, Varanasi. Explore collections, estimate your material, and get a free quote on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

/* ------------------------------- primitives ------------------------------- */

function GoldButton({
  to,
  href,
  children,
  external,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-all duration-500 hover:gap-4 hover:brightness-110";
  if (to)
    return (
      <Link to={to} className={cls}>
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
      </Link>
    );
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
    </a>
  );
}

function GhostButton({
  to,
  href,
  children,
  onLight = false,
  external,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  onLight?: boolean;
  external?: boolean;
}) {
  const cls = cn(
    "inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-medium transition-colors duration-500",
    onLight
      ? "border-foreground/25 text-foreground hover:bg-foreground hover:text-background"
      : "border-white/35 text-white hover:bg-white hover:text-ink",
  );
  if (to)
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function SectionHead({
  eyebrow,
  title,
  body,
  invert = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  invert?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <Reveal>
        <span className={cn("eyebrow", invert ? "text-gold" : "text-gold")}>
          {eyebrow}
        </span>
      </Reveal>
      <h2
        className={cn(
          "mt-5 text-3xl leading-[1.1] sm:text-4xl md:text-5xl",
          invert ? "text-ink-foreground" : "text-foreground",
        )}
      >
        <SplitHeading text={title} />
      </h2>
      {body && (
        <Reveal delay={120}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed",
              invert ? "text-ink-foreground/70" : "text-muted-foreground",
            )}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function useMouseTilt() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setPos({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return pos;
}

function Hero() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const tilt = useMouseTilt();

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <div
        className="absolute inset-0 -z-10 will-change-transform motion-reduce:!transform-none"
        style={{
          transform: `translate3d(${tilt.x * -14}px, ${(progress - 0.5) * 140 + tilt.y * -10}px, 0) scale(1.14)`,
        }}
      >
        <img
          src={heroImg}
          alt="Luxury interior with polished large-format stone floor tiles"
          width={1920}
          height={1200}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/45 to-ink/95" />

      {/* floating background shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span
          className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl motion-reduce:!transform-none"
          style={{ transform: `translate3d(${tilt.x * 26}px, ${tilt.y * 20}px, 0)` }}
        />
        <span
          className="absolute -right-16 bottom-32 h-96 w-96 rounded-full bg-white/10 blur-3xl motion-reduce:!transform-none"
          style={{ transform: `translate3d(${tilt.x * -32}px, ${tilt.y * -22}px, 0)` }}
        />
        <span
          className="animate-float-slow absolute left-1/2 top-1/3 h-40 w-40 rounded-3xl border border-white/15 motion-reduce:animate-none"
          style={{ transform: `rotate(18deg) translate3d(${tilt.x * 18}px, ${tilt.y * 14}px, 0)` }}
        />
      </div>

      <div className="container mx-auto flex min-h-[100svh] flex-col justify-center px-4 pb-48 pt-32 sm:px-6 lg:px-8">
        <Reveal direction="none">
          <span className="eyebrow text-gold">Ramnagar, Varanasi · Since 2004</span>
        </Reveal>

        <h1 className="mt-7 max-w-4xl font-display text-[2.6rem] leading-[1.02] text-white sm:text-6xl lg:text-[5.1rem]">
          <SplitHeading text="Every Space Begins" />
          <br className="hidden sm:block" />
          <SplitHeading text="With a Surface." delay={260} wordClassName="italic text-gold" />
        </h1>

        <Reveal delay={520}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Crafting premium spaces with luxury tiles, granite, marble, and
            sanitary solutions.
          </p>
        </Reveal>

        <Reveal delay={640}>
          <div className="mt-10 flex flex-wrap gap-3">
            <GoldButton to="/products">Explore Collections</GoldButton>
            <GhostButton to="/calculator">Calculate Tiles</GhostButton>
            <GhostButton href={MAPS_LINK} external>
              Visit Showroom
            </GhostButton>
          </div>
        </Reveal>
      </div>

      {/* scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-[13.5rem] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-white/20">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-6 bg-gold motion-reduce:animate-none" />
        </span>
      </div>

      {/* floating statistics */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal delay={780}>
          <div className="glass-dark container mx-auto grid grid-cols-2 gap-y-7 rounded-2xl px-6 py-7 text-white sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl text-gold sm:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/65">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* --------------------------------- story ---------------------------------- */

function StoryStatements() {
  return (
    <section className="bg-background py-28 sm:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-16 text-center">
          <Reveal>
            <p className="font-display text-3xl leading-[1.15] text-foreground sm:text-5xl">
              We don't just sell tiles.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="gold-rule mx-auto h-px w-40" />
          </Reveal>
          <Reveal delay={220} direction="zoom">
            <p className="font-display text-3xl leading-[1.15] text-foreground sm:text-5xl">
              We help families build{" "}
              <span className="italic text-gold">dream homes.</span>
            </p>
          </Reveal>
          <Reveal delay={340}>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
              Twenty years on the same road in Ramnagar, guiding first-time
              homeowners, architects and contractors through every surface
              decision — from the size of a bathroom tile to the grain of a
              kitchen platform.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Sticky cinematic space-to-space scroll journey. */
function SpaceJourney() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const count = spaces.length;
  const raw = progress * 1.25 - 0.12;
  const index = Math.min(count - 1, Math.max(0, Math.floor(raw * count)));

  return (
    <section ref={ref} className="relative bg-ink" style={{ height: `${count * 85}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {spaces.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt={`${s.label} finished with premium tiles`}
            loading="lazy"
            width={1280}
            height={1600}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out",
              i === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/20" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow text-gold">The journey through a home</span>
          <p className="mt-6 font-display text-5xl leading-none text-white/25 sm:text-7xl">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-6xl lg:text-7xl">
            {spaces[index]!.label}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
            {spaces[index]!.note}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {spaces[index]!.recommend.slice(0, 4).map((r) => (
              <li
                key={r}
                className="glass-dark rounded-full px-4 py-1.5 text-xs text-white/85"
              >
                {r}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex gap-2">
            {spaces.map((s, i) => (
              <span
                key={s.id}
                className={cn(
                  "h-px transition-all duration-500",
                  i === index ? "w-12 bg-gold" : "w-6 bg-white/25",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- categories ------------------------------- */

function Categories() {
  return (
    <section id="collections" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Collections"
          title="Everything a home needs, under one roof."
          body="Five curated departments, each stocked with the brands and finishes Varanasi builds with."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categoryGroups.map((c, i) => (
            <Reveal key={c.id} delay={i * 90} className={cn(i === 0 && "lg:col-span-2")}>
              <Link
                to="/products/$productId"
                params={{ productId: c.productId }}
                className="group relative block h-full overflow-hidden rounded-lg bg-ink shadow-luxe"
              >
                <div className={cn("overflow-hidden", i === 0 ? "aspect-[16/9]" : "aspect-[4/3]")}>
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-90" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl text-white sm:text-3xl">{c.title}</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/70">{c.blurb}</p>

                  <ul className="mt-4 flex max-h-0 flex-wrap gap-1.5 overflow-hidden opacity-0 transition-all duration-700 group-hover:max-h-40 group-hover:opacity-100">
                    {c.items.slice(0, 8).map((it) => (
                      <li
                        key={it}
                        className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] text-white/75"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
                    View Collection
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- browse by space ---------------------------- */

function BrowseBySpace() {
  const [active, setActive] = useState(spaces[0]!.id);
  const current = useMemo(() => spaces.find((s) => s.id === active)!, [active]);

  const allSpaces = [
    ...spaces.map((s) => s.label),
    "Dining",
    "Hall",
    "Office",
    "Hotel",
    "Restaurant",
    "Terrace",
    "Garden",
    "Balcony",
    "Temple",
  ];

  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Browse by space"
          title="I am designing…"
          body="Pick the room you're working on and we'll suggest what usually works best."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {spaces.map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <button
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "group relative aspect-[4/3] w-full overflow-hidden rounded-lg text-left transition-transform duration-500 hover:-translate-y-1",
                    active === s.id && "ring-1 ring-gold",
                  )}
                >
                  <img
                    src={s.image}
                    alt={s.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-sm font-medium text-white">
                    {s.label}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal direction="right" className="lg:sticky lg:top-28">
            <div className="rounded-lg border border-border bg-card p-7 shadow-luxe">
              <span className="eyebrow text-gold">Recommended for</span>
              <h3 className="mt-3 font-display text-3xl text-foreground">
                {current.label}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{current.note}</p>
              <ul className="mt-6 space-y-3">
                {current.recommend.map((r) => (
                  <li
                    key={r}
                    className="flex items-center gap-3 border-b border-border pb-3 text-sm text-foreground last:border-0"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-2">
                <GoldButton to="/products">See products</GoldButton>
                <a
                  href={whatsappLink(
                    `Hello, I am designing my ${current.label.toLowerCase()}. Please suggest suitable products.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <ul className="mt-12 flex flex-wrap gap-2">
            {allSpaces.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border bg-background px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- gallery -------------------------------- */

function InspirationGallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="bg-ink py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Visual inspiration"
          title="Spaces built with our surfaces."
          body="Tap any frame to see it full size."
          invert
        />

        <div className="mt-14 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={(i % 4) * 80} direction="zoom">
              <button
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-lg"
                aria-label={`Enlarge: ${g.alt}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className={cn(
                    "w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110",
                    g.tall ? "aspect-[3/4]" : "aspect-square",
                  )}
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 animate-in fade-in"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close preview"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={gallery[open]!.src}
            alt={gallery[open]!.alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain animate-in zoom-in-95"
          />
        </div>
      )}
    </section>
  );
}

/* ------------------------------ before / after ---------------------------- */

function BeforeAfterSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionHead
            eyebrow="Transformation"
            title="The same room. A different life."
            body="Drag the handle to see what a considered surface choice does to a space — the difference is rarely the furniture."
          />
          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap gap-3">
              <GoldButton to="/calculator">Estimate my material</GoldButton>
              <GhostButton to="/products" onLight>
                Browse finishes
              </GhostButton>
            </div>
          </Reveal>
        </div>
        <Reveal direction="right">
          <BeforeAfter
            before={tilesImg}
            after={livingImg}
            beforeAlt="Plain untiled room before renovation"
            afterAlt="Finished living room with premium marble-finish floor tiles"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- why choose ------------------------------- */

function WhyChooseUs() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Why choose us"
          title="Twenty years of getting it right."
          center
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div className="group h-full bg-background p-7 transition-colors duration-500 hover:bg-ink">
                <span className="font-display text-2xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg text-foreground transition-colors duration-500 group-hover:text-ink-foreground">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-ink-foreground/70">
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- brands --------------------------------- */

function Brands() {
  return (
    <section className="border-y border-border bg-background py-16">
      <p className="container mx-auto mb-9 px-4 text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        Brands available in the showroom
      </p>
      <Marquee slow>
        {brands.map((b) => (
          <span
            key={b}
            className="font-display text-2xl text-muted-foreground transition-colors duration-500 hover:text-gold sm:text-3xl"
          >
            {b}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ------------------------------ testimonials ------------------------------ */

function Testimonials() {
  return (
    <section className="overflow-hidden bg-ink py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="Testimonials" title="Trusted across Varanasi." invert center />
      </div>
      <Marquee className="mt-14">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="glass-dark w-[19rem] shrink-0 rounded-lg p-7 transition-transform duration-500 hover:-translate-y-1 sm:w-[23rem]"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <blockquote className="mt-5 text-sm leading-relaxed text-white/85">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/20 font-display text-base text-gold">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm text-white">{t.name}</span>
                <span className="block text-xs text-white/55">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}

/* -------------------------------- showroom -------------------------------- */

function ShowroomSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionHead
            eyebrow="Visit the showroom"
            title="See the surface before you commit."
            body="Full-size display panels, granite slabs standing upright, and bathware you can actually touch. Free parking right outside."
          />

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Sankar Nagar Colony, 661/2, near Jio Tower, Ram Nagar Industrial
                Area, Tengra mod, Ramnagar, Varanasi, Uttar Pradesh 221008
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <p className="text-sm text-muted-foreground">
                Open from <span className="text-foreground">9:00 AM</span> · Free
                customer parking available
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a href={`tel:${PHONE}`} className="underline-sweep text-sm text-foreground">
                +91 94513 65107
              </a>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <GoldButton href={`tel:${PHONE}`}>Call now</GoldButton>
            <GhostButton href={MAPS_LINK} onLight external>
              <Navigation className="h-4 w-4" />
              Directions
            </GhostButton>
            <GhostButton href={MAPS_LINK} onLight external>
              Open in Google Maps
            </GhostButton>
          </div>
        </div>

        <Reveal direction="right">
          <div className="overflow-hidden rounded-lg border border-border shadow-luxe">
            <iframe
              title="Hemant Tiles and Building Materials on Google Maps"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[26rem] w-full lg:h-full lg:min-h-[30rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- faq ---------------------------------- */

function Faq() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="Good to know" title="Frequently asked." center />
        <Reveal delay={120} className="mx-auto mt-14 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-body text-base text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- final cta ------------------------------- */

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-28 sm:py-36">
      <Parallax speed={0.3} scale={1.1} className="absolute inset-0 -z-10 opacity-35">
        <img
          src={livingImg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-ink/70" />

      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="eyebrow text-gold">Let's begin</span>
        </Reveal>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-[1.08] text-white sm:text-6xl">
          <SplitHeading text="Tell us about your space." />
        </h2>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <GoldButton to="/contact">Get a free quote</GoldButton>
            <GhostButton
              href={whatsappLink(
                "Hello, I visited your website and I would like to know more about your products.",
              )}
              external
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </GhostButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- page ----------------------------------- */

function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            name: "Hemant Tiles and Building Materials",
            image: "https://hemanttilesandbuildingmaterial.lovable.app/og.jpg",
            telephone: "+91 94513 65107",
            email: "hemantsingh1965@gmail.com",
            url: "https://hemanttilesandbuildingmaterial.lovable.app",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Sankar Nagar Colony, 661/2, near Jio Tower, Ram Nagar Industrial Area, Tengra mod",
              addressLocality: "Ramnagar, Varanasi",
              addressRegion: "Uttar Pradesh",
              postalCode: "221008",
              addressCountry: "IN",
            },
            openingHours: "Mo-Su 09:00-20:00",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "128",
            },
          }),
        }}
      />
      <Hero />
      <StoryStatements />
      <LegacyTimeline />
      <MaterialsMatter />
      <RoomExplorer />
      <CtaBanner
        eyebrow="Build your dream home"
        title="Every great room starts with the right surface"
        body="Tell us the room and we'll shortlist tiles, granite and bathware that work together."
        whatsappMessage="Hello, I am planning a room and would like help choosing surfaces."
        primaryLabel="Get Instant Quote"
        secondary={{ to: "/products", label: "Browse collections" }}
      />
      <CollectionsStory />
      <CtaBanner
        tone="light"
        eyebrow="Visit our showroom"
        title="See the finish in full size before you decide"
        body="Walk-in displays of every collection, open daily from 9:00 AM in Ramnagar, Varanasi."
        whatsappMessage="Hello, I would like to visit your showroom. Please share directions and timings."
        primaryLabel="Book a Visit"
        secondary={{ to: "/visualizer", label: "Try the Room Visualizer" }}
      />
      <SpaceJourney />
      <Categories />
      <BrowseBySpace />
      <InspirationGallery />
      <BeforeAfterSection />
      <CtaBanner
        eyebrow="Book free consultation"
        title="Get an expert plan for your project — free"
        body="Send your floor plan or room photo and our team will estimate quantity, cost and delivery."
        whatsappMessage="Hello, I would like a free consultation. I will send my floor plan / room photo."
        primaryLabel="Book Free Consultation"
        secondary={{ to: "/calculator", label: "Calculate quantity" }}
      />
      <WhyChooseUs />
      <Brands />
      <Testimonials />
      <ShowroomMap />
      <ShowroomSection />
      <Faq />
      <FinalCta />
    </>
  );
}
