# Testing Plan — Natural Gems Frontend

## Current State

- Vitest, @testing-library/react, and jsdom are **installed but not configured**
- **0 test files** across the entire monorepo
- Two apps: `apps/emeralds` (mature) and `apps/jewelry` (minimal/new)

---

## Phase 1 — Foundation Setup

**Goal:** Get the test runner working before writing any tests.

- [ ] Create `vitest.config.ts` in `apps/emeralds/` and `apps/jewelry/`
- [ ] Create `src/test/setup.ts` per app — jsdom globals and global mocks (Supabase client, Stripe)
- [ ] Create `src/test/utils.tsx` per app — render wrapper that provides React Query client, Router context, and i18n

Every component test will need the render wrapper. Do this before anything else.

---

## Phase 2 — Utilities & Pure Logic

No mocking needed — pure functions, fast tests.

| File | What to test |
|---|---|
| `packages/ui/src/lib/utils.ts` | `cn()` merges classnames correctly |
| `apps/emeralds/src/lib/seo.ts` | SEO metadata generation |
| `apps/emeralds/src/hooks/sanity-helper.ts` | `localizeContent()` returns correct locale |
| `apps/emeralds/src/lib/constants.ts` | Exported values match expected shape |

---

## Phase 3 — Stores (Zustand)

Test stores in isolation — no React needed, just import and call actions.

| Store | Key scenarios |
|---|---|
| `apps/emeralds/src/store/cartStore.ts` | Add item, remove item, update quantity, clear cart, localStorage persistence |
| `apps/emeralds/src/store/compareStore.ts` | Add/remove from comparison, max items limit |

---

## Phase 4 — API Routes

Highest business-risk area (payments, orders, user data). Mock Supabase and Stripe at the module level with `vi.mock()`.

| Route | What to test |
|---|---|
| `api.contact.ts` | Valid submission saves to Supabase; missing fields return 400 |
| `api.newsletter.ts` | Duplicate email handling; success response shape |
| `api.order.ts` | Order creation; required field validation; Supabase error returns 500 |
| `api.stripe.checkout.ts` | Calls Stripe with correct params; Stripe errors handled gracefully |
| `api.stripe.webhook.ts` | Signature validation rejects invalid webhooks; valid event updates order status |
| `api.whatsapp.webhook.ts` | Payload parsing; response format |

---

## Phase 5 — Components

Start with shared UI (no business logic, easiest to isolate):

| Component | What to test |
|---|---|
| `packages/ui/src/components/Header.tsx` | Renders nav links; language switcher visible |
| `packages/ui/src/components/Footer.tsx` | Social links present; copyright text |
| `packages/ui/src/components/MineCarousel.tsx` | Renders images; navigation works |

Then Emeralds app components (focus on ones with logic):
- Cart item quantity controls (increment/decrement/remove)
- Compare tool toggle behavior
- Contact/newsletter form validation feedback

---

## Phase 6 — Route Integration Tests

Test full page renders with mocked query data.

| Route | Scenario |
|---|---|
| `apps/emeralds` index | Renders product list from mocked query |
| `apps/jewelry` index | Landing page renders "Próximamente" copy |
| Any route | 404/error boundary renders correctly |

---

## Priority Order

```
1. Phase 1 — setup (required before anything else)
2. Phase 3 — stores (critical state, easiest to test)
3. Phase 4 — API routes (highest business risk)
4. Phase 2 — utilities (quick coverage wins)
5. Phase 5 — components (broad coverage)
6. Phase 6 — integration (polish)
```

---

## Coverage Targets

| Area | Target |
|---|---|
| Utilities | 100% |
| Stores | 90%+ |
| API routes | 80%+ |
| Components | 70%+ |
| Routes | 60%+ |
