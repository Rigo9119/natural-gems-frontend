import { createFileRoute } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Search } from "lucide-react"
import { buildMeta } from "@/lib/seo"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OrderStatusTimeline } from "@/components/OrderStatusTimeline"

export const Route = createFileRoute("/emeralds/my-order")({
	head: () =>
		buildMeta({
			title: "Consultar pedido",
			description: "Consulta el estado de tu pedido de Natura Gems.",
			path: "/emeralds/mi-pedido",
			noIndex: true,
		}),
	component: MiPedidoPage,
})

type LookupResult = {
	order_number: string
	status: string
	payment_status: string
	subtotal: number
	currency: string
	created_at: string
	order_items: {
		id: string
		product_name: string
		unit_price: number
		carats: number | null
		clarity: string | null
		origin: string | null
	}[]
}

function MiPedidoPage() {
	const [result, setResult] = useState<LookupResult | null>(null)

	const mutation = useMutation({
		mutationFn: async (values: { order_number: string; contact: string }) => {
			const res = await fetch("/api/order/lookup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			})
			if (res.status === 404) throw new Error("not_found")
			if (!res.ok) throw new Error("server_error")
			return res.json() as Promise<LookupResult>
		},
		onSuccess: (data) => setResult(data),
	})

	const form = useForm({
		defaultValues: { order_number: "", contact: "" },
		onSubmit: async ({ value }) => {
			await mutation.mutateAsync(value)
		},
	})

	function handleReset() {
		setResult(null)
		mutation.reset()
		form.reset()
	}

	return (
		<div className="min-h-screen bg-brand-surface flex items-start justify-center px-4 py-16">
			<div className="w-full max-w-md space-y-6">
				<div className="rounded-2xl bg-white p-8 shadow-sm space-y-6">
					{!result ? (
						<>
							<div className="text-center space-y-1">
								<h1 className="font-heading text-2xl text-brand-primary-dark">
									Consultar mi pedido
								</h1>
								<p className="text-sm text-brand-primary-dark/55">
									Ingresa tu número de pedido y el email o WhatsApp que usaste al hacer la compra.
								</p>
							</div>

							<form
								onSubmit={(e) => {
									e.preventDefault()
									e.stopPropagation()
									form.handleSubmit()
								}}
								className="space-y-4"
							>
								<form.Field
									name="order_number"
									validators={{
										onSubmit: ({ value }) =>
											!value.trim() ? "Ingresa el número de pedido" : undefined,
									}}
								>
									{(field) => (
										<div className="space-y-1.5">
											<Label htmlFor={field.name}>Número de pedido</Label>
											<Input
												id={field.name}
												placeholder="NG-20260316-1234"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
											/>
											{field.state.meta.errors.length > 0 && (
												<p className="text-xs text-red-600">
													{field.state.meta.errors[0]}
												</p>
											)}
										</div>
									)}
								</form.Field>

								<form.Field
									name="contact"
									validators={{
										onSubmit: ({ value }) =>
											!value.trim() ? "Ingresa tu email o WhatsApp" : undefined,
									}}
								>
									{(field) => (
										<div className="space-y-1.5">
											<Label htmlFor={field.name}>Email o WhatsApp</Label>
											<Input
												id={field.name}
												placeholder="tu@email.com o +57..."
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
											/>
											{field.state.meta.errors.length > 0 && (
												<p className="text-xs text-red-600">
													{field.state.meta.errors[0]}
												</p>
											)}
										</div>
									)}
								</form.Field>

								{mutation.isError && (
									<p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
										{mutation.error?.message === "not_found"
											? "No encontramos un pedido con esos datos."
											: "Ocurrió un error. Por favor intenta de nuevo."}
									</p>
								)}

								<button
									type="submit"
									disabled={mutation.isPending}
									className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3 text-sm font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85 disabled:opacity-60 disabled:cursor-not-allowed"
								>
									<Search className="h-4 w-4" />
									{mutation.isPending ? "Consultando…" : "Consultar pedido"}
								</button>
							</form>
						</>
					) : (
						<>
							<div className="text-center space-y-1">
								<h1 className="font-heading text-2xl text-brand-primary-dark">
									Estado de tu pedido
								</h1>
							</div>

							<div className="rounded-xl bg-brand-primary-lighter/60 px-6 py-4 text-center">
								<p className="text-xs text-brand-primary-dark/50 uppercase tracking-wider">
									Número de pedido
								</p>
								<p className="font-heading text-2xl text-brand-primary-dark mt-1">
									{result.order_number}
								</p>
								<p className="text-xs text-brand-primary-dark/40 mt-1">
									{new Date(result.created_at).toLocaleDateString("es-CO", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>
							</div>

							<OrderStatusTimeline status={result.status} />

							<ul className="space-y-2">
								{result.order_items.map((item) => (
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
									${result.subtotal.toLocaleString()}{" "}
									<span className="text-xs font-body font-normal text-brand-primary-dark/40">
										{result.currency}
									</span>
								</span>
							</div>

							<button
								type="button"
								onClick={handleReset}
								className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-primary-dark px-6 py-3 text-sm font-medium text-brand-primary-dark transition-colors hover:bg-brand-primary-dark hover:text-brand-primary-lighter"
							>
								Consultar otro pedido
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
