import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, Users, IndianRupee, TrendingUp, CheckCircle2, XCircle, Clock, ShieldCheck } from "lucide-react";
import { properties, formatINR } from "@/lib/properties";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Console — Makaan Mitra" }] }),
  component: Admin,
});

const kpis = [
  { i: Building2, l: "Active listings", v: "1,284", d: "+12% MoM" },
  { i: Users, l: "Verified users", v: "48,672", d: "+8% MoM" },
  { i: IndianRupee, l: "GMV (90d)", v: "₹1,420 Cr", d: "+24% QoQ" },
  { i: TrendingUp, l: "Lead conversion", v: "18.4%", d: "+2.1pp" },
];

function Admin() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold">
            <ShieldCheck className="h-3 w-3" /> Super Admin Console
          </div>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl">Command Centre</h1>
          <p className="mt-2 text-muted-foreground">Live operations across India.</p>
        </div>
        <div className="flex gap-2">
          <select className="rounded-md border border-border bg-card px-4 py-2 text-sm">
            <option>Last 30 days</option><option>Last 90 days</option><option>Year to date</option>
          </select>
          <button className="rounded-md bg-gradient-gold px-5 py-2 text-sm font-medium text-gold-foreground">Export</button>
        </div>
      </div>

      {/* KPI floating cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ i: Icon, l, v, d }, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass relative overflow-hidden rounded-2xl p-6"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-emerald opacity-40 blur-2xl" />
            <Icon className="h-5 w-5 text-gold" />
            <div className="mt-4 font-serif text-4xl">{v}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
            <div className="mt-2 text-xs text-gold">{d}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart band */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl">Revenue (last 12 months)</h3>
            <span className="text-xs uppercase tracking-widest text-gold">Live</span>
          </div>
          {/* Simple SVG bar chart */}
          <svg viewBox="0 0 600 200" className="mt-6 w-full">
            <defs>
              <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.82 0.13 86)" />
                <stop offset="100%" stopColor="oklch(0.45 0.12 162)" />
              </linearGradient>
            </defs>
            {[60, 80, 70, 95, 110, 130, 120, 145, 160, 150, 175, 195].map((h, i) => (
              <g key={i}>
                <rect x={i * 48 + 12} y={200 - h} width={32} height={h} rx={4} fill="url(#bar)" opacity={0.85} />
              </g>
            ))}
          </svg>
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
            {["Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun"].map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-serif text-2xl">Live activity</h3>
          <div className="mt-4 space-y-3 text-sm">
            {[
              { i: CheckCircle2, c: "text-emerald-400", t: "Listing approved · Cliffside Villa" },
              { i: Users, c: "text-gold", t: "New agent verified · Priya N." },
              { i: Clock, c: "text-amber-400", t: "Pending docs · Heritage Haveli" },
              { i: XCircle, c: "text-rose-400", t: "Listing rejected · Garden Row #4" },
              { i: CheckCircle2, c: "text-emerald-400", t: "Lead closed · Coastline Residence" },
            ].map((a, i) => {
              const Icon = a.i;
              return (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/40 p-3">
                  <Icon className={`h-4 w-4 ${a.c}`} />
                  <p>{a.t}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Listings management table */}
      <div className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl">Listings management</h2>
          <button className="rounded-md bg-gradient-gold px-4 py-2 text-sm font-medium text-gold-foreground">+ Add listing</button>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border/60">
          <table className="w-full text-sm">
            <thead className="bg-card/60">
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p, i) => (
                <tr key={p.id} className="border-t border-border/60 transition-colors hover:bg-card/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="h-10 w-10 rounded-md object-cover" alt={p.title} />
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{p.type}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.city}</td>
                  <td className="px-6 py-4 font-serif text-gold">{formatINR(p.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${i % 3 === 0 ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"}`}>
                      {i % 3 === 0 ? "Pending" : "Live"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gold hover:underline">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
