import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent } from "@/components/ui/card";
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
            <Card>
              <CardContent className="p-7 sm:p-9">
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              {details.map((detail) => {
                const content = (
                  <Card className="transition-colors duration-200 hover:border-primary/50">
                    <CardContent className="flex items-start gap-4 p-5">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
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

                return "href" in detail && detail.href ? (
                  <a key={detail.label} href={detail.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={detail.label}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
