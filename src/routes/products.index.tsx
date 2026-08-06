import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Hemant Tiles and Building Materials" },
      {
        name: "description",
        content:
          "Browse our range of tiles, granite, and washroom appliances in Varanasi.",
      },
      {
        property: "og:title",
        content: "Products — Hemant Tiles and Building Materials",
      },
      {
        property: "og:description",
        content:
          "Browse our range of tiles, granite, and washroom appliances in Varanasi.",
      },
      { property: "og:url", content: "https://hemanttilesandbuildingmaterial.lovable.app/products" },
    ],
    links: [{ rel: "canonical", href: "https://hemanttilesandbuildingmaterial.lovable.app/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  const visible = products.filter((p) => {
    const matchesCategory = active === "all" || p.id === active;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.details.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold text-foreground">
          Our Products
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We supply high-quality tiles, granite, and washroom appliances for
          homes and commercial projects.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {[{ id: "all", shortTitle: "All products" }, ...products].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              aria-pressed={active === c.id}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                active === c.id
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {active === c.id && <Check className="h-3.5 w-3.5" />}
              {c.shortTitle}
            </button>
          ))}
        </div>
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, finishes, materials…"
            aria-label="Search products"
            className="pl-9"
          />
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground" aria-live="polite">
        Showing {visible.length} of {products.length} categories
      </p>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-muted-foreground">
            No products match your search. Try a different keyword.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setQuery("");
              setActive("all");
            }}
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Link
                to="/products/$productId"
                params={{ productId: product.id }}
                className="block aspect-[4/3] overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <CardHeader>
                <h2 className="font-display text-2xl font-semibold text-card-foreground">
                  <Link
                    to="/products/$productId"
                    params={{ productId: product.id }}
                    className="hover:text-primary"
                  >
                    {product.title}
                  </Link>
                </h2>
                <p className="text-sm font-medium text-primary">
                  From {product.priceFrom} {product.priceUnit}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{product.details}</p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild>
                    <Link to="/products/$productId" params={{ productId: product.id }}>
                      View details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/calculator">
                      <Calculator className="mr-2 h-4 w-4" />
                      Estimate area
                    </Link>
                  </Button>
                </div>
              </CardContent>

            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
