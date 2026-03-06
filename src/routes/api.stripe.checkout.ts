import { createAPIFileRoute } from "@tanstack/react-start/api"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase-server"

export const APIRoute = createAPIFileRoute("/api/stripe/checkout")({
	POST: async ({ request }) => {
		const body = await request.json()
		const { orderId } = body as { orderId?: unknown }

		if (!orderId || typeof orderId !== "string") {
			return new Response("Bad Request", { status: 400 })
		}

		// Fetch order and items from DB — never trust client-sent prices
		const { data: order, error } = await supabaseAdmin
			.from("orders")
			.select("*, order_items(*)")
			.eq("id", orderId)
			.single()

		if (error || !order) {
			return new Response("Order not found", { status: 404 })
		}

		// Use configured public URL, not the request Origin header
		const origin =
			process.env.PUBLIC_URL ??
			process.env.VITE_PUBLIC_URL ??
			"http://localhost:3000"

		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			// Each order_item is one unique product — quantity is always 1
			// (emeralds are unique items; cart prevents duplicate entries)
			line_items: order.order_items.map((item) => ({
				price_data: {
					currency: (item.currency ?? order.currency ?? "usd").toLowerCase(),
					product_data: { name: item.product_name },
					unit_amount: Math.round(item.unit_price * 100), // from DB, not client
				},
				quantity: 1,
			})),
			metadata: {
				order_id: order.id,
				order_number: order.order_number,
			},
			success_url: `${origin}/checkout/success?order_id=${order.id}`,
			cancel_url: `${origin}/checkout/cancel?order_id=${order.id}`,
		})

		return Response.json({ url: session.url })
	},
})
