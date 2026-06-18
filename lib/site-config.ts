export interface NavLink {
  label: string;
  href: string;
}

/** Supported social platforms (maps to an icon in the SocialLinks component). */
export type SocialPlatform = "facebook" | "instagram";

export interface SocialLink {
  label: string;
  href: string;
  platform: SocialPlatform;
}

export interface SiteConfig {
  name: string;
  /** Path (in /public) to the brand logo asset. */
  logo: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  nav: readonly NavLink[];
  legal: readonly NavLink[];
  social: readonly SocialLink[];
}

/**
 * Central, typed configuration for the Finkont marketing site.
 * Single source of truth for branding, navigation and contact details.
 */
export const siteConfig: SiteConfig = {
  name: "Finkont",
  logo: "/logo.svg",
  tagline: "Accounting, engineered for modern businesses.",
  description:
    "Finkont is a premium accounting firm helping ambitious companies stay compliant, cash-flow positive, and ready to scale.",
  email: "fin.kont2023@gmail.com",
  phone: "+383 49 152 152",
  address: "Pejton, Prishtina, Kosovo",
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
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/18JDsFqfEg/",
      platform: "facebook",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/finkontofficial",
      platform: "instagram",
    },
  ],
};
