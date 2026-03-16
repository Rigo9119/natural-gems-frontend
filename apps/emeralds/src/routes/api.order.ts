import { createFileRoute } from "@tanstack/react-router"
import { supabaseAdmin } from "@/lib/supabase-server"

function generateOrderNumber(): string {
	const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
	const rand = String(Math.floor(Math.random() * 9000) + 1000)
	return `NG-${date}-${rand}`
}

export const Route = createFileRoute("/api/order")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = await request.json().catch(() => null)
				if (!body || typeof body !== "object") {
					return Response.json({ error: "Invalid request" }, { status: 400 })
				}

				const { customer_name, customer_whatsapp, customer_email, notes, subtotal, currency, items } =
					body as Record<string, unknown>

				if (
					!customer_name ||
					!customer_whatsapp ||
					typeof subtotal !== "number" ||
					Number.isNaN(subtotal) ||
					subtotal <= 0 ||
					!Array.isArray(items) ||
					items.length === 0
				) {
					return Response.json({ error: "Missing required fields" }, { status: 422 })
				}

				const orderNumber = generateOrderNumber()

				// Create order header
				const { data: order, error: orderError } = await supabaseAdmin
					.from("orders")
					.insert({
						order_number: orderNumber,
						customer_name: customer_name as string,
						customer_whatsapp: customer_whatsapp as string,
						customer_email: (customer_email as string) || null,
						notes: (notes as string) || null,
						subtotal: subtotal as number,
						currency: (currency as string) ?? "USD",
						status: "pending",
						payment_status: "unpaid",
					})
					.select()
					.single()

				if (orderError || !order) {
					console.error("Order creation error:", orderError)
					return Response.json({ error: "Failed to create order" }, { status: 500 })
				}

				// Create order items
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const orderItems = (items as any[]).map((item) => ({
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

				const { error: itemsError } = await supabaseAdmin.from("order_items").insert(orderItems)

				if (itemsError) {
					console.error("Order items error:", itemsError)
					await supabaseAdmin.from("orders").delete().eq("id", order.id)
					return Response.json({ error: "Failed to create order items" }, { status: 500 })
				}

				// Reserve the emeralds — prevents double-selling while payment is in progress
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const emeraldIds = (items as any[]).map((i) => i.emerald_id).filter(Boolean)
				if (emeraldIds.length > 0) {
					await supabaseAdmin
						.from("emeralds")
						.update({ status: "reserved" })
						.in("id", emeraldIds)
				}

				return Response.json({ orderId: order.id, orderNumber: order.order_number })
			},
		},
	},
})
