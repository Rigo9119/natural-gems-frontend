import { createAPIFileRoute } from "@tanstack/react-start/api"
import { stripe } from "@/lib/stripe"
import { updateOrderPayment, updateOrderStatus } from "@/lib/supabase-queries"

export const APIRoute = createAPIFileRoute("/api/stripe/webhook")({
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
				await updateOrderStatus(orderId, "confirmed")
				await updateOrderPayment(orderId, "paid", "stripe")
			}
		}

		return new Response("OK", { status: 200 })
	},
})
