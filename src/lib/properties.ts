import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import p4 from "@/assets/property-4.jpg";
import p5 from "@/assets/property-5.jpg";
import p6 from "@/assets/property-6.jpg";

export type Property = {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number; // in crores
  beds: number;
  baths: number;
  area: number; // sqft
  type: "Villa" | "Apartment" | "Penthouse" | "Townhouse" | "Heritage";
  image: string;
  featured?: boolean;
  amenities: string[];
  description: string;
};

export const properties: Property[] = [
  {
    id: "skyline-penthouse",
    title: "Skyline Penthouse",
    location: "Bandra West",
    city: "Mumbai",
    price: 18.5,
    beds: 4,
    baths: 5,
    area: 5400,
    type: "Penthouse",
    image: p1,
    featured: true,
    amenities: ["Private Pool", "Helipad", "Concierge", "Smart Home", "Wine Cellar", "Home Theatre"],
    description:
      "An aerial sanctuary above the city. Floor-to-ceiling glass frames the skyline, while emerald onyx ceilings and gilded ceiling coves give every evening a curated glow.",
  },
  {
    id: "cliffside-villa",
    title: "Cliffside Infinity Villa",
    location: "Vagator",
    city: "Goa",
    price: 12.2,
    beds: 5,
    baths: 6,
    area: 7800,
    type: "Villa",
    image: p2,
    featured: true,
    amenities: ["Infinity Pool", "Beach Access", "Spa", "Gym", "Sunset Deck"],
    description:
      "Perched on the Arabian Sea, an infinity edge dissolves into the horizon. Hand-poured terrazzo, warm oak millwork, and uninterrupted ocean light.",
  },
  {
    id: "garden-townhouse",
    title: "Garden Row Townhouse",
    location: "Indiranagar",
    city: "Bengaluru",
    price: 6.8,
    beds: 4,
    baths: 4,
    area: 3600,
    type: "Townhouse",
    image: p3,
    amenities: ["Private Garden", "Gated Community", "EV Charging", "Clubhouse"],
    description:
      "Triple-height living, internal courtyards, and an avenue of native trees. A quiet block, a few minutes from the city's best.",
  },
  {
    id: "emerald-tower",
    title: "The Emerald Tower",
    location: "Cyber Hub",
    city: "Gurugram",
    price: 9.4,
    beds: 3,
    baths: 4,
    area: 3100,
    type: "Apartment",
    image: p4,
    featured: true,
    amenities: ["Sky Lounge", "Infinity Pool", "Co-working", "24/7 Concierge"],
    description:
      "A vertical address with views to match. Emerald-tinted facade, gold-anodized frames, and full-floor residences with private elevators.",
  },
  {
    id: "heritage-haveli",
    title: "The Sandstone Haveli",
    location: "Civil Lines",
    city: "Jaipur",
    price: 14.0,
    beds: 6,
    baths: 7,
    area: 9200,
    type: "Heritage",
    image: p5,
    amenities: ["Courtyard", "Heritage Restoration", "Library", "Stable", "Staff Quarters"],
    description:
      "A restored 1920s haveli with hand-carved jharokhas and a central courtyard. Modern systems hidden beneath original detailing.",
  },
  {
    id: "coastline-residence",
    title: "Coastline Residence",
    location: "Worli Sea Face",
    city: "Mumbai",
    price: 22.6,
    beds: 5,
    baths: 6,
    area: 6500,
    type: "Penthouse",
    image: p6,
    amenities: ["Sea View", "Private Pool", "Cinema", "Wine Room", "Staff Quarters"],
    description:
      "A landmark address along the Worli sea face. Curated by a Milanese studio with brass detailing and shou sugi ban walls.",
  },
];

export const featuredProperties = properties.filter((p) => p.featured);

export const getProperty = (id: string) => properties.find((p) => p.id === id);

export const formatINR = (cr: number) =>
  cr >= 1
    ? `₹${cr.toFixed(2)} Cr`
    : `₹${(cr * 100).toFixed(0)} L`;
