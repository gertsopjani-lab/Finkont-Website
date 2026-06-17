import { InteractiveCard } from "@/components/ui/interactive-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { valueProps } from "@/lib/content";
import { cn } from "@/lib/utils";

// Asymmetric bento spans: wide / narrow / narrow / wide.
const BENTO_SPANS = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
] as const;

export function ValueProps() {
  return (
    <section className="fk-container py-24 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Why Finkont"
          title="The financial backbone your business deserves"
          description="The rigor of a top-tier finance team with the responsiveness of a true partner."
        />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {valueProps.map((prop, index) => (
          <Reveal
            key={prop.title}
            delay={index * 90}
            className={cn(BENTO_SPANS[index] ?? "lg:col-span-1", "h-full")}
          >
            <InteractiveCard>
              <div className="flex h-full flex-col p-7">
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                  <prop.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-accent-neutral">
                  {prop.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {prop.description}
                </p>
              </div>
            </InteractiveCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
