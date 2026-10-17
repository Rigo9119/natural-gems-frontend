# Natura Gems

Bun monorepo for Natura Gems: an emerald store, a jewelry site, an admin panel, and a small API.
The web apps are TanStack Start (React 19, SSR) deployed to Netlify.

## Quick start

```bash
bun install
cp apps/emeralds/.env.example apps/emeralds/.env.local   # then fill in values
bun run dev                                               # emeralds :3000 + jewelry :3001
```

Run a single app with `bun run dev:emeralds`, `dev:jewelry`, `dev:admin`, or `dev:api`.

> `admin` and `jewelry` both use port 3001, so run only one of them at a time.

## Repository layout

| Path | What it is | Port |
|------|------------|------|
| `apps/emeralds` | Main store: catalog, cart, compare, Stripe checkout, orders, guides, WhatsApp | 3000 |
| `apps/emeralds/studio-natura-gems` | Sanity Studio (CMS schemas for page content) | - |
| `apps/jewelry` | Jewelry site | 3001 |
| `apps/admin` | Admin panel (Supabase auth) | 3001 |
| `apps/api` | Hono + Drizzle API over Supabase Postgres | 3002 |
| `packages/ui` | Shared UI (`@natura-gems/ui`): shadcn components, error/loading/404 fallbacks | - |
| `packages/config` | Shared Biome and TypeScript base configs | - |
| `project.inlang`, `messages` | Paraglide i18n messages (`es` default, `en`) | - |
| `docs` | Design notes: DB schema, admin auth, SEO, WhatsApp integration | - |

## Stack

| Concern | Tool |
|---------|------|
| Framework / routing | TanStack Start + Router (file-based, `src/routes`) |
| Server state / forms / tables | TanStack Query, Form (Zod), Table |
| Client state | Zustand |
| Database, auth, storage | Supabase |
| API | Hono, Drizzle ORM |
| CMS | Sanity |
| Payments | Stripe |
| Error monitoring | Sentry |
| i18n | Paraglide (URL-based locales) |
| UI | Tailwind CSS v4, shadcn/ui (Radix), lucide icons |
| Lint / format | Biome |
| Tests | Vitest + Testing Library |

## Environment variables

Each app reads its own `.env.local`.
Copy the example file where one exists and fill it in.

| App | Template | Main groups |
|-----|----------|-------------|
| `emeralds` | `.env.example` | Supabase, Sanity, Stripe, WhatsApp Cloud API, site URL, Sentry |
| `admin` | `.env.example` | Supabase (anon), store URL |
| `api` | `.env.local.example` | `DATABASE_URL` (Supabase Postgres) |
| `jewelry` | none | Sentry only (`VITE_SENTRY_DSN`, `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`) |

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, or WhatsApp secrets to the client (no `VITE_` prefix).

## Commands

Run app scripts from the app directory, or from the root with `bun --bun run --cwd apps/<app> <script>`.

| Script | Apps | Does |
|--------|------|------|
| `dev` | all | Dev server |
| `build` | all | Production build |
| `preview` | web apps | Serve the production build locally |
| `test` | emeralds, jewelry | Vitest |
| `lint` / `format` | emeralds, jewelry | Biome lint / format |
| `check` | web apps | Biome lint + format + imports |
| `seed` | emeralds | Seed Supabase |
| `stripe:setup` | emeralds | Create Stripe products/prices |
| `db:pull` / `db:push` / `db:migrate` / `db:studio` | api | Drizzle schema and migrations |

Sanity Studio: `cd apps/emeralds/studio-natura-gems && bun run dev` (`deploy` to publish).

Add a shadcn component: `bunx --bun shadcn@latest add <component>`.

## Conventions

- Routes nest by folder or dot: `emeralds/checkout.tsx` and `emeralds.checkout.tsx` both map to `/emeralds/checkout`.
- API endpoints in the web apps are routes named `api.*.ts` (e.g. `api.stripe.webhook.ts` → `/api/stripe/webhook`).
- `@/*` aliases `./src/*`.
- Biome: tabs, double quotes.
- `routeTree.gen.ts` and `src/paraglide` are generated. Do not edit them.

## Deployment

`emeralds`, `jewelry`, and `admin` each have their own `netlify.toml` and deploy to Netlify with `vite build`.
Sentry is loaded at server start via each app's `instrument.server.mjs`.
Set each app's environment variables in its Netlify site settings.
