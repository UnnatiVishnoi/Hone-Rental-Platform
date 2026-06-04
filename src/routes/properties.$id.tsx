import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize2, MapPin, Heart, Share2, Calendar, Phone, ArrowLeft, Check, School, Hospital, ShoppingBag, Train } from "lucide-react";
import { useState } from "react";
import { formatINR, getProperty, properties } from "@/lib/properties";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = getProperty(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.property.title} — Makaan Mitra` },
          { name: "description", content: loaderData.property.description },
          { property: "og:title", content: loaderData.property.title },
          { property: "og:description", content: loaderData.property.description },
          { property: "og:image", content: loaderData.property.image },
        ]
      : [],
  }),
  component: PropertyDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-serif text-5xl">Address not found</h1>
      <Link to="/properties" className="mt-6 inline-block text-gold hover:underline">Browse all properties →</Link>
    </div>
  ),
});

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  const [emi, setEmi] = useState(80);
  const monthlyEmi = Math.round(((property.price * 1e7 * (emi / 100)) * 0.0083 * Math.pow(1.0083, 240)) / (Math.pow(1.0083, 240) - 1));

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={property.image} alt={property.title} className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-10">
          <Link to="/properties" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All properties
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex gap-2">
                <span className="rounded-full bg-gradient-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-foreground">{property.type}</span>
                {property.featured && <span className="rounded-full border border-gold/50 px-3 py-1 text-[10px] uppercase tracking-wider text-gold">Featured</span>}
              </div>
              <h1 className="mt-3 font-serif text-5xl md:text-7xl text-balance">{property.title}</h1>
              <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-gold" />
                {property.location}, {property.city}
              </p>
            </motion.div>
            <div className="flex flex-col items-end">
              <span className="font-serif text-5xl text-gold">{formatINR(property.price)}</span>
              <div className="mt-3 flex gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-md glass" aria-label="Save"><Heart className="h-4 w-4" /></button>
                <button className="flex h-10 w-10 items-center justify-center rounded-md glass" aria-label="Share"><Share2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { i: Bed, l: "Bedrooms", v: property.beds },
              { i: Bath, l: "Bathrooms", v: property.baths },
              { i: Maximize2, l: "Sq Ft", v: property.area.toLocaleString() },
            ].map(({ i: Icon, l, v }) => (
              <div key={l} className="glass rounded-xl p-5 text-center">
                <Icon className="mx-auto h-5 w-5 text-gold" />
                <div className="mt-2 font-serif text-3xl">{v}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>

          {/* About */}
          <section>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">About the residence</span>
            <h2 className="mt-3 font-serif text-3xl">An invitation to belong.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{property.description}</p>
          </section>

          {/* 3D viewer placeholder */}
          <section className="overflow-hidden rounded-2xl border border-gold/30 bg-gradient-emerald p-1">
            <div className="rounded-xl bg-background p-10 text-center">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold animate-pulse-glow">
                <Maximize2 className="h-6 w-6 text-gold-foreground" />
              </div>
              <h3 className="mt-4 font-serif text-2xl">360° Virtual Walkthrough</h3>
              <p className="mt-2 text-sm text-muted-foreground">Tour every room as if you were there.</p>
              <button className="mt-5 rounded-lg bg-gradient-gold px-6 py-3 text-sm font-medium text-gold-foreground shadow-gold">
                Launch tour
              </button>
            </div>
          </section>

          {/* Amenities */}
          <section>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Amenities</span>
            <h2 className="mt-3 font-serif text-3xl">What's included.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {property.amenities.map((a: string) => (
                <div key={a} className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/50 px-4 py-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15">
                    <Check className="h-3.5 w-3.5 text-gold" />
                  </div>
                  <span className="text-sm">{a}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Nearby */}
          <section>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Neighbourhood</span>
            <h2 className="mt-3 font-serif text-3xl">What's nearby.</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { i: School, l: "Schools", v: "6 within 2 km" },
                { i: Hospital, l: "Hospitals", v: "3 within 3 km" },
                { i: ShoppingBag, l: "Markets", v: "12 within 1 km" },
                { i: Train, l: "Transit", v: "Metro 800 m" },
              ].map(({ i: Icon, l, v }) => (
                <div key={l} className="glass rounded-xl p-5">
                  <Icon className="h-5 w-5 text-gold" />
                  <div className="mt-3 font-serif text-lg">{l}</div>
                  <div className="text-xs text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </section>

          {/* EMI calc */}
          <section className="glass rounded-2xl p-8">
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Mortgage estimator</span>
            <h2 className="mt-3 font-serif text-3xl">Approximate monthly EMI</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm text-muted-foreground">Loan coverage: {emi}%</label>
                <input
                  type="range" min={20} max={90} value={emi}
                  onChange={(e) => setEmi(Number(e.target.value))}
                  className="mt-2 w-full accent-[var(--color-gold)]"
                />
                <p className="mt-2 text-xs text-muted-foreground">20 year tenure · 10% p.a. indicative</p>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Monthly</div>
                <div className="font-serif text-5xl text-gold">₹{(monthlyEmi/1000).toFixed(1)}K</div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-serif text-2xl">Schedule a private viewing</h3>
            <p className="mt-1 text-sm text-muted-foreground">Concierge response within the hour.</p>
            <form className="mt-6 space-y-3">
              <input className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm" placeholder="Full name" />
              <input className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm" placeholder="Email" type="email" />
              <input className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm" placeholder="Phone" type="tel" />
              <textarea rows={3} className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm" placeholder="Notes" />
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-gold py-3 text-sm font-medium text-gold-foreground shadow-gold">
                <Calendar className="h-4 w-4" /> Request viewing
              </button>
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg border border-gold/40 py-3 text-sm">
                <Phone className="h-4 w-4 text-gold" /> Call concierge
              </button>
            </form>
          </div>
        </aside>
      </div>

      {/* Similar */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="font-serif text-3xl">You may also like</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {properties.filter((p) => p.id !== property.id).slice(0, 3).map((p) => (
            <Link key={p.id} to="/properties/$id" params={{ id: p.id }} className="group block overflow-hidden rounded-lg border border-border/60 bg-card transition-all hover:border-gold/40 hover:shadow-luxe">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.title} className="size-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.location}, {p.city}</p>
                <p className="mt-3 font-serif text-lg text-gold">{formatINR(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
