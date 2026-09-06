import tilesImg from "@/assets/tiles.jpg";
import tiles2Img from "@/assets/tiles-2.jpg";
import tiles3Img from "@/assets/tiles-3.jpg";
import wallTilesImg from "@/assets/wall-tiles.jpg";
import floorTilesImg from "@/assets/floor-tiles.jpg";
import graniteImg from "@/assets/granite.jpg";
import granite2Img from "@/assets/granite-2.jpg";
import granite3Img from "@/assets/granite-3.jpg";
import washroomImg from "@/assets/washroom.jpg";
import washroom2Img from "@/assets/washroom-2.jpg";
import washroom3Img from "@/assets/washroom-3.jpg";
import basinImg from "@/assets/basin.jpg";
import faucetsImg from "@/assets/faucets.jpg";
import showerImg from "@/assets/shower.jpg";
import accessoriesImg from "@/assets/accessories.jpg";
import swatchWood from "@/assets/swatch-wood.jpg";
import swatchCharcoal from "@/assets/swatch-charcoal.jpg";
import swatchIvory from "@/assets/swatch-ivory-marble.jpg";

/**
 * Catalogue items are derived from the existing product ranges in
 * `src/lib/products.ts` — nothing here is invented. Fields we do not yet hold
 * data for (brand, certifications) are intentionally left empty so they can be
 * filled in later without touching the UI.
 */
export interface CatalogItem {
  id: string;
  /** Parent category route: /products/$productId */
  categoryId: "tiles" | "granite" | "washroom";
  name: string;
  collection: string;
  material: string;
  finishes: string[];
  sizes: string[];
  colors: string[];
  applications: string[];
  rooms: string[];
  placement: "Indoor" | "Outdoor" | "Indoor & Outdoor";
  /** Exactly as quoted in the existing range data. */
  price: string;
  /** Lowest number in the price string, for sorting/filtering only. */
  priceValue: number | null;
  image: string;
  /** No per-product brand data recorded yet. */
  brand?: string;
}

