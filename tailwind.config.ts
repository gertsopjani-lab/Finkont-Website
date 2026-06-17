import type { Config } from "tailwindcss";

/**
 * Finkont Tailwind configuration.
 *
 * Color tokens map 1:1 to the Finkont design system. Components consume the
 * semantic tokens below (e.g. `bg-background`, `text-primary`). Keyframes/
 * animations power the subtle motion across the marketing site.
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
        primary: {
          DEFAULT: "#ae7be5", // Primary brand (light Rebecca Purple)
          foreground: "#121212",
        },
        background: "#121212", // Application background
        surface: {
          DEFAULT: "#1e1e1e", // Cards, panels
          hover: "#252525", // Subtle hover "pop"
        },
        "accent-neutral": {
          DEFAULT: "#f4f3ef", // Neutral / contrast elements
          foreground: "#121212",
        },
        // Secondary depth accent: muted midnight indigo.
        indigo: {
          DEFAULT: "#6366f1",
          muted: "#4f46e5",
          deep: "#312e81",
        },
        // Deep slate tones for layered surfaces.
        slate: {
          deep: "#15161d",
          panel: "#1a1b23",
        },
        success: "#10b981",
        expense: "#ef4444",
        muted: {
          DEFAULT: "#6b7280", // Muted text / borders (Slate Gray)
          foreground: "#9ca3af",
        },
        border: "#2a2a2a",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      maxWidth: {
        content: "80rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        shimmer:
          "linear-gradient(110deg, rgba(244,243,239,0.04) 8%, rgba(244,243,239,0.12) 18%, rgba(244,243,239,0.04) 33%)",
        "primary-radial":
          "radial-gradient(60% 60% at 50% 0%, rgba(174,123,229,0.18) 0%, rgba(18,18,18,0) 70%)",
      },
      backgroundSize: {
        shimmer: "200% 100%",
      },
      boxShadow: {
        "primary-glow": "0 12px 30px -8px rgba(174, 123, 229, 0.45)",
        "primary-glow-lg": "0 0 48px -6px rgba(174, 123, 229, 0.55)",
        // Layered glass elevation: soft drop + inner top highlight.
        glass:
          "0 18px 50px -20px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(255,255,255,0.06)",
        "glass-hover":
          "0 30px 70px -24px rgba(174,123,229,0.35), inset 0 1px 0 0 rgba(255,255,255,0.10)",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
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
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-border": "pulseBorder 2s infinite ease-in-out",
        shimmer: "shimmer 1.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
