import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section className="fk-container py-20 sm:py-24">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center gap-2 bg-surface px-6 py-10 text-center"
          >
            <span className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              {stat.value}
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
