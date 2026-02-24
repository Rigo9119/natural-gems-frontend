import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoProducts, type Product } from "@/data/demo-products";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CartItem {
	product: Product;
	quantity: number;
}

// Persisted shape — only IDs + quantities, not full product objects
interface PersistedCart {
	items: { id: number; quantity: number }[];
}

// ── Store shape ───────────────────────────────────────────────────────────────

interface CartState {
	items: CartItem[];
	// actions
	addToCart: (product: Product) => void;
	removeFromCart: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	clearCart: () => void;
	// helpers
	isInCart: (productId: number) => boolean;
	// derived
	totalItems: number;
	totalPrice: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveCartItems(
	persisted: { id: number; quantity: number }[],
): CartItem[] {
	return persisted
		.map(({ id, quantity }) => {
			const product = demoProducts.find((p) => p.id === id);
			return product ? { product, quantity } : null;
		})
		.filter((item): item is CartItem => item !== null);
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

			addToCart: (product) => {
				const { items } = get();
				if (items.some((i) => i.product.id === product.id)) return;
				set({ items: [...items, { product, quantity: 1 }] });
			},

			removeFromCart: (productId) => {
				set((s) => ({
					items: s.items.filter((i) => i.product.id !== productId),
				}));
			},

			updateQuantity: (productId, quantity) => {
				if (quantity <= 0) {
					get().removeFromCart(productId);
					return;
				}
				set((s) => ({
					items: s.items.map((i) =>
						i.product.id === productId ? { ...i, quantity } : i,
					),
				}));
			},

			clearCart: () => set({ items: [] }),

			isInCart: (productId) =>
				get().items.some((i) => i.product.id === productId),

			get totalItems() {
				return get().items.reduce((sum, i) => sum + i.quantity, 0);
			},

			get totalPrice() {
				return get().items.reduce(
					(sum, i) => sum + i.product.price * i.quantity,
					0,
				);
			},
		}),
		{
			name: "natura-cart",
			// Persist only IDs + quantities
			partialize: (state): PersistedCart => ({
				items: state.items.map((i) => ({
					id: i.product.id,
					quantity: i.quantity,
				})),
			}),
			// Re-inflate full Product objects on rehydration
			merge: (persisted, current) => {
				const { items } = persisted as PersistedCart;
				return {
					...current,
					items: resolveCartItems(items ?? []),
				};
			},
			skipHydration: true,
		},
	),
);
