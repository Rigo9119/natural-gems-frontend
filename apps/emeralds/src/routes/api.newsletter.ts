import { createFileRoute } from "@tanstack/react-router"
import { supabaseAdmin } from "@/lib/supabase-server"

// Requires a Supabase table:
// create table newsletter_subscribers (
//   id uuid primary key default gen_random_uuid(),
//   email text not null unique,
//   created_at timestamptz not null default now()
// );

export const Route = createFileRoute("/api/newsletter")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = await request.json().catch(() => null)

				if (!body || typeof body !== "object") {
					return Response.json({ error: "Invalid request" }, { status: 400 })
				}

				const { email } = body as Record<string, unknown>

				if (typeof email !== "string" || !email.trim()) {
					return Response.json({ error: "Email requerido" }, { status: 422 })
				}

				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
					return Response.json({ error: "Email inválido" }, { status: 422 })
				}

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const { error } = await (supabaseAdmin as any)
					.from("newsletter_subscribers")
					.insert([{ email: email.trim() }])

				if (error) {
					// Unique violation — already subscribed
					if (error.code === "23505") {
						return Response.json({ ok: true })
					}
					console.error("newsletter_subscribers insert error:", error)
					return Response.json({ error: "Error al suscribirse" }, { status: 500 })
				}

				return Response.json({ ok: true })
			},
		},
	},
})
