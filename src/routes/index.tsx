import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Search, MapPin, ArrowRight, Star, Building2, Shield, Bot, Code2, Database, Cloud, Cpu, Palette, Lock } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { featuredProperties, properties } from "@/lib/properties";
import heroImage from "@/assets/property-hero.jpg";
import heroVideo from "@/assets/hero-loop.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Makaan Mitra NextGen — Luxury homes, curated by AI" },
      { name: "description", content: "Discover India's most exclusive residences with immersive 3D tours, AI recommendations, and verified agents." },
      { property: "og:title", content: "Makaan Mitra NextGen" },
      { property: "og:description", content: "Luxury homes, curated by AI. Immersive 3D discovery across India." },
    ],
    links: [{ rel: "preload", as: "image", href: heroImage, fetchpriority: "high" } as any],
  }),
  component: Landing,
});

function Landing() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative min-h-[92vh] overflow-hidden">
        {/* Background video */}
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          poster={heroImage}
          className="pointer-events-none absolute inset-0 size-full object-cover [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-start-playback-button]:hidden"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 pb-24 pt-20 lg:pt-28">
          <div className="flex max-w-2xl flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-background/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold backdrop-blur"
            >
              <Sparkles className="h-3 w-3" />
              AI-Powered Discovery
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 font-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] text-balance"
            >
              The address book of <span className="text-shimmer">India's finest</span> residences.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 max-w-lg text-lg text-muted-foreground text-pretty"
            >
              Immersive tours. AI-curated matches. Verified agents.
              A new way to find — and own — extraordinary homes.
            </motion.p>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass mt-10 flex flex-col gap-3 rounded-xl p-3 sm:flex-row sm:items-center"
            >
              <div className="flex flex-1 items-center gap-2 px-3">
                <MapPin className="h-4 w-4 text-gold" />
                <input
                  placeholder="Mumbai, Goa, Jaipur..."
                  className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="hidden h-8 w-px bg-border sm:block" />
              <div className="flex flex-1 items-center gap-2 px-3">
                <Building2 className="h-4 w-4 text-gold" />
                <select className="w-full bg-transparent py-2 text-sm outline-none">
                  <option className="bg-card">Any type</option>
                  <option className="bg-card">Villa</option>
                  <option className="bg-card">Penthouse</option>
                  <option className="bg-card">Apartment</option>
                  <option className="bg-card">Heritage</option>
                </select>
              </div>
              <Link
                to="/properties"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-gold px-6 py-3 text-sm font-medium text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5"
              >
                <Search className="h-4 w-4" /> Discover
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="mt-12 flex gap-10">
              {[
                ["12k+", "Listings"],
                ["48", "Cities"],
                ["98%", "Satisfaction"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-3xl text-gold">{n}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED ============ */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Featured Residences</span>
            <h2 className="mt-3 max-w-2xl font-serif text-5xl text-balance">Hand-picked addresses, ready to call your own.</h2>
          </div>
          <Link to="/properties" className="hidden items-center gap-2 text-sm text-gold hover:underline md:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </section>

      {/* ============ AI BAND ============ */}
      <section className="relative overflow-hidden border-y border-border/60 bg-card/30 py-24">
        <div className="absolute inset-0 bg-gradient-emerald opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Intelligent Discovery</span>
            <h2 className="mt-3 font-serif text-5xl text-balance">
              An AI concierge that <em className="text-gold">listens</em> the way a great agent does.
            </h2>
            <p className="mt-6 max-w-lg text-muted-foreground text-pretty">
              Describe the life you want — quiet mornings, walkable evenings, a study with north light — and our model finds the homes that fit. No filters, no noise.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { i: Bot, t: "AI Recommendations", d: "Personalised matches in seconds" },
                { i: Sparkles, t: "Price Estimator", d: "Fair valuations, market-aware" },
                { i: Shield, t: "Verified Listings", d: "Documents checked, owners known" },
                { i: Star, t: "Concierge Support", d: "Human help, always available" },
              ].map(({ i: Icon, t, d }) => (
                <div key={t} className="glass rounded-lg p-5">
                  <Icon className="h-5 w-5 text-gold" />
                  <h3 className="mt-3 font-serif text-xl">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 border-b border-border/60 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold">
                <Bot className="h-5 w-5 text-gold-foreground" />
              </div>
              <div>
                <p className="font-serif text-lg">Mira · AI Concierge</p>
                <p className="text-xs text-muted-foreground">Online · responds instantly</p>
              </div>
            </div>
            <div className="mt-5 space-y-4 text-sm">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary/15 px-4 py-3">
                4 BHK in South Mumbai with a sea view, ideally pre-2010 building, ₹15–25 Cr.
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                I found 7 that fit. <span className="text-gold">Coastline Residence at Worli</span> is closest — 5 BHK, 6,500 sqft, ₹22.6 Cr. Shall I book a private viewing?
              </div>
              <div className="ml-auto max-w-[60%] rounded-2xl rounded-tr-sm bg-primary/15 px-4 py-3">Yes, Saturday morning.</div>
            </div>
            <button className="mt-6 w-full rounded-lg bg-gradient-gold py-3 text-sm font-medium text-gold-foreground">
              Ask Mira
            </button>
          </div>
        </div>
      </section>

      {/* ============ CITIES ============ */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold">Trending Locations</span>
          <h2 className="mt-3 font-serif text-5xl">Where India lives well.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {[
            { name: "Mumbai", count: 412 },
            { name: "Bengaluru", count: 308 },
            { name: "Gurugram", count: 256 },
            { name: "Goa", count: 142 },
            { name: "Jaipur", count: 98 },
          ].map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer rounded-xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-luxe"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-emerald">
                <MapPin className="h-4 w-4 text-gold" />
              </div>
              <h3 className="mt-4 font-serif text-2xl">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.count} residences</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ ALL PROPERTIES PREVIEW ============ */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-4xl">Recently listed</h2>
          <Link to="/properties" className="text-sm text-gold hover:underline">View all →</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 6).map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </section>

      {/* ============ TECH STACK ============ */}
      <section className="relative overflow-hidden border-y border-border/60 bg-card/30 py-24">
        <div className="absolute inset-0 opacity-10" style={{ background: "var(--gradient-radial)" }} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Engineered for Scale</span>
            <h2 className="mt-3 font-serif text-5xl text-balance">A modern stack, quietly powerful.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Built on enterprise-grade open technologies for speed, security, and a beautifully fluid experience.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { i: Code2, t: "React 19 + TypeScript", d: "Type-safe components with the latest React features and concurrent rendering.", tag: "Frontend" },
              { i: Cpu, t: "TanStack Start + Vite 7", d: "Full-stack SSR framework with file-based routing and lightning-fast HMR.", tag: "Framework" },
              { i: Palette, t: "Tailwind CSS v4", d: "Utility-first styling with custom design tokens and a semantic theme system.", tag: "Styling" },
              { i: Sparkles, t: "Framer Motion + Three.js", d: "Cinematic animations and immersive 3D experiences across every surface.", tag: "Motion & 3D" },
              { i: Database, t: "PostgreSQL + Supabase", d: "Managed Postgres with row-level security, realtime, and edge-ready APIs.", tag: "Database" },
              { i: Lock, t: "Supabase Auth", d: "Secure sessions, OAuth, and role-based access with JWT under the hood.", tag: "Auth" },
              { i: Bot, t: "Lovable AI Gateway", d: "Multi-model AI routing for the concierge, recommendations, and valuations.", tag: "AI" },
              { i: Cloud, t: "Cloudflare Workers", d: "Globally distributed edge runtime for sub-100ms responses anywhere.", tag: "Edge" },
              { i: Shield, t: "TanStack Query", d: "Resilient data fetching with caching, prefetching, and optimistic updates.", tag: "Data" },
            ].map(({ i: Icon, t, d, tag }, idx) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-luxe"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gradient-emerald">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80">{tag}</span>
                </div>
                <h3 className="mt-5 font-serif text-xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {["React 19", "TypeScript", "TanStack", "Vite 7", "Tailwind v4", "Framer Motion", "Three.js", "Supabase", "PostgreSQL", "Cloudflare", "Zod", "shadcn/ui"].map((n) => (
              <span key={n} className="rounded-full border border-border/60 bg-background/40 px-3 py-1.5">
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL ============ */}
      <section className="border-t border-border/60 bg-card/40 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Star className="mx-auto h-6 w-6 text-gold" />
          <blockquote className="mt-6 font-serif text-3xl leading-tight text-balance md:text-4xl">
            "We saw 14 homes in a weekend without leaving our living room. Three weeks later, we'd moved in."
          </blockquote>
          <div className="mt-8">
            <p className="font-serif text-lg">Ananya & Vikram Mehta</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Skyline Penthouse · Mumbai</p>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-emerald p-12 text-center shadow-luxe md:p-20">
          <div className="absolute inset-0 opacity-20" style={{ background: "var(--gradient-radial)" }} />
          <h2 className="relative font-serif text-4xl text-balance md:text-6xl">
            Your next address is <span className="text-gold">already waiting.</span>
          </h2>
          <p className="relative mx-auto mt-6 max-w-xl text-muted-foreground">
            Create an account and tell us about the life you want at home.
          </p>
          <Link
            to="/login"
            className="relative mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-8 py-4 font-medium text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5"
          >
            Begin <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
