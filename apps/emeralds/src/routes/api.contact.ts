import { createFileRoute } from "@tanstack/react-router"
import { supabaseAdmin } from "@/lib/supabase-server"

// Requires a Supabase table:
// create table contact_submissions (
//   id uuid primary key default gen_random_uuid(),
//   name text not null,
//   email text not null,
//   subject text not null,
//   message text not null,
//   created_at timestamptz not null default now()
// );

export const Route = createFileRoute("/api/contact")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = await request.json().catch(() => null)

				if (!body || typeof body !== "object") {
					return Response.json({ error: "Invalid request" }, { status: 400 })
				}

				const { name, email, subject, message } = body as Record<string, unknown>

				if (
					typeof name !== "string" || !name.trim() ||
					typeof email !== "string" || !email.trim() ||
					typeof subject !== "string" || !subject.trim() ||
					typeof message !== "string" || !message.trim()
				) {
					return Response.json({ error: "Todos los campos son requeridos" }, { status: 422 })
				}

				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
					return Response.json({ error: "Email inválido" }, { status: 422 })
				}

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const { error } = await (supabaseAdmin as any)
					.from("contact_submissions")
					.insert([{ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() }])

				if (error) {
					console.error("contact_submissions insert error:", error)
					return Response.json({ error: "Error al enviar el mensaje" }, { status: 500 })
				}

				return Response.json({ ok: true })
			},
		},
	},
})
