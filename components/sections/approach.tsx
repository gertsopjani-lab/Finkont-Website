import { InteractiveCard } from "@/components/ui/interactive-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { approachPillars } from "@/lib/content";

export function Approach() {
  return (
    <section className="fk-container py-24 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="How we work"
          title="Four pillars behind every engagement"
          description="Not a list of numbers—a way of operating. This is how Finkont turns accounting into an advantage."
        />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {approachPillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 90} className="h-full">
            <InteractiveCard>
              <div className="flex h-full flex-col p-7">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                  <pillar.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-accent-neutral">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </InteractiveCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
