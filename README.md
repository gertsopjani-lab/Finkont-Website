# Finkont-Website

The premium marketing/showcase website for **Finkont**, a corporate accounting
firm. A static, high-fidelity Next.js site — no database or backend.

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19, strict TypeScript)
- **Styling:** Tailwind CSS with strict semantic design tokens
- **UI:** lightweight shadcn-style primitives + Lucide React icons
- **Rendering:** fully static (statically generated pages)

## Pages

| Route       | Description                                          |
| ----------- | ---------------------------------------------------- |
| `/`         | Home — hero, value props, services preview, stats, CTA |
| `/services` | Corporate accounting capabilities                    |
| `/about`    | Firm profile, story, and values                      |
| `/contact`  | Styled inquiry form (client-side only) + details     |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Description           |
| ------------------- | --------------------- |
| `npm run dev`       | Start the dev server  |
| `npm run build`     | Production build       |
| `npm run start`     | Serve the build       |
| `npm run lint`      | Run ESLint            |
| `npm run typecheck` | Type-check with `tsc` |

## Project Structure

```
app/
  layout.tsx            # Root layout: header + footer + metadata
  page.tsx              # Home
  services/page.tsx
  about/page.tsx
  contact/page.tsx
  globals.css           # Design-system tokens & keyframes
components/
  layout/               # SiteHeader, SiteFooter
  sections/             # Hero, ValueProps, ServicesPreview, Stats, CtaBand…
  contact/              # ContactForm (client, no backend)
  ui/                   # Button, Card, Input, Label, Textarea, Badge…
lib/
  site-config.ts        # Brand, nav, contact details
  content.ts            # Services, value props, stats, firm values
  utils.ts              # cn helper
tailwind.config.ts      # Color tokens + animation presets
```

## Design Tokens

| Token          | Value     | Tailwind class                |
| -------------- | --------- | ----------------------------- |
| Primary Brand  | `#ae7be5` | `bg-primary` / `text-primary` |
| Background     | `#121212` | `bg-background`               |
| Surface        | `#1e1e1e` | `bg-surface`                  |
| Accent Neutral | `#f4f3ef` | `bg-accent-neutral`           |

Animations: `animate-fade-in-up`, `animate-pulse-border`, `animate-shimmer`
(plus the `fk-animate-entry` / `fk-input-active` global classes).
