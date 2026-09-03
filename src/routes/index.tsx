import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Calculator, Ruler, Sparkles } from "lucide-react";
import {
  Reveal,
  SplitHeading,
  useScrollProgress,
} from "@/components/motion";
import { categoryGroups, faqs } from "@/lib/catalog";
import { LegacyTimeline, RoomExplorer } from "@/components/story-sections";
import { CollectionsStory } from "@/components/CollectionsStory";
import {
  BrandWall,
  FaqSection,
  LuxuryContact,
  ProjectGallery,
  ReviewsCarousel,
  WhyChooseUsAnimated,
} from "@/components/trust-sections";
import { whatsappLink, WhatsAppIcon } from "@/lib/whatsapp";
import heroImg from "@/assets/hero-cinematic.jpg";
import calcImg from "@/assets/floor-tiles.jpg";
import { faqSchema, localBusinessSchema, websiteSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

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
      {
        property: "og:url",
        content: "https://hemanttilesandbuildingmaterial.lovable.app/",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://hemanttilesandbuildingmaterial.lovable.app/" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessSchema),
      },
      { type: "application/ld+json", children: JSON.stringify(websiteSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faqs)) },
    ],
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
        <span className="eyebrow text-gold">{eyebrow}</span>
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

/* --------------------------------- 1. hero -------------------------------- */

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
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/45 to-ink/95" />

      <div className="container mx-auto flex min-h-[100svh] flex-col justify-center px-4 py-32 sm:px-6 lg:px-8">
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
            <GoldButton to="/products">Explore Collection</GoldButton>
            <GhostButton to="/contact">Get Quote</GhostButton>
          </div>
        </Reveal>
      </div>

      {/* scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-white/20">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-6 bg-gold motion-reduce:animate-none" />
        </span>
      </div>
    </section>
  );
}

/* ---------------------------- 4. categories ------------------------------- */

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
                className="group relative block h-full overflow-hidden rounded-lg bg-ink shadow-luxe transition-transform duration-500 hover:-translate-y-1"
              >
                <div className={cn("overflow-hidden", i === 0 ? "aspect-[16/9]" : "aspect-[4/3]")}>
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-90" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl text-white sm:text-3xl">{c.title}</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/70">{c.blurb}</p>
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

/* ------------------------ 7. smart tile calculator ------------------------ */

const calcPoints = [
  {
    icon: Ruler,
    title: "Room-accurate quantities",
    body: "Enter room size, tile size and pattern — we handle wastage, skirting and walls.",
  },
  {
    icon: Calculator,
    title: "Boxes, adhesive & grout",
    body: "Get exact box counts plus adhesive and grout estimates before you order.",
  },
  {
    icon: Sparkles,
    title: "Instant cost estimate",
    body: "See a live budget range and send the full estimate to us on WhatsApp.",
  },
];

function SmartCalculator() {
  return (
    <section id="calculator" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionHead
            eyebrow="Smart tile calculator"
            title="Know exactly how much you need."
            body="A free estimator built for real rooms — not guesswork at the counter."
          />

          <ul className="mt-10 space-y-6">
            {calcPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <li className="flex gap-4">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base text-foreground">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap gap-3">
              <GoldButton to="/calculator">Open Calculator</GoldButton>
              <GhostButton
                onLight
                external
                href={whatsappLink(
                  "Hello, I need help estimating tile quantity for my room. Here are my measurements:",
                )}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Get Quote
              </GhostButton>
            </div>
          </Reveal>
        </div>

        <Reveal direction="right">
          <div className="overflow-hidden rounded-lg border border-border shadow-luxe">
            <img
              src={calcImg}
              alt="Large-format floor tiles laid in a finished room"
              loading="lazy"
              decoding="async"
              width={1280}
              height={960}
              className="h-full w-full object-cover"
            />
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
      <Hero />
      <LegacyTimeline />
      <RoomExplorer />
      <Categories />
      <CollectionsStory />
      <WhyChooseUsAnimated />
      <SmartCalculator />
      <ProjectGallery />
      <BrandWall />
      <ReviewsCarousel />
      <FaqSection />
      <LuxuryContact />
    </>
  );
}
