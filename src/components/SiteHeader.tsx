import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "../content/navLinks";
import { cn } from "../lib/cn";
import { Button } from "./ui/Button";

const linkClassName =
  "text-sm font-medium text-charcoal/80 transition-colors hover:text-coral-accessible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-accessible focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white";

const dialogMotionClasses =
  "motion-reduce:animate-none motion-reduce:transition-none motion-reduce:zoom-in-95 motion-reduce:zoom-out-95";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-warm-white/95 backdrop-blur">
      <div className="container flex items-center justify-between gap-4 py-4 sm:gap-6">
        <a
          href="#hero"
          className={cn(
            "flex shrink-0 items-center gap-3 rounded-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-accessible focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white",
          )}
        >
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
            lang="fr"
            aria-label="Langue sélectionnée : Français"
            className="hidden text-sm font-medium uppercase tracking-wide text-charcoal/70 md:inline"
          >
            FR
          </span>

          <a
            href="#pilote"
            className={cn(
              "inline-flex items-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-accessible focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white",
              "rounded-full bg-coral-accessible px-3 py-2 text-[0.7rem] leading-tight text-white hover:bg-coral-accessible-dark sm:px-4 sm:text-sm",
              "lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0 lg:text-sm lg:text-coral-accessible lg:hover:text-coral-accessible-dark",
            )}
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
              <Dialog.Overlay
                className={cn(
                  "fixed inset-0 z-50 bg-charcoal/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  dialogMotionClasses,
                )}
              />
              <Dialog.Content
                aria-describedby={undefined}
                className={cn(
                  "fixed inset-x-4 top-20 z-50 rounded-2xl border border-charcoal/10 bg-warm-white p-6 shadow-soft outline-none",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                  dialogMotionClasses,
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
                        className="rounded-lg px-3 py-3 text-base font-medium text-charcoal/80 transition-colors hover:bg-charcoal/5 hover:text-coral-accessible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-accessible"
                      >
                        {link.label}
                      </a>
                    </Dialog.Close>
                  ))}
                </nav>

                <Dialog.Close asChild>
                  <a
                    href="#pilote"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-coral-accessible px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-accessible-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-accessible focus-visible:ring-offset-2"
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
