import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calculator, Phone } from "lucide-react";
import {
  catalogItems,
  getItem,
  matchingItems,
  relatedItems,
  type CatalogItem,
} from "@/lib/catalog-items";
import { getProduct } from "@/lib/products";
import { WhatsAppIcon, whatsappLink } from "@/lib/whatsapp";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/item/$itemId")({
  loader: ({ params }) => {
    const item = getItem(params.itemId);
    if (!item) throw notFound();
    return { itemId: item.id };
  },
  head: ({ params }) => {
    const item = getItem(params.itemId);
    if (!item) {
      return {
        meta: [
          { title: "Product not found — Hemant Tiles and Building Materials" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${item.name} — ${item.collection} | Hemant Tiles`;
    const description = `${item.name} in ${item.material}${
      item.finishes.length ? `, ${item.finishes.join(" / ")} finish` : ""
    }. Available at our Ramnagar, Varanasi showroom. ${item.price}.`;
    const url = `${SITE_URL}/products/item/${item.id}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Collections", path: "/products" },
              { name: item.name, path: `/products/item/${item.id}` },
            ]),
          ),
        },
      ],
    };
  },
  notFoundComponent: ItemNotFound,
  component: ItemDetailPage,
});

function ItemNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="display-section text-foreground">Product not found</h1>
      <p className="lede mt-4 text-muted-foreground">
        This product is not in our online catalogue.
      </p>
      <Link to="/products" className="btn btn-primary mt-8">
        Back to the catalogue
      </Link>
    </div>
  );
}

function SpecRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="grid grid-cols-[9rem_1fr] gap-4 border-b border-border/70 py-4">
      <dt className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm text-foreground">
        {values.filter(Boolean).length ? (
          values.filter(Boolean).join(", ")
        ) : (
          <span className="text-muted-foreground/70">
            Ask us — not recorded online yet
          </span>
        )}
      </dd>
    </div>
  );
}

function MiniCard({ item }: { item: CatalogItem }) {
  return (
    <Link
      to="/products/item/$itemId"
      params={{ itemId: item.id }}
      className="group block"
    >
      <div className="overflow-hidden rounded-sm bg-secondary">
        <img
          src={item.image}
          alt={item.name}
          width={600}
          height={750}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
        />
      </div>
      <p className="mt-4 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {item.collection}
      </p>
      <h3 className="mt-1.5 text-base text-foreground">{item.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{item.price}</p>
    </Link>
  );
}

function ItemDetailPage() {
  const { itemId } = Route.useParams();
  const item = getItem(itemId);
  const [active, setActive] = useState(0);

  if (!item) return <ItemNotFound />;

  const category = getProduct(item.categoryId);
  const gallery = [
    { src: item.image, alt: item.name },
    ...(category?.gallery ?? []).filter((g) => g.src !== item.image),
  ];
  const current = gallery[active] ?? gallery[0];
  const related = relatedItems(item);
  const matching = matchingItems(item);
  const message = `Hi, I'm interested in ${item.name} (${item.collection}). Please share details and a quotation.`;

  return (
    <div className="pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="py-8 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-foreground">Collections</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{item.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* Gallery */}
          <div>
            <div className="overflow-hidden rounded-sm bg-secondary">
              <img
                src={current.src}
                alt={current.alt}
                width={1200}
                height={1500}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.map((img, i) => (
                  <button
                    key={img.src + i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={active === i}
                    className={cn(
                      "overflow-hidden rounded-sm border transition-colors",
                      active === i ? "border-gold" : "border-transparent opacity-70 hover:opacity-100",
                    )}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={200}
                      height={200}
                      loading="lazy"
                      decoding="async"
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Information */}
          <div>
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              {item.collection}
            </p>
            <h1 className="display-section mt-4 text-foreground">{item.name}</h1>
            <p className="mt-5 text-lg text-foreground/85">{item.price}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Indicative showroom rate — final price depends on brand, quantity and finish.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                search={{ interest: item.categoryId }}
                className="btn btn-primary"
              >
                Get a Quote
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a href="tel:+919451365107" className="btn btn-utility">
                <Phone className="h-3.5 w-3.5" />
                Call
              </a>
              <Link to="/calculator" className="btn btn-utility">
                <Calculator className="h-3.5 w-3.5" />
                Estimate area
              </Link>
            </div>

            <dl className="mt-12">
              <h2 className="display-sub mb-4 text-foreground">Specifications</h2>
              <SpecRow label="Material" values={[item.material]} />
              <SpecRow label="Available sizes" values={item.sizes} />
              <SpecRow label="Available finishes" values={item.finishes} />
              <SpecRow label="Colour" values={item.colors} />
              <SpecRow label="Application" values={item.applications} />
              <SpecRow label="Indoor / Outdoor" values={[item.placement]} />
              <SpecRow label="Brand" values={item.brand ? [item.brand] : []} />
            </dl>

            <div className="mt-10">
              <h2 className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Recommended rooms
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.rooms.map((r) => (
                  <span
                    key={r}
                    className="rounded-sm border border-foreground/12 px-3 py-1.5 text-xs text-foreground"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {category && (
              <Link
                to="/products/$productId"
                params={{ productId: category.id }}
                className="mt-10 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                See the whole {category.shortTitle} range
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="display-sub text-foreground">Related products</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((i) => (
                <MiniCard key={i.id} item={i} />
              ))}
            </div>
          </section>
        )}

        {matching.length > 0 && (
          <section className="mt-20">
            <h2 className="display-sub text-foreground">Matching products</h2>
            <p className="lede mt-3 max-w-xl text-muted-foreground">
              Pieces from our other ranges that work in the same rooms.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {matching.map((i) => (
                <MiniCard key={i.id} item={i} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-20">
          <Link to="/products" className="btn btn-secondary">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to the catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}

export const _allItems = catalogItems;
