# Supabase DB Implementation Plan

## Overview

5 tables total (+ 2 image sub-tables). No auth. No jewelry (separate project).
Wholesale checkout is WhatsApp-only — no cart integration needed.
Orders are auto-captured when the customer clicks the WhatsApp CTA, then
manually confirmed and updated by the business.

---

## Table 1: `emeralds`

Replaces `src/data/demo-products.ts`. One row per loose stone.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | `gen_random_uuid()` default |
| `slug` | `text` UNIQUE NOT NULL | URL identifier |
| `name` | `text` NOT NULL | Display name |
| `price` | `numeric(10,2)` NOT NULL | |
| `currency` | `text` NOT NULL DEFAULT `'USD'` | ISO 4217 code |
| `carat` | `numeric(6,3)` NOT NULL | |
| `weight_grams` | `numeric(6,3)` | Physical weight |
| `origin` | `text` NOT NULL | `Muzo \| Chivor \| Coscuez \| Gachala` |
| `clarity` | `text` NOT NULL | `AAA \| AA \| A \| B` |
| `cut` | `text` NOT NULL | `Emerald \| Oval \| Pear \| Round` |
| `color` | `text` | |
| `description` | `text` | |
| `dimensions` | `text` | e.g. `"8.2 x 6.1 x 4.3 mm"` |
| `certified_by` | `text` | `GIA`, `CDT`, etc. |
| `certificate_url` | `text` | Link to cert PDF |
| `status` | `text` NOT NULL DEFAULT `'available'` | `available \| reserved \| sold` |
| `created_at` | `timestamptz` DEFAULT `now()` | |

### Table 1b: `emerald_images`

One-to-many images per emerald. `position = 0` is the cover/primary image.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `emerald_id` | `uuid` FK → `emeralds.id` ON DELETE CASCADE | |
| `url` | `text` NOT NULL | |
| `position` | `int2` NOT NULL DEFAULT `0` | Sort order; `0` = primary |

---

## Table 2: `wholesale_lots`

Replaces `src/data/demo-wholesale-lots.ts`. WhatsApp-only checkout.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `name` | `text` NOT NULL | |
| `description` | `text` | |
| `total_price` | `numeric(10,2)` NOT NULL | |
| `currency` | `text` NOT NULL DEFAULT `'USD'` | ISO 4217 code |
| `total_carats` | `numeric(8,3)` NOT NULL | |
| `total_grams` | `numeric(8,3)` | |
| `stone_count` | `int4` NOT NULL | |
| `min_order_quantity` | `int4` NOT NULL DEFAULT `1` | MOQ |
| `origin` | `text` NOT NULL | Same values as `emeralds.origin` |
| `clarity` | `text` NOT NULL | Same values as `emeralds.clarity` |
| `cut` | `text` NOT NULL | Same values as `emeralds.cut` |
| `status` | `text` NOT NULL DEFAULT `'available'` | `available \| reserved \| sold` |
| `created_at` | `timestamptz` DEFAULT `now()` | |

### Table 2b: `wholesale_lot_images`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `lot_id` | `uuid` FK → `wholesale_lots.id` ON DELETE CASCADE | |
| `url` | `text` NOT NULL | |
| `position` | `int2` NOT NULL DEFAULT `0` | `0` = cover |

---

## Table 3: `orders`

Auto-created when a customer clicks the WhatsApp CTA. You manually update
`status`, payment info, shipping details, and notes as the sale progresses.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | `gen_random_uuid()` default |
| `order_number` | `text` UNIQUE NOT NULL | Human-readable, e.g. `NG-2026-0001`. Generated via a DB sequence or trigger. |
| `customer_name` | `text` NOT NULL | Captured from a pre-checkout form or filled manually |
| `customer_whatsapp` | `text` | WhatsApp number the inquiry came from |
| `customer_email` | `text` | Optional — may not be available on first contact |
| `shipping_address` | `text` | Full delivery address — filled once confirmed |
| `shipping_country` | `text` | ISO country code, e.g. `CO`, `US` |
| `tracking_number` | `text` | Courier tracking code — filled on dispatch |
| `subtotal` | `numeric(10,2)` NOT NULL | Sum of `order_items.unit_price * quantity` at time of order |
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

