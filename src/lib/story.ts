import tilesImg from "@/assets/tiles.jpg";
import tiles2Img from "@/assets/tiles-2.jpg";
import tiles3Img from "@/assets/tiles-3.jpg";
import graniteImg from "@/assets/granite.jpg";
import granite2Img from "@/assets/granite-2.jpg";
import marbleImg from "@/assets/marble.jpg";
import basinImg from "@/assets/basin.jpg";
import faucetsImg from "@/assets/faucets.jpg";
import showerImg from "@/assets/shower.jpg";
import accessoriesImg from "@/assets/accessories.jpg";
import wallTilesImg from "@/assets/wall-tiles.jpg";
import floorTilesImg from "@/assets/floor-tiles.jpg";
import bathroomImg from "@/assets/space-bathroom.jpg";
import kitchenImg from "@/assets/space-kitchen.jpg";
import livingImg from "@/assets/space-living.jpg";
import bedroomImg from "@/assets/space-bedroom.jpg";
import outdoorImg from "@/assets/space-outdoor.jpg";
import commercialImg from "@/assets/space-commercial.jpg";
import balconyImg from "@/assets/space-balcony.jpg";
import terraceImg from "@/assets/space-terrace.jpg";
import officeImg from "@/assets/space-office.jpg";
import parkingImg from "@/assets/space-parking.jpg";

/* ------------------------------- our legacy ------------------------------- */

export interface Milestone {
  year: string;
  title: string;
  body: string;
}

export const milestones: Milestone[] = [
  {
    year: "2004",
    title: "A single counter in Ramnagar",
    body: "Hemant ji opens a small counter on the Ram Nagar Industrial Area road, selling ceramic floor tiles and cement to neighbourhood builders.",
  },
  {
    year: "2009",
    title: "The first display showroom",
    body: "Full-size display panels replace sample boards, so families can finally see a surface before they choose it.",
  },
  {
    year: "2014",
    title: "Granite & marble yard",
    body: "Natural stone joins the range — slabs standing upright, cut and polished for kitchen platforms and staircases.",
  },
  {
    year: "2018",
    title: "Complete bathroom packages",
    body: "Sanitaryware, CP fittings and vanities are added, so one visit finishes an entire bathroom.",
  },
  {
    year: "2021",
    title: "Trusted by contractors",
    body: "Project pricing and site delivery make us the default supplier for builders across Varanasi.",
  },
  {
    year: "Today",
    title: "1,200+ products under one roof",
    body: "Tiles, granite, marble, bathware and building materials — with room-by-room guidance and same-day dispatch.",
  },
];

export const legacyCounters = [
  { value: 20, suffix: "+", label: "Years of experience" },
  { value: 98, suffix: "%", label: "Customer satisfaction" },
  { value: 850, suffix: "+", label: "Projects completed" },
  { value: 5000, suffix: "+", label: "Families served" },
];

/* ------------------- why premium materials matter ------------------------- */

export const materialReasons = [
  {
    title: "It lasts a generation",
    body: "First-grade vitrified and natural stone keep their finish for decades. Seconds craze, chip and fade within a few monsoons.",
  },
  {
    title: "Every piece matches",
    body: "Branded batches hold shade and calibration, so a 600-tile floor reads as one continuous surface — no patchwork.",
  },
  {
    title: "Safer underfoot",
    body: "Certified anti-skid ratings for bathrooms, balconies and parking mean fewer accidents where water collects.",
  },
  {
    title: "Cheaper over time",
    body: "A premium floor laid once costs far less than an economy floor relaid twice — labour is the expensive half.",
  },
  {
    title: "Easier to live with",
    body: "Low-porosity surfaces resist stains, oil and hard water marks, so daily cleaning stays a five-minute job.",
  },
  {
    title: "It lifts the whole room",
    body: "Light, depth and grain do more for a space than any furniture you place on top of it.",
  },
];

/* ------------------------------ room explorer ----------------------------- */

export interface Room {
  id: string;
  label: string;
  image: string;
  note: string;
  /** Product route this room maps to. */
  productId: "tiles" | "granite" | "washroom";
  picks: string[];
}

