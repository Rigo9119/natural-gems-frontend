import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { EmeraldWithImage } from "@/lib/supabase-queries"

const MAX_COMPARE_ITEMS = 4

// ── Store shape ───────────────────────────────────────────────────────────────

interface CompareState {
	compareItems: EmeraldWithImage[]
	// actions
	addToCompare: (product: EmeraldWithImage) => void
	removeFromCompare: (productId: string) => void
	clearCompare: () => void
	// helpers
	isInCompare: (productId: string) => boolean
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useCompareStore = create<CompareState>()(
	persist(
		(set, get) => ({
			compareItems: [],

			addToCompare: (product) => {
				const { compareItems } = get()
				if (compareItems.length >= MAX_COMPARE_ITEMS) return
				if (compareItems.some((p) => p.id === product.id)) return
				set({ compareItems: [...compareItems, product] })
			},

			removeFromCompare: (productId) => {
				set((s) => ({
					compareItems: s.compareItems.filter((p) => p.id !== productId),
				}))
			},

			clearCompare: () => set({ compareItems: [] }),

			isInCompare: (productId) =>
				get().compareItems.some((p) => p.id === productId),
		}),
		{
			name: "natura-compare-v2",
			skipHydration: true,
		},
	),
)

// ── Selectors ─────────────────────────────────────────────────────────────────

export const selectCanAddMore = (s: CompareState) =>
	s.compareItems.length < MAX_COMPARE_ITEMS
