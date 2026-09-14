import {
  ArrowRightLeft,
  Check,
  Keyboard,
  Mic2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  solution,
  solutionSteps,
  type SolutionStep,
} from "../content/siteContent";
import { Reveal } from "./Reveal";

const keyboardBars = [20, 28, 18, 34, 24, 30, 16, 26];
const voiceBars = [26, 52, 34, 76, 48, 92, 38, 68, 30, 54, 22];
const stepIcons: Record<SolutionStep["icon"], LucideIcon> = {
  mic: Mic2,
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
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{solution.eyebrow}</p>
          <p className="font-heading mt-4 text-4xl font-bold tracking-[-0.06em] text-primary sm:text-5xl">
            {solution.brand}
          </p>
          <h2 id="solution-title" className="section-title mt-5 text-foreground">
            {solution.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/80">{solution.body}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 grid gap-4 md:grid-cols-2">
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
                    <p className={index === 0 ? "eyebrow text-foreground/80" : "eyebrow text-accent-foreground"}>
                      {item.label}
                    </p>
                    <p className="font-heading mt-3 text-3xl font-semibold tracking-tight text-foreground">{item.value}</p>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-primary/20 bg-card text-accent-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-6 flex h-16 items-center gap-2" aria-hidden="true">
                  {bars.map((height, barIndex) => (
                    <span
                      key={`${height}-${barIndex}`}
                      className={
                        index === 0
                          ? "min-w-1 flex-1 rounded-full bg-muted-foreground/35"
                          : "min-w-1 flex-1 rounded-full bg-gradient-to-t from-primary via-brand-mid to-secondary"
                      }
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </article>
            );
          })}
        </Reveal>

        <p className="mt-4 text-sm font-semibold text-accent-foreground">{solution.capacity}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {solutionSteps.map((step, index) => {
            const Icon = stepIcons[step.icon];

            return (
              <Reveal key={step.title} delay={index * 0.05} className="h-full">
                <article className="solution-benefit-card border-border bg-card text-foreground">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/20 bg-accent text-accent-foreground">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="font-heading text-sm font-semibold tracking-[0.18em] text-muted-foreground">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-heading mt-5 text-xl font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8 border-t border-border pt-6">
          <p className="flex max-w-xl items-center gap-3 text-xs font-semibold tracking-[0.12em] text-muted-foreground">
            <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {solution.finePrint}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