export const rooms: Room[] = [
  {
    id: "bathroom",
    label: "Bathroom",
    image: bathroomImg,
    note: "Anti-skid floors, tall wall tiles and matching bathware.",
    productId: "washroom",
    picks: ["Anti-skid floor tiles", "Designer wall tiles", "Wall hung WC"],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    image: kitchenImg,
    note: "Stain-proof granite platforms with easy-clean highlighter walls.",
    productId: "granite",
    picks: ["Black granite platform", "Kitchen wall tiles", "Sink faucet"],
  },
  {
    id: "living",
    label: "Living Room",
    image: livingImg,
    note: "Large-format glossy floors that carry light across the room.",
    productId: "tiles",
    picks: ["2×4 ft glossy vitrified", "Marble finish tiles", "Feature wall"],
  },
  {
    id: "bedroom",
    label: "Bedroom",
    image: bedroomImg,
    note: "Warm wooden-finish surfaces with a soft matte touch.",
    productId: "tiles",
    picks: ["Wooden finish tiles", "Matte vitrified", "Skirting"],
  },
  {
    id: "outdoor",
    label: "Outdoor",
    image: outdoorImg,
    note: "Weather-tested paving with real grip underfoot.",
    productId: "tiles",
    picks: ["Anti-skid outdoor tiles", "Stone finish paving", "Elevation tiles"],
  },
  {
    id: "balcony",
    label: "Balcony",
    image: balconyImg,
    note: "Compact formats and slip-safe finishes for open edges.",
    productId: "tiles",
    picks: ["Balcony tiles", "Rustic matte tiles", "Waterproofing"],
  },
  {
    id: "terrace",
    label: "Terrace",
    image: terraceImg,
    note: "Heat-reflective, rain-ready surfaces built for full sun.",
    productId: "tiles",
    picks: ["Terrace tiles", "Cool roof tiles", "Anti-skid paving"],
  },
  {
    id: "office",
    label: "Office",
    image: officeImg,
    note: "Uniform double-charge floors that survive chair castors.",
    productId: "tiles",
    picks: ["Double charge vitrified", "Granite reception top", "Bulk pricing"],
  },
  {
    id: "commercial",
    label: "Commercial",
    image: commercialImg,
    note: "Scale, shade consistency and project rates.",
    productId: "tiles",
    picks: ["Heavy-duty vitrified", "Bulk sanitaryware", "Project quotation"],
  },
  {
    id: "parking",
    label: "Parking",
    image: parkingImg,
    note: "High-abrasion tiles that take vehicle load and grit.",
    productId: "tiles",
    picks: ["Parking tiles", "Heavy duty matte", "Grout + adhesive"],
  },
  {
    id: "wall-tiles",
    label: "Wall Tiles",
    image: wallTilesImg,
    note: "Highlighters, 3D relief panels and full-height ceramic.",
    productId: "tiles",
    picks: ["Designer wall tiles", "3D relief tiles", "Highlighters"],
  },
  {
    id: "floor-tiles",
    label: "Floor Tiles",
    image: floorTilesImg,
    note: "Glossy, matte and carving finishes in every large format.",
    productId: "tiles",
    picks: ["Glossy vitrified", "Matte vitrified", "Marble finish"],
  },
];

/* ---------------------------- premium collections -------------------------- */

export interface Collection {
  id: string;
  title: string;
  tagline: string;
  image: string;
  productId: "tiles" | "granite" | "washroom";
  priceFrom: string;
  material: string;
  finishes: string[];
  brands: string[];
  colors: string[];
  textures: string[];
  sizes: string[];
  usage: string[];
  rooms: string[];
  priceBand: "Value" | "Premium" | "Luxury";
  specs: { label: string; value: string }[];
  related: string[];
}

