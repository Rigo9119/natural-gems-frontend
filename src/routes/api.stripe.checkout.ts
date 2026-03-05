import { createAPIFileRoute } from "@tanstack/react-start/api"
import { stripe } from "@/lib/stripe"

type LineItem = {
	name: string
	unit_amount: number
	quantity: number
}

type CheckoutRequestBody = {
	orderId: string
	orderNumber: string
	items: LineItem[]
	total: number
	currency: string
}

export const APIRoute = createAPIFileRoute("/api/stripe/checkout")({
	POST: async ({ request }) => {
		const body: CheckoutRequestBody = await request.json()
		const { orderId, orderNumber, items, currency } = body

		const origin = request.headers.get("origin") ?? "http://localhost:3000"

		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			line_items: items.map((item) => ({
				price_data: {
					currency: currency.toLowerCase(),
					product_data: { name: item.name },
					unit_amount: item.unit_amount,
				},
				quantity: item.quantity,
			})),
			metadata: { order_id: orderId, order_number: orderNumber },
			success_url: `${origin}/checkout/success?order_id=${orderId}`,
			cancel_url: `${origin}/checkout/cancel?order_id=${orderId}`,
		})

		return Response.json({ url: session.url })
	},
})
