import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { CreditCard, ShoppingBag } from "lucide-react"
import { useEffect } from "react"
import { z } from "zod"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo"
import { useCartStore, selectTotalPrice, selectFinalPrice, selectDiscountAmount } from "@/store/cartStore"

export const Route = createFileRoute("/emeralds/checkout")({
	head: () =>
		buildMeta({
			title: "Solicitar pedido",
			description: "Completa tu información para enviar tu pedido.",
			path: "/emeralds/checkout",
			noIndex: true,
			jsonLd: [
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Esmeraldas", path: "/emeralds" },
					{ name: "Carrito", path: "/emeralds/cart" },
					{ name: "Solicitar pedido", path: "/emeralds/checkout" },
				]),
			],
		}),
	component: CheckoutPage,
})

type CheckoutFormValues = {
	nombre: string
	whatsapp: string
	email: string
	shipping_address: string
	shipping_country: string
	notas: string
}

function CheckoutPage() {
	const navigate = useNavigate()
	const { items, clearCart, appliedPromo } = useCartStore()
	const totalPrice = useCartStore(selectTotalPrice)
	const finalPrice = useCartStore(selectFinalPrice)
	const discountAmount = useCartStore(selectDiscountAmount)

	useEffect(() => {
		if (items.length === 0) {
			navigate({ to: "/emeralds/cart" })
		}
	}, [items.length, navigate])

	const mutation = useMutation({
		mutationFn: async (formValue: CheckoutFormValues) => {
			// Create order server-side — also reserves the emeralds atomically
			const orderRes = await fetch("/api/order", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					customer_name: formValue.nombre,
					customer_whatsapp: formValue.whatsapp,
					customer_email: formValue.email || undefined,
					shipping_address: formValue.shipping_address,
					shipping_country: formValue.shipping_country,
					notes: formValue.notas || undefined,
					subtotal: totalPrice,
					currency: "USD",
					promo_code_id: appliedPromo?.id ?? undefined,
					discount_amount: discountAmount,
					discount_type: appliedPromo?.type ?? undefined,
					items: items.map((i) => ({
						emerald_id: i.product.id,
						product_name: i.product.name,
						product_slug: i.product.slug,
						stone_count: i.product.stone_count * i.quantity,
						unit_price: i.product.price,
						carats: i.product.carats,
						clarity: i.product.clarity,
						origin: i.product.origin,
						currency: i.product.currency,
					})),
				}),
			})
			if (!orderRes.ok) {
				const err = await orderRes.json().catch(() => ({}))
				throw new Error(err.error ?? "Failed to create order")
			}
			const { orderId } = await orderRes.json()

			const stripeRes = await fetch("/api/stripe/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ orderId }),
			})
			if (!stripeRes.ok) throw new Error("Failed to create payment session")
			const { url } = await stripeRes.json()
			clearCart()
			window.location.href = url
		},
	})

	const form = useForm({
		defaultValues: {
			nombre: "",
			whatsapp: "",
			email: "",
			shipping_address: "",
			shipping_country: "",
			notas: "",
		} as CheckoutFormValues,
		onSubmit: async ({ value }) => {
			await mutation.mutateAsync(value)
		},
	})

	if (items.length === 0) return null

	return (
		<div className="min-h-screen bg-brand-surface">
			<AppBreadcrumb
				items={[
					{ label: "Inicio", href: "/" },
					{ label: "Tienda", href: "/emeralds/shop" },
					{ label: "Carrito", href: "/emeralds/cart" },
					{ label: "Solicitar pedido" },
				]}
			/>
			<div className="border-b border-brand-primary-dark/10 bg-white py-8">
				<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
					<h1 className="font-heading text-3xl text-brand-primary-dark md:text-4xl">
						Solicitar pedido
					</h1>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
					{/* Left — form */}
					<div className="lg:col-span-2">
						<form
							onSubmit={(e) => {
								e.preventDefault()
								e.stopPropagation()
								form.handleSubmit()
							}}
							className="space-y-6"
						>
							<div className="rounded-2xl bg-white p-6 shadow-sm space-y-5">
								<h2 className="font-heading text-lg text-brand-primary-dark">
									Tus datos de contacto
								</h2>

								<form.Field
									name="nombre"
									validators={{
										onChange: ({ value }) =>
											!value ? "El nombre es requerido" : undefined,
										onSubmit: ({ value }) =>
											!value ? "El nombre es requerido" : undefined,
									}}
								>
									{(field) => (
										<div className="space-y-1.5">
											<Label htmlFor={field.name}>Nombre completo *</Label>
											<Input
												id={field.name}
												placeholder="Ej. María García"
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
									name="whatsapp"
									validators={{
										onChange: ({ value }) =>
											!value || value.length < 7
												? "Ingresa un número de WhatsApp válido"
												: undefined,
										onSubmit: ({ value }) =>
											!value || value.length < 7
												? "Ingresa un número de WhatsApp válido"
												: undefined,
									}}
								>
									{(field) => (
										<div className="space-y-1.5">
											<Label htmlFor={field.name}>
												WhatsApp *{" "}
												<span className="text-brand-primary-dark/40 font-normal">
													(con código de país, ej. +57...)
												</span>
											</Label>
											<Input
												id={field.name}
												type="tel"
												placeholder="+57 300 123 4567"
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
									name="email"
									validators={{
										onChange: ({ value }) => {
											if (!value) return undefined
											const result = z.string().email().safeParse(value)
											return result.success ? undefined : "Email inválido"
										},
									}}
								>
									{(field) => (
										<div className="space-y-1.5">
											<Label htmlFor={field.name}>
												Email{" "}
												<span className="text-brand-primary-dark/40 font-normal">
													(opcional)
												</span>
											</Label>
											<Input
												id={field.name}
												type="email"
												placeholder="tu@email.com"
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
									name="shipping_address"
									validators={{
										onChange: ({ value }) =>
											!value ? "La dirección de envío es requerida" : undefined,
										onSubmit: ({ value }) =>
											!value ? "La dirección de envío es requerida" : undefined,
									}}
								>
									{(field) => (
										<div className="space-y-1.5">
											<Label htmlFor={field.name}>Dirección de envío *</Label>
											<Input
												id={field.name}
												placeholder="Calle 123 #45-67, Barrio, Ciudad"
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
									name="shipping_country"
									validators={{
										onChange: ({ value }) =>
											!value ? "El país de destino es requerido" : undefined,
										onSubmit: ({ value }) =>
											!value ? "El país de destino es requerido" : undefined,
									}}
								>
									{(field) => (
										<div className="space-y-1.5">
											<Label htmlFor={field.name}>País de destino *</Label>
											<Input
												id={field.name}
												placeholder="Colombia"
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

								<form.Field name="notas">
									{(field) => (
										<div className="space-y-1.5">
											<Label htmlFor={field.name}>
												Notas adicionales{" "}
												<span className="text-brand-primary-dark/40 font-normal">
													(opcional)
												</span>
											</Label>
											<Textarea
												id={field.name}
												placeholder="Instrucciones especiales, preguntas, etc."
												rows={3}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
										</div>
									)}
								</form.Field>
							</div>

							{mutation.isError && (
								<p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
									{(mutation.error as Error)?.message === "Este código ya fue usado con este correo"
										? "El código de descuento ya fue usado con este correo electrónico."
										: "Ocurrió un error al guardar el pedido. Por favor intenta de nuevo."}
								</p>
							)}

							<button
								type="submit"
								disabled={mutation.isPending}
								className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3.5 font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85 disabled:opacity-60 disabled:cursor-not-allowed"
							>
								<CreditCard className="h-5 w-5" />
								{mutation.isPending ? "Procesando..." : "Pagar en línea"}
							</button>
						</form>
					</div>

					{/* Right — order summary */}
					<div className="lg:col-span-1">
						<div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm space-y-5">
							<h2 className="font-heading text-lg text-brand-primary-dark">
								Resumen del pedido
							</h2>

							<ul className="space-y-2">
								{items.map(({ product, quantity }) => (
									<li
										key={product.id}
										className="flex justify-between text-sm"
									>
										<span className="text-brand-primary-dark/70 truncate pr-4 max-w-[65%]">
											{product.name}
											{quantity > 1 && (
												<span className="text-brand-primary-dark/40">
													{" "}×{quantity}
												</span>
											)}
										</span>
										<span className="shrink-0 font-medium text-brand-primary-dark">
											${(product.price * quantity).toLocaleString()}
										</span>
									</li>
								))}
							</ul>

							<hr className="border-brand-primary-dark/10" />

							{appliedPromo && (
								<div className="space-y-2">
									<div className="flex justify-between text-sm">
										<span className="text-brand-primary-dark/60">Subtotal</span>
										<span className="text-brand-primary-dark">${totalPrice.toLocaleString()}</span>
									</div>
									<div className="flex justify-between text-sm text-green-600">
										<span>Descuento ({appliedPromo.code})</span>
										<span>−${discountAmount.toLocaleString()}</span>
									</div>
									<hr className="border-brand-primary-dark/10" />
								</div>
							)}

							<div className="flex justify-between">
								<span className="font-medium text-brand-primary-dark">
									Total
								</span>
								<span className="font-heading text-xl text-brand-primary-dark">
									${finalPrice.toLocaleString()}{" "}
									<span className="text-xs font-body font-normal text-brand-primary-dark/40">
										USD
									</span>
								</span>
							</div>

							<div className="rounded-xl bg-brand-primary-lighter/50 p-4 text-xs text-brand-primary-dark/60 space-y-1.5">
								<p>✓ Certificado de autenticidad incluido</p>
								<p>✓ Envío asegurado a todo el mundo</p>
								<p>✓ 30 días de garantía de devolución</p>
							</div>

							<div className="flex items-start gap-3 rounded-xl bg-brand-secondary-golden/10 p-4">
								<ShoppingBag className="h-5 w-5 text-brand-secondary-terra mt-0.5 shrink-0" />
								<p className="text-xs text-brand-primary-dark/70">
									Al confirmar, te redirigiremos a nuestra pasarela de pago segura.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
