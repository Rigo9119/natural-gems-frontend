import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { EmeraldWithImage } from "@/lib/supabase-queries"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CartItem {
	product: EmeraldWithImage
	quantity: number
}

export interface AppliedPromo {
	id: string
	code: string
	type: "percentage" | "fixed"
	value: number
	discountAmount: number
}

// ── Store shape ───────────────────────────────────────────────────────────────

interface CartState {
	items: CartItem[]
	appliedPromo: AppliedPromo | null
	// actions
	addToCart: (product: EmeraldWithImage) => void
	removeFromCart: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	clearCart: () => void
	applyPromo: (promo: AppliedPromo) => void
	removePromo: () => void
	// helpers
	isInCart: (productId: string) => boolean
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			appliedPromo: null,

			addToCart: (product) => {
				const { items } = get()
				if (items.some((i) => i.product.id === product.id)) return
				set({ items: [...items, { product, quantity: 1 }] })
			},

			removeFromCart: (productId) => {
				set((s) => ({
					items: s.items.filter((i) => i.product.id !== productId),
				}))
			},

			updateQuantity: (productId, quantity) => {
				if (quantity <= 0) {
					get().removeFromCart(productId)
					return
				}
				set((s) => ({
					items: s.items.map((i) =>
						i.product.id === productId ? { ...i, quantity } : i,
					),
				}))
			},

			clearCart: () => set({ items: [], appliedPromo: null }),

			applyPromo: (promo) => set({ appliedPromo: promo }),

			removePromo: () => set({ appliedPromo: null }),

			isInCart: (productId) =>
				get().items.some((i) => i.product.id === productId),
		}),
		{
			name: "natura-cart-v2",
			skipHydration: true,
		},
	),
)

// ── Selectors (always computed fresh from items) ───────────────────────────────

export const selectTotalItems = (s: CartState) =>
	s.items.reduce((sum, i) => sum + i.quantity, 0)

export const selectTotalPrice = (s: CartState) =>
	s.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

export const selectDiscountAmount = (s: CartState) =>
	s.appliedPromo?.discountAmount ?? 0

export const selectFinalPrice = (s: CartState) =>
	Math.max(0, selectTotalPrice(s) - selectDiscountAmount(s))
