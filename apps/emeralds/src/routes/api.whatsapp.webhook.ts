import { createFileRoute } from "@tanstack/react-router"
import { supabaseAdmin } from "@/lib/supabase-server"

// Verifies the X-Hub-Signature-256 header sent by Meta.
// Requires WHATSAPP_APP_SECRET env variable (found in Meta Developer Console
// → Your App → Settings → Basic → App Secret).
async function verifyWebhookSignature(
	rawBody: string,
	signature: string | null,
): Promise<boolean> {
	const appSecret = process.env.WHATSAPP_APP_SECRET
	if (!appSecret || !signature) return false

	const encoder = new TextEncoder()
	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(appSecret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	)
	const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody))
	const hex = Array.from(new Uint8Array(mac))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("")
	const expected = `sha256=${hex}`

	// Constant-time comparison to prevent timing attacks
	if (signature.length !== expected.length) return false
	let diff = 0
	for (let i = 0; i < signature.length; i++) {
		diff |= signature.charCodeAt(i) ^ expected.charCodeAt(i)
	}
	return diff === 0
}

export const Route = createFileRoute("/api/whatsapp/webhook")({
	server: {
		handlers: {
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
				const rawBody = await request.text()
				const signature = request.headers.get("x-hub-signature-256")

				const valid = await verifyWebhookSignature(rawBody, signature)
				if (!valid) {
					return new Response("Forbidden", { status: 403 })
				}

				try {
					const body = JSON.parse(rawBody)
					const message =
						body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

					if (message?.type === "text") {
						const text: string = message.text?.body ?? ""
						const match = text.match(/\bNG-\d{8}-\d{4}\b/)

						if (match) {
							const orderNumber = match[0]

							const { data: orders } = await supabaseAdmin
								.from("orders")
								.select("id, status")
								.eq("order_number", orderNumber)
								.maybeSingle()

							if (orders && orders.status === "pending") {
								await supabaseAdmin
									.from("orders")
									.update({ status: "in_progress" })
									.eq("id", orders.id)
							}
						}
					}
				} catch {
					// Silently ignore parse errors; Meta requires 200
				}

				// Meta requires 200 for all webhook posts
				return new Response("EVENT_RECEIVED", { status: 200 })
			},
		},
	},
})
