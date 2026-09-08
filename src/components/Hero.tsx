import { ArrowDownRight, AudioWaveform, ShieldCheck } from "lucide-react";
import { hero } from "../content/siteContent";
import { Reveal } from "./Reveal";

const voiceBars = [22, 38, 58, 34, 70, 48, 82, 40, 64, 30, 50, 24];

export function Hero() {
  return (
    <section
      id="hero"
      role="region"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-charcoal/10"
    >
      <div className="hero-orb hero-orb-coral" aria-hidden="true" />
      <div className="hero-orb hero-orb-cream" aria-hidden="true" />

      <div className="container grid min-h-[calc(100svh-73px)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
        <Reveal className="relative z-10 max-w-3xl">
          <p className="eyebrow mb-6">{hero.eyebrow}</p>
          <h1 id="hero-title" className="display-title max-w-[13ch]">
            {hero.heading}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-charcoal/70 sm:text-xl">
            {hero.body}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#calculatrice" className="cta-primary group">
              Calculer mes pertes
              <ArrowDownRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
            <a href="#pilote" className="cta-secondary">
              Réserver ma place pilote
            </a>
          </div>
          <p className="mt-6 max-w-xl text-xs leading-5 text-charcoal/70">{hero.note}</p>
        </Reveal>

        <Reveal delay={0.12} className="relative mx-auto w-full max-w-[30rem]">
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-signal-card">
              <div className="flex items-center gap-2 text-coral-accessible">
                <AudioWaveform className="h-5 w-5" />
                <span className="text-xs font-bold tracking-[0.22em]">AURA ÉCOUTE</span>
              </div>
              <div className="mt-5 flex h-16 items-center gap-1.5">
                {voiceBars.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className="voice-bar"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-charcoal/70">
                <ShieldCheck className="h-4 w-4 text-coral-accessible" />
                Transmission structurée et sécurisée
              </div>
            </div>
            <div className="hero-ring hero-ring-one" />
            <div className="hero-ring hero-ring-two" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
