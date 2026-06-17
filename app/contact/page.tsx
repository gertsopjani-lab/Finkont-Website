import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Finkont. Book a free consultation and see how our accounting team can support your business.",
};

const details = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`,
  },
  { icon: MapPin, label: "Office", value: siteConfig.address },
  { icon: Clock, label: "Hours", value: "Mon–Fri · 9am–6pm PT" },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your numbers"
        description="Tell us where you are and where you're headed. We'll show you how Finkont can help you get there."
      />

      <section className="fk-container py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <Reveal>
              <Card variant="glass">
                <CardContent className="p-7 sm:p-9">
                  <ContactForm />
                </CardContent>
              </Card>
            </Reveal>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              {details.map((detail, index) => {
                const content = (
                  <Card
                    variant="glass"
                    className="group transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-glass-hover"
                  >
                    <CardContent className="flex items-start gap-4 p-5">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                        <detail.icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted">
                          {detail.label}
                        </p>
                        <p className="mt-1 text-sm text-accent-neutral">
                          {detail.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );

                return (
                  <Reveal key={detail.label} delay={index * 80}>
                    {"href" in detail && detail.href ? (
                      <a href={detail.href} className="block">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
