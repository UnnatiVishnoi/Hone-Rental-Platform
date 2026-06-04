export function Footer() {
    return (
      <footer className="border-t border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-emerald">
                <span className="font-serif text-xl text-gold">M</span>
              </div>
              <span className="font-serif text-xl">Makaan Mitra</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              India's most discerning address book. AI-powered discovery, curated by humans who know neighborhoods like family.
            </p>
          </div>
          {[
            { title: "Explore", items: ["Mumbai", "Bengaluru", "Gurugram", "Goa", "Jaipur"] },
            { title: "Company", items: ["About", "Press", "Careers", "Partners", "Contact"] },
            { title: "Resources", items: ["Buyers Guide", "Sellers Guide", "Investment", "Blog", "Support"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-serif text-lg text-gold">{col.title}</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {col.items.map((i) => (
                  <li key={i} className="cursor-pointer transition-colors hover:text-foreground">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="gold-divider" />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Makaan Mitra NextGen. All rights reserved.</p>
          <p className="tracking-widest uppercase text-gold">Crafted in India</p>
        </div>
      </footer>
    );
  }
  