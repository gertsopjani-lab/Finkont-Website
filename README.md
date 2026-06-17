# Finkont-Website

Finkont is an ultra-clean, dark-mode-first accounting platform for businesses.
This repository contains the full-stack foundation built per the internal
`design.md` design system and `.cursorrules` engineering standards.

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19, strict TypeScript)
- **Styling:** Tailwind CSS with strict semantic color tokens
- **Database & ORM:** PostgreSQL + Prisma
- **UI:** shadcn/ui primitives + Lucide React icons

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure the database connection
cp .env.example .env   # then edit DATABASE_URL

# 3. Generate the Prisma client
npm run prisma:generate

# 4. (Optional) Apply the schema to a live database
npm run prisma:migrate

# 5. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the root redirects to
`/dashboard`.

## Project Structure

```
app/
  api/transactions/route.ts   # Mock ledger API (typed, try/catch wrapped)
  dashboard/page.tsx          # High-fidelity dashboard
  globals.css                 # Design-system global classes & keyframes
  layout.tsx                  # Root layout (dark, semantic tokens)
components/
  dashboard/                  # TopNav, SummaryCards, DataGrid, ReportButton…
  ui/                         # shadcn/ui primitives (Button, Card, Input)
hooks/use-transactions.ts     # Client data hook with graceful fallback
lib/
  finance.ts                  # Ledger summary + formatting helpers
  mock-data.ts                # Mock business ledger
  prisma.ts                   # Prisma client singleton
  types.ts                    # Shared DTO / response types
prisma/schema.prisma          # PostgreSQL Transaction model
tailwind.config.ts            # Color tokens + animation presets
```

## Design Tokens

| Token            | Value     | Tailwind class                 |
| ---------------- | --------- | ------------------------------ |
| Primary Brand    | `#ae7be5` | `bg-primary` / `text-primary`  |
| Background       | `#121212` | `bg-background`                |
| Surface          | `#1e1e1e` | `bg-surface`                   |
| Accent Neutral   | `#f4f3ef` | `bg-accent-neutral`            |
| Success (income) | `#10b981` | `text-success`                 |
| Expense (alert)  | `#ef4444` | `text-expense`                 |
| Muted            | `#6b7280` | `text-muted`                   |

Animations: `animate-fade-in-up`, `animate-pulse-border`, `animate-shimmer`
(plus the `fk-animate-entry` / `fk-input-active` global classes).

## Scripts

| Script                    | Description                |
| ------------------------- | -------------------------- |
| `npm run dev`             | Start the dev server       |
| `npm run build`           | Production build           |
| `npm run start`           | Start the production build  |
| `npm run lint`            | Run ESLint                 |
| `npm run typecheck`       | Type-check with `tsc`      |
| `npm run prisma:generate` | Generate the Prisma client |
