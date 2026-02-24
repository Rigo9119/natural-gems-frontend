import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoProducts, type Product } from "@/data/demo-products";

const MAX_COMPARE_ITEMS = 4;

// ── Persisted shape (only IDs, not full objects) ──────────────────────────────

interface PersistedCompare {
	ids: number[];
}

// ── Store shape ───────────────────────────────────────────────────────────────

interface CompareState {
	// derived from persisted ids on rehydration
	compareItems: Product[];
	// actions
	addToCompare: (product: Product) => void;
	removeFromCompare: (productId: number) => void;
	clearCompare: () => void;
	// helpers
	isInCompare: (productId: number) => boolean;
	canAddMore: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveProducts(ids: number[]): Product[] {
	return ids
		.map((id) => demoProducts.find((p) => p.id === id))
		.filter((p): p is Product => p !== undefined);
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useCompareStore = create<CompareState>()(
	persist(
		(set, get) => ({
			compareItems: [],

			addToCompare: (product) => {
				const { compareItems } = get();
				if (compareItems.length >= MAX_COMPARE_ITEMS) return;
				if (compareItems.some((p) => p.id === product.id)) return;
				set({ compareItems: [...compareItems, product] });
			},

			removeFromCompare: (productId) => {
				set((s) => ({
					compareItems: s.compareItems.filter((p) => p.id !== productId),
				}));
			},

			clearCompare: () => set({ compareItems: [] }),

			isInCompare: (productId) =>
				get().compareItems.some((p) => p.id === productId),

			get canAddMore() {
				return get().compareItems.length < MAX_COMPARE_ITEMS;
			},
		}),
		{
			name: "natura-compare",
			// Persist only IDs to avoid stale product data in localStorage
			partialize: (state): PersistedCompare => ({
				ids: state.compareItems.map((p) => p.id),
			}),
			// Re-inflate full Product objects from current demo data on rehydration
			merge: (persisted, current) => {
				const { ids } = persisted as PersistedCompare;
				return {
					...current,
					compareItems: resolveProducts(ids ?? []),
				};
			},
			skipHydration: true,
		},
	),
);
