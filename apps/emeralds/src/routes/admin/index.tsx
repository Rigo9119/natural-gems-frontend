/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import {
	ArrowRight,
	Gem,
	Package,
	ShoppingBag,
	TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	ordersQueryOptions,
	retailEmeraldsQueryOptions,
	wholesaleEmeraldsQueryOptions,
} from "@/lib/supabase-queries"

export const Route = createFileRoute("/admin/")({
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.ensureQueryData(retailEmeraldsQueryOptions()),
			context.queryClient.ensureQueryData(wholesaleEmeraldsQueryOptions()),
			context.queryClient.ensureQueryData(ordersQueryOptions()),
		])
	},
	component: AdminDashboard,
})

const statusStyles: Record<string, string> = {
	pending: "bg-brand-secondary-golden/20 text-brand-secondary-terra",
	in_progress: "bg-blue-50 text-blue-700",
	confirmed: "bg-brand-primary-dark/10 text-brand-primary-dark",
	shipped: "bg-blue-50 text-blue-700",
	delivered: "bg-green-50 text-green-700",
	cancelled: "bg-red-50 text-red-600",
}

const statusLabels: Record<string, string> = {
	pending: "Pendiente",
	in_progress: "En proceso",
	confirmed: "Confirmada",
	shipped: "Enviada",
	delivered: "Entregada",
	cancelled: "Cancelada",
}

