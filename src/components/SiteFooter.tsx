import { AudioWaveform } from "lucide-react";
import { footer } from "../content/siteContent";
import { assetUrl } from "../lib/assetUrl";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="container py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <a
              href="#hero"
              className="inline-flex rounded-md focus-visible:ring-2 focus-visible:ring-accent-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <img
                src={assetUrl("assets/meliah-logo.png")}
                alt="Méliah Santé"
                className="h-10 w-auto"
              />
            </a>
            <p className="font-heading mt-7 max-w-lg text-2xl leading-9 tracking-[-0.02em] text-foreground">
              {footer.tagline}
            </p>
          </div>
          <div className="flex items-center gap-3 text-primary" aria-hidden="true">
            <AudioWaveform className="h-5 w-5" />
            <span className="text-xl font-bold tracking-[0.2em]">AURA</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Liens légaux">
            <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="rounded-sm transition-colors hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-accent-foreground motion-reduce:transition-none"
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
