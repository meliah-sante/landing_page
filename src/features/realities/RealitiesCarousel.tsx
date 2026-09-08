import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/cn";
import { REALITIES } from "./realities";

const SWIPE_THRESHOLD = 40;
const TOTAL_REALITIES = REALITIES.length;

function formatProgress(index: number): string {
  const current = String(index + 1).padStart(2, "0");
  const total = String(TOTAL_REALITIES).padStart(2, "0");
  return `${current} / ${total}`;
}

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

type SlidePosition = "previous" | "current" | "next";

function getVisibleSlides(currentIndex: number) {
  const slides: Array<{ reality: (typeof REALITIES)[number]; index: number; position: SlidePosition }> = [];

  if (currentIndex > 0) {
    slides.push({
      reality: REALITIES[currentIndex - 1],
      index: currentIndex - 1,
      position: "previous",
    });
  }

  slides.push({
    reality: REALITIES[currentIndex],
    index: currentIndex,
    position: "current",
  });

  if (currentIndex < TOTAL_REALITIES - 1) {
    slides.push({
      reality: REALITIES[currentIndex + 1],
      index: currentIndex + 1,
      position: "next",
    });
  }

  return slides;
}

export function RealitiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, TOTAL_REALITIES - 1)));
  }, []);

  const goToPrevious = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [currentIndex, goToIndex]);

  const goToNext = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [currentIndex, goToIndex]);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  const handleTouchStart = (clientX: number) => {
    touchStartX.current = clientX;
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX.current === null) {
      return;
    }

    const delta = clientX - touchStartX.current;
    touchStartX.current = null;

    if (delta <= -SWIPE_THRESHOLD) {
      goToNext();
      return;
    }

    if (delta >= SWIPE_THRESHOLD) {
      goToPrevious();
    }
  };

  const visibleSlides = getVisibleSlides(currentIndex);
  const currentReality = REALITIES[currentIndex];

  return (
    <section aria-labelledby="realities-carousel-title" className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-charcoal/50">Les réalités du terrain</p>
        <h2 id="realities-carousel-title" className="text-3xl font-semibold text-charcoal sm:text-4xl">
          Sept constats que vivent vos équipes
        </h2>
      </div>

      <div
        role="region"
        aria-label="Carrousel des réalités"
        aria-roledescription="carrousel"
        tabIndex={0}
        data-reduced-motion={prefersReducedMotion ? "true" : "false"}
        className="rounded-3xl border border-charcoal/10 bg-white/70 p-4 shadow-soft outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white sm:p-6"
        onTouchStart={(event) => handleTouchStart(event.touches[0]?.clientX ?? 0)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="secondary"
            aria-label="Réalité précédente"
            className="h-11 w-11 shrink-0 rounded-full px-0"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Button>

          <p className="text-sm font-semibold tracking-[0.2em] text-charcoal/70" aria-live="polite" aria-atomic="true">
            {formatProgress(currentIndex)}
          </p>

          <Button
            type="button"
            variant="secondary"
            aria-label="Réalité suivante"
            className="h-11 w-11 shrink-0 rounded-full px-0"
            onClick={goToNext}
            disabled={currentIndex === TOTAL_REALITIES - 1}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>

        <div className="relative min-h-[14rem] overflow-hidden md:min-h-[18rem]">
          <div
            className={cn(
              "flex items-stretch justify-center gap-4",
              !prefersReducedMotion && "transition-transform duration-300 ease-out",
            )}
          >
            {visibleSlides.map(({ reality, position }) => (
              <article
                key={`${reality.number}-${position}`}
                data-slide-position={position}
                aria-hidden={position !== "current"}
                className={cn(
                  "rounded-2xl border border-charcoal/10 bg-warm-white p-6 text-left shadow-sm",
                  position === "current" && "z-10 w-full max-w-2xl",
                  position === "previous" &&
                    "hidden w-1/4 max-w-xs scale-95 opacity-60 md:block",
                  position === "next" &&
                    "hidden w-1/4 max-w-xs scale-95 opacity-60 md:block",
                  !prefersReducedMotion && position === "current" && "transition-all duration-300",
                )}
              >
                <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-coral">{reality.number}</p>
                <h3 className="mb-3 text-xl font-semibold text-charcoal sm:text-2xl">{reality.title}</h3>
                <p className="text-base leading-relaxed text-charcoal/75">
                  {position === "current" ? reality.description : reality.title}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {REALITIES.map((reality, index) => (
            <button
              key={reality.number}
              type="button"
              aria-label={`Réalité ${index + 1} sur ${TOTAL_REALITIES}`}
              aria-current={index === currentIndex ? "true" : undefined}
              className={cn(
                "h-3 w-3 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white",
                index === currentIndex ? "bg-coral" : "bg-charcoal/20 hover:bg-charcoal/35",
              )}
              onClick={() => goToIndex(index)}
            />
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {currentReality.title}. {currentReality.description}
        </p>
      </div>
    </section>
  );
}
