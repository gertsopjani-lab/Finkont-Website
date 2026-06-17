import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

interface CtaBandProps {
  title?: string;
  description?: string;
}

/** Reusable closing call-to-action band. */
export function CtaBand({
  title = "Ready to put your finances on autopilot?",
  description = "Book a free 30-minute consultation and see how Finkont can streamline your accounting.",
}: CtaBandProps) {
  return (
    <section className="fk-container py-24 sm:py-28">
      <Reveal>
        <div className="fk-glass relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12">
          {/* Inner ambient glow + grid */}
          <div className="fk-grid-overlay pointer-events-none absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(174,123,229,0.20),transparent_70%)]" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-accent-neutral sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Book a consultation
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
