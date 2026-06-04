import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/property-2.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Makaan Mitra" }] }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="grid min-h-[calc(100vh-80px)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={heroImage} alt="" className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold backdrop-blur">
            <Sparkles className="h-3 w-3" /> Members get early access
          </div>
          <h2 className="mt-6 font-serif text-5xl text-balance">Where India's finest homes find their people.</h2>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="text-xs uppercase tracking-[0.25em] text-gold">Makaan Mitra NextGen</Link>
          <h1 className="mt-4 font-serif text-5xl">{mode === "signin" ? "Welcome back." : "Create your account."}</h1>
          <p className="mt-2 text-muted-foreground">
            {mode === "signin" ? "Sign in to your concierge dashboard." : "Begin your journey to a better address."}
          </p>

          <form className="mt-10 space-y-4">
            {mode === "signup" && (
              <input className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm" placeholder="Full name" />
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input type="email" className="w-full rounded-md border border-border bg-card px-4 py-3 pl-10 text-sm" placeholder="you@example.com" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input type="password" className="w-full rounded-md border border-border bg-card px-4 py-3 pl-10 text-sm" placeholder="Password" />
            </div>
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-gold py-3 text-sm font-medium text-gold-foreground shadow-gold">
              {mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or continue with <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="rounded-md border border-border bg-card py-3 text-sm hover:bg-accent/40">Google</button>
            <button className="rounded-md border border-border bg-card py-3 text-sm hover:bg-accent/40">Apple</button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-gold hover:underline">
              {mode === "signin" ? "Create account" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
