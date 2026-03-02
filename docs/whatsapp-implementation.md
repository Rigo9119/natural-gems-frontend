# WhatsApp Implementation Plan

WhatsApp is the primary checkout and contact mechanism for Natura Gems.
This document maps what already exists and what still needs to be built.

---

## What Already Exists (do not rebuild)

| Component / File | Status | Notes |
|---|---|---|
| `src/components/WhatsAppFloatingButton.tsx` | ✅ Done | Globally rendered in `__root.tsx` on all non-admin pages |
| `src/components/WhatsAppSectionCMP.tsx` | ✅ Done | Full-width section, Sanity-driven with fallbacks |
| `src/lib/constants.ts` | ⚠️ Placeholder | `WHATSAPP_NUMBER` is `573001234567` — needs real number |
| Cart WhatsApp CTA (`src/routes/cart.tsx`) | ⚠️ Partial | Deep-link fires but no customer info capture or order insert |

---

## Step 1 — Update WHATSAPP_NUMBER

**File:** `src/lib/constants.ts`

Replace the placeholder with the real business number (international format, no `+` or spaces):

```ts
export const WHATSAPP_NUMBER = "573XXXXXXXXX"; // real number here
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
```

This propagates automatically to `WhatsAppFloatingButton`, `WhatsAppSectionCMP`, and all cart/jewelry links.

**Blocked by:** Nothing — do this first.

---

## Step 2 — Pre-Checkout Customer Info Modal

**New file:** `src/components/CheckoutWhatsAppModal.tsx`

Before the WhatsApp deep-link fires from the cart, capture the minimum info needed for the `orders` DB row.

### Fields
| Field | Required | Maps to |
|---|---|---|
| `customer_name` | Yes | `orders.customer_name` |
| `customer_whatsapp` | No | `orders.customer_whatsapp` |

### Behavior
1. User clicks "Finalizar por WhatsApp" in `/cart`
2. `CheckoutWhatsAppModal` opens (shadcn `Dialog`)
3. User fills name (+ optional WhatsApp number) and submits
4. On submit:
   - Fire-and-forget: insert `orders` row + `order_items` rows into Supabase
   - Open WhatsApp deep-link in new tab: `window.open(waUrl, "_blank")`
   - Close modal

### Dependencies
- `src/components/ui/dialog.tsx` — already exists
- `src/lib/supabase.ts` — already exists
- TanStack Form + Zod — already in stack

### Cart update (`src/routes/cart.tsx`)
- Replace the current `<a href={waUrl}>` CTA with a `<button>` that sets modal open state
- Pass `cartItems` and `cartTotal` into the modal as props

**Blocked by:** Nothing (build the modal UI without the Supabase insert first; wire the insert in Step 4).

---

## Step 3 — Add WhatsAppSectionCMP to Emeralds Pages

The component exists but isn't placed on the emeralds pages yet.

### Schema change
**File:** `studio-natura-gems/schemaTypes/pages/emeraldPage.ts`

Add a `whatsApp` reference field (same pattern as `homePage.ts`):
```ts
defineField({
  name: 'whatsApp',
  title: 'WhatsApp',
  type: 'reference',
  to: [{ type: 'whatsAppSection' }],
})
```

### Type change
**File:** `src/lib/sanity/sanity-types.ts`

Add to `EmeraldPage` interface:
```ts
whatsApp?: WhatsAppSection;
```

### Route changes

**`src/routes/emeralds/index.tsx`** — add as Section 8 (final section, after `FeatureCallout`):
```tsx
import WhatsAppSectionCMP from "@/components/WhatsAppSectionCMP";
// ...
<WhatsAppSectionCMP sectionContent={(page?.whatsApp ?? {}) as WhatsAppSection} />
```

**`src/routes/emeralds/mayoristas.tsx`** — add at bottom of wholesale page (same import + usage).

**Blocked by:** Nothing.

---

## Step 4 — Wire Order Auto-Capture

**Blocked by:** Supabase tables must exist (see `supabase-db-plan.md` Phase 1).

Inside `CheckoutWhatsAppModal` submit handler, add the fire-and-forget insert:

```ts
// Non-blocking — fires concurrently with WhatsApp open
supabase
  .from("orders")
  .insert({
    customer_name: formData.name,
    customer_whatsapp: formData.whatsapp || null,
    subtotal: cartTotal,
    currency: "USD",
    status: "pending",
    payment_status: "unpaid",
  })
  .select("id")
  .single()
  .then(({ data: order }) => {
    if (!order) return;
    supabase.from("order_items").insert(
      cartItems.map((item) => ({
        order_id: order.id,
        emerald_id: item.id,
        emerald_name: item.name,
        emerald_slug: item.slug,
        unit_price: item.price,
        currency: "USD",
        quantity: 1,
        carat: item.carat,
        clarity: item.clarity,
        origin: item.origin,
      })),
    );
  });
```

---

## Execution Order

| # | Step | Blocked by |
|---|---|---|
| 1 | Update `WHATSAPP_NUMBER` | Nothing |
| 2 | Build `CheckoutWhatsAppModal` (UI only) | Nothing |
| 3 | Add `WhatsAppSectionCMP` to emeralds pages + schema/type | Nothing |
| 4 | Wire Supabase insert into modal | Supabase tables (Phase 1 of DB plan) |

---

## Files to Create / Modify

| Action | File |
|---|---|
| Edit | `src/lib/constants.ts` |
| Create | `src/components/CheckoutWhatsAppModal.tsx` |
| Edit | `src/routes/cart.tsx` |
| Edit | `src/routes/emeralds/index.tsx` |
| Edit | `src/routes/emeralds/mayoristas.tsx` |
| Edit | `src/lib/sanity/sanity-types.ts` |
| Edit | `studio-natura-gems/schemaTypes/pages/emeraldPage.ts` |

---

## Verification Checklist

- [ ] Floating button links to real number on all non-admin pages
- [ ] Clicking "Finalizar por WhatsApp" in cart opens modal (not direct link)
- [ ] Modal validates: name is required
- [ ] After submit: WhatsApp opens in new tab, modal closes
- [ ] WhatsApp message contains correct item names, prices, and total
- [ ] `WhatsAppSectionCMP` renders on `/emeralds` and `/emeralds/mayoristas`
- [ ] (Post-Supabase) Order row appears in dashboard after cart checkout
