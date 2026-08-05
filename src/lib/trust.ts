import bathroomImg from "@/assets/space-bathroom.jpg";
import kitchenImg from "@/assets/space-kitchen.jpg";
import livingImg from "@/assets/space-living.jpg";
import bedroomImg from "@/assets/space-bedroom.jpg";
import commercialImg from "@/assets/space-commercial.jpg";
import officeImg from "@/assets/space-office.jpg";
import outdoorImg from "@/assets/space-outdoor.jpg";
import terraceImg from "@/assets/space-terrace.jpg";
import balconyImg from "@/assets/space-balcony.jpg";
import hotelImg from "@/assets/project-hotel.jpg";
import washroom2Img from "@/assets/washroom-2.jpg";
import graniteImg from "@/assets/granite-2.jpg";

import review1 from "@/assets/review-1.jpg";
import review2 from "@/assets/review-2.jpg";
import review3 from "@/assets/review-3.jpg";
import review4 from "@/assets/review-4.jpg";

/* ------------------------------ project gallery ---------------------------- */

export type ProjectCategory =
  | "Bathrooms"
  | "Kitchens"
  | "Hotels"
  | "Homes"
  | "Commercial";

export const projectCategories: ProjectCategory[] = [
  "Bathrooms",
  "Kitchens",
  "Hotels",
  "Homes",
  "Commercial",
];

export interface ProjectShot {
  src: string;
  alt: string;
  category: ProjectCategory;
  title: string;
  location: string;
  material: string;
  tall?: boolean;
}

export const projects: ProjectShot[] = [
  {
    src: bathroomImg,
    alt: "Luxury bathroom finished with large-format stone tiles",
    category: "Bathrooms",
    title: "Stone-clad master bath",
    location: "Ramnagar, Varanasi",
    material: "2×4 ft vitrified · wall-hung suite",
    tall: true,
  },
  {
    src: washroom2Img,
    alt: "Guest washroom with designer wash basin and CP fittings",
    category: "Bathrooms",
    title: "Guest washroom package",
    location: "Sigra, Varanasi",
    material: "Jaquar fittings · anti-skid floor",
  },
  {
    src: kitchenImg,
    alt: "Modern kitchen with black granite platform",
    category: "Kitchens",
    title: "Black granite platform",
    location: "Bhelupur, Varanasi",
    material: "Jet black granite · highlighter wall",
    tall: true,
  },
  {
    src: graniteImg,
    alt: "Polished granite countertop close up",
    category: "Kitchens",
    title: "Island countertop",
    location: "Lanka, Varanasi",
    material: "Imported granite · mirror polish",
  },
  {
    src: hotelImg,
    alt: "Hotel lobby with polished marble flooring",
    category: "Hotels",
    title: "Hotel lobby flooring",
    location: "Cantt, Varanasi",
    material: "Italian marble finish · 1200×1800",
    tall: true,
  },
  {
    src: terraceImg,
    alt: "Hotel terrace with stone finish paving",
    category: "Hotels",
    title: "Rooftop dining terrace",
    location: "Assi Ghat, Varanasi",
    material: "Anti-skid stone finish",
  },
  {
    src: livingImg,
    alt: "Living room with marble finish floor tiles",
    category: "Homes",
    title: "Marble-finish living room",
    location: "Tengra Mod, Varanasi",
    material: "2×4 ft glossy vitrified",
    tall: true,
  },
  {
    src: bedroomImg,
    alt: "Bedroom with wooden finish floor tiles",
    category: "Homes",
    title: "Wooden-finish bedroom",
    location: "Ramnagar, Varanasi",
    material: "Plank tiles · matte finish",
  },
  {
    src: balconyImg,
    alt: "Balcony with textured outdoor tiles",
    category: "Homes",
    title: "Balcony in textured stone",
    location: "Mahmoorganj, Varanasi",
    material: "Matte outdoor tiles",
  },
  {
    src: commercialImg,
    alt: "Commercial lobby with polished vitrified flooring",
    category: "Commercial",
    title: "Showroom lobby",
    location: "Ram Nagar Industrial Area",
    material: "Double charge vitrified",
    tall: true,
  },
  {
    src: officeImg,
    alt: "Office interior with large format floor tiles",
    category: "Commercial",
    title: "Corporate office floor",
    location: "Varanasi",
    material: "Full-body vitrified · bulk order",
  },
  {
    src: outdoorImg,
    alt: "Outdoor parking area with heavy duty tiles",
    category: "Commercial",
    title: "Parking & driveway",
    location: "Ramnagar, Varanasi",
    material: "Heavy-duty parking tiles",
  },
];

/* -------------------------------- trust pillars ---------------------------- */

export interface TrustPillar {
  icon: "shield" | "truck" | "compass" | "wrench" | "layers";
  title: string;
  body: string;
  stat: string;
}

export const trustPillars: TrustPillar[] = [
  {
    icon: "shield",
    title: "Original Products",
    body: "Only first-grade, brand-sealed material with company warranty — never seconds or rejects.",
    stat: "100% branded stock",
  },
  {
    icon: "truck",
    title: "Fast Delivery",
    body: "Same-day dispatch across Varanasi for in-stock material, scheduled slots for project loads.",
    stat: "Same-day in Varanasi",
  },
  {
    icon: "compass",
    title: "Expert Advice",
    body: "Room-by-room guidance on size, finish, laying pattern and exact quantity before you pay.",
    stat: "20+ years on the floor",
  },
  {
    icon: "wrench",
    title: "Installation Support",
    body: "Trusted local masons on call, plus the right adhesive, grout and spacers for your pattern.",
    stat: "Verified fitters",
  },
  {
    icon: "layers",
    title: "Large Collection",
    body: "Tiles, granite, marble, sanitaryware and building materials under one roof, restocked weekly.",
    stat: "1200+ products",
  },
];

/* ---------------------------------- reviews -------------------------------- */

export interface Review {
  name: string;
  role: string;
  rating: number;
  quote: string;
  photo: string;
  when: string;
}

export const reviews: Review[] = [
  {
    name: "Rakesh Verma",
    role: "Homeowner · Ramnagar",
    rating: 5,
    photo: review1,
    when: "2 months ago",
    quote:
      "We tiled our entire house here. Hemant ji guided us on sizes and finishes room by room — the living room floor still looks brand new after two years.",
  },
  {
    name: "Sunita Singh",
    role: "Interior designer · Varanasi",
    rating: 5,
    photo: review2,
    when: "5 weeks ago",
    quote:
      "My go-to showroom for client projects. Stock is genuinely available, rates are fair, and delivery to site is always on time.",
  },
  {
    name: "Arvind Yadav",
    role: "Contractor · 12-flat project",
    rating: 5,
    photo: review3,
    when: "3 months ago",
    quote:
      "Granite platforms, parking tiles and bathware all from one place. Bulk pricing saved us a lot and nothing arrived damaged.",
  },
  {
    name: "Neha Gupta",
    role: "Homeowner · Sigra",
    rating: 5,
    photo: review4,
    when: "6 days ago",
    quote:
      "The bathroom package was the easiest part of our build. They matched the tiles with the fittings perfectly and delivered in two days.",
  },
];

export const brandWall = [
  { name: "Kajaria", note: "Tiles" },
  { name: "Somany", note: "Tiles" },
  { name: "Johnson", note: "Tiles" },
  { name: "Asian Granito", note: "Vitrified" },
  { name: "Nitco", note: "Tiles" },
  { name: "Jaquar", note: "Bathware" },
  { name: "Cera", note: "Sanitary" },
  { name: "Hindware", note: "Sanitary" },
];
