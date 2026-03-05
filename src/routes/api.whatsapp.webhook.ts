import { createAPIFileRoute } from "@tanstack/react-start/api"
import { supabase } from "@/lib/supabase"
import { updateOrderStatus } from "@/lib/supabase-queries"

export const APIRoute = createAPIFileRoute("/api/whatsapp/webhook")({
	GET: async ({ request }) => {
		const url = new URL(request.url)
		const mode = url.searchParams.get("hub.mode")
		const token = url.searchParams.get("hub.verify_token")
		const challenge = url.searchParams.get("hub.challenge")

		if (
			mode === "subscribe" &&
			token === process.env.WHATSAPP_VERIFY_TOKEN
		) {
			return new Response(challenge, { status: 200 })
		}

		return new Response("Forbidden", { status: 403 })
	},

	POST: async ({ request }) => {
		try {
			const body = await request.json()

			const message =
				body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

			if (message?.type === "text") {
				const text: string = message.text?.body ?? ""
				const match = text.match(/\bNG-\d{8}-\d{4}\b/)

				if (match) {
					const orderNumber = match[0]

					const { data: orders } = await supabase
						.from("orders")
						.select("id, status")
						.eq("order_number", orderNumber)
						.maybeSingle()

					if (orders && orders.status === "pending") {
						await updateOrderStatus(orders.id, "in_progress")
					}
				}
			}
		} catch {
			// Silently ignore parse errors; Meta requires 200
		}

		// Meta requires 200 for all webhook posts
		return new Response("EVENT_RECEIVED", { status: 200 })
	},
})
