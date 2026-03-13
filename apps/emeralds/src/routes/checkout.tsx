import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { CheckCircle, CreditCard, MessageCircle, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { z } from "zod"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo"
import { PAYMENT_ADVISOR_THRESHOLD } from "@/lib/constants"
import {
	createOrder,
	generateOrderNumber,
} from "@/lib/supabase-queries"
import { useCartStore } from "@/store/cartStore"

export const Route = createFileRoute("/checkout")({
	head: () =>
		buildMeta({
			title: "Solicitar pedido",
			description: "Completa tu información para enviar tu pedido.",
			path: "/checkout",
			noIndex: true,
			jsonLd: [
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Carrito", path: "/cart" },
					{ name: "Solicitar pedido", path: "/checkout" },
				]),
			],
		}),
	component: CheckoutPage,
})

type CheckoutFormValues = {
	nombre: string
	whatsapp: string
	email: string
	notas: string
}

function buildWhatsAppUrl(
	orderNumber: string,
	items: {
		product: {
			name: string
			carats: number
			stone_count: number
			price: number
			currency: string
		}
		quantity: number
	}[],
	total: number,
) {
	const lines = items
		.map((i) => {
			const isLot = i.product.stone_count > 1
			const desc = isLot
				? `${i.product.name} · ${i.product.carats}ct (${i.product.stone_count} piedras)`
				: `${i.product.name} · ${i.product.carats}ct`
			return `• ${desc} — $${(i.product.price * i.quantity).toLocaleString()} ${i.product.currency}`
		})
		.join("\n")

	const message = [
		"Hola, Natura Gems! 🌿",
		"",
		`Mi pedido es *#${orderNumber}*`,
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

function CheckoutPage() {
	const navigate = useNavigate()
	const { items, totalPrice, clearCart } = useCartStore()
	const [successOrderNumber, setSuccessOrderNumber] = useState<string | null>(null)
	const [waUrl, setWaUrl] = useState<string>("")
	const [paymentMethod, setPaymentMethod] = useState<"stripe" | "whatsapp">("stripe")

	const showPaymentChoice = totalPrice >= PAYMENT_ADVISOR_THRESHOLD

	// Guard: redirect to cart if empty (after hydration)
	if (items.length === 0 && !successOrderNumber) {
		navigate({ to: "/cart" })
		return null
	}

	const mutation = useMutation({
		mutationFn: async (formValue: CheckoutFormValues) => {
			const orderNumber = generateOrderNumber()
			const order = await createOrder({
				order_number: orderNumber,
				customer_name: formValue.nombre,
				customer_whatsapp: formValue.whatsapp,
				customer_email: formValue.email || undefined,
				notes: formValue.notas || undefined,
				subtotal: totalPrice,
				currency: "USD",
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
			})

			if (paymentMethod === "whatsapp") {
				const url = buildWhatsAppUrl(order.order_number, items, totalPrice)
				clearCart()
				window.open(url, "_blank", "noopener,noreferrer")
				return { type: "whatsapp" as const, order, url }
			}

			// Stripe path
			const res = await fetch("/api/stripe/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					orderId: order.id,
					orderNumber: order.order_number,
					items: items.map((i) => ({
						name: i.product.name,
						unit_amount: Math.round(i.product.price * 100),
						quantity: i.quantity,
					})),
					total: totalPrice,
					currency: "USD",
				}),
			})
			const { url } = await res.json()
			// Do NOT clearCart here — do it on success page
			window.location.href = url
			return { type: "stripe" as const, order, url }
		},
		onSuccess: (result) => {
			if (result.type === "whatsapp") {
				setWaUrl(result.url)
				setSuccessOrderNumber(result.order.order_number)
			}
			// stripe path: browser already redirecting
		},
	})

	const form = useForm({
		defaultValues: {
			nombre: "",
			whatsapp: "",
			email: "",
			notas: "",
		} as CheckoutFormValues,
		onSubmit: async ({ value }) => {
			await mutation.mutateAsync(value)
		},
	})

	// WhatsApp success state
	if (successOrderNumber) {
		return (
			<div className="min-h-screen bg-brand-surface flex items-center justify-center px-4">
				<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm text-center space-y-5">
					<div className="flex justify-center">
						<CheckCircle className="h-16 w-16 text-brand-primary-dark" />
					</div>
					<div>
						<h1 className="font-heading text-2xl text-brand-primary-dark">
							¡Pedido registrado!
						</h1>
						<p className="mt-2 text-brand-primary-dark/60 text-sm">
							Tu pedido fue guardado correctamente.
						</p>
					</div>
					<div className="rounded-xl bg-brand-primary-lighter/60 px-6 py-4">
						<p className="text-xs text-brand-primary-dark/50 uppercase tracking-wider">
							Número de pedido
						</p>
						<p className="font-heading text-2xl text-brand-primary-dark mt-1">
							{successOrderNumber}
						</p>
					</div>
					<p className="text-sm text-brand-primary-dark/60">
						Se abrió WhatsApp con los detalles de tu pedido. Si no se abrió
						automáticamente, usa el botón de abajo.
					</p>
					<a
						href={waUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3 text-sm font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85"
					>
						<MessageCircle className="h-4 w-4" />
						Abrir WhatsApp
					</a>
					<Link
						to="/tienda"
						className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-primary-dark px-6 py-3 text-sm font-medium text-brand-primary-dark transition-colors hover:bg-brand-primary-dark hover:text-brand-primary-lighter"
					>
						Seguir comprando
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-brand-surface">
			{/* Header */}
			<div className="border-b border-brand-primary-dark/10 bg-white py-8">
				<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
					<Link
						to="/cart"
						className="mb-4 inline-flex items-center gap-2 text-sm text-brand-primary-dark/70 hover:text-brand-primary-dark transition-colors"
					>
						← Volver al carrito
					</Link>
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

								{/* Nombre */}
								<form.Field
									name="nombre"
									validators={{
										onChange: ({ value }) =>
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

								{/* WhatsApp */}
								<form.Field
									name="whatsapp"
									validators={{
										onChange: ({ value }) =>
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

								{/* Email */}
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

								{/* Notas */}
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

							{/* Payment choice — only shown for high-value orders */}
							{showPaymentChoice && (
								<div className="rounded-2xl bg-white p-6 shadow-sm space-y-3">
									<h2 className="font-heading text-lg text-brand-primary-dark">
										¿Cómo deseas pagar?
									</h2>
									<button
										type="button"
										onClick={() => setPaymentMethod("stripe")}
										className={`flex w-full items-start gap-4 rounded-xl border-2 p-4 text-left transition-colors ${
											paymentMethod === "stripe"
												? "border-brand-primary-dark bg-brand-primary-lighter/40"
												: "border-brand-primary-dark/15 hover:border-brand-primary-dark/30"
										}`}
									>
										<CreditCard className="h-5 w-5 text-brand-primary-dark mt-0.5 shrink-0" />
										<div>
											<p className="font-medium text-brand-primary-dark text-sm">
												Pagar en línea
											</p>
											<p className="text-xs text-brand-primary-dark/55 mt-0.5">
												Tarjeta de crédito / débito — seguro y rápido
											</p>
										</div>
									</button>
									<button
										type="button"
										onClick={() => setPaymentMethod("whatsapp")}
										className={`flex w-full items-start gap-4 rounded-xl border-2 p-4 text-left transition-colors ${
											paymentMethod === "whatsapp"
												? "border-brand-primary-dark bg-brand-primary-lighter/40"
												: "border-brand-primary-dark/15 hover:border-brand-primary-dark/30"
										}`}
									>
										<MessageCircle className="h-5 w-5 text-brand-primary-dark mt-0.5 shrink-0" />
										<div>
											<p className="font-medium text-brand-primary-dark text-sm">
												Pagar con asesor (WhatsApp)
											</p>
											<p className="text-xs text-brand-primary-dark/55 mt-0.5">
												Un asesor te guiará personalmente
											</p>
										</div>
									</button>
								</div>
							)}

							{mutation.isError && (
								<p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
									Ocurrió un error al guardar el pedido. Por favor intenta de
									nuevo.
								</p>
							)}

							<button
								type="submit"
								disabled={mutation.isPending}
								className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3.5 font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85 disabled:opacity-60 disabled:cursor-not-allowed"
							>
								{paymentMethod === "stripe" || !showPaymentChoice ? (
									<CreditCard className="h-5 w-5" />
								) : (
									<MessageCircle className="h-5 w-5" />
								)}
								{mutation.isPending
									? "Procesando..."
									: paymentMethod === "whatsapp" && showPaymentChoice
										? "Confirmar y contactar asesor"
										: "Pagar en línea"}
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

							<div className="flex justify-between">
								<span className="font-medium text-brand-primary-dark">
									Total
								</span>
								<span className="font-heading text-xl text-brand-primary-dark">
									${totalPrice.toLocaleString()}{" "}
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
									{showPaymentChoice
										? "Elige tu método de pago preferido. Para pedidos de alto valor, un asesor puede acompañarte personalmente."
										: "Al confirmar, te redirigiremos a nuestra pasarela de pago segura."}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