export const collections: Collection[] = [
  {
    id: "tiles",
    title: "Tiles",
    tagline: "Vitrified, ceramic and designer surfaces in every large format.",
    image: floorTilesImg,
    productId: "tiles",
    priceFrom: "₹32 / sq. ft.",
    material: "Vitrified",
    finishes: ["Glossy", "Matte", "Carving"],
    brands: ["Kajaria", "Somany", "Johnson", "Simpolo"],
    colors: ["Ivory", "Grey", "Beige"],
    textures: ["Smooth", "Stone", "Wood"],
    sizes: ["2×2 ft", "2×4 ft", "600×600 mm", "800×1600 mm"],
    usage: ["Floor", "Wall"],
    rooms: ["Living Room", "Bedroom", "Kitchen", "Office", "Commercial"],
    priceBand: "Value",
    specs: [
      { label: "Water absorption", value: "< 0.5% (vitrified)" },
      { label: "Thickness", value: "8 – 10 mm" },
      { label: "Edge", value: "Rectified, calibrated" },
      { label: "Coverage", value: "4 – 6 pcs per box" },
    ],
    related: ["wall-tiles-collection", "granite", "marble"],
  },
  {
    id: "granite",
    title: "Granite",
    tagline: "Hard-wearing natural stone for platforms, stairs and countertops.",
    image: graniteImg,
    productId: "granite",
    priceFrom: "₹120 / sq. ft.",
    material: "Granite",
    finishes: ["Polished", "Honed", "Flamed"],
    brands: ["Direct quarry", "Imported"],
    colors: ["Black", "White", "Grey"],
    textures: ["Speckled", "Smooth"],
    sizes: ["Cut to size", "Full slab"],
    usage: ["Countertop", "Floor", "Stairs"],
    rooms: ["Kitchen", "Office", "Commercial"],
    priceBand: "Premium",
    specs: [
      { label: "Thickness", value: "16 – 20 mm" },
      { label: "Finish", value: "Mirror polished both edges" },
      { label: "Cutting", value: "Cut and edge-polished to your drawing" },
      { label: "Best for", value: "Kitchen platforms, stairs, reception tops" },
    ],
    related: ["marble", "tiles", "floor-tiles-collection"],
  },
  {
    id: "marble",
    title: "Marble",
    tagline: "Italian and Indian marble for statement floors and feature walls.",
    image: marbleImg,
    productId: "granite",
    priceFrom: "₹180 / sq. ft.",
    material: "Marble",
    finishes: ["Polished", "Honed"],
    brands: ["Italian", "Indian"],
    colors: ["White", "Ivory", "Grey"],
    textures: ["Veined", "Smooth"],
    sizes: ["Full slab", "Cut to size"],
    usage: ["Floor", "Wall", "Countertop"],
    rooms: ["Living Room", "Bedroom", "Commercial"],
    priceBand: "Luxury",
    specs: [
      { label: "Origin", value: "Italian (imported) and Indian quarries" },
      { label: "Thickness", value: "16 – 18 mm" },
      { label: "Care", value: "Sealed on site, re-polish every few years" },
      { label: "Best for", value: "Living room floors, feature walls, temples" },
    ],
    related: ["granite", "tiles", "wall-tiles-collection"],
  },
  {
    id: "wash-basins",
    title: "Wash Basins",
    tagline: "Counter-top, wall-hung and table-top basins in premium ceramic.",
    image: basinImg,
    productId: "washroom",
    priceFrom: "₹2,400",
    material: "Ceramic",
    finishes: ["Glossy", "Matte"],
    brands: ["Jaquar", "Hindware", "Cera", "Parryware"],
    colors: ["White", "Black", "Ivory"],
    textures: ["Smooth"],
    sizes: ["Compact", "Standard", "Wide"],
    usage: ["Bathware"],
    rooms: ["Bathroom", "Commercial"],
    priceBand: "Premium",
    specs: [
      { label: "Type", value: "Table-top, counter-top, wall-hung" },
      { label: "Material", value: "Vitreous ceramic, anti-stain glaze" },
      { label: "Waste", value: "Fittings and bottle trap available" },
      { label: "Warranty", value: "Brand warranty on ceramic body" },
    ],
    related: ["faucets", "bathroom-accessories", "shower-systems"],
  },
  {
    id: "faucets",
    title: "Faucets",
    tagline: "CP fittings in chrome, matte black and brushed gold finishes.",
    image: faucetsImg,
    productId: "washroom",
    priceFrom: "₹850",
    material: "Brass",
    finishes: ["Chrome", "Matte Black", "Brushed Gold"],
    brands: ["Jaquar", "Hindware", "Cera"],
    colors: ["Chrome", "Black", "Gold"],
    textures: ["Smooth"],
    sizes: ["Basin mixer", "Sink cock", "Wall mixer"],
    usage: ["Bathware", "Kitchen"],
    rooms: ["Bathroom", "Kitchen"],
    priceBand: "Value",
    specs: [
      { label: "Body", value: "Forged brass with ceramic cartridge" },
      { label: "Finish", value: "PVD / chrome plated, tarnish resistant" },
      { label: "Pressure", value: "Suitable for overhead tank and pump" },
      { label: "Range", value: "Basin, sink, bath and wall mixers" },
    ],
    related: ["wash-basins", "shower-systems", "bathroom-accessories"],
  },
  {
    id: "shower-systems",
    title: "Shower Systems",
    tagline: "Rain showers, panels and diverters for a spa-grade bath.",
    image: showerImg,
    productId: "washroom",
    priceFrom: "₹1,900",
    material: "Stainless steel",
    finishes: ["Chrome", "Matte Black"],
    brands: ["Jaquar", "Hindware"],
    colors: ["Chrome", "Black"],
    textures: ["Smooth"],
    sizes: ["6 inch", "8 inch", "12 inch"],
    usage: ["Bathware"],
    rooms: ["Bathroom"],
    priceBand: "Premium",
    specs: [
      { label: "Types", value: "Overhead rain, hand shower, shower panel" },
      { label: "Body", value: "SS 304 face plate, silicone anti-clog nozzles" },
      { label: "Diverter", value: "2-way and 4-way concealed diverters" },
      { label: "Install", value: "Ceiling or wall arm, both stocked" },
    ],
    related: ["faucets", "wash-basins", "wall-tiles-collection"],
  },
  {
    id: "bathroom-accessories",
    title: "Bathroom Accessories",
    tagline: "Towel rails, mirrors, hooks and holders that finish the room.",
    image: accessoriesImg,
    productId: "washroom",
    priceFrom: "₹450",
    material: "Stainless steel",
    finishes: ["Chrome", "Brushed Gold", "Matte Black"],
    brands: ["Jaquar", "Cera", "Hindware"],
    colors: ["Chrome", "Gold", "Black"],
    textures: ["Smooth"],
    sizes: ["Standard"],
    usage: ["Bathware"],
    rooms: ["Bathroom"],
    priceBand: "Value",
    specs: [
      { label: "Range", value: "Towel rail, ring, robe hook, soap dish" },
      { label: "Mirrors", value: "LED backlit and plain bevelled" },
      { label: "Material", value: "SS 304 — rust free in wet areas" },
      { label: "Fixing", value: "Concealed screw plates included" },
    ],
    related: ["faucets", "wash-basins", "shower-systems"],
  },
  {
    id: "wall-tiles-collection",
    title: "Wall Tiles",
    tagline: "Highlighters, 3D relief panels and full-height ceramic.",
    image: wallTilesImg,
    productId: "tiles",
    priceFrom: "₹38 / sq. ft.",
    material: "Ceramic",
    finishes: ["Glossy", "Matte", "Carving"],
    brands: ["Kajaria", "Somany", "Johnson"],
    colors: ["Ivory", "Beige", "Grey"],
    textures: ["Relief", "Smooth", "Stone"],
    sizes: ["300×450 mm", "300×600 mm", "600×1200 mm"],
    usage: ["Wall"],
    rooms: ["Bathroom", "Kitchen", "Living Room"],
    priceBand: "Value",
    specs: [
      { label: "Thickness", value: "7 – 9 mm" },
      { label: "Surface", value: "Glazed, 3D relief options" },
      { label: "Pairing", value: "Matching floor tiles for every series" },
      { label: "Coverage", value: "6 – 8 pcs per box" },
    ],
    related: ["tiles", "floor-tiles-collection", "shower-systems"],
  },
  {
    id: "floor-tiles-collection",
    title: "Floor Tiles",
    tagline: "Glossy, matte and anti-skid floors for every room of the house.",
    image: tiles2Img,
    productId: "tiles",
    priceFrom: "₹35 / sq. ft.",
    material: "Vitrified",
    finishes: ["Glossy", "Matte"],
    brands: ["Kajaria", "Somany", "Nitco", "Asian Granito"],
    colors: ["Ivory", "Grey", "Beige", "Black"],
    textures: ["Smooth", "Stone", "Wood"],
    sizes: ["2×2 ft", "2×4 ft", "800×800 mm"],
    usage: ["Floor"],
    rooms: ["Living Room", "Bedroom", "Balcony", "Terrace", "Parking", "Office"],
    priceBand: "Value",
    specs: [
      { label: "Anti-skid", value: "R10 / R11 options for wet areas" },
      { label: "Thickness", value: "9 – 10 mm" },
      { label: "PEI rating", value: "Class IV — residential and commercial" },
      { label: "Formats", value: "Large format up to 800×1600 mm" },
    ],
    related: ["tiles", "granite", "wall-tiles-collection"],
  },
];

