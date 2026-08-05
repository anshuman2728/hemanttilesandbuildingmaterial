import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Layers,
  MapPin,
  Navigation,
  Phone,
  Quote,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Marquee, Reveal, SplitHeading } from "@/components/motion";
import { BeforeAfter } from "@/components/BeforeAfter";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/catalog";
import { BUSINESS } from "@/lib/business";
import { whatsappLink, WhatsAppIcon } from "@/lib/whatsapp";
import {
  brandWall,
  projectCategories,
  projects,
  reviews,
  trustPillars,
  type ProjectCategory,
} from "@/lib/trust";
import tilesImg from "@/assets/tiles.jpg";
import livingImg from "@/assets/space-living.jpg";

/* ------------------------------- shared bits ------------------------------- */

function Head({
  eyebrow,
  title,
  body,
  invert,
  center,
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
          "mt-5 font-display text-3xl leading-[1.12] sm:text-5xl",
          invert ? "text-white" : "text-foreground",
        )}
      >
        <SplitHeading text={title} />
      </h2>
      {body && (
        <Reveal delay={150}>
          <p
            className={cn(
              "mt-5 text-sm leading-relaxed sm:text-base",
              invert ? "text-white/65" : "text-muted-foreground",
            )}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------ project gallery ---------------------------- */

export function ProjectGallery() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [open, setOpen] = useState<number | null>(null);

  const shown = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="bg-ink py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Head
          eyebrow="Project gallery"
          title="Rooms we have surfaced."
          body="Bathrooms, kitchens, hotels, homes and commercial floors finished with material from our showroom."
          invert
        />

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap gap-2">
            {(["All", ...projectCategories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-300",
                  filter === c
                    ? "border-gold bg-gold text-ink"
                    : "border-white/20 text-white/65 hover:border-gold/60 hover:text-white",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {shown.map((p) => {
            const index = projects.indexOf(p);
            return (
              <Reveal key={p.title} direction="zoom">
                <button
                  onClick={() => setOpen(index)}
                  className="group relative block w-full overflow-hidden rounded-lg text-left"
                  aria-label={`Enlarge: ${p.title}`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className={cn(
                      "w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110",
                      p.tall ? "aspect-[3/4]" : "aspect-square",
                    )}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gold">
                      {p.category}
                    </span>
                    <span className="mt-1 block font-display text-lg leading-tight text-white">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-xs text-white/60">
                      {p.material}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* before / after */}
        <div className="mt-20 grid gap-12 border-t border-white/10 pt-20 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Head
              eyebrow="Before / after"
              title="The same room. A different life."
              body="Drag the handle to see what a considered surface choice does to a space."
              invert
            />
            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/calculator"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-ink transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Estimate my material
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  Browse finishes
                </Link>
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
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 animate-in fade-in"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Project preview"
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close preview"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <figure className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={projects[open]!.src}
              alt={projects[open]!.alt}
              className="max-h-[76vh] w-full rounded-lg object-contain animate-in zoom-in-95"
            />
            <figcaption className="mt-4 text-center">
              <span className="font-display text-xl text-white">
                {projects[open]!.title}
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-white/55">
                {projects[open]!.location} · {projects[open]!.material}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

/* ------------------------------- trust pillars ----------------------------- */

const pillarIcons = {
  shield: ShieldCheck,
  truck: Truck,
  compass: Compass,
  wrench: Wrench,
  layers: Layers,
};

export function WhyChooseUsAnimated() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Head
          eyebrow="Why choose us"
          title="Five reasons Varanasi keeps coming back."
          center
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {trustPillars.map((p, i) => {
            const Icon = pillarIcons[p.icon];
            return (
              <Reveal key={p.title} delay={i * 90}>
                <article className="group relative h-full overflow-hidden rounded-lg border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-luxe">
                  <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-xl leading-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                  <span className="mt-5 block text-[10px] uppercase tracking-[0.2em] text-gold">
                    {p.stat}
                  </span>
                  <span className="absolute inset-x-7 bottom-0 h-px scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- brand wall ------------------------------ */

export function BrandWall() {
  const row = (items: typeof brandWall) =>
    items.map((b) => (
      <div
        key={b.name}
        className="group flex h-24 w-52 shrink-0 flex-col items-center justify-center rounded-lg border border-border bg-background px-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-luxe"
      >
        <span className="font-display text-2xl text-foreground transition-colors duration-500 group-hover:text-gold">
          {b.name}
        </span>
        <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {b.note}
        </span>
      </div>
    ));

  return (
    <section className="overflow-hidden border-y border-border bg-secondary py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Head
          eyebrow="Brands we stock"
          title="Authorised, sealed, warranty-backed."
          center
        />
      </div>
      <Marquee className="mt-12">{row(brandWall)}</Marquee>
      <Marquee className="mt-4" reverse slow>
        {row([...brandWall].reverse())}
      </Marquee>
    </section>
  );
}

/* -------------------------------- testimonials ----------------------------- */

export function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % reviews.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + reviews.length) % reviews.length);

  return (
    <section
      className="overflow-hidden bg-ink py-24 sm:py-32"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Head
          eyebrow="Customer reviews"
          title="Rated 4.9 by 128 customers."
          invert
          center
        />

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviews.map((r) => (
                <figure key={r.name} className="w-full shrink-0 px-1">
                  <div className="glass-dark grid gap-8 rounded-lg p-7 sm:grid-cols-[9rem_1fr] sm:p-10">
                    <img
                      src={r.photo}
                      alt={r.name}
                      loading="lazy"
                      width={640}
                      height={640}
                      className="h-32 w-32 rounded-lg object-cover sm:h-36 sm:w-36"
                    />
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-0.5">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                          ))}
                        </div>
                        <span className="text-xs text-white/45">{r.when}</span>
                      </div>
                      <Quote className="mt-4 h-6 w-6 text-gold/60" />
                      <blockquote className="mt-2 text-base leading-relaxed text-white/85">
                        {r.quote}
                      </blockquote>
                      <figcaption className="mt-6">
                        <span className="block font-display text-lg text-white">
                          {r.name}
                        </span>
                        <span className="block text-xs uppercase tracking-[0.18em] text-white/50">
                          {r.role}
                        </span>
                      </figcaption>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => setIndex(i)}
                  aria-label={`Show review ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === index ? "w-8 bg-gold" : "w-3 bg-white/25 hover:bg-white/50",
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ faq ---------------------------------- */

export function FaqSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Head eyebrow="Good to know" title="Frequently asked." center />
        <Reveal delay={120} className="mx-auto mt-14 max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="overflow-hidden rounded-lg border border-border bg-secondary px-5 transition-colors duration-300 data-[state=open]:border-gold/40"
              >
                <AccordionTrigger className="text-left font-body text-base text-foreground hover:no-underline [&[data-state=open]>svg]:text-gold">
                  <span className="flex items-start gap-4">
                    <span className="font-display text-sm text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-10 text-sm leading-relaxed text-muted-foreground">
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

/* ---------------------------------- contact -------------------------------- */

export function LuxuryContact() {
  return (
    <section id="contact" className="relative bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Head
          eyebrow="Visit or call"
          title="Come see the surface in person."
          body="Full-size display panels, granite slabs standing upright and bathware you can actually touch — with free parking right outside."
        />

        <div className="relative mt-14 lg:mt-20">
          <div className="overflow-hidden rounded-lg border border-border shadow-luxe">
            <iframe
              title="Hemant Tiles and Building Materials on Google Maps"
              src={BUSINESS.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[28rem] w-full lg:h-[34rem]"
            />
          </div>

          <Reveal direction="up">
            <div className="mx-auto -mt-10 w-full rounded-lg border border-border bg-background p-7 shadow-luxe sm:p-9 lg:absolute lg:right-8 lg:top-1/2 lg:mt-0 lg:max-w-md lg:-translate-y-1/2">
              <span className="eyebrow text-gold">Showroom</span>
              <h3 className="mt-4 font-display text-2xl leading-tight text-foreground">
                {BUSINESS.name}
              </h3>

              <ul className="mt-7 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="leading-relaxed text-muted-foreground">
                    {BUSINESS.address}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-muted-foreground">
                    {BUSINESS.hours.map((h) => (
                      <span key={h.day} className="block">
                        <span className="text-foreground">{h.day}</span> · {h.time}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <a
                    href={BUSINESS.phoneHref}
                    className="underline-sweep text-foreground"
                  >
                    {BUSINESS.phone}
                  </a>
                </li>
              </ul>

              <div className="mt-8 grid gap-3">
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-ink transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4" />
                  Call now
                </a>
                <a
                  href={whatsappLink(
                    "Hello, I would like to visit your showroom. Please share directions and timings.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp us
                </a>
                <a
                  href={BUSINESS.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
                >
                  <Navigation className="h-4 w-4" />
                  Get directions
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
