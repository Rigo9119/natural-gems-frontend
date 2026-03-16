import { createFileRoute, Link } from "@tanstack/react-router"
import { XCircle, MessageCircle, RefreshCcw } from "lucide-react"
import { z } from "zod"
import { buildMeta } from "@/lib/seo"
import { useCartStore, selectTotalPrice } from "@/store/cartStore"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import type { OrderWithItems } from "@/lib/supabase-queries"

export const Route = createFileRoute("/emeralds/payment-cancel")({
	validateSearch: z.object({ order_id: z.string() }),
	head: () =>
		buildMeta({
			title: "Pago cancelado",
			description: "El pago fue cancelado.",
			path: "/emeralds/payment-cancel",
			noIndex: true,
		}),
	component: CheckoutCancelPage,
})

function buildWhatsAppUrl(
	orderNumber: string,
	items: { product_name: string; unit_price: number }[],
	total: number,
) {
	const lines = items
		.map((i) => `• ${i.product_name} — $${i.unit_price.toLocaleString()} USD`)
		.join("\n")

	const message = [
		"Hola, Natura Gems! 🌿",
		"",
		`Quisiera pagar con asesor mi pedido *#${orderNumber}*`,
		"",
		"📋 Detalle:",
		lines,
		"",
		`💰 Total: $${total.toLocaleString()} USD`,
		"",
		"Quedo a la espera de su confirmación. ✅",
	].join("\n")

	const number = import.meta.env.VITE_WHATSAPP_NUMBER ?? "573001234567"
	return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

function CheckoutCancelPage() {
	const { order_id } = Route.useSearch()
	const cartItems = useCartStore((s) => s.items)
	const totalPrice = useCartStore(selectTotalPrice)

	const { data: order } = useQuery({
		queryKey: ["order", order_id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("orders")
				.select("*, order_items(*)")
				.eq("id", order_id)
				.single()
			if (error) throw error
			return data as OrderWithItems
		},
	})

	const waUrl = order
		? buildWhatsAppUrl(order.order_number, order.order_items, order.subtotal)
		: (() => {
				const lines = cartItems
					.map((i) => `• ${i.product.name} — $${i.product.price.toLocaleString()} USD`)
					.join("\n")
				const message = [
					"Hola, Natura Gems! 🌿",
					"",
					"Quiero pagar con asesor mi pedido.",
					"",
					"📋 Detalle:",
					lines,
					"",
					`💰 Total: $${totalPrice.toLocaleString()} USD`,
				].join("\n")
				const number = import.meta.env.VITE_WHATSAPP_NUMBER ?? "573001234567"
				return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
			})()

	return (
		<div className="min-h-screen bg-brand-surface flex items-center justify-center px-4 py-16">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm text-center space-y-5">
				<div className="flex justify-center">
					<XCircle className="h-16 w-16 text-brand-secondary-terra" />
				</div>
				<div>
					<h1 className="font-heading text-2xl text-brand-primary-dark">
						Pago cancelado
					</h1>
					<p className="mt-2 text-brand-primary-dark/60 text-sm">
						No se realizó ningún cargo. Tu carrito está intacto — puedes
						intentarlo de nuevo o continuar con un asesor.
					</p>
				</div>

				<Link
					to="/emeralds/checkout"
					className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3 text-sm font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85"
				>
					<RefreshCcw className="h-4 w-4" />
					Intentar de nuevo
				</Link>

				<a
					href={waUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-primary-dark px-6 py-3 text-sm font-medium text-brand-primary-dark transition-colors hover:bg-brand-primary-dark hover:text-brand-primary-lighter"
				>
					<MessageCircle className="h-4 w-4" />
					Pagar con asesor (WhatsApp)
				</a>
			</div>
		</div>
	)
}
