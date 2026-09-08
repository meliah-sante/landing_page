import { Button } from "./ui/Button";

const navLinks = [
  { href: "#origine", label: "Origine" },
  { href: "#realites", label: "Réalités" },
  { href: "#solution", label: "Solution" },
  { href: "#fonctionnalites", label: "Au quotidien" },
  { href: "#modules", label: "Modules" },
  { href: "#calculatrice", label: "Calculatrice" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-warm-white/95 backdrop-blur">
      <div className="container flex items-center justify-between gap-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <img
            src="/assets/meliah-logo.png"
            alt="Méliah Santé"
            className="h-8 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal/80 transition-colors hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span
            className="hidden text-sm font-medium uppercase tracking-wide text-charcoal/60 sm:inline"
            aria-label="Langue"
          >
            FR
          </span>
          <a
            href="#pilote"
            className="hidden text-sm font-semibold text-coral transition-colors hover:text-coral-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white sm:inline"
          >
            Réserver ma place pilote
          </a>
          <Button className="lg:hidden" variant="secondary" aria-label="Ouvrir le menu">
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
}
