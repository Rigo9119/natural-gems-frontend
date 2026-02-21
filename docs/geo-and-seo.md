# GEO & SEO — Natura Gems

A reference document covering everything implemented: what GEO is, how the SEO infrastructure works, what structured data exists, and how Sanity controls metadata per page.

---

## Table of Contents

1. [What is GEO?](#1-what-is-geo)
2. [GEO vs Traditional SEO](#2-geo-vs-traditional-seo)
3. [The SEO Utility (`src/lib/seo.ts`)](#3-the-seo-utility)
4. [buildMeta() — How Every Page Gets Its Meta Tags](#4-buildmeta)
5. [resolveSanityMeta() — Sanity Overrides](#5-resolvesanitymeta)
6. [Structured Data (JSON-LD) — Complete Reference](#6-structured-data-json-ld)
7. [Sanity CMS SEO Control](#7-sanity-cms-seo-control)
8. [Static Files](#8-static-files)
9. [Route-by-Route SEO Audit](#9-route-by-route-seo-audit)
10. [How to Add SEO to a New Page](#10-how-to-add-seo-to-a-new-page)
11. [GEO Implementation Phases](#11-geo-implementation-phases)
12. [Key Concepts Glossary](#12-key-concepts-glossary)

---

## 1. What is GEO?

**Generative Engine Optimization (GEO)** is the practice of optimizing your website to be cited, quoted, and recommended by AI engines — specifically:

- **Google AI Overviews** (shown at the top of Google search results)
- **Perplexity AI** (research-focused, heavily cites sources)
- **ChatGPT / Bing Copilot** (OpenAI tools with web browsing)
- **Claude (Anthropic)** (can access web content)

When someone asks an AI *"where can I buy certified Colombian emeralds?"* or *"what is the difference between Muzo and Chivor emeralds?"*, GEO determines whether Natura Gems gets cited.

### What AI engines reward

1. **Structured machine-readable data** — JSON-LD schemas that describe your business, products, and content in a format AI can parse unambiguously
2. **Authoritative topical content** — Deep, factual, well-organized content that answers questions better than competitors
3. **Citation signals** — Clear entity identity (Organization schema, consistent NAP data, social profiles)
4. **Explicit AI access** — `llms.txt` and `llms-full.txt` files that AI crawlers read directly
5. **Technical hygiene** — Correct canonical URLs, hreflang, proper indexing signals

---

## 2. GEO vs Traditional SEO

| Dimension | Traditional SEO | GEO |
|---|---|---|
| Goal | Rank in blue-link results | Be cited in AI answers |
| Primary signal | Backlinks + keywords | Structured data + content authority |
| Content format | Keywords in headers/body | Entities, facts, Q&A, How-To |
| Key files | `sitemap.xml`, `robots.txt` | `llms.txt`, `llms-full.txt`, JSON-LD |
| Measurement | Position tracking | Brand mention in AI responses |
| Schema importance | Helpful | Critical |

---

## 3. The SEO Utility

**File:** `src/lib/seo.ts`

This is the single source of truth for all SEO in the project. Every route calls functions from this file.

### Constants

```ts
SITE_URL = "https://naturagems.co"
SITE_NAME = "Natura Gems"           // from constants.ts
DEFAULT_DESCRIPTION = "Esmeraldas colombianas certificadas..."
DEFAULT_OG_IMAGE = "https://naturagems.co/og-image.jpg"
```

### Exported functions

| Function | Purpose |
|---|---|
| `buildMeta(options)` | Main function — returns `{ meta, links, scripts }` for TanStack Router's `head()` |
| `resolveSanityMeta(sanityData, defaults)` | Merges Sanity CMS overrides on top of hardcoded defaults |
| `organizationJsonLd()` | Schema.org `Organization` — fires on every page via root route |
| `localBusinessJsonLd()` | Schema.org `LocalBusiness` + `JewelryStore` — used on `/contact` |
| `faqJsonLd(faqs)` | Schema.org `FAQPage` — used on `/faq` |
| `breadcrumbJsonLd(items)` | Schema.org `BreadcrumbList` — used on all secondary pages |
| `emeraldProductJsonLd(product)` | Schema.org `Product` for a single emerald |
| `emeraldItemListJsonLd(products)` | Schema.org `ItemList` of emerald products — used on `/emeralds/tienda` |
| `jewelryProductJsonLd(product)` | Schema.org `Product` for a jewelry piece |
| `jewelryItemListJsonLd(products)` | Schema.org `ItemList` of jewelry products — used on `/jewelry` |
| `howToJsonLd(name, desc, steps)` | Schema.org `HowTo` — available for buyer's guide |

---

## 4. buildMeta()

`buildMeta()` accepts an options object and returns everything TanStack Router needs to populate the `<head>` of a page.

### Options

```ts
interface BuildMetaOptions {
  title?: string;       // Page title (without "| Natura Gems" suffix)
  description?: string; // Meta description
  path?: string;        // URL path, e.g. "/about" (used for canonical + hreflang)
  ogImage?: string;     // Absolute URL to OG image
  ogType?: string;      // "website" (default) or "product"
  jsonLd?: object[];    // Array of JSON-LD schema objects to inject
  noIndex?: boolean;    // If true, adds noindex,follow to robots meta
}
```

### What it outputs

Every page gets all of these automatically:

```html
<!-- Title -->
<title>Quiénes Somos | Natura Gems</title>

<!-- Meta -->
<meta name="description" content="..." />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

<!-- Open Graph (for WhatsApp, Facebook, LinkedIn previews) -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://naturagems.co/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://naturagems.co/about" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Natura Gems" />
<meta property="og:locale" content="es_CO" />
<meta property="og:locale:alternate" content="en_US" />

<!-- Twitter / X card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@naturagems" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />

<!-- Canonical URL (prevents duplicate content) -->
<link rel="canonical" href="https://naturagems.co/about" />

<!-- hreflang alternates (tells Google about bilingual pages) -->
<link rel="alternate" hreflang="es" href="https://naturagems.co/about" />
<link rel="alternate" hreflang="en" href="https://naturagems.co/en/about" />
<link rel="alternate" hreflang="x-default" href="https://naturagems.co/about" />

<!-- JSON-LD structured data (one <script> per schema) -->
<script type="application/ld+json">{ ... }</script>
```

### Usage in a route

```ts
// Simple static usage
export const Route = createFileRoute("/about")({
  head: () =>
    buildMeta({
      title: "Quiénes Somos",
      description: "Tres generaciones dedicadas al arte...",
      path: "/about",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Quiénes Somos", path: "/about" },
        ]),
      ],
    }),
  component: AboutPage,
});
```

---

## 5. resolveSanityMeta()

This function bridges the Sanity CMS and `buildMeta()`. It takes Sanity SEO data and merges it over hardcoded defaults, so that:

- If Sanity has a value → use it
- If Sanity is empty → fall back to the hardcoded default

```ts
export function resolveSanityMeta(
  sanityData: SeoMetadata | undefined | null,
  defaults: BuildMetaOptions,
): BuildMetaOptions
```

### How it works

```
Sanity metaTitle set?    → use Sanity title     (overrides default)
Sanity metaTitle empty?  → use defaults.title   (hardcoded fallback)

Sanity ogImage set?      → use Sanity image URL
Sanity ogImage empty?    → use DEFAULT_OG_IMAGE  (/og-image.jpg)

Sanity noIndex = true?   → robots: noindex
Sanity noIndex = false?  → robots: index (default)
```

### Usage in a route with loader

```ts
export const Route = createFileRoute("/about")({
  head: ({ loaderData }) =>
    buildMeta(
      resolveSanityMeta(
        (loaderData as { seo?: SeoMetadata } | undefined)?.seo,
        {
          // These are the fallback defaults:
          title: "Quiénes Somos",
          description: "Tres generaciones...",
          path: "/about",
          jsonLd: [ breadcrumbJsonLd([...]) ],
        },
      ),
    ),
  loader: async ({ context }) => {
    await prefetchAboutPageData(context.queryClient);
    const data = context.queryClient.getQueryData<{ seo?: SeoMetadata }>(
      aboutPageQueryOptions().queryKey,
    );
    return { seo: data?.seo };
  },
  component: AboutPage,
});
```

**Note on the TypeScript cast:** TanStack Router infers the root route's `beforeLoad → Promise<void>` which makes child `loaderData` typed as `never`. The cast `(loaderData as { seo?: SeoMetadata } | undefined)` is intentional and safe — it works correctly at runtime even though TypeScript's strict mode complains. The build passes via Vite/esbuild which does not enforce these strict type errors.

---

## 6. Structured Data (JSON-LD)

JSON-LD is the most important GEO signal. It tells AI engines exactly what your business is, what you sell, and how to describe you in answers.

### Organization (sitewide)

Fires on **every page** via the root route (`src/routes/__root.tsx`).

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Natura Gems",
  "url": "https://naturagems.co",
  "logo": "https://naturagems.co/logo512.png",
  "foundingDate": "1985",
  "foundingLocation": { "@type": "Place", "name": "Muzo, Boyacá, Colombia" },
  "description": "Empresa familiar con más de 3 generaciones...",
  "areaServed": "Worldwide",
  "knowsAbout": [
    "Colombian emeralds", "emerald grading", "gemstone certification",
    "Muzo emeralds", "Chivor emeralds", "Coscuez emeralds",
    "artisan jewelry", "GIA certification"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+573001234567",
    "contactType": "customer service",
    "availableLanguage": ["Spanish", "English"]
  },
  "sameAs": ["https://instagram.com/naturagems", "https://wa.me/573001234567"]
}
```

**Why `knowsAbout` matters for GEO:** AI engines use this array to associate the Organization entity with topics. When someone asks ChatGPT about Muzo emeralds, it can connect that topic to Natura Gems as a known authority.

---

### LocalBusiness + JewelryStore (contact page)

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "JewelryStore"],
  "name": "Natura Gems",
  "priceRange": "$$$$",
  "currenciesAccepted": "USD, COP",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Centro Internacional de Esmeraldas, Oficina 301",
    "addressLocality": "Bogotá",
    "addressCountry": "CO"
  },
  "openingHoursSpecification": [...],
  "geo": { "@type": "GeoCoordinates", "latitude": 4.711, "longitude": -74.0721 }
}
```

**Why dual `@type`?** `JewelryStore` is more specific than `LocalBusiness`. Google and AI engines prefer the most specific type. Using an array declares both simultaneously.

---

### FAQPage (faq page)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Las esmeraldas vienen con certificado de autenticidad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, todas nuestras esmeraldas incluyen..."
      }
    }
    // ... more Q&As
  ]
}
```

**Why FAQPage is critical for GEO:** Google AI Overviews and Perplexity directly extract Q&A content from `FAQPage` schema when answering user questions. Each `Question` in this schema is a potential AI citation.

---

### BreadcrumbList (all secondary pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://naturagems.co/" },
    { "@type": "ListItem", "position": 2, "name": "Esmeraldas", "item": "https://naturagems.co/emeralds" },
    { "@type": "ListItem", "position": 3, "name": "Tienda", "item": "https://naturagems.co/emeralds/tienda" }
  ]
}
```

Breadcrumbs tell search engines and AI the hierarchy of your site, which improves content contextualization.

---

### ItemList + Product (store pages)

Used on `/emeralds/tienda` (12 products) and `/jewelry` (20 products).

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Esmeraldas Colombianas Certificadas — Natura Gems",
  "numberOfItems": 12,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "@id": "https://naturagems.co/emeralds/tienda#product-1",
        "name": "Esmeralda Muzo Premium",
        "material": "Esmeralda colombiana natural",
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Quilates", "value": "2.5 ct" },
          { "@type": "PropertyValue", "name": "Origen", "value": "Muzo, Boyacá, Colombia" },
          { "@type": "PropertyValue", "name": "Claridad", "value": "AAA" },
          { "@type": "PropertyValue", "name": "Corte", "value": "Emerald" }
        ],
        "offers": {
          "@type": "Offer",
          "price": 4500,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }
    }
    // ... more products
  ]
}
```

**Why Product schema matters for GEO:** When someone asks "how much does a 2-carat AAA Muzo emerald cost?", AI engines can pull actual pricing data from your `Product` schema and cite your store as the source.

---

### HowTo (available, not yet used in UI)

The `howToJsonLd()` helper is ready to use. Ideal for the buyer's guide section on `/faq`:

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo elegir una buena esmeralda",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Color", "text": "Busca un verde intenso..." },
    { "@type": "HowToStep", "position": 2, "name": "Claridad", "text": "Las inclusiones..." }
  ]
}
```

When you're ready to add it, import `howToJsonLd` from `@/lib/seo` and add it to the `/faq` route's `jsonLd` array.

---

## 7. Sanity CMS SEO Control

Every page managed in Sanity Studio has a **"SEO / Metadatos"** section that lets content editors override the default SEO without touching code.

### The schema (`studio-natura-gems/schemaTypes/objects/seoMetadata.ts`)

```ts
defineType({
  name: 'seoMetadata',
  type: 'object',
  fields: [
    { name: 'metaTitle',       type: 'string' },   // max 60 chars
    { name: 'metaDescription', type: 'text' },     // max 160 chars
    { name: 'ogImage',         type: 'image' },    // 1200×630px recommended
    { name: 'noIndex',         type: 'boolean' },  // default: false
  ]
})
```

### Pages that support Sanity SEO control

| Page | Sanity document | Route |
|---|---|---|
| Inicio | `homePage` | `/` |
| Esmeraldas | `emeraldPage` | `/emeralds` |
| Nosotros | `aboutPage` | `/about` |
| FAQ | `faqPage` | `/faq` |

### Data flow

```
Sanity Studio (editor fills in seo fields)
        ↓
Sanity API (GROQ query fetches seo{...})
        ↓
TanStack Query cache (keyed by ["sanity", "<pageName>"])
        ↓
Route loader (returns { seo: data?.seo })
        ↓
Route head({ loaderData }) (calls resolveSanityMeta)
        ↓
buildMeta() (produces final meta/links/scripts)
        ↓
<HeadContent /> (renders into <head> server-side)
```

### GROQ query pattern

All page queries include this fragment:

```groq
seo {
  metaTitle,
  metaDescription,
  noIndex,
  ogImage { asset->{ url } }
}
```

The `asset->{ url }` part dereferences the Sanity image reference to get a CDN URL that can be used directly in the `og:image` meta tag.

### Priority rules (what wins)

```
Sanity metaTitle set      →  uses Sanity title
Sanity metaTitle empty    →  uses hardcoded title in route's head()

Sanity metaDescription set  →  uses Sanity description
Sanity metaDescription empty →  uses hardcoded description

Sanity ogImage uploaded     →  uses Sanity CDN image URL
Sanity ogImage empty        →  uses /og-image.jpg (default branded image)

Sanity noIndex = true       →  robots: noindex, follow
Sanity noIndex = false/null →  robots: index, follow (normal)
```

### Adding Sanity SEO to a new page

1. **Add the schema field** in the page's schema file:
   ```ts
   defineField({
     name: 'seo',
     title: 'SEO / Metadatos',
     type: 'seoMetadata',
   })
   ```

2. **Add a GROQ query** in `src/lib/sanity/sanity-queries.ts`:
   ```ts
   export function newPageQueryOptions() {
     return queryOptions({
       queryKey: ["sanity", "newPage"],
       queryFn: async () => sanityClient.fetch(`*[_type == "newPage"][0]{ ..., ${SEO_FRAGMENT} }`),
       staleTime: STALE_TIME,
     });
   }
   ```

3. **Add the type** in `src/lib/sanity/sanity-types.ts`:
   ```ts
   export interface NewPage {
     _id: string;
     seo?: SeoMetadata;
   }
   ```

4. **Wire the route**:
   ```ts
   export const Route = createFileRoute("/new-page")({
     head: ({ loaderData }) =>
       buildMeta(
         resolveSanityMeta((loaderData as { seo?: SeoMetadata } | undefined)?.seo, {
           title: "New Page Title",
           path: "/new-page",
         }),
       ),
     loader: async ({ context }) => {
       await context.queryClient.ensureQueryData(newPageQueryOptions());
       const data = context.queryClient.getQueryData<{ seo?: SeoMetadata }>(
         newPageQueryOptions().queryKey,
       );
       return { seo: data?.seo };
     },
     component: NewPage,
   });
   ```

---

## 8. Static Files

### `public/robots.txt`

```
User-agent: *
Disallow:

Sitemap: https://naturagems.co/sitemap.xml

# GEO: AI/LLM crawlers
LLMs-Txt: https://naturagems.co/llms.txt
LLMs-Full-Txt: https://naturagems.co/llms-full.txt
```

- `Disallow:` is empty — all pages are crawlable
- `LLMs-Txt` and `LLMs-Full-Txt` are non-standard directives for AI crawlers following the [llmstxt.org](https://llmstxt.org) spec

---

### `public/sitemap.xml`

Contains all 9 indexable pages (compare is excluded because it has `noindex`). Each URL has:
- `lastmod` — last modification date
- `changefreq` + `priority` — crawl frequency hints
- `xhtml:link` alternates — hreflang for es/en/x-default

```xml
<url>
  <loc>https://naturagems.co/emeralds/tienda</loc>
  <lastmod>2026-02-19</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
  <xhtml:link rel="alternate" hreflang="es" href="https://naturagems.co/emeralds/tienda"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://naturagems.co/en/emeralds/tienda"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://naturagems.co/emeralds/tienda"/>
</url>
```

**Update `lastmod` whenever you make significant content changes to a page.**

---

### `public/og-image.jpg`

The default Open Graph image (1200×630px). Used when:
- A page doesn't have a Sanity OG image set
- Social platforms (WhatsApp, X, LinkedIn, Facebook) generate a preview card

---

### `public/llms.txt` and `public/llms-full.txt`

These files are the primary source AI crawlers use to understand Natura Gems. Following the [llmstxt.org](https://llmstxt.org) standard:

- `llms.txt` — concise business summary (name, products, contact, hours)
- `llms-full.txt` — comprehensive document with history, product details, mine region comparisons, certifications, FAQ, and process

**When to update them:**
- New product lines → add to Products section
- Contact info changes → update Contact section
- New certifications → update Certifications section
- New FAQ answers → add to FAQ section

AI engines that crawl these files will serve the information directly to users asking about Natura Gems, without even visiting the website.

---

## 9. Route-by-Route SEO Audit

| Route | Title | JSON-LD Schemas | Sanity SEO | Notes |
|---|---|---|---|---|
| `/` | Natura Gems — Esmeraldas Colombianas y Joyería | Organization (via root) | ✓ homePage.seo | No individual title — uses full brand title |
| `/emeralds` | Esmeraldas Colombianas | Organization + BreadcrumbList | ✓ emeraldPage.seo | |
| `/emeralds/tienda` | Tienda de Esmeraldas | Organization + BreadcrumbList + ItemList(12) | — | Static only |
| `/emeralds/mayoristas` | Mayoristas | Organization + BreadcrumbList | — | Static only |
| `/emeralds/collection` | Colección por Claridad | Organization + BreadcrumbList | — | Static only |
| `/emeralds/compare` | Comparar Esmeraldas | BreadcrumbList | — | `noindex` — excluded from sitemap |
| `/jewelry` | Joyería con Esmeraldas | Organization + BreadcrumbList + ItemList(20) | — | Static only |
| `/about` | Quiénes Somos | Organization + BreadcrumbList | ✓ aboutPage.seo | |
| `/faq` | Preguntas Frecuentes | Organization + FAQPage + BreadcrumbList | ✓ faqPage.seo | |
| `/contact` | Contacto | Organization + LocalBusiness + BreadcrumbList | — | Static only |

---

## 10. How to Add SEO to a New Page

### Minimal (static only)

```ts
import { buildMeta, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/my-page")({
  head: () =>
    buildMeta({
      title: "My Page Title",           // Required
      description: "Page description.", // Required
      path: "/my-page",                 // Required — used for canonical + hreflang
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "My Page", path: "/my-page" },
        ]),
      ],
    }),
  component: MyPage,
});
```

### With Sanity CMS control

Follow the 4-step process in [Section 7](#7-sanity-cms-seo-control).

### For a product detail page (future)

When individual emerald pages at `/emeralds/[id]` are built:

```ts
import { buildMeta, emeraldProductJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/emeralds/$id")({
  head: ({ loaderData }) =>
    buildMeta({
      title: loaderData.product.name,
      description: `${loaderData.product.name} — ${loaderData.product.carat} quilates, origen ${loaderData.product.origin}, claridad ${loaderData.product.clarity}.`,
      path: `/emeralds/${loaderData.product.id}`,
      ogType: "product",
      jsonLd: [
        emeraldProductJsonLd(loaderData.product),
        breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Esmeraldas", path: "/emeralds" },
          { name: loaderData.product.name, path: `/emeralds/${loaderData.product.id}` },
        ]),
      ],
    }),
  loader: async ({ params }) => {
    const product = await fetchProduct(params.id);
    return { product };
  },
  component: EmeraldDetailPage,
});
```

---

## 11. GEO Implementation Phases

### Phase 1 — Critical fixes (DONE)

| Item | Status |
|---|---|
| Created `public/og-image.jpg` (branded 1200×630px) | ✓ Done |
| Fixed placeholder phone number in `localBusinessJsonLd()` | ✓ Done |
| Added `noindex` to `/emeralds/compare` | ✓ Done |
| Fixed `sitemap.xml` (added /faq, lastmod, hreflang, removed compare) | ✓ Done |
| Added `og:locale` + `og:locale:alternate` to `buildMeta()` | ✓ Done |

### Phase 2 — Structured data (DONE)

| Item | Status |
|---|---|
| Expanded `organizationJsonLd()` with `foundingDate`, `knowsAbout`, `description` | ✓ Done |
| Upgraded `localBusinessJsonLd()` to include `JewelryStore` dual type | ✓ Done |
| Added `hreflang` alternates on every page via `buildMeta()` | ✓ Done |
| Added `max-snippet:-1` robots tag (grants Google full snippet access) | ✓ Done |
| Added `twitter:site: @naturagems` | ✓ Done |
| Added `og:image:width/height` | ✓ Done |
| Created `emeraldProductJsonLd()` and `emeraldItemListJsonLd()` helpers | ✓ Done |
| Added `ItemList` + `Product` schema to `/emeralds/tienda` | ✓ Done |
| Created `jewelryProductJsonLd()` and `jewelryItemListJsonLd()` helpers | ✓ Done |
| Added `ItemList` + `Product` schema to `/jewelry` | ✓ Done |
| Created `howToJsonLd()` helper (ready to use on FAQ buyer's guide) | ✓ Done |

### Phase 3 — llms.txt deep content (DONE)

Expanded `public/llms-full.txt` from ~99 lines to ~250 lines:

- [x] Detailed emerald grading system (AAA/AA/A/B characteristics, color/tone/saturation rubric, treatment types and market impact)
- [x] Mine region deep dive (Muzo, Chivor, Coscuez, Gachala — color profile, inclusion fingerprint, price premiums, notable stones)
- [x] Pricing context table (USD/ct ranges by grade and carat weight)
- [x] Certification lab guide (GIA vs Gübelin vs SSEF — what each verifies, turnaround, cost, recommended use case)
- [x] Care and investment guide (Mohs hardness, cleaning, storage, re-oiling, historical appreciation, supply/demand context)
- [x] Expanded FAQ section — 13 Q&As with multi-sentence substantive answers

### Phase 4 — Content authority (DONE)

- [x] Expanded FAQ from 6 to 15 Q&As grouped into 6 categories (Autenticidad, Calidad, Compras, Envíos, Joyería, Inversión)
- [x] Added `HowTo` JSON-LD to the buyer's guide section on `/faq` via `howToJsonLd()` helper
- [x] Category icons and grouped accordion UI for `/faq` (`Gem` replaces the invalid `Ring` Lucide export)
- [ ] Add "Mining Regions" subsection to `/emeralds` with Muzo/Chivor/Coscuez/Gachala comparison
- [ ] Enrich `/emeralds/collection` with a detailed clarity comparison table
- [ ] Stub `/guides` route for future long-form editorial content

### Phase 5 — Technical hygiene (PENDING)

- [ ] Add `Cache-Control` headers in `netlify.toml` for static assets
- [ ] Add trailing-slash redirect in `netlify.toml` (`/about/` → `/about`)

---

## 12. Key Concepts Glossary

**Canonical URL** — The "official" URL for a page, declared via `<link rel="canonical">`. Prevents duplicate content issues when the same page is accessible at multiple URLs (e.g. with/without trailing slash).

**hreflang** — HTML attribute that tells Google which version of a page exists for which language/region. Natura Gems uses `hreflang="es"` for Spanish (default) and `hreflang="en"` for English, with `hreflang="x-default"` pointing to the Spanish version.

**JSON-LD** — JavaScript Object Notation for Linked Data. A way to embed structured data in a `<script type="application/ld+json">` tag. AI engines and search engines parse this to understand page content without reading the visible text.

**Schema.org** — The vocabulary for JSON-LD. Defines standardized types like `Organization`, `Product`, `FAQPage`, etc. that all major AI and search engines understand.

**Open Graph (OG)** — A protocol (created by Facebook) for defining how a URL appears when shared on social media. The `og:image`, `og:title`, `og:description` tags control the preview card on WhatsApp, X, LinkedIn, etc.

**llms.txt** — A plain-text file following the [llmstxt.org](https://llmstxt.org) standard that AI crawlers read to understand a business. Think of it as a `robots.txt` but for AI, containing human-readable business information instead of crawl rules.

**GROQ** — Graph-Relational Object Queries. Sanity's query language. Used to fetch documents from the Sanity dataset. Example: `*[_type == "homePage"][0]{ ..., seo { metaTitle, metaDescription } }`.

**staleTime** — TanStack Query option (set to 5 minutes for Sanity queries). How long cached data is considered fresh before a background refetch is triggered.

**noindex** — A robots meta directive (`<meta name="robots" content="noindex">`) that tells all search engines not to index a page. Used on `/emeralds/compare` because it's a UI state page with no permanent content.

**ItemList** — Schema.org type for a list of items (products, articles, etc.). Used on store pages to let AI engines know exactly what products you sell, their prices, and availability.
