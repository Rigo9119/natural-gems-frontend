# Supabase DB Implementation Plan

## Overview

3 tables total (+ 1 image sub-table). No auth. No jewelry (separate project).

**Key design decision:** The wholesale lot is the controlling data model. A single emerald
is simply a lot with `stone_count = 1`. There is ONE product table (`emeralds`) that
covers both retail stones and multi-stone wholesale lots — distinguished by `stone_count`.

Orders are auto-captured when the customer clicks the WhatsApp CTA, then
manually confirmed and updated by the business.

---

## Table 1: `emeralds`

Replaces both `src/data/demo-products.ts` and `src/data/demo-wholesale-lots.ts`.
One row per product — either a single stone (`stone_count = 1`) or a lot (`stone_count > 1`).

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | `gen_random_uuid()` default |
| `slug` | `text` UNIQUE NOT NULL | URL identifier |
| `name` | `text` NOT NULL | Display name |
| `price` | `numeric(10,2)` NOT NULL | Total price for the lot or single stone |
| `currency` | `text` NOT NULL DEFAULT `'USD'` | ISO 4217 code |
| `carats` | `numeric(8,3)` NOT NULL | Total carat weight (same as carat weight when `stone_count = 1`) |
| `total_grams` | `numeric(8,3)` | Total physical weight |
| `stone_count` | `int4` NOT NULL DEFAULT `1` | `1` = single retail stone; `> 1` = wholesale lot |
| `min_order_quantity` | `int4` NOT NULL DEFAULT `1` | MOQ — relevant for wholesale lots |
| `origin` | `text` NOT NULL | `Muzo \| Chivor \| Coscuez \| Gachala` |
| `clarity` | `text` NOT NULL | `AAA \| AA \| A \| B` |
| `cut` | `text` NOT NULL | `Emerald \| Oval \| Pear \| Round` |
| `color` | `text` | Optional — more relevant for single stones |
| `description` | `text` | |
| `dimensions` | `text` | e.g. `"8.2 x 6.1 x 4.3 mm"` — optional for lots |
| `certified_by` | `text` | `GIA`, `CDT`, etc. |
| `certificate_url` | `text` | Link to cert PDF |
| `status` | `text` NOT NULL DEFAULT `'available'` | `available \| reserved \| sold` |
| `created_at` | `timestamptz` DEFAULT `now()` | |

**Filtering by type:**
- Retail view → `WHERE stone_count = 1`
- Wholesale view → `WHERE stone_count > 1`
- No type column needed — `stone_count` is the source of truth.

### Table 1b: `emerald_images`

One-to-many images per product (single stone or lot). `position = 0` is the primary image.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `emerald_id` | `uuid` FK → `emeralds.id` ON DELETE CASCADE | |
| `url` | `text` NOT NULL | |
| `position` | `int2` NOT NULL DEFAULT `0` | Sort order; `0` = primary |

---

## Table 2: `orders`

Auto-created when a customer clicks the WhatsApp CTA. Manually updated by the business
as the sale progresses.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | `gen_random_uuid()` default |
| `order_number` | `text` UNIQUE NOT NULL | Human-readable, e.g. `NG-2026-0001`. Generated via DB sequence or trigger. |
| `customer_name` | `text` NOT NULL | Captured from pre-checkout form |
| `customer_whatsapp` | `text` | WhatsApp number the inquiry came from |
| `customer_email` | `text` | Optional — may not be available on first contact |
| `shipping_address` | `text` | Full delivery address — filled once confirmed |
| `shipping_country` | `text` | ISO country code, e.g. `CO`, `US` |
| `tracking_number` | `text` | Courier tracking code — filled on dispatch |
| `subtotal` | `numeric(10,2)` NOT NULL | Sum of `order_items.unit_price` at time of order |
| `currency` | `text` NOT NULL DEFAULT `'USD'` | ISO 4217 code |
| `status` | `text` NOT NULL DEFAULT `'pending'` | See status flow below |
| `payment_method` | `text` | `transfer \| cash \| card \| other` |
| `payment_status` | `text` NOT NULL DEFAULT `'unpaid'` | `unpaid \| partial \| paid` |
| `notes` | `text` | Internal notes — not visible to customer |
| `created_at` | `timestamptz` DEFAULT `now()` | Timestamp of WhatsApp CTA click |
| `updated_at` | `timestamptz` DEFAULT `now()` | Auto-updated via trigger |

