import Stripe from "stripe";

// biome-ignore lint/style/noNonNullAssertion: env var must be set for the server to function
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2026-02-25.clover",
});
