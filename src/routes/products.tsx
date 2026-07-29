import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { products } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Hemant Tiles and Building Materials" },
      {
        name: "description",
        content:
          "Browse our range of tiles, marble, and washroom appliances in Varanasi.",
      },
      {
        property: "og:title",
        content: "Products — Hemant Tiles and Building Materials",
      },
      {
        property: "og:description",
        content:
          "Browse our range of tiles, marble, and washroom appliances in Varanasi.",
      },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold text-foreground">
          Our Products
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We supply high-quality tiles, marble, and washroom appliances for
          homes and commercial projects.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-[4/3]">
              <img
                src={product.image}
                alt={product.title}
                width={400}
                height={300}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <CardHeader>
              <h2 className="font-display text-2xl font-semibold text-card-foreground">
                {product.title}
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{product.details}</p>
              <Button asChild>
                <Link to={`/contact?interest=${product.id}`}>
                  Get a quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
