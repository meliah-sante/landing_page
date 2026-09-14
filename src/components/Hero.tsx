import { ArrowDownRight, ArrowUpRight, AudioWaveform, ShieldCheck } from "lucide-react";
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

      <div className="container grid min-h-[calc(88svh-73px)] items-center gap-12 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
        <Reveal className="relative z-10 max-w-3xl">
          <p className="eyebrow mb-6">{hero.eyebrow}</p>
          <h1 id="hero-title" className="display-title max-w-[13ch]">
            {hero.headingLead}{" "}
            <span className="whitespace-nowrap text-accent-foreground">{hero.amount}</span>{" "}
            {hero.headingTail}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            {hero.body}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
          <p className="mt-6 max-w-xl text-xs leading-5 text-muted-foreground">{hero.note}</p>
        </Reveal>

        <Reveal delay={0.12} className="relative mx-auto w-full max-w-[30rem]">
          <div className="hero-proof">
            <div className="hero-proof-panel border-border bg-card">
              <div className="flex items-center justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
                  <AudioWaveform className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-accent-foreground" aria-hidden="true" />
                  Structuré & horodaté
                </span>
              </div>

              <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                À la voix
              </p>
              <p className="font-heading mt-2 text-5xl font-semibold tracking-[-0.055em] text-foreground sm:text-6xl">
                150 mots/min
              </p>
              <p className="mt-3 text-base font-semibold text-accent-foreground">4x plus rapide</p>

              <div className="hero-waveform mt-8 flex h-16 items-center gap-1.5" aria-hidden="true">
                {voiceBars.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className="voice-bar"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="hero-proof-metric">
              <strong>13h20</strong>
              <span>récupérées chaque jour</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
