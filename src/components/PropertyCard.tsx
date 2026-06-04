import { Link } from "@tanstack/react-router";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { formatINR, type Property } from "@/lib/properties";

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link
        to="/properties/$id"
        params={{ id: property.id }}
        className="group block overflow-hidden rounded-lg border border-border/60 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-luxe"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            loading="lazy"
            width={1024}
            height={768}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent" />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full bg-gradient-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-foreground">
              {property.type}
            </span>
            {property.featured && (
              <span className="rounded-full border border-gold/50 bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
                Featured
              </span>
            )}
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <h3 className="font-serif text-2xl text-foreground">{property.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {property.location}, {property.city}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> {property.beds}</span>
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {property.baths}</span>
            <span className="flex items-center gap-1"><Maximize2 className="h-3.5 w-3.5" /> {property.area.toLocaleString()} sqft</span>
          </div>
          <span className="font-serif text-xl text-gold">{formatINR(property.price)}</span>
        </div>
      </Link>
    </motion.div>
  );
}
