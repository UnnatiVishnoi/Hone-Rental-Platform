import { Link } from "@tanstack/react-router";
import { Moon, Sun, Search, Menu } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/admin", label: "Admin" },
] as const;

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-emerald shadow-luxe">
            <span className="font-serif text-xl text-gold">M</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-tight">Makaan Mitra</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold">NextGen</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-md border border-border/60 transition-colors hover:bg-accent/40 md:flex"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border/60 transition-colors hover:bg-accent/40"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className="hidden rounded-md bg-gradient-gold px-5 py-2 text-sm font-medium text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5 md:inline-block"
          >
            Sign in
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border/60 md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm hover:bg-accent/40"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="rounded-md bg-gradient-gold px-3 py-2 text-sm text-gold-foreground">
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
