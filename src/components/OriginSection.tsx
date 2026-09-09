import { Quote } from "lucide-react";
import { origin } from "../content/siteContent";
import { Reveal } from "./Reveal";

export function OriginSection() {
  return (
    <section
      id="origine"
      role="region"
      aria-labelledby="origin-title"
      className="section-pad relative overflow-hidden bg-white"
    >
      <div className="container">
        <Reveal className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div>
            <p className="eyebrow">{origin.eyebrow}</p>
            <h2 id="origin-title" className="section-title mt-5 max-w-[10ch]">
              {origin.heading}
            </h2>
            <div className="mt-10 hidden h-px w-full bg-charcoal/15 lg:block">
              <span className="block h-px w-1/3 bg-coral" />
            </div>
          </div>

          <div className="relative">
            <div className="space-y-4 border-l border-charcoal/15 pl-6 text-lg leading-8 text-charcoal/70 sm:pl-9">
              {origin.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <figure className="relative mt-10 overflow-hidden rounded-[2rem] bg-charcoal px-7 py-9 text-white sm:px-10 sm:py-11">
              <Quote
                className="absolute -right-4 -top-5 h-28 w-28 rotate-180 text-coral/15"
                strokeWidth={1}
                aria-hidden="true"
              />
              <blockquote className="relative max-w-2xl text-xl leading-8 sm:text-2xl sm:leading-9">
                {origin.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm font-semibold tracking-wide text-coral">
                {origin.attribution}
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
