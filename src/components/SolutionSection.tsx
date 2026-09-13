import {
  ArrowRightLeft,
  Check,
  Clock3,
  Keyboard,
  Mic2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  solution,
  solutionBenefits,
  suiteNote,
  type SolutionBenefit,
} from "../content/siteContent";
import { Reveal } from "./Reveal";

const keyboardBars = [20, 28, 18, 34, 24, 30, 16, 26];
const voiceBars = [26, 52, 34, 76, 48, 92, 38, 68, 30, 54, 22];
const benefitIcons: Record<SolutionBenefit["icon"], LucideIcon> = {
  mic: Mic2,
  clock: Clock3,
  shield: ShieldCheck,
  handover: ArrowRightLeft,
};

export function SolutionSection() {
  return (
    <section
      id="solution"
      role="region"
      aria-labelledby="solution-title"
      className="section-pad overflow-hidden bg-charcoal text-white"
    >
      <div className="container">
        <Reveal className="grid items-end gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow-on-dark">{solution.eyebrow}</p>
            <p className="mt-5 text-6xl font-bold tracking-[-0.06em] text-coral sm:text-8xl">
              {solution.brand}
            </p>
          </div>
          <div>
            <h2 id="solution-title" className="section-title text-white">
              {solution.heading}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">{solution.body}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-14 grid gap-5 md:grid-cols-2">
          {solution.comparison.map((item, index) => {
            const bars = index === 0 ? keyboardBars : voiceBars;
            const Icon = index === 0 ? Keyboard : Mic2;

            return (
              <article
                key={item.label}
                className={
                  index === 0
                    ? "comparison-card border-white/10 bg-white/[0.04]"
                    : "comparison-card border-coral-accessible bg-coral-accessible"
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={index === 0 ? "eyebrow text-white/60" : "eyebrow text-white"}>
                      {item.label}
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8 flex h-20 items-center gap-2" aria-hidden="true">
                  {bars.map((height, barIndex) => (
                    <span
                      key={`${height}-${barIndex}`}
                      className="min-w-1 flex-1 rounded-full bg-white/75"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </article>
            );
          })}
        </Reveal>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {solutionBenefits.map((benefit, index) => {
            const Icon = benefitIcons[benefit.icon];

            return (
              <Reveal key={benefit.title} delay={index * 0.05} className="h-full">
                <article className="solution-benefit-card">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-coral/30 bg-coral/10 text-coral">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <p className="mt-7 text-4xl font-semibold tracking-[-0.04em] text-coral">
                    {benefit.stat}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {benefit.statDescription}
                  </p>
                  <h3 className="mt-7 text-xl font-semibold tracking-tight text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{benefit.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-9 grid gap-5 border-t border-white/10 pt-8 md:grid-cols-[0.8fr_1.2fr]">
          <p className="flex max-w-xl items-center gap-3 text-xs font-semibold tracking-[0.12em] text-white/55">
            <Check className="h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
            {solution.finePrint}
          </p>
          <p className="text-sm leading-6 text-white/55">{suiteNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
