import { createFileRoute } from "@tanstack/react-router"
import { supabaseAdmin } from "@/lib/supabase-server"

export const Route = createFileRoute("/api/promo/validate")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = await request.json().catch(() => null)
				if (!body || typeof body !== "object") {
					return Response.json({ valid: false, error: "Solicitud inválida" }, { status: 400 })
				}

				const { code, subtotal } = body as Record<string, unknown>

				if (!code || typeof code !== "string" || typeof subtotal !== "number") {
					return Response.json({ valid: false, error: "Solicitud inválida" }, { status: 400 })
				}

				const { data: promo, error } = await supabaseAdmin
					.from("promo_codes")
					.select("id, code, type, value, valid_until, active")
					.ilike("code", code.trim())
					.maybeSingle()

				if (error || !promo) {
					return Response.json({ valid: false, error: "Código no encontrado" })
				}

				if (!promo.active) {
					return Response.json({ valid: false, error: "Este código no está activo" })
				}

				if (promo.valid_until && new Date(promo.valid_until) < new Date()) {
					return Response.json({ valid: false, error: "Este código ha expirado" })
				}

				const discountAmount =
					promo.type === "percentage"
						? Math.round(subtotal * (promo.value / 100) * 100) / 100
						: Math.min(promo.value, subtotal)

				return Response.json({
					valid: true,
					id: promo.id,
					code: promo.code,
					type: promo.type,
					value: promo.value,
					discountAmount,
				})
			},
		},
	},
})
