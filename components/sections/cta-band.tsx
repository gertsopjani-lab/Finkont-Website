import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

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
    <section className="fk-container py-20 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-surface bg-primary-radial px-6 py-16 text-center sm:px-12">
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
    </section>
  );
}
