import tilesImg from "@/assets/tiles.jpg";
import tiles2Img from "@/assets/tiles-2.jpg";
import tiles3Img from "@/assets/tiles-3.jpg";
import graniteImg from "@/assets/granite.jpg";
import granite2Img from "@/assets/granite-2.jpg";
import granite3Img from "@/assets/granite-3.jpg";
import washroomImg from "@/assets/washroom.jpg";
import washroom2Img from "@/assets/washroom-2.jpg";
import bathroomImg from "@/assets/space-bathroom.jpg";
import kitchenImg from "@/assets/space-kitchen.jpg";
import livingImg from "@/assets/space-living.jpg";
import bedroomImg from "@/assets/space-bedroom.jpg";
import outdoorImg from "@/assets/space-outdoor.jpg";
import commercialImg from "@/assets/space-commercial.jpg";

export const spaceImages = {
  bathroom: bathroomImg,
  kitchen: kitchenImg,
  living: livingImg,
  bedroom: bedroomImg,
  outdoor: outdoorImg,
  commercial: commercialImg,
};

/* ------------------------------- categories ------------------------------- */

export interface CategoryGroup {
  id: string;
  /** Product route this group maps to. */
  productId: "tiles" | "granite" | "washroom";
  title: string;
  blurb: string;
  image: string;
  items: string[];
}

export const categoryGroups: CategoryGroup[] = [
  {
    id: "tiles",
    productId: "tiles",
    title: "Tiles",
    blurb: "Ceramic, vitrified and designer surfaces for every room and finish.",
    image: tilesImg,
    items: [
      "Floor Tiles",
      "Wall Tiles",
      "Bathroom Tiles",
      "Kitchen Tiles",
      "Outdoor Tiles",
      "Balcony Tiles",
      "Parking Tiles",
      "Elevation Tiles",
      "Wooden Finish Tiles",
      "Marble Finish Tiles",
      "Designer Tiles",
    ],
  },
  {
    id: "granite",
    productId: "granite",
    title: "Granite",
    blurb: "Hard-wearing natural stone for platforms, stairs and countertops.",
    image: graniteImg,
    items: [
      "Kitchen Granite",
      "Black Granite",
      "White Granite",
      "Imported Granite",
      "Countertop Granite",
      "Stair Granite",
    ],
  },
  {
    id: "marble",
    productId: "granite",
    title: "Marble",
    blurb: "Italian and Indian marble for statement floors and feature walls.",
    image: granite3Img,
    items: ["Italian Marble", "Indian Marble", "White Marble", "Luxury Marble"],
  },
  {
    id: "bathware",
    productId: "washroom",
    title: "Sanitary & Bathware",
    blurb: "Complete bathroom packages — sanitaryware, CP fittings, vanities.",
    image: washroomImg,
    items: [
      "Wash Basin",
      "WC",
      "Wall Hung Toilet",
      "One Piece Toilet",
      "Faucets",
      "Showers",
      "Vanity",
      "Mirrors",
      "Bathroom Cabinets",
      "Shower Panels",
      "Accessories",
    ],
  },
  {
    id: "materials",
    productId: "tiles",
    title: "Building Materials",
    blurb: "Everything that goes under and around the surface, in stock.",
    image: tiles3Img,
    items: [
      "Cement",
      "Adhesive",
      "Grout",
      "Pipes",
      "Hardware",
      "Waterproofing",
    ],
  },
];

/* --------------------------------- spaces --------------------------------- */

export interface SpaceEntry {
  id: string;
  label: string;
  image: string;
  recommend: string[];
  note: string;
}

export const spaces: SpaceEntry[] = [
  {
    id: "bathroom",
    label: "Bathroom",
    image: bathroomImg,
    note: "Anti-skid floors, tall wall tiles and matching bathware.",
    recommend: ["Anti-skid floor tiles", "Designer wall tiles", "Wall hung WC", "Vanity + mirror", "Shower panel"],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    image: kitchenImg,
    note: "Stain-proof platforms with easy-clean highlighter walls.",
    recommend: ["Black granite platform", "Kitchen wall tiles", "Vitrified floor tiles", "Sink faucet", "Adhesive + grout"],
  },
  {
    id: "living",
    label: "Living Room",
    image: livingImg,
    note: "Large-format glossy floors that reflect light beautifully.",
    recommend: ["2×4 ft glossy vitrified", "Marble finish tiles", "Elevation feature wall", "Italian marble"],
  },
  {
    id: "bedroom",
    label: "Bedroom",
    image: bedroomImg,
    note: "Warm wooden-finish surfaces with a soft matte touch.",
    recommend: ["Wooden finish tiles", "Matte vitrified tiles", "Skirting", "Designer highlighter"],
  },
  {
    id: "outdoor",
    label: "Outdoor & Parking",
    image: outdoorImg,
    note: "Heavy-duty, weather-tested and grippy underfoot.",
    recommend: ["Parking tiles", "Anti-skid outdoor tiles", "Elevation tiles", "Waterproofing"],
  },
  {
    id: "commercial",
    label: "Commercial",
    image: commercialImg,
    note: "Scale, uniformity and bulk rates for projects.",
    recommend: ["Double charge vitrified", "Granite reception tops", "Bulk sanitaryware", "Project pricing"],
  },
];

