import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { valueProps } from "@/lib/content";

export function ValueProps() {
  return (
    <section className="fk-container py-20 sm:py-24">
      <SectionHeading
        eyebrow="Why Finkont"
        title="The financial backbone your business deserves"
        description="We combine the rigor of a top-tier finance team with the responsiveness of a true partner."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {valueProps.map((prop, index) => (
          <Card
            key={prop.title}
            className="fk-animate-entry group transition-colors duration-200 hover:border-primary/50 hover:bg-surface-hover"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <CardContent className="p-7">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
                <prop.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-accent-neutral">
                {prop.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {prop.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
