import { ArrowUpRight, Clock3, Quote } from "lucide-react";
import { pilot, testimonial } from "../content/siteContent";
import { Reveal } from "./Reveal";

export function PilotCta() {
  return (
    <section
      id="pilote"
      role="region"
      aria-labelledby="pilot-title"
      className="overflow-hidden bg-white"
    >
      <div className="container py-16 sm:py-20">
        <Reveal>
          <figure className="mx-auto max-w-4xl border-y border-charcoal/10 py-12 text-center sm:py-16">
            <Quote className="mx-auto h-8 w-8 text-coral" strokeWidth={1.5} aria-hidden="true" />
            <blockquote className="mx-auto mt-6 max-w-3xl text-2xl leading-10 tracking-[-0.025em] text-charcoal sm:text-4xl sm:leading-[1.25]">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-7 text-sm font-semibold text-charcoal/70">
              {testimonial.attribution}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <Reveal className="container pb-16 sm:pb-24">
        <div className="pilot-card">
          <div className="pilot-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="relative z-10 max-w-4xl">
            <div className="h-1 w-16 rounded-full bg-coral" aria-hidden="true" />
            <h2 id="pilot-title" className="mt-6 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              {pilot.heading}
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">{pilot.body}</p>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <a href="#pilote" className="cta-primary">
                {pilot.cta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="flex items-center gap-2 text-sm font-medium text-white/50">
                <Clock3 className="h-4 w-4 text-coral" aria-hidden="true" />
                {pilot.smallText}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
