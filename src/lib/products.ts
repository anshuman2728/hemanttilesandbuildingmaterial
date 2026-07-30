import tilesImg from "@/assets/tiles.jpg";
import tiles2Img from "@/assets/tiles-2.jpg";
import tiles3Img from "@/assets/tiles-3.jpg";
import graniteImg from "@/assets/granite.jpg";
import granite2Img from "@/assets/granite-2.jpg";
import granite3Img from "@/assets/granite-3.jpg";
import washroomImg from "@/assets/washroom.jpg";
import washroom2Img from "@/assets/washroom-2.jpg";
import washroom3Img from "@/assets/washroom-3.jpg";

export interface ProductVariant {
  name: string;
  size: string;
  finish: string;
  price: string;
}

export interface Product {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  details: string;
  image: string;
  gallery: { src: string; alt: string }[];
  priceFrom: string;
  priceUnit: string;
  sizes: string[];
  finishes: string[];
  highlights: string[];
  variants: ProductVariant[];
}

export const products: Product[] = [
  {
    id: "tiles",
    title: "Ceramic & Vitrified Tiles",
    shortTitle: "Tiles",
    description:
      "Durable, stylish tiles for floors, walls, kitchens, and bathrooms.",
    details:
      "Explore a wide range of ceramic, vitrified, and designer tiles in glossy, matte, and textured finishes.",
    image: tilesImg,
    gallery: [
      { src: tilesImg, alt: "Tile showroom display with ceramic tile samples" },
      { src: tiles2Img, alt: "Glossy large-format vitrified floor tiles in a living room" },
      { src: tiles3Img, alt: "Wall display of matte and textured ceramic wall tiles" },
    ],
    priceFrom: "₹32",
    priceUnit: "per sq. ft.",
    sizes: ['2×2 ft (600×600 mm)', '2×4 ft (600×1200 mm)', '1×1 ft (300×300 mm)', '1×2 ft (300×600 mm)'],
    finishes: ["Glossy", "Matte", "Carving / textured", "Wood finish", "Anti-skid"],
    highlights: [
      "Suitable for floors, walls, kitchens, and balconies",
      "Anti-skid options for bathrooms and outdoor areas",
      "Branded double-charge and GVT vitrified tiles in stock",
      "Bulk rates for builders and contractors",
    ],
    variants: [
      { name: "Ceramic floor tile", size: "1×1 ft", finish: "Matte", price: "₹32 – ₹55 / sq. ft." },
      { name: "Vitrified tile (GVT)", size: "2×2 ft", finish: "Glossy", price: "₹55 – ₹95 / sq. ft." },
      { name: "Double charge vitrified", size: "2×2 ft", finish: "Polished", price: "₹70 – ₹120 / sq. ft." },
      { name: "Large format slab tile", size: "2×4 ft", finish: "Glossy / matte", price: "₹95 – ₹180 / sq. ft." },
      { name: "Wall tile", size: "1×2 ft", finish: "Digital print", price: "₹38 – ₹80 / sq. ft." },
    ],
  },
  {
    id: "granite",
    title: "Granite & Natural Stone",
    shortTitle: "Granite",
    description:
      "Durable granite slabs for elegant flooring, staircases, and countertops.",
    details:
      "Choose from black, grey, brown, and speckled granite slabs — polished, honed, and flamed finishes for kitchens, countertops, and heavy-traffic flooring.",
    image: graniteImg,
    gallery: [
      { src: graniteImg, alt: "Polished granite slabs standing in a showroom" },
      { src: granite2Img, alt: "Black speckled granite kitchen countertop close-up" },
      { src: granite3Img, alt: "Grey granite staircase steps in a modern home" },
    ],
    priceFrom: "₹85",
    priceUnit: "per sq. ft.",
    sizes: ["Slabs up to 9×5 ft", "Countertop strips 2 ft wide", "Staircase treads & risers", "Custom cut to size"],
    finishes: ["Polished", "Honed", "Leathered", "Flamed"],
    highlights: [
      "Black, grey, brown, and speckled varieties in stock",
      "Ideal for kitchen platforms, staircases, and door frames",
      "Cutting, edge polishing, and sizing available",
      "Heat, scratch, and stain resistant natural stone",
    ],
    variants: [
      { name: "Black granite", size: "Slab / cut to size", finish: "Polished", price: "₹110 – ₹190 / sq. ft." },
      { name: "Grey granite", size: "Slab / cut to size", finish: "Polished", price: "₹85 – ₹140 / sq. ft." },
      { name: "Brown / speckled granite", size: "Slab", finish: "Polished", price: "₹95 – ₹165 / sq. ft." },
      { name: "Kitchen platform strip", size: "2 ft wide", finish: "Polished + nosing", price: "₹130 – ₹220 / sq. ft." },
      { name: "Staircase tread set", size: "Custom", finish: "Polished", price: "On request" },
    ],
  },
  {
    id: "washroom",
    title: "Washroom Appliances",
    shortTitle: "Washroom",
    description: "Sanitary ware, taps, fittings, and complete bathroom solutions.",
    details:
      "Complete washroom solutions including sanitary ware, CP fittings, faucets, showers, and accessories.",
    image: washroomImg,
    gallery: [
      { src: washroomImg, alt: "Bathroom fittings and sanitary ware display" },
      { src: washroom2Img, alt: "Showroom shelves with wash basins and wall-hung toilets" },
      { src: washroom3Img, alt: "Chrome faucets and CP fittings on a showroom panel" },
    ],
    priceFrom: "₹450",
    priceUnit: "per piece",
    sizes: ["Standard & compact basins", "Wall-hung and floor-mounted WCs", "Single & multi-flow taps", "Overhead / rain showers"],
    finishes: ["Chrome", "Matte black", "Brushed steel", "Glossy white ceramic"],
    highlights: [
      "Branded sanitary ware and CP fittings",
      "Complete bathroom packages for new builds",
      "Concealed cisterns, health faucets, and accessories",
      "Guidance on matching fittings with your tile selection",
    ],
    variants: [
      { name: "Wash basin (wall-hung)", size: "Standard", finish: "Glossy white", price: "₹1,200 – ₹4,500" },
      { name: "Wall-hung WC + seat", size: "Standard", finish: "Glossy white", price: "₹6,500 – ₹18,000" },
      { name: "Pillar cock / basin tap", size: "Standard", finish: "Chrome", price: "₹450 – ₹2,800" },
      { name: "Overhead rain shower", size: '6" – 12"', finish: "Chrome", price: "₹900 – ₹6,000" },
      { name: "Health faucet set", size: "Standard", finish: "Chrome", price: "₹450 – ₹1,600" },
    ],
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
