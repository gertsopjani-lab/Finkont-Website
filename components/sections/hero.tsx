import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="fk-grid-overlay pointer-events-none absolute inset-0" />

      <div className="fk-container relative py-28 sm:py-36">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Badge>
              <Sparkles className="size-3.5" />
              Modern financial engineering
            </Badge>
          </Reveal>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-accent-neutral sm:text-6xl">
            <SplitText
              segments={[
                { text: "Accounting," },
                { text: "engineered", className: "text-primary" },
                { text: "for the modern business." },
              ]}
            />
          </h1>

          <Reveal delay={520}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Finkont pairs senior accountants with connected systems to keep
              your books pristine, your reporting clear, and your leadership
              team a step ahead—every single month.
            </p>
          </Reveal>

          <Reveal delay={640}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Magnetic>
                <Button asChild size="lg">
                  <Link href="/contact">
                    Book a consultation
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
