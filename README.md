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
  sections/             # Hero, ValueProps, ServicesPreview, Approach, CtaBand…
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

## Deployment Guide

This is a 100% static Next.js App Router site — there is **no database, no API
routes, and no server actions**, so it deploys cleanly to any modern host.
Every route is prerendered at build time:

```
Route (app)                    Rendering
/                              ○ Static
/services                      ○ Static
/about                         ○ Static
/contact                       ○ Static   (form posts to the API route below)
/api/send                      ƒ Dynamic  (server route: sends email via Resend)
```

### 0. Prerequisites & pre-flight checks

- **Node.js 18.18+ (Node 20 LTS recommended).** This is the runtime hosts will
  use to build the app. Pin it for reproducible builds (see step 3).
- **Contact form email (required for the form to send).** The `/api/send` route
  delivers messages via [Resend](https://resend.com). Set this env var (see
  `.env.example`) in your host's dashboard:
  - `RESEND_API_KEY` — your Resend API key.
  - Optional: `CONTACT_TO` (recipient, defaults to `fin.kont2023@gmail.com`).
  - Without it, the form stays functional but returns a graceful
    "not configured" message instead of sending.
- The contact route is server-rendered, so it needs a Node host
  (Vercel/Netlify). It does **not** work with the pure static export in
  Option C below.
- Run the same checks CI/hosts run, locally, before pushing:

```bash
npm install
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run build       # next build  -> all routes should report ○ (Static)
```

If `next build` succeeds locally, it will succeed on Vercel/Netlify with the
same Node version.

---

### Option A — Deploy to Vercel (recommended)

Vercel is built by the Next.js team and needs **zero extra configuration** for
this project.

**Via the dashboard (Git integration):**

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the repo.
3. Vercel auto-detects the **Next.js** framework preset. Leave the defaults:
   - **Framework Preset:** `Next.js`
   - **Build Command:** `next build` (default)
   - **Install Command:** `npm install` (default)
   - **Output Directory:** _leave blank_ (Next.js is handled automatically — do
     **not** set this to `out`).
4. **Environment Variables:** none needed — skip this step.
5. Click **Deploy**. Vercel builds and serves the prerendered pages from its
   edge/CDN automatically.

**Via the Vercel CLI:**

```bash
npm i -g vercel
vercel          # first run links/creates the project (accept Next.js defaults)
vercel --prod   # promote a production deployment
```

**Custom domain:** Project → **Settings → Domains** → add your domain and follow
the DNS instructions.

> Note: Do **not** add `output: "export"` for Vercel. The standard Next.js
> build already prerenders every page to static HTML and serves it from the CDN,
> while keeping image optimization and other Next.js features intact.

---

### Option B — Deploy to Netlify

Netlify supports the Next.js App Router via the official runtime, which it
auto-installs. Recommended explicit configuration:

1. Add a `netlify.toml` at the repository root:

```toml
[build]
  command = "next build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

# Official Next.js runtime (auto-installed by Netlify; listing it is explicit).
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. **Via the dashboard:** [app.netlify.com](https://app.netlify.com) → **Add new
   site → Import an existing project** → pick the repo. Netlify reads
   `netlify.toml`, so the build settings are filled in automatically:
   - **Build command:** `next build`
   - **Publish directory:** `.next`
   - **No environment variables required.**
3. Click **Deploy site**.

**Via the Netlify CLI:**

```bash
npm i -g netlify-cli
netlify init      # link the repo and create the site
netlify deploy --build --prod
```

> Important for Netlify: keep **`publish = ".next"`** (not `out`) and let the
> `@netlify/plugin-nextjs` runtime handle the App Router. Do not enable
> `output: "export"` unless you switch to Option C below.

---

### Option C — Pure static export (host anywhere: S3, GitHub Pages, Cloudflare Pages, Nginx)

Because the site has no server-side features, it can also be exported to plain
HTML/CSS/JS and served from any static host or bucket.

1. Enable static export in `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true }, // required: no Image Optimization server in export mode
};

export default nextConfig;
```

2. Build — this writes a fully static site to `out/`:

```bash
npm run build
```

3. Deploy the contents of `out/`:
   - **Cloudflare Pages / GitHub Pages / Netlify (drag-drop):** set the publish
     directory to `out`.
   - **AWS S3 + CloudFront / Nginx:** upload `out/` and serve it; ensure the host
     serves `404.html` for unknown routes and resolves directory `index.html`
     files (Next.js generates `services/index.html`, etc.).

> Use Option C only if you specifically need self-hosted static files. For most
> cases, Vercel (Option A) gives the best Next.js experience with no config.

---

### Production build notes

- **App Router static pages "just work":** none of these pages use
  `force-dynamic`, data fetching, or cookies/headers, so Next.js prerenders them
  to static HTML during `next build`. No special flags are required.
- **Fonts:** the Inter font is loaded via `next/font/google`, which downloads and
  self-hosts the font **at build time** — the build machine needs outbound
  network access (Vercel/Netlify provide this by default). No runtime font
  requests are made.
- **Caching:** static assets in `.next/static` are content-hashed and safe to
  cache immutably; Vercel and Netlify configure this automatically.
- **Node version:** pin it to avoid drift between local and CI. Either add
  `"engines": { "node": ">=20" }` to `package.json`, commit a `.nvmrc`
  containing `20`, or set `NODE_VERSION = "20"` (Netlify) / the Node version in
  Project Settings (Vercel).