export const collectionById = (id: string) =>
  collections.find((c) => c.id === id);

/* --------------------------------- facets --------------------------------- */

const uniq = (values: string[]) => Array.from(new Set(values)).sort();

export const facets = {
  material: uniq(collections.map((c) => c.material)),
  finish: uniq(collections.flatMap((c) => c.finishes)),
  brand: uniq(collections.flatMap((c) => c.brands)),
  color: uniq(collections.flatMap((c) => c.colors)),
  texture: uniq(collections.flatMap((c) => c.textures)),
  price: ["Value", "Premium", "Luxury"],
  size: uniq(collections.flatMap((c) => c.sizes)),
  usage: uniq(collections.flatMap((c) => c.usage)),
  room: uniq(collections.flatMap((c) => c.rooms)),
} as const;

export type FacetKey = keyof typeof facets;

export const facetLabels: Record<FacetKey, string> = {
  material: "Material",
  finish: "Finish",
  brand: "Brand",
  color: "Colour",
  texture: "Texture",
  price: "Price",
  size: "Size",
  usage: "Usage",
  room: "Room",
};

export function collectionValues(c: Collection, key: FacetKey): string[] {
  switch (key) {
    case "material":
      return [c.material];
    case "finish":
      return c.finishes;
    case "brand":
      return c.brands;
    case "color":
      return c.colors;
    case "texture":
      return c.textures;
    case "price":
      return [c.priceBand];
    case "size":
      return c.sizes;
    case "usage":
      return c.usage;
    case "room":
      return c.rooms;
  }
}

