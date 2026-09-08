import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "../content/navLinks";
import { cn } from "../lib/cn";
import { Button } from "./ui/Button";

const linkClassName =
  "text-sm font-medium text-charcoal/80 transition-colors hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-warm-white/95 backdrop-blur">
      <div className="container flex items-center justify-between gap-4 py-4 sm:gap-6">
        <a href="#hero" className="flex shrink-0 items-center gap-3">
          <img
            src="/assets/meliah-logo.png"
            alt="Méliah Santé"
            className="h-8 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClassName}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <span
            className="hidden text-sm font-medium uppercase tracking-wide text-charcoal/60 md:inline"
            aria-label="Langue"
          >
            FR
          </span>

          <a
            href="#pilote"
            className="inline-flex items-center rounded-full bg-coral px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-coral-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white sm:px-4 sm:text-sm lg:hidden"
          >
            Réserver pilote
          </a>

          <a
            href="#pilote"
            className="hidden text-sm font-semibold text-coral transition-colors hover:text-coral-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white lg:inline"
          >
            Réserver ma place pilote
          </a>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <Button
                className="lg:hidden"
                variant="secondary"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Menu</span>
              </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-charcoal/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content
                aria-describedby={undefined}
                className={cn(
                  "fixed inset-x-4 top-20 z-50 rounded-2xl border border-charcoal/10 bg-warm-white p-6 shadow-soft outline-none",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                )}
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <Dialog.Title className="text-lg font-semibold text-charcoal">
                    Navigation
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <Button variant="ghost" aria-label="Fermer le menu" className="px-3 py-2">
                      <X className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Dialog.Close asChild key={link.href}>
                      <a
                        href={link.href}
                        className="rounded-lg px-3 py-3 text-base font-medium text-charcoal/80 transition-colors hover:bg-charcoal/5 hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50"
                      >
                        {link.label}
                      </a>
                    </Dialog.Close>
                  ))}
                </nav>

                <Dialog.Close asChild>
                  <a
                    href="#pilote"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2"
                  >
                    Réserver ma place pilote
                  </a>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
