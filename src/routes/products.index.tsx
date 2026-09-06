import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bookmark,
  Check,
  Eye,
  Scale,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { products } from "@/lib/products";
import {
  catalogItems,
  facets,
  searchItems,
  type CatalogItem,
} from "@/lib/catalog-items";
import { WhatsAppIcon, whatsappLink } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Collections — Tiles, Granite & Bathware | Hemant Tiles" },
      {
        name: "description",
        content:
          "Browse tiles, granite and washroom appliances by room, material, finish, size and application. Showroom in Ramnagar, Varanasi.",
      },
      { property: "og:title", content: "Collections — Hemant Tiles and Building Materials" },
      {
        property: "og:description",
        content:
          "Search and filter our tile, granite and bathware ranges by room, finish, size and application.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/products` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/products` }],
  }),
  component: ProductsPage,
});

const SAVED_KEY = "htbm.saved";

type FilterKey =
  | "rooms"
  | "materials"
  | "brands"
  | "finishes"
  | "colors"
  | "sizes"
  | "applications"
  | "placements";

const filterGroups: { key: FilterKey; label: string; values: string[] }[] = [
  { key: "rooms", label: "Room", values: facets.rooms },
  { key: "materials", label: "Material", values: facets.materials },
  { key: "brands", label: "Brand", values: facets.brands },
  { key: "finishes", label: "Finish", values: facets.finishes },
  { key: "colors", label: "Colour", values: facets.colors },
  { key: "sizes", label: "Size", values: facets.sizes },
  { key: "applications", label: "Application", values: facets.applications },
  { key: "placements", label: "Indoor / Outdoor", values: facets.placements },
];

const suggestions = [
  "Bathroom tiles",
  "Granite",
  "Wood finish",
  "Glossy",
  "Matte",
  "600x1200",
  "Black",
];

const priceBands: { id: string; label: string; test: (v: number | null) => boolean }[] = [
  { id: "all", label: "Any", test: () => true },
  { id: "under-60", label: "Under ₹60", test: (v) => v !== null && v < 60 },
  { id: "60-120", label: "₹60 – ₹120", test: (v) => v !== null && v >= 60 && v <= 120 },
  { id: "above-120", label: "Above ₹120", test: (v) => v !== null && v > 120 },
  { id: "on-request", label: "On request", test: (v) => v === null },
];

function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = (id: string) =>
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });

  return { saved, toggle };
}

