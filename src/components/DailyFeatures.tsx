import {
  BellRing,
  CalendarCheck2,
  LockKeyhole,
  Mic2,
  RefreshCcw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { daily, dailyFeatures, type DailyFeature } from "../content/siteContent";
import { Reveal } from "./Reveal";

const featureIcons: Record<DailyFeature["icon"], LucideIcon> = {
  calendar: CalendarCheck2,
  bell: BellRing,
  shield: ShieldCheck,
  lock: LockKeyhole,
  mic: Mic2,
  refresh: RefreshCcw,
};

export function DailyFeatures() {
  return (
    <section
      id="fonctionnalites"
      role="region"
      aria-labelledby="daily-title"
      className="section-pad overflow-hidden bg-coral-soft"
    >
      <div className="container">
        <Reveal className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">{daily.eyebrow}</p>
            <p className="mt-5 text-6xl font-bold tracking-[-0.06em] text-coral-accessible sm:text-8xl">
              {daily.brand}
            </p>
          </div>
          <div>
            <h2 id="daily-title" className="section-title max-w-[14ch]">
              {daily.tagline}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-charcoal/65">{daily.body}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal className="phone-stage">
            <div className="phone-glow" aria-hidden="true" />
            <img
              src="/assets/phone-aura.png"
              alt="Interface AURA sur le terminal d'un soignant"
              width={500}
              height={1008}
              loading="lazy"
              fetchPriority="low"
              className="relative z-10 mx-auto h-auto w-[68%] max-w-[24rem] drop-shadow-[0_28px_40px_rgba(28,28,28,0.22)]"
            />
            <div className="phone-caption">
              <span className="inline-block h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
              <span>{daily.tagline}</span>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {dailyFeatures.map((feature, index) => {
              const Icon = featureIcons[feature.icon];
              return (
                <Reveal key={feature.title} delay={index * 0.045} className="h-full">
                  <article className="feature-card">
                    <div className="feature-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-coral/10 text-coral">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3 className="mt-8 text-xl font-semibold tracking-tight">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-charcoal/70">
                      {feature.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
