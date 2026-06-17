"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string): boolean =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <nav className="fk-container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground">
            F
          </span>
          <span className="text-lg font-semibold tracking-tight text-accent-neutral">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-accent-neutral",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/contact">Book a consultation</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-accent-neutral md:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="fk-container flex flex-col gap-1 py-4">
            {siteConfig.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-surface text-primary"
                    : "text-muted-foreground hover:bg-surface-hover hover:text-accent-neutral",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Book a consultation
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
