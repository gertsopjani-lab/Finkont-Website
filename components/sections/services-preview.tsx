import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ServiceCard } from "@/components/sections/service-card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/content";

export function ServicesPreview() {
  const featured = services.slice(0, 3);

  return (
    <section className="border-y border-border bg-surface/30">
      <div className="fk-container py-20 sm:py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Capabilities"
            title="Full-service accounting, end to end"
            description="From day-to-day bookkeeping to strategic CFO guidance—one team, fully accountable."
          />
          <Button asChild variant="outline">
            <Link href="/services">
              View all services
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              className="fk-animate-entry"
              style={{ animationDelay: `${index * 120}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
