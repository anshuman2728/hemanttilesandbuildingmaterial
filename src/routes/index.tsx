import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Clock, Calculator, Sparkles, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";
import { products } from "@/lib/products";
import { Reveal, ScrollProgress } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Hemant Tiles and Building Materials — Tengdamod, Varanasi",
      },
      {
        name: "description",
        content:
          "Premium tiles, granite, and washroom appliances in Varanasi. Visit Hemant Tiles and Building Materials for quality products and expert guidance.",
      },
      {
        property: "og:title",
        content: "Hemant Tiles and Building Materials — Tengdamod, Varanasi",
      },
      {
        property: "og:description",
        content:
          "Premium tiles, granite, and washroom appliances in Varanasi. Visit Hemant Tiles and Building Materials for quality products and expert guidance.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const chapters = [
  {
    no: "01",
    title: "Start with the surface",
    body: "Floors set the mood of a home. We stock vitrified, ceramic, and wooden-finish tiles in sizes from 1×1 to 2×4 feet — glossy, matte, or anti-skid.",
    icon: Sparkles,
    to: "/products/tiles",
    cta: "See the tile range",
  },
  {
    no: "02",
    title: "Add character with granite",
    body: "Kitchen platforms, staircases, thresholds and temple tops. Hand-picked granite slabs with consistent grain, polished edges and honest per-square-foot pricing.",
    icon: ShieldCheck,
    to: "/products/granite",
    cta: "See granite slabs",
  },
  {
    no: "03",
    title: "Finish the washroom",
    body: "Sanitaryware, CP fittings, showers and basins from trusted brands — matched to your tiles so the whole room reads as one design.",
    icon: Truck,
    to: "/products/washroom",
    cta: "See washroom range",
  },
];

function HomePage() {
  return (
    <div>
      <ScrollProgress />

      {/* Chapter 00 — hero */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <Reveal direction="left">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Quality building materials in Varanasi
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Build beautiful spaces with Hemant Tiles
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Trusted supplier of premium tiles, granite, and washroom
                appliances in Tengdamod, Varanasi. We help homeowners, builders,
                and architects find the right finish.
              </p>
            </Reveal>
            <Reveal direction="up" delay={120}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/products">
                    Explore products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Get a quote</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <a href="tel:+919451365107" className="flex items-center gap-2 hover:text-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+91 94513 65107</span>
                </a>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Open daily from 9:00 AM</span>
                </div>
              </div>
              <div className="mt-6 inline-flex items-center gap-3 rounded-xl border-2 border-primary/20 bg-primary/5 px-5 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-foreground leading-tight">
                    We're Open from 9:00 AM
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Monday – Saturday · Walk-ins welcome
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2">
            <Reveal direction="zoom">
              <img
                src={heroImg}
                alt="Modern tile showroom with granite and ceramic displays"
                width={1024}
                height={1024}
                className="aspect-square rounded-2xl object-cover shadow-lg"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story mode — sticky chapters */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto grid gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[280px_1fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Reveal direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                The showroom story
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Three steps to a finished room
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Scroll through how we take a project from bare floor to
                handover — and pick up what you need at each stage.
              </p>
            </Reveal>
          </div>

          <div className="space-y-8 lg:space-y-16">
            {chapters.map((chapter, i) => {
              const Icon = chapter.icon;
              return (
                <Reveal
                  key={chapter.no}
                  direction={i % 2 === 0 ? "right" : "left"}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl sm:p-8">
                    <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-bold leading-none text-primary/5 transition-transform duration-700 group-hover:-translate-y-1 sm:text-[9rem]">
                      {chapter.no}
                    </span>
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 font-display text-2xl font-semibold text-card-foreground">
                        {chapter.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-muted-foreground">
                        {chapter.body}
                      </p>
                      <Button asChild variant="link" className="mt-3 h-auto p-0">
                        <Link to={chapter.to}>
                          {chapter.cta}
                          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { value: "3", label: "Product categories under one roof" },
            { value: "9 AM", label: "Doors open, Monday to Saturday" },
            { value: "₹32+", label: "Tiles starting per sq. ft." },
          ].map((stat, i) => (
            <Reveal key={stat.label} direction="up" delay={i * 120}>
              <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                <p className="font-display text-4xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="mb-10 text-center">
              <h2 className="font-display text-3xl font-bold text-foreground">
                Our Product Categories
              </h2>
              <p className="mt-2 text-muted-foreground">
                Everything you need for flooring, walls, and bathrooms.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.id} direction="up" delay={i * 120}>
                <div className="group h-full rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      width={400}
                      height={300}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-display text-xl font-semibold text-card-foreground">
                      {product.shortTitle}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                    <Button asChild variant="link" className="mt-2 h-auto p-0">
                      <Link to="/products">
                        Learn more
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Calculator className="h-7 w-7" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Not sure how many tiles you need?
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Our calculator estimates tiles, boxes, adhesive, grout and
                  total cost — including cutting wastage.
                </p>
              </div>
            </div>
            <Button asChild size="lg">
              <Link to="/calculator">
                Open calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <Reveal direction="zoom">
          <div className="rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 lg:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold">
                Ready to start your project?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Visit our store in Ramnagar, Varanasi, or send us an inquiry and
                we will get back to you.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/contact">Send an inquiry</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link to="/products">Browse products</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