/* ------------------------- material story chapters ------------------------ */

export interface Chapter {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  collectionIds: string[];
  productId: "tiles" | "granite" | "washroom";
}

export const chapters: Chapter[] = [
  {
    id: "tiles",
    index: "01",
    eyebrow: "Chapter one",
    title: "Tiles",
    body: "Where nearly every project begins. Vitrified, ceramic and designer surfaces from India's leading houses — glossy for light, matte for calm, anti-skid where water lives.",
    image: tiles3Img,
    collectionIds: ["tiles", "floor-tiles-collection", "wall-tiles-collection"],
    productId: "tiles",
  },
  {
    id: "granite",
    index: "02",
    eyebrow: "Chapter two",
    title: "Granite",
    body: "The workhorse stone. Cut and mirror-polished to your drawing for kitchen platforms, staircases and reception tops that shrug off two decades of use.",
    image: granite2Img,
    collectionIds: ["granite"],
    productId: "granite",
  },
  {
    id: "marble",
    index: "03",
    eyebrow: "Chapter three",
    title: "Marble",
    body: "Quiet luxury with a grain no two slabs share. Italian and Indian marble for living room floors, feature walls and temples that deserve a soft glow.",
    image: marbleImg,
    collectionIds: ["marble"],
    productId: "granite",
  },
  {
    id: "sanitary",
    index: "04",
    eyebrow: "Chapter four",
    title: "Sanitary",
    body: "The last ten percent that decides how a bathroom feels. Basins, faucets, shower systems and accessories from Jaquar, Hindware, Cera and Parryware.",
    image: basinImg,
    collectionIds: [
      "wash-basins",
      "faucets",
      "shower-systems",
      "bathroom-accessories",
    ],
    productId: "washroom",
  },
];

export const galleryExtras = [tilesImg, tiles2Img];
