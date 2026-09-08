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
import { brandWall, reviews, trustPillars } from "@/lib/trust";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";
import { catalogItems } from "@/lib/catalog-items";

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
          "display-section mt-5",
          invert ? "text-white" : "text-foreground",
        )}
      >
        <SplitHeading text={title} />
      </h2>
      {body && (
        <Reveal delay={150}>
          <p
            className={cn(
              "lede mt-6",
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

const itemName = (id: string) =>
  catalogItems.find((i) => i.id === id)?.name ?? id;

function GetThisLook({ project }: { project: Project }) {
  const message = `Hi, I like the "${project.name}" project (${project.type}, ${project.location}) on your website. I would like the same look — please share products and prices.`;
  return (
    <div className="mt-10 border-t border-white/10 pt-8">
      <span className="eyebrow text-gold">Get this look</span>
      <p className="lede mt-3 text-white/65">
        Every surface on this project is available from our showroom.
      </p>
      <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {project.products.map((p) => (
          <li key={p.role + p.itemId}>
            <Link
              to="/products/item/$itemId"
              params={{ itemId: p.itemId }}
              className="group flex items-center justify-between gap-4 py-4"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gold">
                  {p.role}
                </span>
                <span className="mt-1 block font-display text-lg text-white">
                  {itemName(p.itemId)}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-gold" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Request this look
        </a>
        <Link to="/products" className="btn btn-secondary-dark">
          Browse all materials
        </Link>
      </div>
    </div>
  );
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[90] overflow-y-auto bg-ink/97 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <button
        onClick={onClose}
        aria-label="Close project"
        className="fixed right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-sm border border-white/25 text-white transition-colors hover:border-gold hover:text-gold"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="mx-auto max-w-4xl px-4 pb-24 pt-16 sm:px-6">
        <img
          src={project.hero}
          alt={project.heroAlt}
          className="w-full rounded-sm object-cover animate-in zoom-in-95"
        />

        <span className="eyebrow mt-8 block text-gold">{project.type}</span>
        <h3 className="display-sub mt-3 text-white">{project.name}</h3>
        <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/55">
          <MapPin className="h-3.5 w-3.5" />
          {project.location}
        </p>
        <p className="lede mt-6 text-white/70">{project.story}</p>

        {project.beforeAfter && (
          <div className="mt-12">
            <span className="eyebrow text-gold">Before / after</span>
            <div className="mt-4">
              <BeforeAfter {...project.beforeAfter} />
            </div>
          </div>
        )}

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {project.gallery.map((g) => (
            <img
              key={g.src}
              src={g.src}
              alt={g.alt}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-sm object-cover"
            />
          ))}
        </div>

        <div className="mt-12">
          <span className="eyebrow text-gold">Materials used</span>
          <ul className="mt-4 space-y-2">
            {project.materials.map((m) => (
              <li key={m} className="flex gap-3 text-sm text-white/70">
                <Layers className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                {m}
              </li>
            ))}
          </ul>
        </div>

        <GetThisLook project={project} />
      </div>
    </div>
  );
}

export function ProjectGallery() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [open, setOpen] = useState<string | null>(null);

  const shown = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  const current = open ? projects.find((p) => p.id === open) : undefined;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!current) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [current]);

  return (
    <section id="projects" className="bg-ink py-28 sm:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Head
          eyebrow="Portfolio"
          title="Spaces We've Transformed"
          body="Real projects. Real materials. Real spaces."
          invert
        />

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap gap-2">
            {(["All", ...projectCategories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-500",
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <Reveal key={p.id}>
              <button
                onClick={() => setOpen(p.id)}
                className="group block w-full text-left"
                aria-label={`Open project: ${p.name}`}
              >
                <span className="block overflow-hidden rounded-sm">
                  <img
                    src={p.hero}
                    alt={p.heroAlt}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105",
                      p.tall ? "aspect-[3/4]" : "aspect-[4/3]",
                    )}
                  />
                </span>
                <span className="mt-5 block text-[10px] uppercase tracking-[0.2em] text-gold">
                  {p.type}
                </span>
                <span className="mt-2 block font-display text-2xl leading-tight text-white">
                  {p.name}
                </span>
                <span className="mt-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-white/45">
                  <MapPin className="h-3 w-3" />
                  {p.location}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-white/60">
                  {p.description}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70 transition-colors group-hover:text-gold">
                  View project
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {current && (
        <ProjectDetail project={current} onClose={() => setOpen(null)} />
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
    <section className="bg-secondary py-28 sm:py-40">
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
      <Marquee className="mt-4" slow>
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
      className="overflow-hidden bg-ink py-28 sm:py-40"
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
                      decoding="async"
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
    <section className="bg-background py-28 sm:py-40">
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
    <section id="contact" className="relative bg-secondary py-28 sm:py-40">
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
              className="h-[26rem] w-full lg:h-[40rem]"
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
                  className="btn btn-primary"
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
                  className="btn btn-secondary"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp us
                </a>
                <a
                  href={BUSINESS.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-utility"
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
