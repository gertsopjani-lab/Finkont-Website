import type { Config } from "tailwindcss";

/**
 * Finkont Tailwind configuration.
 *
 * Color tokens map 1:1 to "design.md" Section 1 (Brand Color Tokens & Palette).
 * Keyframes/animations map 1:1 to "design.md" Section 2 (Global Interface
 * Animations & Keyframes). Components must consume the semantic tokens below
 * (e.g. `bg-background`, `text-primary`) per ".cursorrules" styling standards.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand tokens (design.md §1 — Core Colors)
        primary: {
          DEFAULT: "#ae7be5", // Primary actions, highlights, revenue metrics
          foreground: "#121212",
        },
        background: "#121212", // Application background
        surface: {
          DEFAULT: "#1e1e1e", // Cards, tables, panels
          hover: "#252525", // Subtle hover "pop" for grid rows (design.md §3)
        },
        "accent-neutral": {
          DEFAULT: "#f4f3ef", // Neutral actions and contrast elements
          foreground: "#121212",
        },
        // Semantic highlights (design.md §1 — Semantic Highlights)
        success: "#10b981", // Positive ledger (Emerald Green)
        expense: "#ef4444", // Negative ledger / alert (Coral Red)
        muted: {
          DEFAULT: "#6b7280", // Muted text / borders (Slate Gray)
          foreground: "#9ca3af",
        },
        border: "#2a2a2a",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      backgroundImage: {
        // Used together with the `shimmer` animation for loading states.
        shimmer:
          "linear-gradient(110deg, rgba(244,243,239,0.04) 8%, rgba(244,243,239,0.12) 18%, rgba(244,243,239,0.04) 33%)",
      },
      backgroundSize: {
        shimmer: "200% 100%",
      },
      boxShadow: {
        "primary-glow": "0 12px 30px -8px rgba(174, 123, 229, 0.45)",
      },
      keyframes: {
        // design.md §2 — fadeInUp
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // design.md §2 — pulseBorder
        pulseBorder: {
          "0%": {
            borderColor: "rgba(174, 123, 229, 0.3)",
            boxShadow: "0 0 0 0px rgba(174, 123, 229, 0.2)",
          },
          "50%": {
            borderColor: "rgba(174, 123, 229, 0.8)",
            boxShadow: "0 0 12px 2px rgba(174, 123, 229, 0.15)",
          },
          "100%": {
            borderColor: "rgba(174, 123, 229, 0.3)",
            boxShadow: "0 0 0 0px rgba(174, 123, 229, 0.2)",
          },
        },
        // design.md §2 — shimmer
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        // Entry transition uses the design system's exact easing curve.
        "fade-in-up": "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-border": "pulseBorder 2s infinite ease-in-out",
        shimmer: "shimmer 1.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
