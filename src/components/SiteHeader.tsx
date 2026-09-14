import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "../content/navLinks";
import { PILOT_REQUEST_URL } from "../content/siteContent";
import { assetUrl } from "../lib/assetUrl";
import { cn } from "../lib/cn";
import { Button } from "./ui/Button";

const linkClassName =
  "text-sm font-medium text-foreground/80 transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const dialogMotionClasses =
  "motion-reduce:animate-none motion-reduce:transition-none motion-reduce:zoom-in-95 motion-reduce:zoom-out-95";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 24);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  return (
    <header
      data-scrolled={isScrolled ? "true" : "false"}
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none",
        isScrolled
          ? "border-border bg-card/[0.98] shadow-[0_8px_30px_rgba(23,28,38,0.1)] backdrop-blur-xl"
          : "border-border bg-background/90",
      )}
    >
      <div
        className={cn(
          "container flex items-center justify-between gap-4 transition-[padding] duration-300 motion-reduce:transition-none sm:gap-6",
          isScrolled ? "py-2.5" : "py-4",
        )}
      >
        <a
          href="#hero"
          className={cn(
            "flex shrink-0 items-center gap-3 rounded-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <img
            src={assetUrl("assets/meliah-logo.png")}
            alt="Méliah Santé"
            className={cn(
              "w-auto transition-[height] duration-300 motion-reduce:transition-none",
              isScrolled ? "h-7" : "h-8",
            )}
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
            className="hidden text-sm font-medium uppercase tracking-wide text-muted-foreground md:inline"
          >
            FR
          </span>

          <a
            href={PILOT_REQUEST_URL}
            className={cn(
              "cta-primary min-h-11 px-3 py-2 text-[0.7rem] leading-tight sm:px-4 sm:text-sm",
            )}
          >
            Réserver ma place pilote
          </a>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <Button
                className="h-11 w-11 px-0 lg:hidden"
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
                  "fixed inset-0 z-50 bg-foreground/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  dialogMotionClasses,
                )}
              />
              <Dialog.Content
                aria-describedby={undefined}
                className={cn(
                  "fixed inset-x-4 top-20 z-50 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-2xl border border-border bg-card p-6 shadow-soft outline-none",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                  dialogMotionClasses,
                )}
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <Dialog.Title className="font-heading text-lg font-semibold text-foreground">
                    Navigation
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <Button
                      variant="ghost"
                      aria-label="Fermer le menu"
                      className="h-11 w-11 px-0"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Dialog.Close asChild key={link.href}>
                      <a
                        href={link.href}
                        className="flex min-h-11 items-center rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground"
                      >
                        {link.label}
                      </a>
                    </Dialog.Close>
                  ))}
                </nav>

                <Dialog.Close asChild>
                  <a
                    href={PILOT_REQUEST_URL}
                    className="cta-primary mt-6 min-h-11 w-full"
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
