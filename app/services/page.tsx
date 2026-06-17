import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCard } from "@/components/sections/service-card";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Finkont's full-service corporate accounting capabilities—from bookkeeping and tax to fractional CFO advisory.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Corporate accounting, fully managed"
        description="Everything you need to run a tight financial operation—delivered by senior accountants and modern systems."
      />

      <section className="fk-container py-20 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              showFeatures
              className="fk-animate-entry"
              style={{ animationDelay: `${index * 90}ms` }}
            />
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure which service fits?"
        description="Tell us about your business and we'll recommend the right engagement."
      />
    </>
  );
}
