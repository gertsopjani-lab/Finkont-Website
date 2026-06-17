import type { Metadata } from "next";

import { Approach } from "@/components/sections/approach";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { firmValues } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Finkont is a premium accounting firm built to give ambitious businesses the clarity and confidence to grow.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our firm"
        title="Built for businesses that mean business"
        description="We started Finkont to give growing companies the kind of financial rigor usually reserved for the enterprise—without the bureaucracy."
      />

      {/* Story */}
      <section className="fk-container py-24 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="Senior expertise, modern execution"
            />
            <p className="text-base leading-relaxed text-muted-foreground">
              {siteConfig.name} was founded on a simple belief: accounting
              should be a competitive advantage, not a back-office afterthought.
              Too many businesses outgrow their bookkeeper right when financial
              clarity matters most.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Our team pairs seasoned accountants and controllers with modern
              tooling and tight processes. The result is a finance function that
              scales with you—accurate, proactive, and always one step ahead.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Card variant="glass" className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_0%,rgba(174,123,229,0.18),transparent_70%)]" />
              <CardContent className="relative p-8">
                <blockquote className="text-xl font-medium leading-relaxed text-accent-neutral">
                  &ldquo;Finance is the language of business. Our job is to make
                  sure you&apos;re always fluent—and never caught off
                  guard.&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                    AS
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-accent-neutral">
                      Avery Stone
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Founder &amp; Managing Partner
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-white/10 bg-slate-deep/40">
        <div className="fk-container py-24 sm:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="What we value"
              title="Principles that guide every engagement"
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {firmValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 90} className="h-full">
                <InteractiveCard>
                  <div className="p-7">
                    <span className="inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                      <value.icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-accent-neutral">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </InteractiveCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Approach />
      <CtaBand />
    </>
  );
}
