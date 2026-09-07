import bathroomImg from "@/assets/space-bathroom.jpg";
import kitchenImg from "@/assets/space-kitchen.jpg";
import livingImg from "@/assets/space-living.jpg";
import bedroomImg from "@/assets/space-bedroom.jpg";
import commercialImg from "@/assets/space-commercial.jpg";
import officeImg from "@/assets/space-office.jpg";
import outdoorImg from "@/assets/space-outdoor.jpg";
import terraceImg from "@/assets/space-terrace.jpg";
import balconyImg from "@/assets/space-balcony.jpg";
import parkingImg from "@/assets/space-parking.jpg";
import hotelImg from "@/assets/project-hotel.jpg";
import washroom2Img from "@/assets/washroom-2.jpg";
import washroom3Img from "@/assets/washroom-3.jpg";
import showerImg from "@/assets/shower.jpg";
import basinImg from "@/assets/basin.jpg";
import faucetsImg from "@/assets/faucets.jpg";
import graniteImg from "@/assets/granite-2.jpg";
import granite3Img from "@/assets/granite-3.jpg";
import tiles2Img from "@/assets/tiles-2.jpg";
import tiles3Img from "@/assets/tiles-3.jpg";
import tilesImg from "@/assets/tiles.jpg";
import wallTilesImg from "@/assets/wall-tiles.jpg";
import floorTilesImg from "@/assets/floor-tiles.jpg";

