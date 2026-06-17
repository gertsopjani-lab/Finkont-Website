import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Stats } from "@/components/sections/stats";
import { Card, CardContent } from "@/components/ui/card";
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
      <section className="fk-container py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
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
              Our team pairs seasoned CPAs and controllers with modern tooling
              and tight processes. The result is a finance function that scales
              with you—accurate, proactive, and always one step ahead.
            </p>
          </div>

          <Card className="bg-primary-radial">
            <CardContent className="p-8">
              <blockquote className="text-xl font-medium leading-relaxed text-accent-neutral">
                &ldquo;Finance is the language of business. Our job is to make
                sure you&apos;re always fluent—and never caught off guard.&rdquo;
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
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-surface/30">
        <div className="fk-container py-20 sm:py-24">
          <SectionHeading
            eyebrow="What we value"
            title="Principles that guide every engagement"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {firmValues.map((value, index) => (
              <Card
                key={value.title}
                className="fk-animate-entry"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <CardContent className="p-7">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <value.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-accent-neutral">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <CtaBand />
    </>
  );
}