export const catalogItems: CatalogItem[] = [
  /* ------------------------------- tiles ------------------------------- */
  {
    id: "ceramic-floor-tile",
    categoryId: "tiles",
    name: "Ceramic Floor Tile",
    collection: "Ceramic & Vitrified Tiles",
    material: "Ceramic",
    finishes: ["Matte"],
    sizes: ["1×1 ft (300×300 mm)"],
    colors: [],
    applications: ["Floor"],
    rooms: ["Bathroom", "Balcony", "Utility"],
    placement: "Indoor",
    price: "₹32 – ₹55 / sq. ft.",
    priceValue: 32,
    image: floorTilesImg,
  },
  {
    id: "vitrified-gvt",
    categoryId: "tiles",
    name: "Vitrified Tile (GVT)",
    collection: "Ceramic & Vitrified Tiles",
    material: "Vitrified",
    finishes: ["Glossy"],
    sizes: ["2×2 ft (600×600 mm)"],
    colors: [],
    applications: ["Floor"],
    rooms: ["Living Room", "Bedroom", "Office"],
    placement: "Indoor",
    price: "₹55 – ₹95 / sq. ft.",
    priceValue: 55,
    image: tiles2Img,
  },
  {
    id: "double-charge-vitrified",
    categoryId: "tiles",
    name: "Double Charge Vitrified",
    collection: "Ceramic & Vitrified Tiles",
    material: "Vitrified",
    finishes: ["Polished"],
    sizes: ["2×2 ft (600×600 mm)"],
    colors: [],
    applications: ["Floor", "Heavy traffic"],
    rooms: ["Commercial", "Office", "Living Room"],
    placement: "Indoor",
    price: "₹70 – ₹120 / sq. ft.",
    priceValue: 70,
    image: tilesImg,
  },
  {
    id: "large-format-slab-tile",
    categoryId: "tiles",
    name: "Large Format Slab Tile",
    collection: "Ceramic & Vitrified Tiles",
    material: "Vitrified",
    finishes: ["Glossy", "Matte"],
    sizes: ["2×4 ft (600×1200 mm)"],
    colors: [],
    applications: ["Floor", "Wall"],
    rooms: ["Living Room", "Bathroom", "Commercial"],
    placement: "Indoor",
    price: "₹95 – ₹180 / sq. ft.",
    priceValue: 95,
    image: swatchIvory,
  },
  {
    id: "wall-tile",
    categoryId: "tiles",
    name: "Wall Tile",
    collection: "Ceramic & Vitrified Tiles",
    material: "Ceramic",
    finishes: ["Digital print"],
    sizes: ["1×2 ft (300×600 mm)"],
    colors: [],
    applications: ["Wall"],
    rooms: ["Bathroom", "Kitchen"],
    placement: "Indoor",
    price: "₹38 – ₹80 / sq. ft.",
    priceValue: 38,
    image: wallTilesImg,
  },
  {
    id: "wood-finish-tile",
    categoryId: "tiles",
    name: "Wood Finish Tile",
    collection: "Ceramic & Vitrified Tiles",
    material: "Vitrified",
    finishes: ["Wood finish", "Matte"],
    sizes: [],
    colors: ["Wood"],
    applications: ["Floor"],
    rooms: ["Bedroom", "Living Room"],
    placement: "Indoor",
    price: "Rates on request",
    priceValue: null,
    image: swatchWood,
  },
  {
    id: "anti-skid-tile",
    categoryId: "tiles",
    name: "Anti-skid Tile",
    collection: "Ceramic & Vitrified Tiles",
    material: "Ceramic",
    finishes: ["Anti-skid", "Carving / textured"],
    sizes: [],
    colors: [],
    applications: ["Floor", "Wet area"],
    rooms: ["Bathroom", "Balcony", "Outdoor", "Parking"],
    placement: "Indoor & Outdoor",
    price: "Rates on request",
    priceValue: null,
    image: tiles3Img,
  },
  {
    id: "textured-tile",
    categoryId: "tiles",
    name: "Carved / Textured Tile",
    collection: "Ceramic & Vitrified Tiles",
    material: "Ceramic",
    finishes: ["Carving / textured"],
    sizes: [],
    colors: ["Charcoal"],
    applications: ["Wall", "Elevation"],
    rooms: ["Outdoor", "Living Room"],
    placement: "Indoor & Outdoor",
    price: "Rates on request",
    priceValue: null,
    image: swatchCharcoal,
  },

  /* ------------------------------ granite ------------------------------ */
  {
    id: "black-granite",
    categoryId: "granite",
    name: "Black Granite",
    collection: "Granite & Natural Stone",
    material: "Granite",
    finishes: ["Polished"],
    sizes: ["Slabs up to 9×5 ft", "Custom cut to size"],
    colors: ["Black"],
    applications: ["Countertop", "Floor", "Door frame"],
    rooms: ["Kitchen", "Living Room"],
    placement: "Indoor & Outdoor",
    price: "₹110 – ₹190 / sq. ft.",
    priceValue: 110,
    image: granite2Img,
  },
  {
    id: "grey-granite",
    categoryId: "granite",
    name: "Grey Granite",
    collection: "Granite & Natural Stone",
    material: "Granite",
    finishes: ["Polished"],
    sizes: ["Slabs up to 9×5 ft", "Custom cut to size"],
    colors: ["Grey"],
    applications: ["Floor", "Staircase"],
    rooms: ["Living Room", "Commercial"],
    placement: "Indoor & Outdoor",
    price: "₹85 – ₹140 / sq. ft.",
    priceValue: 85,
    image: granite3Img,
  },
  {
    id: "brown-speckled-granite",
    categoryId: "granite",
    name: "Brown / Speckled Granite",
    collection: "Granite & Natural Stone",
    material: "Granite",
    finishes: ["Polished"],
    sizes: ["Slabs up to 9×5 ft"],
    colors: ["Brown"],
    applications: ["Countertop", "Floor"],
    rooms: ["Kitchen", "Living Room"],
    placement: "Indoor & Outdoor",
    price: "₹95 – ₹165 / sq. ft.",
    priceValue: 95,
    image: graniteImg,
  },
  {
    id: "kitchen-platform-strip",
    categoryId: "granite",
    name: "Kitchen Platform Strip",
    collection: "Granite & Natural Stone",
    material: "Granite",
    finishes: ["Polished + nosing"],
    sizes: ["Countertop strips 2 ft wide"],
    colors: [],
    applications: ["Countertop"],
    rooms: ["Kitchen"],
    placement: "Indoor",
    price: "₹130 – ₹220 / sq. ft.",
    priceValue: 130,
    image: granite2Img,
  },
  {
    id: "staircase-tread-set",
    categoryId: "granite",
    name: "Staircase Tread Set",
    collection: "Granite & Natural Stone",
    material: "Granite",
    finishes: ["Polished", "Honed", "Leathered", "Flamed"],
    sizes: ["Staircase treads & risers", "Custom cut to size"],
    colors: [],
    applications: ["Staircase"],
    rooms: ["Living Room", "Commercial"],
    placement: "Indoor & Outdoor",
    price: "On request",
    priceValue: null,
    image: granite3Img,
  },

  /* ----------------------------- washroom ------------------------------ */
  {
    id: "wall-hung-basin",
    categoryId: "washroom",
    name: "Wash Basin (wall-hung)",
    collection: "Washroom Appliances",
    material: "Ceramic",
    finishes: ["Glossy white ceramic"],
    sizes: ["Standard & compact basins"],
    colors: ["White"],
    applications: ["Sanitary ware"],
    rooms: ["Bathroom"],
    placement: "Indoor",
    price: "₹1,200 – ₹4,500",
    priceValue: 1200,
    image: basinImg,
  },
  {
    id: "wall-hung-wc",
    categoryId: "washroom",
    name: "Wall-hung WC + Seat",
    collection: "Washroom Appliances",
    material: "Ceramic",
    finishes: ["Glossy white ceramic"],
    sizes: ["Wall-hung and floor-mounted WCs"],
    colors: ["White"],
    applications: ["Sanitary ware"],
    rooms: ["Bathroom"],
    placement: "Indoor",
    price: "₹6,500 – ₹18,000",
    priceValue: 6500,
    image: washroom2Img,
  },
  {
    id: "basin-tap",
    categoryId: "washroom",
    name: "Pillar Cock / Basin Tap",
    collection: "Washroom Appliances",
    material: "CP fitting",
    finishes: ["Chrome", "Matte black", "Brushed steel"],
    sizes: ["Single & multi-flow taps"],
    colors: ["Chrome", "Black"],
    applications: ["CP fitting"],
    rooms: ["Bathroom", "Kitchen"],
    placement: "Indoor",
    price: "₹450 – ₹2,800",
    priceValue: 450,
    image: faucetsImg,
  },
  {
    id: "rain-shower",
    categoryId: "washroom",
    name: "Overhead Rain Shower",
    collection: "Washroom Appliances",
    material: "CP fitting",
    finishes: ["Chrome"],
    sizes: ['6" – 12"', "Overhead / rain showers"],
    colors: ["Chrome"],
    applications: ["CP fitting"],
    rooms: ["Bathroom"],
    placement: "Indoor",
    price: "₹900 – ₹6,000",
    priceValue: 900,
    image: showerImg,
  },
  {
    id: "health-faucet",
    categoryId: "washroom",
    name: "Health Faucet Set",
    collection: "Washroom Appliances",
    material: "CP fitting",
    finishes: ["Chrome"],
    sizes: ["Standard"],
    colors: ["Chrome"],
    applications: ["CP fitting", "Accessory"],
    rooms: ["Bathroom"],
    placement: "Indoor",
    price: "₹450 – ₹1,600",
    priceValue: 450,
    image: accessoriesImg,
  },
  {
    id: "bathroom-accessories",
    categoryId: "washroom",
    name: "Bathroom Accessories",
    collection: "Washroom Appliances",
    material: "CP fitting",
    finishes: ["Chrome", "Matte black"],
    sizes: [],
    colors: ["Chrome", "Black"],
    applications: ["Accessory"],
    rooms: ["Bathroom"],
    placement: "Indoor",
    price: "Rates on request",
    priceValue: null,
    image: washroom3Img,
  },
  {
    id: "complete-bathroom-package",
    categoryId: "washroom",
    name: "Complete Bathroom Package",
    collection: "Washroom Appliances",
    material: "Mixed",
    finishes: [],
    sizes: [],
    colors: [],
    applications: ["Sanitary ware", "CP fitting", "Accessory"],
    rooms: ["Bathroom"],
    placement: "Indoor",
    price: "Quoted per bathroom",
    priceValue: null,
    image: washroomImg,
  },
];

