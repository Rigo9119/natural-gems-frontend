import { createFileRoute } from "@tanstack/react-router"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase-server"

async function getEmeraldIdsForOrder(orderId: string): Promise<string[]> {
	const { data } = await supabaseAdmin
		.from("order_items")
		.select("emerald_id")
		.eq("order_id", orderId)
	return (data ?? []).map((r) => r.emerald_id).filter(Boolean) as string[]
}

export const Route = createFileRoute("/api/stripe/webhook")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const sig = request.headers.get("stripe-signature") ?? ""
				const rawBody = await request.text()

				let event: ReturnType<typeof stripe.webhooks.constructEvent>
				try {
					event = stripe.webhooks.constructEvent(
						rawBody,
						sig,
						process.env.STRIPE_WEBHOOK_SECRET!,
					)
				} catch {
					return new Response("Webhook signature verification failed", {
						status: 400,
					})
				}

				if (event.type === "checkout.session.completed") {
					const session = event.data.object
					const orderId = session.metadata?.order_id
					if (orderId) {
						// Confirm the order
						await supabaseAdmin
							.from("orders")
							.update({
								status: "confirmed",
								payment_status: "paid",
								payment_method: "stripe",
							})
							.eq("id", orderId)

						// Mark emeralds as sold — they're no longer available
						const emeraldIds = await getEmeraldIdsForOrder(orderId)
						if (emeraldIds.length > 0) {
							await supabaseAdmin
								.from("emeralds")
								.update({ status: "sold" })
								.in("id", emeraldIds)
						}
					}
				}

				// Stripe session expired without payment (default 24h TTL)
				// Also covers the case where the user abandoned the Stripe page
				if (event.type === "checkout.session.expired") {
					const session = event.data.object
					const orderId = session.metadata?.order_id
					if (orderId) {
						// Cancel the order
						await supabaseAdmin
							.from("orders")
							.update({ status: "cancelled" })
							.eq("id", orderId)

						// Release the emeralds back to the catalog
						const emeraldIds = await getEmeraldIdsForOrder(orderId)
						if (emeraldIds.length > 0) {
							await supabaseAdmin
								.from("emeralds")
								.update({ status: "available" })
								.in("id", emeraldIds)
						}
					}
				}

				return new Response("OK", { status: 200 })
			},
		},
	},
})