/* --------------------------------- gallery -------------------------------- */

export const gallery = [
  { src: livingImg, alt: "Luxury living room with marble-finish floor tiles", tall: true },
  { src: bathroomImg, alt: "Modern bathroom with large-format stone tiles" },
  { src: kitchenImg, alt: "Premium kitchen with black granite countertop", tall: true },
  { src: tiles2Img, alt: "Glossy large-format vitrified floor tiles" },
  { src: outdoorImg, alt: "Villa terrace with stone-finish paving tiles", tall: true },
  { src: granite2Img, alt: "Black speckled granite countertop close up" },
  { src: bedroomImg, alt: "Bedroom with wooden finish floor tiles", tall: true },
  { src: washroom2Img, alt: "Showroom display of wash basins and toilets" },
  { src: commercialImg, alt: "Commercial lobby with polished vitrified flooring" },
  { src: tiles3Img, alt: "Wall display of textured ceramic wall tiles" },
  { src: graniteImg, alt: "Polished granite slabs in the showroom" },
  { src: tilesImg, alt: "Tile showroom display with ceramic samples" },
];

/* -------------------------------- brands ---------------------------------- */

export const brands = [
  "Kajaria",
  "Somany",
  "Johnson",
  "Nitco",
  "Asian Granito",
  "Simpolo",
  "Jaquar",
  "Hindware",
  "Cera",
  "Parryware",
];

/* ------------------------------ testimonials ------------------------------ */

export const testimonials = [
  {
    name: "Rakesh Verma",
    role: "Homeowner, Ramnagar",
    rating: 5,
    quote:
      "We tiled our entire house here. Hemant ji guided us on sizes and finishes room by room — the living room floor still looks brand new after two years.",
  },
  {
    name: "Sunita Singh",
    role: "Interior designer, Varanasi",
    rating: 5,
    quote:
      "My go-to showroom for client projects. Stock is genuinely available, rates are fair, and delivery to site is always on time.",
  },
  {
    name: "Arvind Yadav",
    role: "Contractor",
    rating: 5,
    quote:
      "Bulk order for a 12-flat project — granite platforms, parking tiles and bathware all from one place. Bulk pricing saved us a lot.",
  },
  {
    name: "Neha Gupta",
    role: "Homeowner, Sigra",
    rating: 5,
    quote:
      "The bathroom package was the easiest part of our build. They matched the tiles with the fittings perfectly.",
  },
];

/* ---------------------------------- why ----------------------------------- */

export const whyChooseUs = [
  { title: "Premium Quality", body: "Only branded, first-grade material — no seconds, no surprises." },
  { title: "Affordable Prices", body: "Showroom-direct rates with honest, transparent quotations." },
  { title: "Latest Designs", body: "New arrivals every season from India's leading tile houses." },
  { title: "Trusted Brands", body: "Kajaria, Somany, Johnson, Jaquar, Hindware, Cera and more." },
  { title: "Fast Delivery", body: "Same-day dispatch across Varanasi for in-stock material." },
  { title: "Expert Guidance", body: "Room-by-room advice on size, finish, laying pattern and quantity." },
  { title: "Bulk Orders", body: "Project pricing for builders, contractors and commercial sites." },
  { title: "Customer Support", body: "Call or WhatsApp us any time during showroom hours." },
];

/* ---------------------------------- faq ----------------------------------- */

export const faqs = [
  {
    q: "What are your showroom timings?",
    a: "We are open from 9:00 AM every day. Walk in any time during the day — free parking is available right outside the showroom on the Ram Nagar Industrial Area road.",
  },
  {
    q: "Do you deliver to my site?",
    a: "Yes. We deliver across Varanasi and nearby areas. In-stock material is usually dispatched the same day; large project orders are scheduled with you.",
  },
  {
    q: "Can you help me calculate how much material I need?",
    a: "Use our tile estimator to get area, boxes, adhesive, grout and an approximate cost — then send it to us on WhatsApp and we will confirm the final quantity.",
  },
  {
    q: "Do you offer bulk or contractor pricing?",
    a: "We do. Share your project size and requirement list and we will send a consolidated project quotation.",
  },
  {
    q: "Which brands do you stock?",
    a: "Kajaria, Somany, Johnson, Nitco, Asian Granito, Simpolo for tiles, and Jaquar, Hindware, Cera, Parryware for bathware — plus granite and marble sourced directly.",
  },
  {
    q: "Do you help with installation?",
    a: "We do not lay tiles ourselves, but we can recommend trusted local masons and supply the right adhesive, grout and spacers for your pattern.",
  },
];

export const stats = [
  { value: 20, suffix: "+", label: "Years of Trust" },
  { value: 1200, suffix: "+", label: "Products Available" },
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 850, suffix: "+", label: "Completed Projects" },
];
