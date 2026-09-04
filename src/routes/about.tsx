import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Award, Users, Truck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Hemant Tiles and Building Materials" },
      {
        name: "description",
        content:
          "Learn about Hemant Tiles and Building Materials, your trusted supplier in Tengdamod, Varanasi.",
      },
      {
        property: "og:title",
        content: "About Us — Hemant Tiles and Building Materials",
      },
      {
        property: "og:description",
        content:
          "Trusted supplier of tiles, granite, and washroom appliances in Tengdamod, Varanasi.",
      },
      { property: "og:url", content: "https://hemanttilesandbuildingmaterial.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://hemanttilesandbuildingmaterial.lovable.app/about" }],
  }),
  component: AboutPage,
});

const highlights = [
  {
    icon: Award,
    title: "Quality Assured",
    description:
      "We source products from reliable manufacturers to ensure durability and finish.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description:
      "Our team helps you choose the right materials for every room and budget.",
  },
  {
    icon: Truck,
    title: "Timely Delivery",
    description:
      "We coordinate with your schedule to keep your project on track.",
  },
  {
    icon: MapPin,
    title: "Local Presence",
    description:
      "Based in Tengdamod, Varanasi, we serve customers across the city and nearby areas.",
  },
];

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-bold text-foreground">
          About Hemant Tiles
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Hemant Tiles and Building Materials has been serving builders,
          homeowners, and architects in Varanasi with quality products and
          dependable service.
        </p>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="flex gap-4 rounded-sm border border-border bg-card p-6"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <h.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-card-foreground">
                {h.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {h.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 rounded-sm border border-border bg-muted/30 p-8 sm:p-12">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Visit us
        </h2>
        <p className="mt-2 text-muted-foreground">
          Hemant Tiles and Building Materials
        </p>
        <p className="text-muted-foreground">
          Sankar Nagar Colony, 661/2, near Jio Tower, Ram Nagar Industrial
          Area, Tengra mod, Ramnagar, Varanasi, Uttar Pradesh 221008
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Phone: <a href="tel:+919451365107" className="hover:text-foreground">+91 94513 65107</a>
          {" · "}
          Email: <a href="mailto:hemantsingh1965@gmail.com" className="hover:text-foreground">hemantsingh1965@gmail.com</a>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Open Monday – Saturday, from 9:00 AM
        </p>
      </div>
    </div>
  );
}