### Table 3b: `order_items`

One row per emerald in the order. Prices are snapshotted at order creation time
so historical records are accurate even if product prices change later.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `order_id` | `uuid` FK → `orders.id` ON DELETE CASCADE | |
| `emerald_id` | `uuid` FK → `emeralds.id` ON DELETE RESTRICT | Prevent deleting a sold emerald |
| `emerald_name` | `text` NOT NULL | Snapshotted name at order time |
| `emerald_slug` | `text` NOT NULL | Snapshotted slug at order time |
| `unit_price` | `numeric(10,2)` NOT NULL | Snapshotted price at order time |
| `currency` | `text` NOT NULL DEFAULT `'USD'` | |
| `quantity` | `int2` NOT NULL DEFAULT `1` | Almost always 1 for loose stones |
| `carat` | `numeric(6,3)` | Snapshotted at order time |
| `clarity` | `text` | Snapshotted at order time |
| `origin` | `text` | Snapshotted at order time |

---

## RLS Policies

All tables are **public read-only**. The anon key can `SELECT` but cannot
`INSERT`, `UPDATE`, or `DELETE`. Data is managed from the Supabase dashboard
or a future admin panel.

```sql
-- Product tables — public read-only
ALTER TABLE emeralds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON emeralds FOR SELECT USING (true);

ALTER TABLE emerald_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON emerald_images FOR SELECT USING (true);

ALTER TABLE wholesale_lots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON wholesale_lots FOR SELECT USING (true);

ALTER TABLE wholesale_lot_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON wholesale_lot_images FOR SELECT USING (true);

-- Orders — anon can INSERT (auto-capture on WhatsApp CTA click), no read/update from client
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert" ON orders FOR INSERT WITH CHECK (true);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert" ON order_items FOR INSERT WITH CHECK (true);
```

> Orders and order items are **write-only from the client**. Reading and updating
> them is done exclusively from the Supabase dashboard (or a future internal
> admin panel using the service role key).

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
   - `emeraldsQueryOptions()` — list with filters (origin, clarity, cut, price, carat)
   - `emeraldBySlugQueryOptions(slug)` — single product detail
   - `wholesaleLotsQueryOptions()` — list with filters

3. **Add prefetch/use hooks to `src/data/page-data.ts`**
   Following the existing pattern:
   ```ts
   export async function prefetchEmeralds(queryClient: QueryClient) { ... }
   export function useEmeralds() { ... }
   export async function prefetchWholesaleLots(queryClient: QueryClient) { ... }
   export function useWholesaleLots() { ... }
   ```

4. **Update `cartStore.ts`**
   Rehydration currently re-inflates `Product` objects from the `demoProducts`
   array by numeric `id`. Switch to uuid-based lookup via Supabase.

5. **Update `compareStore.ts`**
   Same rehydration fix as `cartStore.ts`.

 6. **Swap demo data in routes**
   - `src/routes/emeralds/tienda/index.tsx` — replace `demoProducts` with `useEmeralds()`
   - `src/routes/emeralds/tienda/$slug.tsx` — replace `getProductBySlug()` with Supabase query
   - `src/routes/emeralds/mayoristas.tsx` — replace `demoWholesaleLots` with `useWholesaleLots()`
   - `src/routes/emeralds/index.tsx` — featured/accessible product sections

7. **Wire order auto-capture in `cartStore.ts` / `cart.tsx`**
   When the customer clicks the WhatsApp CTA in `/cart`:
   - Insert a row into `orders` (status: `pending`, payment_status: `unpaid`)
   - Insert one row into `order_items` per cart item (snapshot name, price, carat, clarity, origin)
   - The WhatsApp deep-link fires as normal — Supabase write happens concurrently (fire-and-forget, non-blocking)

8. **Delete demo data files**
   Once all routes are wired to real data:
   - `src/data/demo-products.ts`
   - `src/data/demo-wholesale-lots.ts`

---

## Out of Scope

| Item | Reason |
|---|---|
| `customers` / `profiles` | No auth required |
| `jewelry` table | Separate project / repository |
| `newsletter_subscribers` | Handled by a third-party email service |
