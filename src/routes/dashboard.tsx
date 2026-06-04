import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Eye, Calendar, Bell, User, TrendingUp } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { properties, formatINR } from "@/lib/properties";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Makaan Mitra" }] }),
  component: Dashboard,
});

const stats = [
  { i: Heart, label: "Saved", value: 12, color: "from-rose-500/40 to-rose-500/10" },
  { i: Eye, label: "Recently viewed", value: 28, color: "from-emerald-500/40 to-emerald-500/10" },
  { i: Calendar, label: "Viewings booked", value: 3, color: "from-amber-500/40 to-amber-500/10" },
  { i: Bell, label: "Alerts", value: 5, color: "from-sky-500/40 to-sky-500/10" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold">Welcome back</span>
          <h1 className="mt-3 font-serif text-5xl">Hello, Ananya.</h1>
          <p className="mt-2 text-muted-foreground">Your personal property atelier.</p>
        </div>
        <div className="flex items-center gap-3 rounded-full glass px-4 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold">
            <User className="h-4 w-4 text-gold-foreground" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Ananya Mehta</p>
            <p className="text-xs text-muted-foreground">Premium member</p>
          </div>
        </div>
      </div>

      {/* Stats grid - floating 3D-ish cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ i: Icon, label, value, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, rotateX: 4, rotateY: -2 }}
            style={{ transformStyle: "preserve-3d" }}
            className={`glass relative overflow-hidden rounded-2xl p-6`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-40`} />
            <div className="relative">
              <Icon className="h-5 w-5 text-gold" />
              <div className="mt-4 font-serif text-4xl">{value}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity + Recommendations */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-3xl">AI recommendations for you</h2>
            <TrendingUp className="h-5 w-5 text-gold" />
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {properties.slice(0, 4).map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl">Upcoming viewings</h2>
          <div className="mt-6 space-y-4">
            {properties.slice(0, 3).map((p, i) => (
              <div key={p.id} className="glass flex gap-4 rounded-xl p-4">
                <img src={p.image} className="h-20 w-20 rounded-md object-cover" alt={p.title} />
                <div className="flex-1">
                  <p className="font-serif text-lg">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.location}</p>
                  <p className="mt-2 text-xs text-gold">Sat, {15 + i} Jun · 11:00 AM</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-serif text-3xl">Saved searches</h2>
          <div className="mt-6 space-y-3">
            {[
              "Mumbai · 4+ BHK · ₹15–25 Cr",
              "Goa · Villa · Beach front",
              "Bengaluru · Townhouse · Indiranagar",
            ].map((s) => (
              <div key={s} className="rounded-lg border border-border bg-card/50 px-4 py-3 text-sm">
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
