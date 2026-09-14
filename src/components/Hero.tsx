import { ArrowDownRight, ArrowUpRight, AudioWaveform } from "lucide-react";
import { hero, PILOT_REQUEST_URL } from "../content/siteContent";
import { Reveal } from "./Reveal";

const voiceBars = [22, 38, 58, 34, 70, 48, 82, 40, 64, 30, 50, 24];

export function Hero() {
  return (
    <section
      id="hero"
      role="region"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-border bg-background"
    >
      <div className="hero-orb hero-orb-coral" aria-hidden="true" />
      <div className="hero-orb hero-orb-cream" aria-hidden="true" />

      <div className="container grid items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:py-16">
        <Reveal className="relative z-10 max-w-3xl">
          <p className="eyebrow mb-5">{hero.eyebrow}</p>
          <h1 id="hero-title" className="display-title max-w-[13ch]">
            {hero.headingLead}{" "}
            <span className="brand-amount whitespace-nowrap">{hero.amount}</span>{" "}
            {hero.headingTail}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            {hero.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={PILOT_REQUEST_URL}
              className="cta-primary group"
            >
              Réserver ma place pilote
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
            <a href="#calculatrice" className="cta-secondary group">
              Calculer mes pertes
              <ArrowDownRight
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
          </div>
          <p className="mt-5 max-w-xl text-xs leading-5 text-muted-foreground">{hero.note}</p>
        </Reveal>

        <Reveal delay={0.12} className="relative mx-auto w-full max-w-[26rem]">
          <div className="hero-proof">
            <div className="hero-proof-panel border-border bg-card">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
                  <AudioWaveform className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {hero.proofLabel}
                </p>
              </div>

              <p className="font-heading mt-8 text-5xl font-semibold tracking-[-0.055em] text-foreground sm:text-6xl">
                {hero.proofValue}
              </p>
              <p className="mt-3 text-base font-medium text-foreground/80">{hero.proofHint}</p>

              <div className="hero-waveform mt-8 flex h-14 items-center gap-1.5" aria-hidden="true">
                {voiceBars.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className="voice-bar"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
