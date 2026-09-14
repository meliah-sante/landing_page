import { Quote } from "lucide-react";
import { origin } from "../content/siteContent";
import { Reveal } from "./Reveal";

export function OriginSection() {
  return (
    <section
      id="origine"
      role="region"
      aria-labelledby="origin-title"
      className="section-pad relative overflow-hidden bg-card"
    >
      <div className="container">
        <Reveal className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <p className="eyebrow">{origin.eyebrow}</p>
            <h2 id="origin-title" className="section-title mt-4 max-w-[12ch]">
              {origin.heading}
            </h2>
          </div>

          <div className="relative">
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{origin.body}</p>

            <figure className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-primary/15 bg-accent px-6 py-8 text-foreground shadow-soft sm:px-9 sm:py-9">
              <Quote
                className="absolute -right-4 -top-5 h-24 w-24 rotate-180 text-primary/15"
                strokeWidth={1}
                aria-hidden="true"
              />
              <blockquote className="relative max-w-2xl text-xl leading-8 sm:text-2xl sm:leading-9">
                {origin.quote}
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold tracking-wide text-accent-foreground">
                {origin.attribution}
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
