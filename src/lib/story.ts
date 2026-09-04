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

/* ------------------------- explore by space (rooms) ----------------------- */

export interface FeaturedPick {
  name: string;
  price: string;
  productId: "tiles" | "granite" | "washroom";
}

export interface Room {
  id: string;
  label: string;
  image: string;
  /** Short line shown on the card. */
  note: string;
  /** Editorial paragraph shown in the detail view. */
  description: string;
  /** Product route this room maps to. */
  productId: "tiles" | "granite" | "washroom";
  /** Quick chips revealed on hover. */
  picks: string[];
  recommendedTiles: string[];
  recommendedFinishes: string[];
  recommendedSizes: string[];
  matchingMaterials: string[];
  featured: FeaturedPick[];
  /** Matches ProjectShot.category in @/lib/trust for completed work. */
  projectCategory: "Bathrooms" | "Kitchens" | "Hotels" | "Homes" | "Commercial";
}

export const rooms: Room[] = [
  {
    id: "bathroom",
    label: "Bathroom",
    image: bathroomImg,
    note: "Anti-skid floors, tall wall tiles and matching bathware.",
    description:
      "A bathroom is decided by grip and light. We pair certified anti-skid floors with full-height wall tiles, then match the sanitaryware and CP fittings in the same visit.",
    productId: "washroom",
    picks: ["Anti-skid floor tiles", "Designer wall tiles", "Wall hung WC"],
    recommendedTiles: ["Wall tiles", "Anti-skid floor tiles", "Highlighters"],
    recommendedFinishes: ["Anti-skid", "Matte", "Digital print"],
    recommendedSizes: ["1×2 ft (300×600 mm)", "1×1 ft (300×300 mm)", "2×2 ft (600×600 mm)"],
    matchingMaterials: ["Granite counter", "Marble vanity top", "Sanitary ware", "Faucets"],
    featured: [
      { name: "Wall tile (digital print)", price: "₹38 – ₹80 / sq. ft.", productId: "tiles" },
      { name: "Wall-hung WC + seat", price: "₹6,500 – ₹18,000", productId: "washroom" },
      { name: "Health faucet set", price: "₹450 – ₹1,600", productId: "washroom" },
    ],
    projectCategory: "Bathrooms",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    image: kitchenImg,
    note: "Stain-proof granite platforms with easy-clean highlighter walls.",
    description:
      "Kitchens live on the platform. Mirror-polished granite cut to your drawing, with a wipe-clean highlighter wall behind it and a matte floor that hides everyday traffic.",
    productId: "granite",
    picks: ["Black granite platform", "Kitchen wall tiles", "Sink faucet"],
    recommendedTiles: ["Kitchen wall tiles", "Matte floor tiles", "Highlighters"],
    recommendedFinishes: ["Polished", "Matte", "Glossy"],
    recommendedSizes: ["2 ft wide platform strip", "1×2 ft wall", "2×2 ft floor"],
    matchingMaterials: ["Black granite", "Marble", "Sink faucets"],
    featured: [
      { name: "Kitchen platform strip", price: "₹130 – ₹220 / sq. ft.", productId: "granite" },
      { name: "Black granite", price: "₹110 – ₹190 / sq. ft.", productId: "granite" },
      { name: "Pillar cock / basin tap", price: "₹450 – ₹2,800", productId: "washroom" },
    ],
    projectCategory: "Kitchens",
  },
  {
    id: "living",
    label: "Living Room",
    image: livingImg,
    note: "Large-format glossy floors that carry light across the room.",
    description:
      "The living room is where format matters most. Fewer joints, more reflection — large glossy vitrified slabs make the space read as one continuous surface.",
    productId: "tiles",
    picks: ["2×4 ft glossy vitrified", "Marble finish tiles", "Feature wall"],
    recommendedTiles: ["Large format slab tiles", "Marble-look vitrified", "Feature wall tiles"],
    recommendedFinishes: ["Glossy", "Polished", "Carving / textured"],
    recommendedSizes: ["2×4 ft (600×1200 mm)", "2×2 ft (600×600 mm)", "800×1600 mm"],
    matchingMaterials: ["Italian marble", "Granite skirting"],
    featured: [
      { name: "Large format slab tile", price: "₹95 – ₹180 / sq. ft.", productId: "tiles" },
      { name: "Double charge vitrified", price: "₹70 – ₹120 / sq. ft.", productId: "tiles" },
      { name: "Marble finish flooring", price: "₹180 / sq. ft. onwards", productId: "granite" },
    ],
    projectCategory: "Homes",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    image: bedroomImg,
    note: "Warm wooden-finish surfaces with a soft matte touch.",
    description:
      "Bedrooms want warmth underfoot. Wood-finish planks and soft matte vitrified keep glare down, with matching skirting to finish the edges cleanly.",
    productId: "tiles",
    picks: ["Wooden finish tiles", "Matte vitrified", "Skirting"],
    recommendedTiles: ["Wood-finish tiles", "Matte vitrified", "Skirting tiles"],
    recommendedFinishes: ["Wood finish", "Matte", "Carving / textured"],
    recommendedSizes: ["2×2 ft (600×600 mm)", "1×4 ft plank", "2×4 ft (600×1200 mm)"],
    matchingMaterials: ["Granite door frames", "Marble window sills"],
    featured: [
      { name: "Wood-finish vitrified tile", price: "₹62 / sq. ft. onwards", productId: "tiles" },
      { name: "Vitrified tile (GVT)", price: "₹55 – ₹95 / sq. ft.", productId: "tiles" },
      { name: "Granite skirting / frames", price: "₹85 – ₹140 / sq. ft.", productId: "granite" },
    ],
    projectCategory: "Homes",
  },
  {
    id: "outdoor",
    label: "Outdoor",
    image: outdoorImg,
    note: "Weather-tested paving with real grip underfoot.",
    description:
      "Outside, the surface has to survive sun, rain and grit. Full-body stone-finish paving holds its texture and colour season after season.",
    productId: "tiles",
    picks: ["Anti-skid outdoor tiles", "Stone finish paving", "Elevation tiles"],
    recommendedTiles: ["Outdoor paving tiles", "Elevation tiles", "Stone-finish tiles"],
    recommendedFinishes: ["Anti-skid", "Rustic matte", "Stone texture"],
    recommendedSizes: ["1×1 ft (300×300 mm)", "2×2 ft (600×600 mm)"],
    matchingMaterials: ["Granite steps", "Kota / natural stone"],
    featured: [
      { name: "Anti-skid outdoor tile", price: "₹42 / sq. ft. onwards", productId: "tiles" },
      { name: "Grey granite steps", price: "₹85 – ₹140 / sq. ft.", productId: "granite" },
      { name: "Adhesive + grout", price: "On request", productId: "tiles" },
    ],
    projectCategory: "Homes",
  },
  {
    id: "balcony",
    label: "Balcony",
    image: balconyImg,
    note: "Compact formats and slip-safe finishes for open edges.",
    description:
      "Balconies are small, wet and visible from inside. Compact rustic formats grip well when it rains and still tie into the adjoining room.",
    productId: "tiles",
    picks: ["Balcony tiles", "Rustic matte tiles", "Waterproofing"],
    recommendedTiles: ["Rustic matte tiles", "Anti-skid tiles", "Wood-finish tiles"],
    recommendedFinishes: ["Anti-skid", "Rustic matte", "Wood finish"],
    recommendedSizes: ["1×1 ft (300×300 mm)", "1×2 ft (300×600 mm)"],
    matchingMaterials: ["Granite railing coping"],
    featured: [
      { name: "Ceramic anti-skid tile", price: "₹32 – ₹55 / sq. ft.", productId: "tiles" },
      { name: "Wood-finish balcony tile", price: "₹62 / sq. ft. onwards", productId: "tiles" },
      { name: "Waterproofing + grout", price: "On request", productId: "tiles" },
    ],
    projectCategory: "Homes",
  },
  {
    id: "terrace",
    label: "Terrace",
    image: terraceImg,
    note: "Heat-reflective, rain-ready surfaces built for full sun.",
    description:
      "A terrace takes the harshest load in Varanasi. Lighter, heat-reflective bodies with a coarse grip keep it usable through summer and monsoon.",
    productId: "tiles",
    picks: ["Terrace tiles", "Cool roof tiles", "Anti-skid paving"],
    recommendedTiles: ["Terrace / cool roof tiles", "Anti-skid paving", "Elevation tiles"],
    recommendedFinishes: ["Anti-skid", "Matte", "Stone texture"],
    recommendedSizes: ["1×1 ft (300×300 mm)", "2×2 ft (600×600 mm)"],
    matchingMaterials: ["Granite coping", "Stone paving"],
    featured: [
      { name: "Terrace anti-skid tile", price: "₹38 / sq. ft. onwards", productId: "tiles" },
      { name: "Stone-finish paving", price: "₹52 / sq. ft. onwards", productId: "tiles" },
      { name: "Granite coping strip", price: "₹95 – ₹165 / sq. ft.", productId: "granite" },
    ],
    projectCategory: "Hotels",
  },
  {
    id: "office",
    label: "Office",
    image: officeImg,
    note: "Uniform double-charge floors that survive chair castors.",
    description:
      "Offices need one shade across hundreds of boxes. Double-charge vitrified holds calibration and takes castor traffic without dulling.",
    productId: "tiles",
    picks: ["Double charge vitrified", "Granite reception top", "Bulk pricing"],
    recommendedTiles: ["Double charge vitrified", "Full-body porcelain", "Wall cladding"],
    recommendedFinishes: ["Polished", "Matte", "Glossy"],
    recommendedSizes: ["2×2 ft (600×600 mm)", "2×4 ft (600×1200 mm)"],
    matchingMaterials: ["Granite reception counter", "Marble lobby"],
    featured: [
      { name: "Double charge vitrified", price: "₹70 – ₹120 / sq. ft.", productId: "tiles" },
      { name: "Granite reception top", price: "₹130 – ₹220 / sq. ft.", productId: "granite" },
      { name: "Washroom package", price: "₹450 onwards", productId: "washroom" },
    ],
    projectCategory: "Commercial",
  },
  {
    id: "commercial",
    label: "Commercial",
    image: commercialImg,
    note: "Scale, shade consistency and project rates.",
    description:
      "For showrooms, hotels and hospitals we quote on drawings — single-batch supply, staged site delivery and project rates for bulk sanitaryware.",
    productId: "tiles",
    picks: ["Heavy-duty vitrified", "Bulk sanitaryware", "Project quotation"],
    recommendedTiles: ["Heavy-duty vitrified", "Large format slabs", "Anti-skid service areas"],
    recommendedFinishes: ["Polished", "Matte", "Anti-skid"],
    recommendedSizes: ["2×2 ft (600×600 mm)", "2×4 ft (600×1200 mm)", "800×1600 mm"],
    matchingMaterials: ["Granite", "Italian marble", "Bulk sanitary ware"],
    featured: [
      { name: "Heavy-duty vitrified", price: "₹70 – ₹120 / sq. ft.", productId: "tiles" },
      { name: "Italian marble lobby", price: "₹180 / sq. ft. onwards", productId: "granite" },
      { name: "Bulk CP fittings", price: "Project rates", productId: "washroom" },
    ],
    projectCategory: "Commercial",
  },
  {
    id: "parking",
    label: "Parking",
    image: parkingImg,
    note: "High-abrasion tiles that take vehicle load and grit.",
    description:
      "Parking floors face point loads and grit. Heavy-duty matte bodies with a deep texture resist abrasion and stay grippy when wet.",
    productId: "tiles",
    picks: ["Parking tiles", "Heavy duty matte", "Grout + adhesive"],
    recommendedTiles: ["Parking tiles", "Heavy-duty matte", "Anti-skid tiles"],
    recommendedFinishes: ["Heavy-duty matte", "Anti-skid", "Stone texture"],
    recommendedSizes: ["1×1 ft (300×300 mm)", "2×2 ft (600×600 mm)"],
    matchingMaterials: ["Granite kerb / ramp edging"],
    featured: [
      { name: "Parking tile (heavy duty)", price: "₹42 / sq. ft. onwards", productId: "tiles" },
      { name: "Granite ramp edging", price: "₹85 – ₹140 / sq. ft.", productId: "granite" },
      { name: "Adhesive + grout", price: "On request", productId: "tiles" },
    ],
    projectCategory: "Commercial",
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