/* ------------------------------- facet helpers ------------------------------ */

const uniq = (values: string[]) => [...new Set(values)].sort();

export const facets = {
  rooms: uniq(catalogItems.flatMap((i) => i.rooms)),
  materials: uniq(catalogItems.map((i) => i.material)),
  finishes: uniq(catalogItems.flatMap((i) => i.finishes)),
  colors: uniq(catalogItems.flatMap((i) => i.colors)),
  sizes: uniq(catalogItems.flatMap((i) => i.sizes)),
  applications: uniq(catalogItems.flatMap((i) => i.applications)),
  placements: ["Indoor", "Outdoor", "Indoor & Outdoor"],
  /** Empty until per-product brand data is recorded. */
  brands: uniq(catalogItems.map((i) => i.brand ?? "").filter(Boolean)),
};

/** Search terms that should match items even when not written on the card. */
const synonyms: Record<string, string[]> = {
  marble: ["large-format-slab-tile", "grey-granite"],
  granite: ["black-granite", "grey-granite", "brown-speckled-granite", "kitchen-platform-strip", "staircase-tread-set"],
  "600x1200": ["large-format-slab-tile"],
  "600×1200": ["large-format-slab-tile"],
  "600x600": ["vitrified-gvt", "double-charge-vitrified"],
  "300x600": ["wall-tile"],
  black: ["black-granite", "swatch", "basin-tap", "bathroom-accessories", "textured-tile"],
  sanitary: ["wall-hung-basin", "wall-hung-wc", "complete-bathroom-package"],
  tap: ["basin-tap", "health-faucet"],
  faucet: ["basin-tap", "health-faucet"],
  toilet: ["wall-hung-wc"],
};

