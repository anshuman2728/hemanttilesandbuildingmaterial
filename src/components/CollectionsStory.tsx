import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Reveal, SplitHeading } from "@/components/motion";
import {
  chapters,
  collectionById,
  collectionValues,
  collections,
  facetLabels,
  facets,
  type Collection,
  type FacetKey,
} from "@/lib/story";
import { whatsappLink, WhatsAppIcon } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const facetOrder: FacetKey[] = [
  "material",
  "finish",
  "brand",
  "color",
  "texture",
  "price",
  "size",
  "usage",
  "room",
];

/* ------------------------------- quick view ------------------------------- */

function QuickView({
  item,
  onClose,
  onOpen,
}: {
  item: Collection;
  onClose: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center bg-ink/90 p-0 sm:items-center sm:p-6 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} quick view`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-background shadow-luxe animate-in slide-in-from-bottom-6 sm:rounded-lg sm:zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            width={1280}
            height={1600}
            className="h-64 w-full object-cover md:h-full"
          />

          <div className="p-7 sm:p-9">
            <span className="eyebrow text-gold">{item.material}</span>
            <h3 className="mt-3 font-display text-3xl text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.tagline}
            </p>
            <p className="mt-5 text-sm text-foreground">
              Starting from{" "}
              <span className="font-display text-2xl text-gold">
                {item.priceFrom}
              </span>
            </p>

            <div className="mt-7">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                Specifications
              </p>
              <dl className="mt-3 space-y-2.5">
                {item.specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex gap-4 border-b border-border pb-2.5 text-sm last:border-0"
                  >
                    <dt className="w-32 shrink-0 text-muted-foreground">
                      {s.label}
                    </dt>
                    <dd className="text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-7">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                Recommended rooms
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.rooms.map((r) => (
                  <li
                    key={r}
                    className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                Related products
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.related.map((id) => {
                  const rel = collectionById(id);
                  if (!rel) return null;
                  return (
                    <li key={id}>
                      <button
                        onClick={() => onOpen(id)}
                        className="group flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 text-xs text-foreground transition-colors hover:border-gold"
                      >
                        <img
                          src={rel.image}
                          alt=""
                          aria-hidden="true"
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        {rel.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Link
                to="/products/$productId"
                params={{ productId: item.productId }}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-all duration-500 hover:gap-3"
              >
                View full collection
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink(
                  `Hello, I would like details and rates for ${item.title} (from ${item.priceFrom}).`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "#25D366" }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Ask price
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ chapter story ----------------------------- */

export function MaterialChapters({
  onQuickView,
}: {
  onQuickView: (id: string) => void;
}) {
  return (
    <div id="chapters">
      {chapters.map((ch, i) => (
        <section
          key={ch.id}
          id={ch.id}
          className={cn(
            "overflow-hidden py-28 sm:py-40",
            i % 2 === 0 ? "bg-background" : "bg-secondary",
          )}
        >
          <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <Reveal
              direction={i % 2 === 0 ? "left" : "right"}
              className={cn(i % 2 === 1 && "lg:order-2")}
            >
              <div className="relative overflow-hidden rounded-lg shadow-luxe">
                <img
                  src={ch.image}
                  alt={`${ch.title} collection`}
                  loading="lazy"
                  decoding="async"
                  width={1280}
                  height={1600}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-105"
                />
                <span className="absolute left-5 top-5 font-display text-5xl text-white/70">
                  {ch.index}
                </span>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="eyebrow text-gold">{ch.eyebrow}</span>
              </Reveal>
              <h2 className="mt-4 text-3xl leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
                <SplitHeading text={ch.title} />
              </h2>
              <Reveal delay={120}>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                  {ch.body}
                </p>
              </Reveal>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {ch.collectionIds.map((id, j) => {
                  const c = collectionById(id);
                  if (!c) return null;
                  return (
                    <Reveal key={id} delay={j * 80}>
                      <button
                        onClick={() => onQuickView(id)}
                        className="group flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-all duration-500 hover:-translate-y-0.5 hover:border-gold"
                      >
                        <img
                          src={c.image}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          className="h-14 w-14 shrink-0 rounded-md object-cover"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-sm text-foreground">
                            {c.title}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            From {c.priceFrom}
                          </span>
                        </span>
                      </button>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal delay={200}>
                <Link
                  to="/products/$productId"
                  params={{ productId: ch.productId }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-all duration-500 hover:gap-4"
                >
                  Explore {ch.title}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

/* --------------------------- collections + filters ------------------------ */

export function CollectionsExplorer({
  onQuickView,
}: {
  onQuickView: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Partial<Record<FacetKey, string[]>>>({});
  const [showFilters, setShowFilters] = useState(false);

  const toggle = (key: FacetKey, value: string) =>
    setActive((prev) => {
      const list = prev[key] ?? [];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...prev, [key]: next };
    });

  const activeCount = Object.values(active).reduce(
    (n, list) => n + (list?.length ?? 0),
    0,
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return collections.filter((c) => {
      if (
        q &&
        ![c.title, c.tagline, c.material, ...c.brands, ...c.rooms]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
        return false;
      return facetOrder.every((key) => {
        const chosen = active[key];
        if (!chosen || chosen.length === 0) return true;
        const values = collectionValues(c, key);
        return chosen.some((v) => values.includes(v));
      });
    });
  }, [query, active]);

  return (
    <section id="collections-explorer" className="bg-ink py-28 sm:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow text-gold">Premium collections</span>
          </Reveal>
          <h2 className="mt-5 text-3xl leading-[1.1] text-ink-foreground sm:text-4xl md:text-5xl">
            <SplitHeading text="Nine collections. One showroom." />
          </h2>
          <Reveal delay={120}>
            <p className="mt-5 text-base leading-relaxed text-ink-foreground/70">
              Search or filter by material, finish, brand, colour, texture, price,
              size, usage and room.
            </p>
          </Reveal>
        </div>

        {/* search + filter toggle */}
        <Reveal delay={140}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <label className="glass-dark flex min-w-0 flex-1 items-center gap-3 rounded-full px-5 py-3">
              <Search className="h-4 w-4 shrink-0 text-gold" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tiles, granite, faucets, Kajaria…"
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
                aria-label="Search collections"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className="rounded-full border border-white/30 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:bg-white hover:text-ink"
            >
              {showFilters ? "Hide filters" : "Filters"}
              {activeCount > 0 && ` (${activeCount})`}
            </button>

            {activeCount > 0 && (
              <button
                onClick={() => setActive({})}
                className="text-xs uppercase tracking-[0.2em] text-gold"
              >
                Reset
              </button>
            )}
          </div>
        </Reveal>

        {/* facets */}
        <div
          className={cn(
            "grid overflow-hidden transition-all duration-700",
            showFilters ? "mt-8 max-h-[80rem] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="grid gap-7 rounded-lg border border-white/10 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {facetOrder.map((key) => (
              <div key={key}>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                  {facetLabels[key]}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {facets[key].map((value) => {
                    const on = (active[key] ?? []).includes(value);
                    return (
                      <li key={value}>
                        <button
                          onClick={() => toggle(key, value)}
                          aria-pressed={on}
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs transition-colors duration-300",
                            on
                              ? "border-gold bg-gold text-ink"
                              : "border-white/20 text-white/70 hover:border-gold hover:text-white",
                          )}
                        >
                          {value}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-white/50">
          {results.length} collection{results.length === 1 ? "" : "s"}
        </p>

        {/* cards */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 80} direction="zoom">
              <article className="group relative h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={1600}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent" />
                  <button
                    onClick={() => onQuickView(c.id)}
                    className="absolute inset-x-0 bottom-0 translate-y-full bg-gold py-3 text-xs uppercase tracking-[0.2em] text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Quick view
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl text-white">{c.title}</h3>
                    <span className="shrink-0 text-xs text-gold">
                      {c.priceBand}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {c.tagline}
                  </p>
                  <p className="mt-4 text-sm text-white/80">
                    From <span className="text-gold">{c.priceFrom}</span>
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {[c.material, ...c.finishes.slice(0, 2), c.rooms[0]!].map(
                      (t) => (
                        <li
                          key={t}
                          className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/65"
                        >
                          {t}
                        </li>
                      ),
                    )}
                  </ul>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => onQuickView(c.id)}
                      className="rounded-full border border-gold/60 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold transition-colors duration-500 hover:bg-gold hover:text-ink"
                    >
                      Quick view
                    </button>
                    <Link
                      to="/products/$productId"
                      params={{ productId: c.productId }}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                    >
                      Details
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {results.length === 0 && (
          <p className="mt-10 text-center text-sm text-white/60">
            Nothing matches those filters — reset and try a wider combination.
          </p>
        )}
      </div>
    </section>
  );
}

/** Wires the explorer, chapters and shared quick-view modal together. */
export function CollectionsStory() {
  const [quick, setQuick] = useState<string | null>(null);
  const item = quick ? collectionById(quick) : undefined;

  return (
    <>
      <CollectionsExplorer onQuickView={setQuick} />
      <MaterialChapters onQuickView={setQuick} />
      {item && (
        <QuickView
          item={item}
          onClose={() => setQuick(null)}
          onOpen={(id) => setQuick(id)}
        />
      )}
    </>
  );
}
