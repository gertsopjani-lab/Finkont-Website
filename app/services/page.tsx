import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCard } from "@/components/sections/service-card";
import { Reveal } from "@/components/ui/reveal";
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
        description="Everything you need to run a tight financial operation—delivered by senior accountants and connected systems."
      />

      <section className="fk-container py-24 sm:py-28">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 80} className="h-full">
              <ServiceCard service={service} showFeatures />
            </Reveal>
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