**Order status flow:**

```
pending → confirmed → shipped → delivered
                   ↘ cancelled
```

### Table 2b: `order_items`

One row per product in the order. All fields snapshotted at order creation time
so historical records stay accurate even if the product changes later.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `order_id` | `uuid` FK → `orders.id` ON DELETE CASCADE | |
| `emerald_id` | `uuid` FK → `emeralds.id` ON DELETE RESTRICT | Prevent deleting a product with existing orders |
| `product_name` | `text` NOT NULL | Snapshotted name at order time |
| `product_slug` | `text` NOT NULL | Snapshotted slug at order time |
| `unit_price` | `numeric(10,2)` NOT NULL | Snapshotted price at order time |
| `currency` | `text` NOT NULL DEFAULT `'USD'` | |
| `stone_count` | `int4` NOT NULL DEFAULT `1` | Snapshotted — distinguishes single stone from lot |
| `carats` | `numeric(8,3)` | Snapshotted at order time |
| `clarity` | `text` | Snapshotted at order time |
| `origin` | `text` | Snapshotted at order time |

---

## Full SQL Script

Paste this entire block into **Supabase → SQL Editor → New query** and run it once.
It creates all tables, the order-number sequence + trigger, and all RLS policies.

```sql
-- ─────────────────────────────────────────────
-- 1. emeralds
-- ─────────────────────────────────────────────
CREATE TABLE emeralds (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug               text UNIQUE NOT NULL,
  name               text NOT NULL,
  price              numeric(10,2) NOT NULL,
  currency           text NOT NULL DEFAULT 'USD',
  carats             numeric(8,3) NOT NULL,
  total_grams        numeric(8,3),
  stone_count        int4 NOT NULL DEFAULT 1,
  min_order_quantity int4 NOT NULL DEFAULT 1,
  origin             text NOT NULL,
  clarity            text NOT NULL,
  cut                text NOT NULL,
  color              text,
  description        text,
  dimensions         text,
  certified_by       text,
  certificate_url    text,
  status             text NOT NULL DEFAULT 'available',
  created_at         timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 2. emerald_images
-- ─────────────────────────────────────────────
CREATE TABLE emerald_images (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  emerald_id  uuid NOT NULL REFERENCES emeralds(id) ON DELETE CASCADE,
  url         text NOT NULL,
  position    int2 NOT NULL DEFAULT 0
);

-- ─────────────────────────────────────────────
-- 3. orders
-- ─────────────────────────────────────────────
CREATE SEQUENCE order_number_seq START 1;

CREATE TABLE orders (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number      text UNIQUE NOT NULL DEFAULT 'NG-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('order_number_seq')::text, 4, '0'),
  customer_name     text NOT NULL,
  customer_whatsapp text,
  customer_email    text,
  shipping_address  text,
  shipping_country  text,
  tracking_number   text,
  subtotal          numeric(10,2) NOT NULL,
  currency          text NOT NULL DEFAULT 'USD',
  status            text NOT NULL DEFAULT 'pending',
  payment_method    text,
  payment_status    text NOT NULL DEFAULT 'unpaid',
  notes             text,
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now()
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─────────────────────────────────────────────
-- 4. order_items
-- ─────────────────────────────────────────────
CREATE TABLE order_items (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id     uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  emerald_id   uuid NOT NULL REFERENCES emeralds(id) ON DELETE RESTRICT,
  product_name text NOT NULL,
  product_slug text NOT NULL,
  unit_price   numeric(10,2) NOT NULL,
  currency     text NOT NULL DEFAULT 'USD',
  stone_count  int4 NOT NULL DEFAULT 1,
  carats       numeric(8,3),
  clarity      text,
  origin       text
);

-- ─────────────────────────────────────────────
-- 5. RLS policies
-- ─────────────────────────────────────────────

-- emeralds — public read-only
ALTER TABLE emeralds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON emeralds FOR SELECT USING (true);

-- emerald_images — public read-only
ALTER TABLE emerald_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON emerald_images FOR SELECT USING (true);

-- orders — anon INSERT only (client auto-capture)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert" ON orders FOR INSERT WITH CHECK (true);

-- order_items — anon INSERT only
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert" ON order_items FOR INSERT WITH CHECK (true);
```

---

## RLS Policies

