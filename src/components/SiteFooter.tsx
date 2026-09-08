import { AudioWaveform } from "lucide-react";
import { footer } from "../content/siteContent";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-charcoal text-white">
      <div className="container py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <a
              href="#hero"
              className="inline-flex rounded-md focus-visible:ring-2 focus-visible:ring-coral/60 focus-visible:ring-offset-4 focus-visible:ring-offset-charcoal"
            >
              <img
                src="/assets/meliah-logo.png"
                alt="Méliah Santé"
                className="h-10 w-auto brightness-0 invert"
              />
            </a>
            <p className="mt-7 max-w-lg text-2xl leading-9 tracking-[-0.02em] text-white/85">
              {footer.tagline}
            </p>
          </div>
          <div className="flex items-center gap-3 text-coral" aria-hidden="true">
            <AudioWaveform className="h-5 w-5" />
            <span className="text-xl font-bold tracking-[0.2em]">AURA</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-7 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Liens légaux">
            <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="rounded-sm transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-coral/60 motion-reduce:transition-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
