import { ArrowDownRight, AudioWaveform, ShieldCheck } from "lucide-react";
import { hero, PILOT_REQUEST_URL } from "../content/siteContent";
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
            <a
              href={PILOT_REQUEST_URL}
              className="cta-secondary"
            >
              Réserver ma place pilote
            </a>
          </div>
          <p className="mt-6 max-w-xl text-xs leading-5 text-charcoal/70">{hero.note}</p>
        </Reveal>

        <Reveal delay={0.12} className="relative mx-auto w-full max-w-[30rem]">
          <div className="hero-visual">
            <img
              src="/assets/phone-aura.png"
              alt="Interface AURA sur le terminal d'un soignant"
              width={500}
              height={1008}
              loading="eager"
              fetchPriority="high"
              className="hero-phone"
            />
            <div className="hero-signal-card" aria-hidden="true">
              <div className="flex items-center justify-between text-coral-accessible">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-coral-soft">
                  <AudioWaveform className="h-5 w-5" />
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-charcoal/10 bg-white">
                  <ShieldCheck className="h-4 w-4" />
                </span>
              </div>
              <div className="hero-waveform mt-4 flex h-12 items-center gap-1">
                {voiceBars.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className="voice-bar"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="hero-ring hero-ring-one" aria-hidden="true" />
            <div className="hero-ring hero-ring-two" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
