import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

/** Compact hero used at the top of inner pages. */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="fk-grid-overlay pointer-events-none absolute inset-0" />
      <div className="fk-container relative py-20 sm:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Badge>{eyebrow}</Badge>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-accent-neutral sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
