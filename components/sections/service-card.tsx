import { Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Service } from "@/lib/content";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  /** Show the bullet feature list (used on the full Services page). */
  showFeatures?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ServiceCard({
  service,
  showFeatures = false,
  className,
  style,
}: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "group h-full transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-primary-glow",
        className,
      )}
      style={style}
    >
      <CardContent className="flex h-full flex-col p-7">
        <span className="inline-flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
          <service.icon className="size-6" aria-hidden="true" />
        </span>

        <h3 className="mt-5 text-lg font-semibold text-accent-neutral">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {service.summary}
        </p>

        {showFeatures && (
          <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
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
