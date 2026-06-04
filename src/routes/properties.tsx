import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/lib/properties";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties — Makaan Mitra NextGen" },
      { name: "description", content: "Browse luxury homes across India. Filter by city, type, budget, and amenities." },
      { property: "og:title", content: "Luxury Properties — Makaan Mitra" },
      { property: "og:description", content: "Curated luxury residences across Mumbai, Bengaluru, Gurugram, Goa and Jaipur." },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("All");
  const [city, setCity] = useState<string>("All");

  const cities = useMemo(() => ["All", ...Array.from(new Set(properties.map((p) => p.city)))], []);
  const types = ["All", "Villa", "Apartment", "Penthouse", "Townhouse", "Heritage"];

  const filtered = properties.filter((p) => {
    if (type !== "All" && p.type !== type) return false;
    if (city !== "All" && p.city !== city) return false;
    if (query && !(`${p.title} ${p.location} ${p.city}`.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-gold">Discover</span>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl">All residences</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {filtered.length} of {properties.length} curated listings.
        </p>
      </div>

      <div className="glass sticky top-20 z-30 mb-10 flex flex-col gap-3 rounded-xl p-3 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2 px-3">
          <Search className="h-4 w-4 text-gold" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by location or title..."
            className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
        <button className="flex items-center justify-center gap-2 rounded-md bg-gradient-gold px-5 py-2 text-sm font-medium text-gold-foreground">
          <SlidersHorizontal className="h-4 w-4" /> More filters
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-20 text-center">
          <p className="font-serif text-2xl">No residences match.</p>
          <p className="mt-2 text-sm text-muted-foreground">Try widening your filters.</p>
        </div>
      )}
    </div>
  );
}