**Product tables** are public read-only — the anon key can `SELECT` but not mutate.
**Orders tables** allow anon `INSERT` only (auto-capture on WhatsApp CTA click) — no read or update from the client.
All management is done from the Supabase dashboard or a future admin panel.

```sql
-- Product tables — public read-only
ALTER TABLE emeralds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON emeralds FOR SELECT USING (true);

ALTER TABLE emerald_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON emerald_images FOR SELECT USING (true);

-- Orders — anon can INSERT only
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert" ON orders FOR INSERT WITH CHECK (true);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert" ON order_items FOR INSERT WITH CHECK (true);
```

> Orders and order items are **write-only from the client**. Reading and updating
> them is done exclusively from the Supabase dashboard or a future admin panel
> using the service role key.

---

## Execution Order

**Phase 1 — Database (do this first, in Supabase dashboard)**
1. Run the SQL for `emeralds` + `emerald_images` + `orders` + `order_items`
2. Apply all RLS policies
3. Seed initial product data (both retail stones and lots go into `emeralds`)

**Phase 2 — TypeScript wiring**
4. Generate types → `src/lib/database.types.ts`
5. Create `src/lib/supabase-queries.ts`
6. Update `src/data/page-data.ts` hooks

**Phase 3 — Store updates**
7. Update `cartStore.ts` rehydration (uuid-based)
8. Update `compareStore.ts` rehydration (uuid-based)

**Phase 4 — Route swap**
9. Swap demo data in routes
10. Wire order auto-capture in cart WhatsApp CTA

**Phase 5 — Cleanup**
11. Delete `src/data/demo-products.ts` and `src/data/demo-wholesale-lots.ts`

---

## Frontend Migration Steps

Once the tables are created and seeded:

1. **Generate TypeScript types**
   ```bash
   bunx supabase gen types typescript --project-id <project-id> > src/lib/database.types.ts
   ```
   Then update `src/lib/supabase.ts` to pass `Database` as the generic:
   ```ts
   import type { Database } from "./database.types";
   export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
   ```

2. **Create `src/lib/supabase-queries.ts`**
   Add `queryOptions()` factories (TanStack Query) for:
   - `emeraldsQueryOptions()` — list with filters, `stone_count = 1` for retail
   - `emeraldBySlugQueryOptions(slug)` — single product detail
   - `wholesaleQueryOptions()` — list filtered by `stone_count > 1`

3. **Add prefetch/use hooks to `src/data/page-data.ts`**
   Following the existing pattern:
   ```ts
   export async function prefetchEmeralds(queryClient: QueryClient) { ... }
   export function useEmeralds() { ... }  // stone_count = 1
   export async function prefetchWholesale(queryClient: QueryClient) { ... }
   export function useWholesale() { ... } // stone_count > 1
   ```

4. **Update `cartStore.ts`**
   Rehydration currently re-inflates `Product` objects from the `demoProducts`
   array by numeric `id`. Switch to uuid-based lookup via Supabase.

5. **Update `compareStore.ts`**
   Same rehydration fix as `cartStore.ts`.

6. **Swap demo data in routes**
   - `src/routes/emeralds/tienda/index.tsx` — replace `demoProducts` with `useEmeralds()`
   - `src/routes/emeralds/tienda/$slug.tsx` — replace `getProductBySlug()` with Supabase query
   - `src/routes/emeralds/mayoristas.tsx` — replace `demoWholesaleLots` with `useWholesale()`
   - `src/routes/emeralds/index.tsx` — featured/accessible product sections

7. **Wire order auto-capture in `cartStore.ts` / `cart.tsx`**
   When the customer clicks the WhatsApp CTA in `/cart`:
   - Insert a row into `orders` (status: `pending`, payment_status: `unpaid`)
   - Insert one row into `order_items` per cart item (snapshot `product_name`, `product_slug`, `price`, `stone_count`, `carats`, `clarity`, `origin`)
   - The WhatsApp deep-link fires as normal — Supabase write happens concurrently (fire-and-forget)

8. **Delete demo data files**
   - `src/data/demo-products.ts`
   - `src/data/demo-wholesale-lots.ts`

---

## Out of Scope

| Item | Reason |
|---|---|
| `customers` / `profiles` | No auth required for customers |
| `jewelry` table | Separate project / repository |
| `newsletter_subscribers` | Handled by a third-party email service |
