export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  nav: readonly NavLink[];
  legal: readonly NavLink[];
  social: readonly NavLink[];
}

/**
 * Central, typed configuration for the Finkont marketing site.
 * Single source of truth for branding, navigation and contact details.
 */
export const siteConfig: SiteConfig = {
  name: "Finkont",
  tagline: "Accounting, engineered for modern businesses.",
  description:
    "Finkont is a premium accounting firm helping ambitious companies stay compliant, cash-flow positive, and ready to scale.",
  email: "hello@finkont.com",
  phone: "+1 (415) 555-0119",
  address: "548 Market Street, Suite 22000, San Francisco, CA 94104",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/contact" },
    { label: "Terms", href: "/contact" },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "X", href: "https://x.com" },
  ],
};
