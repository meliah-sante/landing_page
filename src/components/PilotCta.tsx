import { ArrowUpRight, Clock3 } from "lucide-react";
import { pilot, PILOT_REQUEST_URL } from "../content/siteContent";
import { Reveal } from "./Reveal";

export function PilotCta() {
  return (
    <section
      id="pilote"
      role="region"
      aria-labelledby="pilot-title"
      className="overflow-hidden bg-card"
    >
      <Reveal className="container py-16 sm:py-20 lg:py-24">
          <div className="pilot-card bg-card text-foreground">
            <div className="pilot-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="relative z-10 max-w-4xl">
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" aria-hidden="true" />
              <h2 id="pilot-title" className="font-heading mt-6 text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
                {pilot.heading}
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/80">{pilot.body}</p>
              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <a
                  href={PILOT_REQUEST_URL}
                  className="cta-primary"
                >
                  {pilot.cta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
                  {pilot.smallText}
                </p>
              </div>
            </div>
          </div>
      </Reveal>
    </section>
  );
}
