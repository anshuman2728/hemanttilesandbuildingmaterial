import ivory from "@/assets/swatch-ivory-marble.jpg";
import charcoal from "@/assets/swatch-charcoal.jpg";
import beige from "@/assets/swatch-beige-stone.jpg";
import wood from "@/assets/swatch-wood.jpg";
import graniteImg from "@/assets/granite.jpg";
import tiles3 from "@/assets/tiles-3.jpg";

export interface TileSwatch {
  id: string;
  name: string;
  family: string;
  image: string;
  priceFrom: string;
}

export const tileSwatches: TileSwatch[] = [
  {
    id: "ivory-marble",
    name: "Ivory Statuario",
    family: "Marble-look vitrified",
    image: ivory,
    priceFrom: "₹68 / sq ft",
  },
  {
    id: "charcoal",
    name: "Charcoal Matte",
    family: "Full-body porcelain",
    image: charcoal,
    priceFrom: "₹75 / sq ft",
  },
  {
    id: "beige-stone",
    name: "Desert Sandstone",
    family: "Natural stone-look",
    image: beige,
    priceFrom: "₹52 / sq ft",
  },
  {
    id: "wood",
    name: "Oak Plank",
    family: "Wood-finish tile",
    image: wood,
    priceFrom: "₹62 / sq ft",
  },
  {
    id: "granite",
    name: "Premium Granite",
    family: "Natural granite slab",
    image: graniteImg,
    priceFrom: "₹120 / sq ft",
  },
  {
    id: "glazed",
    name: "Glazed Designer",
    family: "Glossy ceramic",
    image: tiles3,
    priceFrom: "₹42 / sq ft",
  },
];
