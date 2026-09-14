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
      className="section-pad overflow-hidden bg-background text-foreground"
    >
      <div className="container">
        <Reveal className="grid items-end gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow-on-dark">{solution.eyebrow}</p>
            <p className="font-heading mt-5 text-6xl font-bold tracking-[-0.06em] text-primary sm:text-8xl">
              {solution.brand}
            </p>
          </div>
          <div>
            <h2 id="solution-title" className="section-title text-foreground">
              {solution.heading}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{solution.body}</p>
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
                    ? "comparison-card border-border bg-muted"
                    : "comparison-card border-primary/20 bg-gradient-to-br from-accent via-card to-secondary/15"
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={index === 0 ? "eyebrow text-muted-foreground" : "eyebrow text-accent-foreground"}>
                      {item.label}
                    </p>
                    <p className="font-heading mt-3 text-3xl font-semibold tracking-tight text-foreground">{item.value}</p>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-primary/20 bg-card text-accent-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8 flex h-20 items-center gap-2" aria-hidden="true">
                  {bars.map((height, barIndex) => (
                    <span
                      key={`${height}-${barIndex}`}
                      className={
                        index === 0
                          ? "min-w-1 flex-1 rounded-full bg-muted-foreground/35"
                          : "min-w-1 flex-1 rounded-full bg-gradient-to-t from-primary to-secondary"
                      }
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </article>
            );
          })}
        </Reveal>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {solutionBenefits.map((benefit, index) => {
            const Icon = benefitIcons[benefit.icon];

            return (
              <Reveal key={benefit.title} delay={index * 0.05} className="h-full">
                <article className="solution-benefit-card border-border bg-card text-foreground">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/20 bg-accent text-accent-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="font-heading mt-7 text-xl font-semibold tracking-tight text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{benefit.description}</p>
                  {benefit.metrics.length > 0 ? (
                    <div
                      className={
                        benefit.metrics.length > 1
                          ? "mt-7 grid gap-3 sm:grid-cols-3"
                          : "mt-7"
                      }
                    >
                      {benefit.metrics.map((metric) => (
                        <div key={metric.value} className="rounded-2xl bg-muted p-4">
                          <p className="font-heading text-3xl font-semibold tracking-[-0.04em] text-accent-foreground">
                            {metric.value}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-muted-foreground">
                            {metric.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-9 grid gap-5 border-t border-border pt-8 md:grid-cols-[0.8fr_1.2fr]">
          <p className="flex max-w-xl items-center gap-3 text-xs font-semibold tracking-[0.12em] text-muted-foreground">
            <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {solution.finePrint}
          </p>
          <p className="text-sm leading-6 text-muted-foreground">{suiteNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
