import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { CheckCircle } from "lucide-react"
import { useEffect } from "react"
import { z } from "zod"
import { buildMeta } from "@/lib/seo"
import { supabase } from "@/lib/supabase"
import { useCartStore } from "@/store/cartStore"
import type { OrderWithItems } from "@/lib/supabase-queries"

export const Route = createFileRoute("/emeralds/checkout/success")({
	validateSearch: z.object({ order_id: z.string() }),
	head: () =>
		buildMeta({
			title: "Pago completado",
			description: "Tu pago fue procesado exitosamente.",
			path: "/emeralds/checkout/success",
			noIndex: true,
		}),
	component: CheckoutSuccessPage,
})

function CheckoutSuccessPage() {
	const { order_id } = Route.useSearch()
	const clearCart = useCartStore((s) => s.clearCart)

	useEffect(() => {
		clearCart()
	}, [clearCart])

	const { data: order, isLoading } = useQuery({
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

	return (
		<div className="min-h-screen bg-brand-surface flex items-center justify-center px-4 py-16">
			<div className="w-full max-w-md space-y-6">
				<div className="rounded-2xl bg-white p-8 shadow-sm text-center space-y-5">
					<div className="flex justify-center">
						<CheckCircle className="h-16 w-16 text-brand-primary-dark" />
					</div>
					<div>
						<h1 className="font-heading text-2xl text-brand-primary-dark">
							¡Pago completado!
						</h1>
						<p className="mt-2 text-brand-primary-dark/60 text-sm">
							Tu pago fue procesado exitosamente. Nos pondremos en contacto
							contigo a la brevedad para coordinar el envío.
						</p>
					</div>

					{isLoading && (
						<p className="text-sm text-brand-primary-dark/40">
							Cargando detalles del pedido…
						</p>
					)}

					{order && (
						<>
							<div className="rounded-xl bg-brand-primary-lighter/60 px-6 py-4">
								<p className="text-xs text-brand-primary-dark/50 uppercase tracking-wider">
									Número de pedido
								</p>
								<p className="font-heading text-2xl text-brand-primary-dark mt-1">
									{order.order_number}
								</p>
							</div>

							<ul className="space-y-2 text-left">
								{order.order_items.map((item) => (
									<li key={item.id} className="flex justify-between text-sm">
										<span className="text-brand-primary-dark/70 truncate pr-4 max-w-[65%]">
											{item.product_name}
										</span>
										<span className="shrink-0 font-medium text-brand-primary-dark">
											${item.unit_price.toLocaleString()}
										</span>
									</li>
								))}
							</ul>

							<hr className="border-brand-primary-dark/10" />

							<div className="flex justify-between font-medium text-brand-primary-dark">
								<span>Total pagado</span>
								<span className="font-heading text-xl">
									${order.subtotal.toLocaleString()}{" "}
									<span className="text-xs font-body font-normal text-brand-primary-dark/40">
										USD
									</span>
								</span>
							</div>
						</>
					)}

					<Link
						to="/emeralds/shop"
						className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3 text-sm font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85"
					>
						Seguir comprando
					</Link>
				</div>
			</div>
		</div>
	)
}
