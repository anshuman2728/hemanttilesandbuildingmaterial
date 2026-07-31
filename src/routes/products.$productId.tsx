import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Check,
  Clock,
  IndianRupee,
  Phone,
  Ruler,
} from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.522 5.276l-.999 3.648 3.966-1.023zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProduct, products } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { productId: product.id };
  },
  head: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) {
      return {
        meta: [
          { title: "Product not found — Hemant Tiles and Building Materials" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${product.title} — Hemant Tiles and Building Materials`;
    const description = `${product.description} Available in Ramnagar, Varanasi from ${product.priceFrom} ${product.priceUnit}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/products/${product.id}` }],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductDetailPage,
});

function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-foreground">
        Product not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        The product you are looking for is not in our catalogue.
      </p>
      <Button asChild className="mt-6">
        <Link to="/products">Back to products</Link>
      </Button>
    </div>
  );
}

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const product = getProduct(productId);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return <ProductNotFound />;

  const others = products.filter((p) => p.id !== product.id);
  const current = product.gallery[activeImage] ?? product.gallery[0];

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-foreground">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.shortTitle}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <img
              src={current.src}
              alt={current.alt}
              width={1024}
              height={768}
              className="aspect-[4/3] w-full object-cover transition-opacity duration-300"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.gallery.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`Show image ${i + 1}: ${img.alt}`}
                aria-pressed={activeImage === i}
                className={cn(
                  "overflow-hidden rounded-lg border-2 transition-all duration-200",
                  activeImage === i
                    ? "border-primary shadow-sm"
                    : "border-transparent opacity-75 hover:opacity-100",
                )}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={200}
                  height={150}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{product.details}</p>

          <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1 rounded-xl border border-border bg-muted/40 px-5 py-4">
            <span className="text-sm text-muted-foreground">Starting from</span>
            <span className="flex items-center font-display text-3xl font-bold text-foreground">
              <IndianRupee className="mr-0.5 h-6 w-6" />
              {product.priceFrom.replace("₹", "")}
            </span>
            <span className="text-sm text-muted-foreground">{product.priceUnit}</span>
            <span className="w-full text-xs text-muted-foreground">
              Indicative rates — final price depends on brand, quantity, and finish.
            </span>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <Ruler className="h-4 w-4" /> Sizes available
              </h2>
              <ul className="mt-2 space-y-1 text-sm text-foreground">
                {product.sizes.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Finishes
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.finishes.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ul className="mt-6 space-y-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/contact" search={{ interest: product.id }}>
                Enquire about {product.shortTitle}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#25D366] text-white hover:bg-[#1da851]"
            >
              <a
                href={`https://wa.me/919451365107?text=${encodeURIComponent(
                  `Hi, I'm interested in ${product.title} (starting from ${product.priceFrom} ${product.priceUnit}). Please share more details.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+919451365107">
                <Phone className="mr-2 h-4 w-4" />
                Call +91 94513 65107
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/calculator">
                <Calculator className="mr-2 h-4 w-4" />
                Estimate area
              </Link>
            </Button>
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Showroom open daily from 9:00 AM — Ramnagar, Varanasi
          </p>
        </div>
      </div>

      {/* Price & size table */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Sizes & indicative pricing
        </h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Finish</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.variants.map((v) => (
                <TableRow key={v.name}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell>{v.size}</TableCell>
                  <TableCell>{v.finish}</TableCell>
                  <TableCell className="text-right">{v.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Prices are indicative and subject to change. Visit the showroom or send
          an enquiry for an exact quotation.
        </p>
      </section>

      {/* Other categories */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Also available
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {others.map((p) => (
            <Link
              key={p.id}
              to="/products/$productId"
              params={{ productId: p.id }}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <img
                src={p.image}
                alt={p.title}
                width={120}
                height={90}
                loading="lazy"
                className="h-20 w-28 shrink-0 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  From {p.priceFrom} {p.priceUnit}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <Button asChild variant="outline">
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all products
          </Link>
        </Button>
      </div>
    </div>
  );
}
