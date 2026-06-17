import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ServiceCard } from "@/components/sections/service-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

// Bento spans for the 3 featured services: wide hero tile + two stacked.
const BENTO_SPANS = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1"] as const;

export function ServicesPreview() {
  const featured = services.slice(0, 3);

  return (
    <section className="border-y border-white/10 bg-slate-deep/40">
      <div className="fk-container py-24 sm:py-28">
        <Reveal>
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
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={index * 90}
              className={cn(BENTO_SPANS[index] ?? "lg:col-span-1", "h-full")}
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
