import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-radial">
      <div className="fk-container relative py-24 sm:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="fk-animate-entry">
            <Badge>
              <ShieldCheck className="size-3.5" />
              Trusted by 650+ growing businesses
            </Badge>
          </div>

          <h1
            className="fk-animate-entry mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-accent-neutral sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Accounting,{" "}
            <span className="text-primary">engineered</span> for modern
            businesses.
          </h1>

          <p
            className="fk-animate-entry mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "160ms" }}
          >
            Finkont pairs senior accountants with modern systems to keep your
            books pristine, your taxes optimized, and your leadership team
            decision-ready—every single month.
          </p>

          <div
            className="fk-animate-entry mt-10 flex flex-col items-center gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Button asChild size="lg">
              <Link href="/contact">
                Book a consultation
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Explore services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
