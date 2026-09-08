import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Button } from "../../components/ui/Button";
import { realities as REALITIES, realitiesIntro } from "../../content/siteContent";
import { cn } from "../../lib/cn";

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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      goToPrevious();
    }
    if (event.key === "ArrowRight") {
      goToNext();
    }
  };

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
    <section
      id="realites"
      role="region"
      aria-label="Carrousel des réalités"
      aria-roledescription="carrousel"
      tabIndex={0}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      className="section-pad bg-warm-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral-accessible"
      onKeyDown={handleKeyDown}
      onTouchStart={(event) => handleTouchStart(event.touches[0]?.clientX ?? 0)}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
    >
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="eyebrow">{realitiesIntro.eyebrow}</p>
          <h2 id="realities-carousel-title" className="section-title">
            {realitiesIntro.heading}
          </h2>
          <p className="text-lg text-charcoal/70">{realitiesIntro.subheading}</p>
        </div>

        <div className="mt-12 rounded-[2rem] border border-charcoal/10 bg-white/70 p-4 shadow-soft sm:p-6">
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

          <div
            aria-live="polite"
            aria-atomic="true"
            className="min-w-[5.5rem] text-center"
          >
            <p className="text-sm font-semibold tracking-[0.2em] text-charcoal/70">
              {formatProgress(currentIndex)}
            </p>
            <p className="sr-only">
              {currentReality.title}. {currentReality.description}
            </p>
          </div>

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
                  <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-coral-accessible">{reality.number}</p>
                  {position === "current" ? (
                    <>
                      <h3 className="mb-3 text-xl font-semibold text-charcoal sm:text-2xl">{reality.title}</h3>
                      <p className="text-base leading-relaxed text-charcoal/75">{reality.description}</p>
                    </>
                  ) : (
                    <p className="line-clamp-6 text-base leading-relaxed text-charcoal/75">{reality.description}</p>
                  )}
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-accessible focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white"
                onClick={() => goToIndex(index)}
              >
                <span
                  role="presentation"
                  aria-hidden="true"
                  className={cn(
                    "h-3 w-3 rounded-full transition-colors",
                    index === currentIndex
                      ? "bg-coral-accessible"
                      : "bg-charcoal/50 hover:bg-charcoal/70",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-charcoal/70">{realitiesIntro.supportingText}</p>
          <a href="#calculatrice" className="cta-primary">
            {realitiesIntro.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
