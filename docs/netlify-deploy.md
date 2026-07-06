# Netlify Deployment Guide

This monorepo deploys three independent Netlify sites from the same GitHub repository.

## Architecture

```
GitHub repo: natural-gems-frontend
├── apps/emeralds  →  Netlify Site A  (customer-facing emerald store)
├── apps/admin     →  Netlify Site B  (internal admin panel)
└── apps/jewelry   →  Netlify Site C  (jewelry store)
```

Each site has its own `netlify.toml` that handles the build. Netlify knows which one to use via the **base directory** setting on each site.

---

## Creating a new site

1. Netlify dashboard → **Add new site** → **Import an existing project** → select this GitHub repo
2. Under **Build settings**, set **Base directory** to the app folder (e.g. `apps/admin`)
3. Leave build command and publish directory blank — `netlify.toml` provides them
4. Add environment variables (see section below)
5. Deploy

Repeat for each app that needs its own site.

---

## Environment variables (per site)

Set these under **Site settings → Environment variables**:

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | ✅ | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Supabase anon key |
| `VITE_SENTRY_DSN` | ✅ | Sentry DSN for this app |
| `SENTRY_ORG` | build only | Sentry org slug (source map uploads) |
| `SENTRY_PROJECT` | build only | Sentry project slug |
| `SENTRY_AUTH_TOKEN` | build only | Sentry auth token |

Each site should have its own Sentry project and DSN.

---

## Linking locally (CLI)

Install the CLI once:

```bash
bun add -g netlify-cli
```

Link each app to its Netlify site:

```bash
cd apps/emeralds && netlify link
cd apps/admin    && netlify link
cd apps/jewelry  && netlify link
```

This creates `apps/<name>/.netlify/state.json` with the site ID, enabling local dev and manual deploys.

Run local dev with Netlify edge functions:

```bash
cd apps/admin && netlify dev
```

---

## Selective deploys (optional)

By default Netlify redeploys all sites on every push to `main`. To only redeploy when relevant files change, add an ignored build step under **Site settings → Build & deploy → Build settings → Ignored build step**:

```bash
# Example for admin — skip deploy if nothing in apps/admin or packages/ changed
git diff --quiet HEAD^ HEAD apps/admin packages/
```

Use exit code 0 to skip, non-zero to build.
