import { Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Service } from "@/lib/content";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  /** Show the bullet feature list (used on the full Services page). */
  showFeatures?: boolean;
  className?: string;
}

export function ServiceCard({
  service,
  showFeatures = false,
  className,
}: ServiceCardProps) {
  return (
    <Card
      variant="glass"
      className={cn(
        "group relative h-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glass-hover",
        className,
      )}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(174,123,229,0.16),transparent_70%)]" />

      <CardContent className="relative flex h-full flex-col p-7">
        <span className="inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
          <service.icon className="size-6" aria-hidden="true" />
        </span>

        <h3 className="mt-5 text-lg font-semibold text-accent-neutral">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {service.summary}
        </p>

        {showFeatures && (
          <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-sm text-accent-neutral"
              >
                <Check className="size-4 shrink-0 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
