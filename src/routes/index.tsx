import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Hemant Tiles and Building Materials — Tengdamod, Varanasi",
      },
      {
        name: "description",
        content:
          "Premium tiles, marble, and washroom appliances in Varanasi. Visit Hemant Tiles and Building Materials for quality products and expert guidance.",
      },
      {
        property: "og:title",
        content: "Hemant Tiles and Building Materials — Tengdamod, Varanasi",
      },
      {
        property: "og:description",
        content:
          "Premium tiles, marble, and washroom appliances in Varanasi.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quality building materials in Varanasi
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Build beautiful spaces with Hemant Tiles
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Trusted supplier of premium tiles, marble, and washroom
              appliances in Tengdamod, Varanasi. We help homeowners, builders,
              and architects find the right finish.
            </p>
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
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>Call us: +91 00000 00000</span>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src={heroImg}
              alt="Modern tile showroom with marble and ceramic displays"
              width={1024}
              height={1024}
              className="aspect-square rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Our Product Categories
            </h2>
            <p className="mt-2 text-muted-foreground">
              Everything you need for flooring, walls, and bathrooms.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="aspect-[4/3] w-full rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="mt-4">
                  <h3 className="font-display text-xl font-semibold text-card-foreground">
                    {product.shortTitle}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <Button asChild variant="link" className="mt-2 h-auto p-0">
                    <Link to={`/products?interest=${product.id}`}>
                      Learn more
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold">
              Ready to start your project?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Visit our store in Tengdamod, Varanasi, or send us an inquiry and
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
      </section>
    </div>
  );
}
