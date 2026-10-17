# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Bun monorepo: `apps/emeralds` (:3000), `apps/jewelry` (:3001), `apps/admin` (:3001), `apps/api` (Hono, :3002), shared code in `packages/`.
Run these from inside an app directory (the root only has `dev` and `dev:<app>`), or from the root with `bun --bun run --cwd apps/<app> <script>`:

```bash
bun --bun run dev          # Start dev server
bun --bun run build        # Production build
bun --bun run test         # Run tests with Vitest
bun --bun run lint         # Run Biome linter
bun --bun run format       # Format code with Biome
bun --bun run check        # Lint + format + organize imports
```

## Architecture

This is a full-stack React application built on the TanStack ecosystem with SSR support.

### Core Stack
- **TanStack Start** - Full-stack React framework with SSR/streaming
- **TanStack Router** - File-based routing in `src/routes/`
- **TanStack Query** - Server state management
- **TanStack Form** - Form state with Zod validation
- **Supabase** - Database, auth, and storage
- **Paraglide** - i18n with URL-based localization (es default, en)
- **shadcn/ui** - Component library (new-york style, zinc base)
- **Tailwind CSS v4** - Styling

### Key Directories
Paths below are relative to each app (e.g. `apps/emeralds/`).
- `src/routes/` - File-based routes (create `foo.tsx` → `/foo` route)
- `src/routes/api.*.ts` - API endpoints (export handlers)
- `src/components/ui/` - shadcn components
- `src/hooks/` - Custom React hooks
- `src/lib/utils.ts` - Utility functions (includes `cn` for classnames)

### Entry Points
- `src/server.ts` - Server middleware with i18n
- `src/router.tsx` - Router configuration
- `src/routes/__root.tsx` - Root layout with Header

### Naming Conventions
- Route nesting uses dots: `start.ssr.spa-mode.tsx` → `/start/ssr/spa-mode`
- API routes: `api.names.ts` → `/api/names`
- Files prefixed with `demo.` are example files that can be deleted

## Configuration

- **Path alias:** `@/*` maps to `./src/*`
- **Biome:** Tabs, double quotes, recommended rules
- **TypeScript:** Strict mode, ES2022 target
- **Deployment:** Netlify (emeralds, jewelry and admin each have their own `netlify.toml`)
- **Environment:** Each app reads its own `.env.local` (see its `.env.example`)

## shadcn Components

Install new components with:
```bash
bunx --bun shadcn@latest add <component>
```

## Project tracking

Report progress to the vault with the `project-sync` skill (`pt log`, `pt state`; config in `.project-tracker.json`).