function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Record<FilterKey, string[]>>({
    rooms: [],
    materials: [],
    brands: [],
    finishes: [],
    colors: [],
    sizes: [],
    applications: [],
    placements: [],
  });
  const [priceBand, setPriceBand] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [quickView, setQuickView] = useState<CatalogItem | null>(null);
  const { saved, toggle: toggleSaved } = useSaved();
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const toggleFilter = (key: FilterKey, value: string) =>
    setSelected((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));

  const activeCount =
    Object.values(selected).reduce((n, arr) => n + arr.length, 0) +
    (priceBand === "all" ? 0 : 1) +
    (category === "all" ? 0 : 1);

  const visible = useMemo(() => {
    const band = priceBands.find((b) => b.id === priceBand) ?? priceBands[0];
    let list = catalogItems.filter((item) => {
      if (category !== "all" && item.categoryId !== category) return false;
      if (showSavedOnly && !saved.includes(item.id)) return false;
      if (!band.test(item.priceValue)) return false;
      if (selected.rooms.length && !item.rooms.some((r) => selected.rooms.includes(r)))
        return false;
      if (selected.materials.length && !selected.materials.includes(item.material))
        return false;
      if (selected.brands.length && !(item.brand && selected.brands.includes(item.brand)))
        return false;
      if (
        selected.finishes.length &&
        !item.finishes.some((f) => selected.finishes.includes(f))
      )
        return false;
      if (selected.colors.length && !item.colors.some((c) => selected.colors.includes(c)))
        return false;
      if (selected.sizes.length && !item.sizes.some((s) => selected.sizes.includes(s)))
        return false;
      if (
        selected.applications.length &&
        !item.applications.some((a) => selected.applications.includes(a))
      )
        return false;
      if (selected.placements.length && !selected.placements.includes(item.placement))
        return false;
      return true;
    });
    list = searchItems(list, query);
    return list;
  }, [category, priceBand, query, saved, selected, showSavedOnly]);

  const compareItems = catalogItems.filter((i) => compare.includes(i.id));

  const toggleCompare = (id: string) =>
    setCompare((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= 4
          ? prev
          : [...prev, id],
    );

  const reset = () => {
    setQuery("");
    setCategory("all");
    setPriceBand("all");
    setShowSavedOnly(false);
    setSelected({
      rooms: [],
      materials: [],
      brands: [],
      finishes: [],
      colors: [],
      sizes: [],
      applications: [],
      placements: [],
    });
  };

  return (
    <div className="pb-32">
      {/* Editorial header + search */}
      <section className="border-b border-border/70 bg-secondary/40">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            The Catalogue
          </p>
          <h1 className="display-section mt-4 max-w-3xl text-foreground">
            Surfaces, stone and bathware — curated room by room
          </h1>
          <p className="lede mt-6 max-w-2xl text-muted-foreground">
            Every range below is stocked at our Ramnagar showroom. Search by room,
            finish or size, compare options side by side, and send your shortlist
            to us for an exact quotation.
          </p>

          <div className="mt-10 max-w-2xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “bathroom tiles”, “granite”, “wood finish”, “600x1200”…"
                aria-label="Search the catalogue"
                className="h-14 w-full rounded-sm border border-foreground/15 bg-background pl-11 pr-11 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus-visible:border-gold"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-sm border border-foreground/12 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-gold/60 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category rail */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-border/70 py-6">
          {[{ id: "all", shortTitle: "All" }, ...products].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              aria-pressed={category === c.id}
              className={cn(
                "text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors",
                category === c.id
                  ? "text-foreground underline decoration-gold decoration-2 underline-offset-8"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {c.shortTitle}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowSavedOnly((v) => !v)}
              aria-pressed={showSavedOnly}
              className={cn(
                "inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors",
                showSavedOnly ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Bookmark className={cn("h-3.5 w-3.5", showSavedOnly && "fill-gold text-gold")} />
              Saved {saved.length > 0 && `(${saved.length})`}
            </button>
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters {activeCount > 0 && `(${activeCount})`}
            </button>
          </div>
        </div>

        {/* Filters */}
        {filtersOpen && (
          <div className="grid gap-8 border-b border-border/70 py-10 sm:grid-cols-2 lg:grid-cols-3">
            {filterGroups.map((group) => (
              <div key={group.key}>
                <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  {group.label}
                </h2>
                {group.values.length === 0 ? (
                  <p className="mt-3 text-sm text-muted-foreground/70">
                    Not recorded yet — we can add this to the catalogue later.
                  </p>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.values.map((value) => {
                      const on = selected[group.key].includes(value);
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => toggleFilter(group.key, value)}
                          aria-pressed={on}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-xs transition-colors",
                            on
                              ? "border-gold bg-gold/10 text-foreground"
                              : "border-foreground/12 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                          )}
                        >
                          {on && <Check className="h-3 w-3 text-gold" />}
                          {value}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <div>
              <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Price
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {priceBands.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setPriceBand(b.id)}
                    aria-pressed={priceBand === b.id}
                    className={cn(
                      "rounded-sm border px-3 py-1.5 text-xs transition-colors",
                      priceBand === b.id
                        ? "border-gold bg-gold/10 text-foreground"
                        : "border-foreground/12 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                    )}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground/70">
                Indicative showroom rates. Final price depends on brand, quantity
                and finish.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 py-8">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {visible.length} {visible.length === 1 ? "product" : "products"} shown
          </p>
          {(activeCount > 0 || query || showSavedOnly) && (
            <button
              type="button"
              onClick={reset}
              className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="border border-dashed border-border px-8 py-20 text-center">
            <p className="lede text-muted-foreground">
              Nothing matches that combination yet. Try a broader search, or ask
              us on WhatsApp — much of the showroom stock is not listed online.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={reset} className="btn btn-secondary">
                Clear filters
              </button>
              <a
                href={whatsappLink(
                  "Hi, I'm looking for something specific from your catalogue. Can you help?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                saved={saved.includes(item.id)}
                comparing={compare.includes(item.id)}
                onSave={() => toggleSaved(item.id)}
                onCompare={() => toggleCompare(item.id)}
                onQuickView={() => setQuickView(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Compare bar */}
      {compare.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto flex flex-wrap items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Compare ({compare.length}/4)
            </span>
            <div className="flex flex-wrap gap-2">
              {compareItems.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  onClick={() => toggleCompare(i.id)}
                  className="inline-flex items-center gap-2 rounded-sm border border-foreground/12 px-3 py-1.5 text-xs text-foreground hover:border-gold/60"
                >
                  {i.name}
                  <X className="h-3 w-3" />
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => setCompare([])}
                className="btn btn-utility"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setCompareOpen(true)}
                className="btn btn-primary"
                disabled={compare.length < 2}
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      )}

      <QuickViewDialog item={quickView} onClose={() => setQuickView(null)} />

      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-w-4xl overflow-x-auto rounded-sm">
          <DialogHeader>
            <DialogTitle className="display-sub">Compare selection</DialogTitle>
            <DialogDescription>
              Side-by-side specifications from our current stock list.
            </DialogDescription>
          </DialogHeader>
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-32 border-b border-border px-3 py-3 text-left text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Spec
                </th>
                {compareItems.map((i) => (
                  <th key={i.id} className="border-b border-border px-3 py-3 text-left">
                    <img
                      src={i.image}
                      alt={i.name}
                      className="mb-2 h-20 w-full rounded-sm object-cover"
                      loading="lazy"
                    />
                    <span className="font-medium text-foreground">{i.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Collection", (i: CatalogItem) => i.collection],
                  ["Material", (i: CatalogItem) => i.material],
                  ["Finish", (i: CatalogItem) => i.finishes.join(", ")],
                  ["Size", (i: CatalogItem) => i.sizes.join(", ")],
                  ["Colour", (i: CatalogItem) => i.colors.join(", ")],
                  ["Application", (i: CatalogItem) => i.applications.join(", ")],
                  ["Rooms", (i: CatalogItem) => i.rooms.join(", ")],
                  ["Indoor / Outdoor", (i: CatalogItem) => i.placement],
                  ["Price", (i: CatalogItem) => i.price],
                  ["Brand", (i: CatalogItem) => i.brand ?? ""],
                ] as const
              ).map(([label, get]) => (
                <tr key={label}>
                  <th className="border-b border-border/60 px-3 py-3 text-left text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                  </th>
                  {compareItems.map((i) => (
                    <td key={i.id} className="border-b border-border/60 px-3 py-3 align-top text-foreground">
                      {get(i) || <span className="text-muted-foreground/60">Ask us</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* -------------------------------- product card ------------------------------- */

function Spec({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <dt className="w-[5.5rem] shrink-0 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-xs text-foreground">{value}</dd>
    </div>
  );
}

function ProductCard({
  item,
  saved,
  comparing,
  onSave,
  onCompare,
  onQuickView,
}: {
  item: CatalogItem;
  saved: boolean;
  comparing: boolean;
  onSave: () => void;
  onCompare: () => void;
  onQuickView: () => void;
}) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-sm bg-secondary">
        <Link to="/products/item/$itemId" params={{ itemId: item.id }}>
          <img
            src={item.image}
            alt={item.name}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
          />
        </Link>
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
          <IconAction
            label={saved ? "Remove from saved" : "Save"}
            active={saved}
            onClick={onSave}
          >
            <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
          </IconAction>
          <IconAction
            label={comparing ? "Remove from compare" : "Add to compare"}
            active={comparing}
            onClick={onCompare}
          >
            <Scale className="h-4 w-4" />
          </IconAction>
          <IconAction label="Quick view" onClick={onQuickView}>
            <Eye className="h-4 w-4" />
          </IconAction>
        </div>
      </div>

      <div className="pt-5">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {item.collection}
        </p>
        <h2 className="display-sub mt-2 text-foreground">
          <Link to="/products/item/$itemId" params={{ itemId: item.id }}>
            {item.name}
          </Link>
        </h2>
        <p className="mt-2 text-sm text-foreground/80">{item.price}</p>

        <dl className="mt-4 space-y-1.5 border-t border-border/70 pt-4">
          <Spec label="Material" value={item.material} />
          <Spec label="Finish" value={item.finishes.join(", ")} />
          <Spec label="Size" value={item.sizes.join(", ")} />
          <Spec label="Colour" value={item.colors.join(", ")} />
          <Spec label="Application" value={item.applications.join(", ")} />
          <Spec label="Use" value={item.placement} />
        </dl>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/contact"
            search={{ interest: item.categoryId }}
            className="btn btn-primary"
          >
            Get a Quote
          </Link>
          <a
            href={whatsappLink(
              `Hi, I'm interested in ${item.name} (${item.collection}). Please share details.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-utility"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function IconAction({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-sm border backdrop-blur transition-colors",
        active
          ? "border-gold bg-gold text-ink"
          : "border-white/40 bg-background/80 text-foreground hover:border-gold/70",
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------- quick view -------------------------------- */

function QuickViewDialog({
  item,
  onClose,
}: {
  item: CatalogItem | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!item} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl rounded-sm">
        {item && (
          <div className="grid gap-8 sm:grid-cols-2">
            <img
              src={item.image}
              alt={item.name}
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
            <div>
              <DialogHeader className="text-left">
                <DialogDescription className="text-[0.6rem] font-medium uppercase tracking-[0.22em]">
                  {item.collection}
                </DialogDescription>
                <DialogTitle className="display-sub text-foreground">
                  {item.name}
                </DialogTitle>
              </DialogHeader>
              <p className="mt-2 text-sm text-foreground/80">{item.price}</p>
              <dl className="mt-5 space-y-1.5 border-t border-border/70 pt-4">
                <Spec label="Material" value={item.material} />
                <Spec label="Finish" value={item.finishes.join(", ")} />
                <Spec label="Size" value={item.sizes.join(", ")} />
                <Spec label="Colour" value={item.colors.join(", ")} />
                <Spec label="Application" value={item.applications.join(", ")} />
                <Spec label="Rooms" value={item.rooms.join(", ")} />
                <Spec label="Use" value={item.placement} />
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  to="/products/item/$itemId"
                  params={{ itemId: item.id }}
                  className="btn btn-secondary"
                >
                  Full details
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/contact"
                  search={{ interest: item.categoryId }}
                  className="btn btn-primary"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