function AdminDashboard() {
	const { data: retail } = useSuspenseQuery(retailEmeraldsQueryOptions())
	const { data: wholesale } = useSuspenseQuery(wholesaleEmeraldsQueryOptions())
	const { data: orders } = useSuspenseQuery(ordersQueryOptions())

	const totalRevenue = useMemo(
		() => retail.reduce((sum, p) => sum + p.price, 0),
		[retail],
	)
	const availableEmeralds = retail.length
	const availableLots = wholesale.length
	const pendingOrders = useMemo(
		() => orders.filter((o) => o.status === "pending").length,
		[orders],
	)
	const recentOrders = useMemo(
		() => [...orders].slice(0, 5),
		[orders],
	)

	const statCards = [
		{
			title: "Esmeraldas Disponibles",
			value: availableEmeralds,
			suffix: "piedras",
			icon: Gem,
			href: "/admin/emeralds",
			color: "text-brand-primary-dark",
			bg: "bg-brand-primary-dark/5",
		},
		{
			title: "Lotes Mayoristas",
			value: availableLots,
			suffix: "lotes",
			icon: Package,
			href: "/admin/wholesale",
			color: "text-brand-secondary-terra",
			bg: "bg-brand-secondary-terra/10",
		},
		{
			title: "Valor en Inventario",
			value: `$${totalRevenue.toLocaleString()}`,
			suffix: "USD",
			icon: TrendingUp,
			href: "/admin/emeralds",
			color: "text-brand-secondary-golden",
			bg: "bg-brand-secondary-golden/10",
		},
		{
			title: "Órdenes Pendientes",
			value: pendingOrders,
			suffix: "pendientes",
			icon: ShoppingBag,
			href: "/admin/orders",
			color: "text-brand-primary-dark",
			bg: "bg-brand-primary-dark/5",
		},
	]

	return (
		<div className="space-y-8">
			{/* ── Stat cards ── */}
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
				{statCards.map((card) => {
					const Icon = card.icon
					return (
						<Card
							key={card.title}
							className="border-gray-200 shadow-sm transition-shadow hover:shadow-md"
						>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="font-body text-sm font-medium text-gray-500">
									{card.title}
								</CardTitle>
								<span className={`rounded-lg p-2 ${card.bg}`}>
									<Icon className={`h-4 w-4 ${card.color}`} />
								</span>
							</CardHeader>
							<CardContent>
								<p className={`font-heading text-3xl ${card.color}`}>
									{card.value}
								</p>
								<p className="mt-1 font-body text-xs text-gray-400">
									{card.suffix}
								</p>
								<Link
									to={card.href as any}
									className="mt-3 inline-flex items-center gap-1 font-body text-xs text-brand-primary-dark/60 transition-colors hover:text-brand-primary-dark"
								>
									Ver detalle
									<ArrowRight className="h-3 w-3" />
								</Link>
							</CardContent>
						</Card>
					)
				})}
			</div>

			{/* ── Recent orders ── */}
			<div>
				<div className="mb-4 flex items-center justify-between">
					<div>
						<p className="font-body text-xs tracking-[0.2em] uppercase text-brand-secondary-terra">
							Actividad reciente
						</p>
						<h2 className="font-heading text-2xl text-brand-primary-dark">
							Últimas Órdenes
						</h2>
					</div>
					<Link
						to={"/admin/orders" as any}
						className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary-dark px-4 py-1.5 font-body text-sm text-brand-primary-dark transition-colors hover:bg-brand-primary-dark hover:text-brand-primary-lighter"
					>
						Ver todas
						<ArrowRight className="h-3.5 w-3.5" />
					</Link>
				</div>

				<Card className="border-gray-200 shadow-sm">
					<CardContent className="p-0">
						{recentOrders.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-16 text-center">
								<span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-dark/5">
									<ShoppingBag className="h-6 w-6 text-brand-primary-dark/30" />
								</span>
								<p className="font-body text-sm text-gray-400">
									No hay órdenes todavía
								</p>
								<p className="mt-1 font-body text-xs text-gray-300">
									Las órdenes aparecerán aquí cuando los clientes confirmen en
									/checkout
								</p>
							</div>
						) : (
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b border-gray-100 bg-gray-50">
										<th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-gray-400">
											Orden
										</th>
										<th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-gray-400">
											Cliente
										</th>
										<th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-gray-400">
											Items
										</th>
										<th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-gray-400">
											Total
										</th>
										<th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-gray-400">
											Estado
										</th>
										<th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-gray-400">
											Fecha
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-50">
									{recentOrders.map((order) => (
										<tr
											key={order.id}
											className="transition-colors hover:bg-gray-50"
										>
											<td className="px-6 py-4 font-body font-medium text-brand-primary-dark">
												{order.order_number}
											</td>
											<td className="px-6 py-4 text-gray-600">
												{order.customer_name}
											</td>
											<td className="px-6 py-4 text-gray-500">
												{order.order_items.length}
											</td>
											<td className="px-6 py-4 font-medium text-brand-primary-dark">
												${order.subtotal.toLocaleString()} {order.currency}
											</td>
											<td className="px-6 py-4">
												<span
													className={`inline-flex rounded-full px-2.5 py-0.5 font-body text-xs font-medium ${statusStyles[order.status] ?? "bg-gray-100 text-gray-600"}`}
												>
													{statusLabels[order.status] ?? order.status}
												</span>
											</td>
											<td className="px-6 py-4 text-gray-400">
												{new Date(order.created_at ?? "").toLocaleDateString("es-CO", {
													day: "2-digit",
													month: "short",
												})}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</CardContent>
				</Card>
			</div>

			{/* ── Quick links ── */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				{[
					{
						href: "/admin/emeralds",
						label: "Gestionar Esmeraldas",
						sub: `${availableEmeralds} piedras en inventario`,
						icon: Gem,
					},
					{
						href: "/admin/wholesale",
						label: "Gestionar Lotes",
						sub: `${availableLots} lotes disponibles`,
						icon: Package,
					},
					{
						href: "/admin/orders",
						label: "Ver Órdenes",
						sub: `${pendingOrders} pendiente${pendingOrders !== 1 ? "s" : ""}`,
						icon: ShoppingBag,
					},
				].map((item) => {
					const Icon = item.icon
					return (
						<Link
							key={item.href}
							to={item.href as any}
							className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-brand-primary-dark/20 hover:shadow-md"
						>
							<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary-dark/5 transition-colors group-hover:bg-brand-primary-dark/10">
								<Icon className="h-5 w-5 text-brand-primary-dark" />
							</span>
							<div className="min-w-0">
								<p className="font-body text-sm font-medium text-brand-primary-dark">
									{item.label}
								</p>
								<p className="font-body text-xs text-gray-400">{item.sub}</p>
							</div>
							<ArrowRight className="ml-auto h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-primary-dark/50" />
						</Link>
					)
				})}
			</div>
		</div>
	)
}