/** Categories shown as filters — only ones with real projects below. */
export const projectCategories = [
  "Residential",
  "Bathrooms",
  "Kitchens",
  "Hotels",
  "Commercial",
  "Offices",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/** A product used on a project, with the surface it was used for. */
export interface ProjectProduct {
  /** e.g. Floor Tile, Wall Tile, Granite, Sanitary, Faucets */
  role: string;
  /** id in catalog-items.ts */
  itemId: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  category: ProjectCategory;
  location: string;
  description: string;
  story: string;
  hero: string;
  heroAlt: string;
  gallery: { src: string; alt: string }[];
  materials: string[];
  products: ProjectProduct[];
  beforeAfter?: {
    before: string;
    after: string;
    beforeAlt: string;
    afterAlt: string;
  };
  tall?: boolean;
}

export const projects: Project[] = [
  {
    id: "stone-clad-master-bath",
    name: "Stone-clad master bath",
    type: "Master bathroom",
    category: "Bathrooms",
    location: "Ramnagar, Varanasi",
    description:
      "A compact master bath opened up with 2×4 ft stone-finish slabs and a wall-hung suite.",
    story:
      "The room measured barely 5×7 ft, so we kept the surface count low: one stone-finish slab tile carried from the floor up the shower wall, with grout lines aligned to make the space read taller. Anti-skid flooring was used in the wet zone and a wall-hung WC freed up the floor for cleaning.",
    hero: bathroomImg,
    heroAlt: "Luxury bathroom finished with large-format stone tiles",
    gallery: [
      { src: showerImg, alt: "Shower area with rain shower and stone-finish wall tiles" },
      { src: basinImg, alt: "Wall-hung wash basin with pillar cock" },
      { src: wallTilesImg, alt: "Stone-finish wall tile detail" },
    ],
    materials: [
      "2×4 ft stone-finish slab tile (walls)",
      "Anti-skid vitrified floor tile",
      "Wall-hung sanitary suite",
    ],
    products: [
      { role: "Wall Tile", itemId: "large-format-slab-tile" },
      { role: "Floor Tile", itemId: "anti-skid-tile" },
      { role: "Sanitary", itemId: "wall-hung-wc" },
      { role: "Faucets", itemId: "rain-shower" },
    ],
    tall: true,
  },
  {
    id: "guest-washroom-package",
    name: "Guest washroom package",
    type: "Guest washroom",
    category: "Bathrooms",
    location: "Sigra, Varanasi",
    description:
      "A full guest washroom supplied as one package — tiles, basin, WC and CP fittings together.",
    story:
      "The client wanted one bill and one delivery for a guest washroom. We matched a matte wall tile with an anti-skid floor, then picked a wall-hung basin, WC, health faucet and accessories in the same chrome finish so everything arrived on site at once.",
    hero: washroom2Img,
    heroAlt: "Guest washroom with designer wash basin and CP fittings",
    gallery: [
      { src: washroom3Img, alt: "Guest washroom mirror and accessories" },
      { src: faucetsImg, alt: "Chrome CP fittings and faucets" },
      { src: wallTilesImg, alt: "Matte wall tile used in the washroom" },
    ],
    materials: [
      "Matte wall tile",
      "Anti-skid floor tile",
      "Wall-hung basin with pillar cock",
      "Health faucet and accessory set",
    ],
    products: [
      { role: "Wall Tile", itemId: "wall-tile" },
      { role: "Floor Tile", itemId: "anti-skid-tile" },
      { role: "Sanitary", itemId: "wall-hung-basin" },
      { role: "Faucets", itemId: "health-faucet" },
    ],
  },
  {
    id: "black-granite-platform",
    name: "Black granite platform",
    type: "Kitchen platform",
    category: "Kitchens",
    location: "Bhelupur, Varanasi",
    description:
      "Jet black granite platform with a highlighter wall tile above the counter.",
    story:
      "A single jet black granite slab was cut for the platform with a bullnose edge, and the sink cut-out done before delivery. Above it, a highlighter wall tile keeps the run from feeling flat, and the floor stays in a large-format matte so joints are minimal in a busy kitchen.",
    hero: kitchenImg,
    heroAlt: "Modern kitchen with black granite platform",
    gallery: [
      { src: graniteImg, alt: "Polished black granite surface detail" },
      { src: wallTilesImg, alt: "Highlighter wall tile above the platform" },
      { src: floorTilesImg, alt: "Large-format matte floor tile" },
    ],
    materials: [
      "Jet black granite platform, mirror polish",
      "Highlighter wall tile",
      "Large-format matte floor tile",
    ],
    products: [
      { role: "Granite", itemId: "black-granite" },
      { role: "Wall Tile", itemId: "wall-tile" },
      { role: "Floor Tile", itemId: "large-format-slab-tile" },
    ],
    tall: true,
  },
  {
    id: "island-countertop",
    name: "Island countertop",
    type: "Kitchen island",
    category: "Kitchens",
    location: "Lanka, Varanasi",
    description:
      "Imported granite island top in mirror polish, with a matching platform strip.",
    story:
      "The island needed one uninterrupted top, so the slab was selected on the floor of our showroom for grain before cutting. A matching platform strip runs along the working counter, and the same granite was used for the skirting edge.",
    hero: graniteImg,
    heroAlt: "Polished granite countertop close up",
    gallery: [
      { src: granite3Img, alt: "Granite slab grain detail" },
      { src: kitchenImg, alt: "Kitchen with granite counter and island" },
    ],
    materials: [
      "Imported granite slab, mirror polish",
      "Granite platform strip",
    ],
    products: [
      { role: "Granite", itemId: "brown-speckled-granite" },
      { role: "Platform Strip", itemId: "kitchen-platform-strip" },
    ],
  },
  {
    id: "hotel-lobby-flooring",
    name: "Hotel lobby flooring",
    type: "Hotel lobby",
    category: "Hotels",
    location: "Cantt, Varanasi",
    description:
      "1200×1800 marble-finish slabs laid across a hotel lobby with book-matched joints.",
    story:
      "A hotel lobby takes constant footfall, so we specified full-body large-format slabs in a marble finish — the pattern runs through the body, not just the surface. Batches were reserved from one lot so shade stays identical across the run, and the staircase treads were cut from granite for durability.",
    hero: hotelImg,
    heroAlt: "Hotel lobby with polished marble flooring",
    gallery: [
      { src: tiles2Img, alt: "Marble-finish large format slab detail" },
      { src: granite3Img, alt: "Granite staircase treads" },
      { src: terraceImg, alt: "Hotel terrace paved in stone finish" },
    ],
    materials: [
      "1200×1800 marble-finish slab tile",
      "Granite staircase treads",
    ],
    products: [
      { role: "Floor Tile", itemId: "large-format-slab-tile" },
      { role: "Granite", itemId: "staircase-tread-set" },
    ],
    tall: true,
  },
  {
    id: "rooftop-dining-terrace",
    name: "Rooftop dining terrace",
    type: "Rooftop terrace",
    category: "Hotels",
    location: "Assi Ghat, Varanasi",
    description:
      "Open rooftop dining paved in anti-skid stone-finish tiles for monsoon safety.",
    story:
      "Because the terrace is fully exposed, the brief was grip first. We used a textured anti-skid stone finish that stays safe when wet, with a matte outdoor tile on the parapet band. Both were laid on an external-grade adhesive supplied with the order.",
    hero: terraceImg,
    heroAlt: "Hotel terrace with stone finish paving",
    gallery: [
      { src: outdoorImg, alt: "Textured outdoor tile surface" },
      { src: balconyImg, alt: "Matte outdoor tile on a balcony" },
    ],
    materials: ["Anti-skid stone-finish outdoor tile", "Textured parapet tile"],
    products: [
      { role: "Floor Tile", itemId: "anti-skid-tile" },
      { role: "Wall Tile", itemId: "textured-tile" },
    ],
  },
  {
    id: "marble-finish-living-room",
    name: "Marble-finish living room",
    type: "Residential living room",
    category: "Residential",
    location: "Tengra Mod, Varanasi",
    description:
      "2×4 ft glossy vitrified in a marble finish, laid wall to wall in a family home.",
    story:
      "This home was still at bare-floor stage when the family walked into our showroom. We laid out full 2×4 ft glossy vitrified pieces so they could see the vein pattern at real scale, reserved the whole quantity from a single lot, and delivered in stages as the rooms were finished.",
    hero: livingImg,
    heroAlt: "Living room with marble finish floor tiles",
    gallery: [
      { src: tiles3Img, alt: "Glossy marble-finish vitrified tile detail" },
      { src: bedroomImg, alt: "Bedroom finished in the same home" },
    ],
    materials: ["2×4 ft glossy vitrified, marble finish", "Matching skirting"],
    products: [
      { role: "Floor Tile", itemId: "vitrified-gvt" },
      { role: "Wall Tile", itemId: "wall-tile" },
    ],
    beforeAfter: {
      before: tilesImg,
      after: livingImg,
      beforeAlt: "Bare floor before the tiles were laid",
      afterAlt:
        "Finished living room with marble-finish glossy vitrified flooring",
    },
    tall: true,
  },
  {
    id: "wooden-finish-bedroom",
    name: "Wooden-finish bedroom",
    type: "Residential bedroom",
    category: "Residential",
    location: "Ramnagar, Varanasi",
    description:
      "Plank tiles in a matte wood finish — the warmth of wood without the maintenance.",
    story:
      "The family wanted a wooden floor but not the upkeep. Plank-format tiles in a matte wood finish were laid in a staggered pattern with a fine grout line, so the joints disappear and the room reads as one continuous floor.",
    hero: bedroomImg,
    heroAlt: "Bedroom with wooden finish floor tiles",
    gallery: [
      { src: tiles3Img, alt: "Wood-finish plank tile detail" },
      { src: livingImg, alt: "Adjoining living area" },
    ],
    materials: ["Wood-finish plank tile, matte", "Colour-matched grout"],
    products: [{ role: "Floor Tile", itemId: "wood-finish-tile" }],
  },
  {
    id: "balcony-in-textured-stone",
    name: "Balcony in textured stone",
    type: "Residential balcony",
    category: "Residential",
    location: "Mahmoorganj, Varanasi",
    description:
      "A small balcony finished in matte outdoor tiles that hold grip through the rains.",
    story:
      "Balconies get sun and rain in equal measure, so a matte outdoor tile was used on the floor with a carved textured tile on the wall to give the small space some depth. External-grade adhesive and grout were supplied with the material.",
    hero: balconyImg,
    heroAlt: "Balcony with textured outdoor tiles",
    gallery: [
      { src: outdoorImg, alt: "Outdoor tile texture close up" },
      { src: terraceImg, alt: "Terrace in the same finish family" },
    ],
    materials: ["Matte outdoor floor tile", "Carved textured wall tile"],
    products: [
      { role: "Floor Tile", itemId: "anti-skid-tile" },
      { role: "Wall Tile", itemId: "textured-tile" },
    ],
  },
  {
    id: "showroom-lobby",
    name: "Showroom lobby",
    type: "Retail showroom",
    category: "Commercial",
    location: "Ram Nagar Industrial Area, Varanasi",
    description:
      "Double charge vitrified flooring specified for heavy retail footfall.",
    story:
      "Retail floors take trolleys, heels and daily scrubbing. Double charge vitrified was the obvious call — the wear layer is thick enough to hold its polish for years. The full quantity was reserved from one lot and delivered on a scheduled slot before fit-out.",
    hero: commercialImg,
    heroAlt: "Commercial lobby with polished vitrified flooring",
    gallery: [
      { src: tiles2Img, alt: "Double charge vitrified surface detail" },
      { src: officeImg, alt: "Adjoining office area" },
    ],
    materials: ["Double charge vitrified floor tile", "Matching skirting"],
    products: [{ role: "Floor Tile", itemId: "double-charge-vitrified" }],
    tall: true,
  },
  {
    id: "corporate-office-floor",
    name: "Corporate office floor",
    type: "Office fit-out",
    category: "Offices",
    location: "Varanasi",
    description:
      "Full-body vitrified supplied as a bulk order for an office fit-out.",
    story:
      "A single-shade full-body vitrified was chosen so that any future replacement matches. Because it was a bulk order, we held the lot in our godown and released it floor by floor as the contractor progressed.",
    hero: officeImg,
    heroAlt: "Office interior with large format floor tiles",
    gallery: [
      { src: tiles2Img, alt: "Full-body vitrified tile detail" },
      { src: commercialImg, alt: "Reception area of the same fit-out" },
    ],
    materials: ["Full-body vitrified floor tile, bulk lot"],
    products: [{ role: "Floor Tile", itemId: "double-charge-vitrified" }],
  },
  {
    id: "parking-and-driveway",
    name: "Parking & driveway",
    type: "Parking area",
    category: "Commercial",
    location: "Ramnagar, Varanasi",
    description:
      "Heavy-duty parking tiles laid to take vehicle load and outdoor weather.",
    story:
      "Parking areas need thickness and grip rather than gloss. Heavy-duty parking tiles were laid over a proper bed with wide expansion joints, and a textured band marks the driveway edge.",
    hero: parkingImg,
    heroAlt: "Outdoor parking area with heavy duty tiles",
    gallery: [
      { src: outdoorImg, alt: "Heavy duty outdoor tile texture" },
      { src: commercialImg, alt: "Approach to the building lobby" },
    ],
    materials: ["Heavy-duty parking tile", "Textured driveway band"],
    products: [
      { role: "Floor Tile", itemId: "anti-skid-tile" },
      { role: "Wall Tile", itemId: "textured-tile" },
    ],
  },
];

export function projectById(id: string) {
  return projects.find((p) => p.id === id);
}
