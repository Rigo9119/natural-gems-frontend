import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { EmeraldWithImage } from "@/lib/supabase-queries"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CartItem {
	product: EmeraldWithImage
	quantity: number
}

// ── Store shape ───────────────────────────────────────────────────────────────

interface CartState {
	items: CartItem[]
	// actions
	addToCart: (product: EmeraldWithImage) => void
	removeFromCart: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	clearCart: () => void
	// helpers
	isInCart: (productId: string) => boolean
	// derived
	totalItems: number
	totalPrice: number
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

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

			clearCart: () => set({ items: [] }),

			isInCart: (productId) =>
				get().items.some((i) => i.product.id === productId),

			get totalItems() {
				return get().items.reduce((sum, i) => sum + i.quantity, 0)
			},

			get totalPrice() {
				return get().items.reduce(
					(sum, i) => sum + i.product.price * i.quantity,
					0,
				)
			},
		}),
		{
			name: "natura-cart-v2",
			skipHydration: true,
		},
	),
)
