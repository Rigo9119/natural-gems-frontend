# Tech Debt & TODOs

## Critical

- [x] ~~**`.gitignore` blocks all Markdown**~~ — removed `*.md` rule
- [ ] **Zero tests** — no `*.test.*` or `*.spec.*` files exist. Set up Vitest with at least smoke tests for routes
- [ ] **i18n not wired up** — all UI strings are hardcoded Spanish. Locale switcher exists but English users see Spanish. Paraglide message keys are defined but never imported in routes
- [x] ~~**No error boundaries**~~ — added `defaultErrorComponent` (ErrorFallback) and `defaultPendingComponent` (LoadingFallback) to router
- [x] ~~**`useSuspenseQuery` without Suspense boundary**~~ — loader now awaits `ensureQueryData`, router error component catches failures

## High

- [ ] **All forms are non-functional** — contact form, newsletter forms all use `e.preventDefault()` with no backend, no validation, no feedback
- [ ] **No API routes** — zero `api.*.ts` files exist. Forms and future features have nowhere to send data
- [ ] **No loading/pending states** — no `pendingComponent` on any route, no skeleton components
- [ ] **No CSP header** — `netlify.toml` missing `Content-Security-Policy`
- [ ] **No product detail pages** — no `/emeralds/[id]` or `/jewelry/[id]` routes exist
- [ ] **Sanity queries unhandled** — no try/catch, no retry config on `QueryClient`, failures are silent
- [ ] **`og:image` broken** — `seo.ts` references `og-image.jpg` that doesn't exist in `public/`
- [ ] **Sanity schemas incomplete** — only `heroSection` exists. Need schemas for emerald products, jewelry, wholesale lots

## Medium — Config & Build

- [ ] **`netlify.toml` uses wrong commands** — `vite build` / `npm run dev` instead of `bun --bun run build` / `bun --bun run dev`
- [ ] **No `.env.example`** — env vars (`VITE_SANITY_*`, `VITE_SUPABASE_*`) undocumented for collaborators/CI
- [ ] **No `.nvmrc` or `engines` field** — no Node version pinning, running Node 24 outside Vite's LTS matrix
- [ ] **Missing security headers** — no `Strict-Transport-Security`, `Permissions-Policy` in `netlify.toml`
- [ ] **No cache headers for static assets** — hashed `/assets/*` files should get `Cache-Control: immutable`
- [ ] **Biome VCS disabled** — `biome.json` has `vcs.enabled: false`, doesn't respect `.gitignore`

## Medium — Bundle & Performance

- [ ] **548 KB main chunk** — no `manualChunks` config. Split React, TanStack, Sanity into separate chunks
- [ ] **Devtools in production** — `TanStackDevtools`, router/query devtools rendered unconditionally in `__root.tsx`
- [ ] **Sanity Stega active in production** — `stegaEncodeSourceMap` (12 KB) ships to users. Disable with `stega: { enabled: false }`
- [ ] **Google Fonts via CSS `@import`** — render-blocking. Move to `<link>` tags with `preconnect` hints, or self-host via `fontsource`
- [ ] **`@tanstack/react-devtools` in `dependencies`** — should be `devDependencies`
- [ ] **Unused deps** — `web-vitals`, `dotenv`, `@tanstack/react-form` (only in dead demo files). Remove them

## Medium — UX & Navigation

- [ ] **Footer dead links** — `#collections`, `#who-we-are`, `#contact` are hash anchors that don't exist. Replace with `<Link>` to actual routes
- [ ] **Header nav uses `<a>` instead of `<Link>`** — causes full page reloads instead of SPA transitions (`Header.tsx:74-81`)
- [ ] **`brand-surface` CSS variable undefined** — used in 7 files but never defined in `styles.css`
- [ ] **`NotFound.tsx` uses undefined `brand-primary`** — buttons invisible/wrong color. Use `brand-primary-dark`
- [ ] **Placeholder phone numbers** — `+5712345678` in JSON-LD and contact page. Replace before production
- [ ] **No `og:locale` meta tag** — missing for both es/en, affects social sharing and international SEO
- [ ] **Newsletter inputs lack `<label>`** — WCAG 1.3.1 violation (`index.tsx:435`, `jewelry/index.tsx:609`)
- [ ] **`supabase.ts` throws at module init** — crashes app if Supabase env vars missing, even on pages that don't use Supabase
- [ ] **No analytics** — no tracking provider, `web-vitals` dep is unused

## Medium — PWA & Assets

- [ ] **PWA incomplete** — placeholder icons (React logos), no service worker, `start_url: "."` should be `"/"`
- [ ] **No `og-image.jpg`** — create and add to `public/` for social sharing

## Low

- [ ] **Dark mode + sidebar CSS tokens** — full `.dark` block and `--sidebar-*` vars defined but never used (dead CSS)
- [ ] **Duplicate `@` path alias** — both `resolve.alias` and `vite-tsconfig-paths` in `vite.config.ts`
- [ ] **Dead demo files** — `demo.FormComponents.tsx`, `demo.form.ts`, `demo.form-context.ts` are orphaned
- [ ] **SubNav and Header nav missing `aria-label`** — screen readers can't distinguish navigation regions
- [ ] **Decorative icons missing `aria-hidden`** — `<Sparkles>`, `<SiWhatsapp>`, value/process step icons in multiple routes
- [ ] **`useLocalizedContent` return type** — allows silent `undefined` when locale key missing (`sanity-helper.ts:4`)
- [ ] **`verbatimModuleSyntax: false`** — should be `true` for proper `import type` discipline (`tsconfig.json:14`)
- [ ] **Canonical URLs don't include locale prefix** — `/about` vs `/en/about` duplicate content issue
- [ ] **`allowJs: true`** — unnecessary for TypeScript-only project
- [ ] **Paraglide message keys unused** — `messages/es.json` and `messages/en.json` define keys never imported in production
- [ ] **`COMPANY_LOCATION` imported but unused** — `seo.ts` imports it then hardcodes `"Bogota"` instead

## Done

- [x] Create `OptimizedImage` component with Sanity support, lazy loading, priority prop
- [x] Replace all raw `<img>` tags across codebase (29 images in 10 files)
- [x] Add `loading="lazy"` + `decoding="async"` defaults to all below-fold images
- [x] Add `fetchpriority="high"` to hero/LCP images (emeralds, jewelry, about)
- [x] Add `width`/`height` HTML attributes to prevent layout shift
- [x] Fix `.gitignore` blocking all `.md` files
- [x] Add `ErrorFallback` component (`src/components/ErrorFallback.tsx`) — friendly error UI with retry button
- [x] Add `LoadingFallback` component (`src/components/LoadingFallback.tsx`) — spinner with gem icon
- [x] Wire `defaultErrorComponent` and `defaultPendingComponent` into router
- [x] Await `ensureQueryData` in home page loader — prevents Suspense crash
- [x] Add `QueryClient` defaults — `staleTime: 60s`, `retry: 2`, `refetchOnWindowFocus: false`
- [x] Fix `NotFound.tsx` — undefined `brand-primary` colors, "Ver tienda" now links to `/emeralds`
