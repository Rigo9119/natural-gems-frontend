import { queryOptions } from "@tanstack/react-query"
import type { Database } from "@/lib/database.types"
import { supabase } from "@/lib/supabase"

// ── Types ─────────────────────────────────────────────────────────────────────

export type Emerald = Database["public"]["Tables"]["emeralds"]["Row"]
export type EmeraldImage = Database["public"]["Tables"]["emerald_images"]["Row"]
export type EmeraldWithImage = Emerald & { image_url: string | null }

// ── Filter constants (replaces demo-products.ts + demo-wholesale-lots.ts) ─────

export const origins = ["Muzo", "Chivor", "Coscuez", "Gachala"] as const
export type Origin = (typeof origins)[number]

export const clarities = ["AAA", "AA", "A", "B"] as const
export type Clarity = (typeof clarities)[number]

export const cuts = ["Emerald", "Oval", "Pear", "Round"] as const
export type Cut = (typeof cuts)[number]

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveImageUrl(
	images: { url: string; position: number }[] | null,
): string | null {
	if (!images || images.length === 0) return null
	return [...images].sort((a, b) => a.position - b.position)[0].url
}

type RawRow = Emerald & {
	emerald_images: { url: string; position: number }[] | null
}

function mapRow(row: RawRow): EmeraldWithImage {
	const { emerald_images, ...emerald } = row
	return { ...emerald, image_url: resolveImageUrl(emerald_images) }
}

// ── Query options ─────────────────────────────────────────────────────────────

/** Single retail stones: stone_count = 1 AND status = available */
export function retailEmeraldsQueryOptions() {
	return queryOptions({
		queryKey: ["emeralds", "retail"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("emeralds")
				.select("*, emerald_images(url, position)")
				.eq("stone_count", 1)
				.eq("status", "available")
			if (error) throw error
			return (data as unknown as RawRow[]).map(mapRow)
		},
	})
}

/** Wholesale lots: stone_count > 1 AND status = available */
export function wholesaleEmeraldsQueryOptions() {
	return queryOptions({
		queryKey: ["emeralds", "wholesale"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("emeralds")
				.select("*, emerald_images(url, position)")
				.gt("stone_count", 1)
				.eq("status", "available")
			if (error) throw error
			return (data as unknown as RawRow[]).map(mapRow)
		},
	})
}

/** Single emerald by slug (returns null if not found) */
export function emeraldBySlugQueryOptions(slug: string) {
	return queryOptions({
		queryKey: ["emeralds", "slug", slug],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("emeralds")
				.select("*, emerald_images(url, position)")
				.eq("slug", slug)
				.maybeSingle()
			if (error) throw error
			if (!data) return null
			return mapRow(data as unknown as RawRow)
		},
	})
}

// ── Order types ───────────────────────────────────────────────────────────────

export type Order = Database["public"]["Tables"]["orders"]["Row"]
export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"]
export type OrderWithItems = Order & { order_items: OrderItem[] }

export type CreateOrderInput = {
	order_number: string
	customer_name: string
	customer_whatsapp: string
	customer_email?: string
	notes?: string
	subtotal: number
	currency: string
	items: {
		emerald_id: string
		product_name: string
		product_slug: string
		stone_count: number
		unit_price: number
		carats: number
		clarity: string
		origin: string
		currency: string
	}[]
}

// ── Order helpers ─────────────────────────────────────────────────────────────

export function ordersQueryOptions() {
	return queryOptions({
		queryKey: ["orders"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("orders")
				.select("*, order_items(*)")
				.order("created_at", { ascending: false })
			if (error) throw error
			return data as OrderWithItems[]
		},
	})
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
	const { items, ...orderData } = input
	const { data: order, error: orderError } = await supabase
		.from("orders")
		.insert({ ...orderData, status: "pending", payment_status: "unpaid" })
		.select()
		.single()
	if (orderError) throw orderError

	const orderItems = items.map((item) => ({
		order_id: order.id,
		emerald_id: item.emerald_id,
		product_name: item.product_name,
		product_slug: item.product_slug,
		stone_count: item.stone_count,
		unit_price: item.unit_price,
		carats: item.carats,
		clarity: item.clarity,
		origin: item.origin,
		currency: item.currency,
	}))
	const { error: itemsError } = await supabase
		.from("order_items")
		.insert(orderItems)
	if (itemsError) throw itemsError

	return order
}

export async function updateOrderStatus(
	orderId: string,
	status: string,
): Promise<void> {
	const { error } = await supabase
		.from("orders")
		.update({ status })
		.eq("id", orderId)
	if (error) throw error
}

export async function updateOrderPayment(
	orderId: string,
	paymentStatus: string,
	paymentMethod: string,
): Promise<void> {
	const { error } = await supabase
		.from("orders")
		.update({ payment_status: paymentStatus, payment_method: paymentMethod })
		.eq("id", orderId)
	if (error) throw error
}

export function generateOrderNumber(): string {
	const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
	const rand = String(Math.floor(Math.random() * 9000) + 1000)
	return `NG-${date}-${rand}`
}
