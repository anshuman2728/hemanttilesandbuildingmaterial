import tilesImg from "@/assets/tiles.jpg";
import marbleImg from "@/assets/marble.jpg";
import washroomImg from "@/assets/washroom.jpg";

export interface Product {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  details: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "tiles",
    title: "Ceramic & Vitrified Tiles",
    shortTitle: "Tiles",
    description: "Durable, stylish tiles for floors, walls, kitchens, and bathrooms.",
    details:
      "Explore a wide range of ceramic, vitrified, and designer tiles in glossy, matte, and textured finishes.",
    image: tilesImg,
  },
  {
    id: "marble",
    title: "Marble & Granite",
    shortTitle: "Marble",
    description: "Natural and engineered marble for elegant flooring and countertops.",
    details:
      "Choose from imported and Indian marble, granite slabs, and countertop surfaces that add lasting value.",
    image: marbleImg,
  },
  {
    id: "washroom",
    title: "Washroom Appliances",
    shortTitle: "Washroom",
    description: "Sanitary ware, taps, fittings, and complete bathroom solutions.",
    details:
      "Complete washroom solutions including sanitary ware, CP fittings, faucets, showers, and accessories.",
    image: washroomImg,
  },
];
