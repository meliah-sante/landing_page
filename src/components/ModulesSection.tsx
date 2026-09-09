import {
  ArrowUpRight,
  AudioWaveform,
  BellDot,
  Focus,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { modules, modulesIntro, type Module } from "../content/siteContent";
import { Reveal } from "./Reveal";

const moduleIcons: Record<Module["icon"], LucideIcon> = {
  wave: AudioWaveform,
  focus: Focus,
  dome: Shield,
  priority: BellDot,
};

export function ModulesSection() {
  return (
    <section
      id="modules"
      role="region"
      aria-labelledby="modules-title"
      className="section-pad bg-white"
    >
      <div className="container">
        <Reveal className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow">{modulesIntro.eyebrow}</p>
            <h2 id="modules-title" className="section-title mt-5 max-w-[16ch]">
              {modulesIntro.heading}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-charcoal/70">{modulesIntro.subheading}</p>
        </Reveal>

        <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-charcoal/10 md:grid-cols-2">
          {modules.map((module, index) => {
            const Icon = moduleIcons[module.icon];
            return (
              <Reveal
                key={module.name}
                delay={index * 0.05}
                className="h-full border-charcoal/10 odd:border-b md:odd:border-r [&:nth-child(-n+2)]:border-b"
              >
                <article className="module-card group">
                  <div className="flex items-start justify-between gap-5">
                    <span className="module-icon">
                      <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold tracking-[0.22em] text-charcoal/65">
                      / {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-10 text-4xl font-bold tracking-[-0.05em] text-charcoal">
                    {module.name}
                  </h3>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.15em] text-coral-accessible">
                    {module.subtitle}
                  </p>
                  <p className="mt-6 max-w-xl text-base leading-7 text-charcoal/70">
                    {module.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-coral-soft p-7 sm:flex-row sm:items-center sm:p-9">
          <p className="max-w-xl text-xl font-semibold tracking-tight">{modulesIntro.footer}</p>
          <a href="#pilote" className="cta-dark shrink-0">
            {modulesIntro.cta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
