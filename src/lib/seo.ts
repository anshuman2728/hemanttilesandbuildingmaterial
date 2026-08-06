import { BUSINESS } from "./business";

export const SITE_URL = "https://hemanttilesandbuildingmaterial.lovable.app";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.name,
  image: `${SITE_URL}/og.jpg`,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  url: SITE_URL,
  priceRange: "₹₹",
  areaServed: "Varanasi, Uttar Pradesh",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Sankar Nagar Colony, 661/2, near Jio Tower, Ram Nagar Industrial Area, Tengra mod",
    addressLocality: "Ramnagar, Varanasi",
    addressRegion: "Uttar Pradesh",
    postalCode: "221008",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "128",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BUSINESS.name,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#business` },
};

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}
