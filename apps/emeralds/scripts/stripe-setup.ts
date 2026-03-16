/**
 * One-time Stripe setup script.
 *
 * Run after creating your Stripe account:
 *   bun --env-file=.env.local scripts/stripe-setup.ts
 *
 * What it does:
 *   1. Creates a webhook endpoint for your deployed site
 *   2. Subscribes it to the exact events the app handles
 *   3. Prints the webhook signing secret — paste it into .env.local as STRIPE_WEBHOOK_SECRET
 */

import Stripe from "stripe"

const secretKey = process.env.STRIPE_SECRET_KEY
const publicUrl = process.env.PUBLIC_URL

if (!secretKey) {
	console.error("❌  STRIPE_SECRET_KEY is missing from .env.local")
	process.exit(1)
}

if (!publicUrl) {
	console.error("❌  PUBLIC_URL is missing from .env.local  (e.g. https://esmeraldas.naturagems.com)")
	process.exit(1)
}

const stripe = new Stripe(secretKey, { apiVersion: "2025-01-27.acacia" })

const WEBHOOK_EVENTS: Stripe.WebhookEndpointCreateParams.EnabledEvent[] = [
	"checkout.session.completed",   // payment succeeded  → mark order confirmed + emeralds sold
	"checkout.session.expired",     // session timed out  → release reserved emeralds
]

async function main() {
	const webhookUrl = `${publicUrl.replace(/\/$/, "")}/api/stripe/webhook`
	console.log(`\n🔗  Registering webhook: ${webhookUrl}`)
	console.log(`📋  Events: ${WEBHOOK_EVENTS.join(", ")}\n`)

	// Check if a webhook for this URL already exists
	const { data: existing } = await stripe.webhookEndpoints.list({ limit: 100 })
	const duplicate = existing.find((w) => w.url === webhookUrl)

	if (duplicate) {
		console.log(`ℹ️   Webhook already exists (id: ${duplicate.id})`)
		console.log("    Updating events list...\n")

		const updated = await stripe.webhookEndpoints.update(duplicate.id, {
			enabled_events: WEBHOOK_EVENTS,
		})

		printResult(updated)
		return
	}

	const webhook = await stripe.webhookEndpoints.create({
		url: webhookUrl,
		enabled_events: WEBHOOK_EVENTS,
		description: "Natura Gems — checkout events",
	})

	printResult(webhook)
}

function printResult(webhook: Stripe.WebhookEndpoint) {
	console.log("✅  Webhook configured successfully!\n")
	console.log(`   ID:     ${webhook.id}`)
	console.log(`   URL:    ${webhook.url}`)
	console.log(`   Status: ${webhook.status}`)

	if ("secret" in webhook && webhook.secret) {
		console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
		console.log("  Add this to your .env.local (and Netlify env vars):")
		console.log("")
		console.log(`  STRIPE_WEBHOOK_SECRET=${webhook.secret}`)
		console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
	} else {
		console.log("\nℹ️   Webhook secret is only shown once on creation.")
		console.log("    If you need it again, delete this webhook and re-run the script.\n")
	}
}

main().catch((err) => {
	console.error("❌  Error:", err.message)
	process.exit(1)
})
