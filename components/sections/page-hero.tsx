import { Badge } from "@/components/ui/badge";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

/** Compact hero used at the top of inner pages. */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary-radial">
      <div className="fk-container py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="fk-animate-entry">
            <Badge>{eyebrow}</Badge>
          </div>
          <h1
            className="fk-animate-entry mt-5 text-4xl font-semibold tracking-tight text-accent-neutral sm:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            {title}
          </h1>
          <p
            className="fk-animate-entry mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "160ms" }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
