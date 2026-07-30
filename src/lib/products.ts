import tilesImg from "@/assets/tiles.jpg";
import graniteImg from "@/assets/granite.jpg";
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
    id: "granite",
    title: "Granite & Natural Stone",
    shortTitle: "Granite",
    description: "Durable granite slabs for elegant flooring, staircases, and countertops.",
    details:
      "Choose from black, grey, brown, and speckled granite slabs — polished, honed, and flamed finishes for kitchens, countertops, and heavy-traffic flooring.",
    image: graniteImg,
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
