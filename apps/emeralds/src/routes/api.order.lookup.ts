import { createFileRoute } from "@tanstack/react-router"
import { supabaseAdmin } from "@/lib/supabase-server"

export const Route = createFileRoute("/api/order/lookup")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = await request.json().catch(() => null)
				if (!body || typeof body !== "object") {
					return Response.json({ error: "Invalid request" }, { status: 400 })
				}

				const { order_number, contact } = body as Record<string, unknown>

				if (!order_number || !contact || typeof order_number !== "string" || typeof contact !== "string") {
					return Response.json({ error: "order_number y contact son requeridos" }, { status: 422 })
				}

				const { data: order, error } = await supabaseAdmin
					.from("orders")
					.select("*, order_items(*)")
					.eq("order_number", order_number.trim().toUpperCase())
					.or(`customer_email.eq.${contact.trim()},customer_whatsapp.eq.${contact.trim()}`)
					.single()

				if (error || !order) {
					return Response.json({ error: "Pedido no encontrado" }, { status: 404 })
				}

				// Return only safe fields — no PII round-trip
				return Response.json({
					order_number: order.order_number,
					status: order.status,
					payment_status: order.payment_status,
					subtotal: order.subtotal,
					currency: order.currency,
					created_at: order.created_at,
					order_items: (order.order_items as {
						id: string
						product_name: string
						unit_price: number
						carats: number | null
						clarity: string | null
						origin: string | null
					}[]).map((item) => ({
						id: item.id,
						product_name: item.product_name,
						unit_price: item.unit_price,
						carats: item.carats,
						clarity: item.clarity,
						origin: item.origin,
					})),
				})
			},
		},
	},
})
