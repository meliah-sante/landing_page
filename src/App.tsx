import { DailyFeatures } from "./components/DailyFeatures";
import { Hero } from "./components/Hero";
import { ModulesSection } from "./components/ModulesSection";
import { OriginSection } from "./components/OriginSection";
import { PilotCta } from "./components/PilotCta";
import { Reveal } from "./components/Reveal";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { SolutionSection } from "./components/SolutionSection";
import { calculator } from "./content/siteContent";
import { LossCalculator } from "./features/calculator/LossCalculator";
import { RealitiesCarousel } from "./features/realities/RealitiesCarousel";

export default function App() {
  return (
    <>
      <a
        href="#contenu-principal"
        className="fixed left-4 top-4 z-[100] -translate-y-[200%] rounded-full bg-charcoal px-5 py-3 font-semibold text-white transition-transform focus:translate-y-0 focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white motion-reduce:transition-none"
      >
        Aller au contenu principal
      </a>
      <SiteHeader />
      <main id="contenu-principal" tabIndex={-1}>
        <Hero />
        <OriginSection />
        <RealitiesCarousel />
        <SolutionSection />
        <DailyFeatures />
        <ModulesSection />
        <section
          id="calculatrice"
          role="region"
          aria-labelledby="calculator-title"
          className="section-pad bg-coral-soft"
        >
          <div className="container">
            <Reveal className="mx-auto mb-12 max-w-3xl text-center">
              <p className="eyebrow">{calculator.eyebrow}</p>
              <h2 id="calculator-title" className="section-title mt-5">
                {calculator.heading}
              </h2>
              <p className="mt-5 text-lg text-charcoal/70">{calculator.subheading}</p>
            </Reveal>
            <Reveal delay={0.08} className="mx-auto max-w-4xl">
              <LossCalculator />
            </Reveal>
          </div>
        </section>
        <PilotCta />
      </main>
      <SiteFooter />
    </>
  );
}