export function searchItems(items: CatalogItem[], rawQuery: string) {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return items;
  const tokens = q.split(/\s+/).filter(Boolean);

  return items.filter((item) => {
    const haystack = [
      item.name,
      item.collection,
      item.material,
      item.placement,
      ...item.finishes,
      ...item.sizes,
      ...item.colors,
      ...item.applications,
      ...item.rooms,
    ]
      .join(" ")
      .toLowerCase()
      .replace(/×/g, "x");

    return tokens.every((token) => {
      const t = token.replace(/×/g, "x");
      if (haystack.includes(t)) return true;
      for (const [key, ids] of Object.entries(synonyms)) {
        if (key.includes(t) && ids.includes(item.id)) return true;
      }
      return false;
    });
  });
}

export function getItem(id: string) {
  return catalogItems.find((i) => i.id === id);
}

export function relatedItems(item: CatalogItem, limit = 4) {
  return catalogItems
    .filter((i) => i.id !== item.id && i.categoryId === item.categoryId)
    .slice(0, limit);
}

export function matchingItems(item: CatalogItem, limit = 4) {
  return catalogItems
    .filter(
      (i) =>
        i.id !== item.id &&
        i.categoryId !== item.categoryId &&
        i.rooms.some((r) => item.rooms.includes(r)),
    )
    .slice(0, limit);
}
