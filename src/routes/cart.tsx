import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	MessageCircle,
	Minus,
	Plus,
	ShoppingBag,
	Trash2,
} from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";
import { useCartStore } from "@/store/cartStore";

export const Route = createFileRoute("/cart")({
	head: () =>
		buildMeta({
			title: "Carrito de compra",
			description:
				"Revisa las esmeraldas colombianas que has seleccionado y consulta tu pedido por WhatsApp.",
			path: "/cart",
			noIndex: true,
			jsonLd: [
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Carrito", path: "/cart" },
				]),
			],
		}),
	component: CartPage,
});

function CartPage() {
	const {
		items,
		removeFromCart,
		updateQuantity,
		clearCart,
		totalItems,
		totalPrice,
	} = useCartStore();

	// Build WhatsApp message with all cart items
	const waMessage = encodeURIComponent(
		items.length > 0
			? `Hola, me gustaría consultar sobre las siguientes esmeraldas:\n\n${items
					.map(
						(i) =>
							`• ${i.product.name} (${i.product.carat} ct, ${i.product.clarity}) × ${i.quantity} — $${(i.product.price * i.quantity).toLocaleString()} USD`,
					)
					.join(
						"\n",
					)}\n\nTotal: $${totalPrice.toLocaleString()} USD\n\n¿Podría darme más información?`
			: "Hola, me gustaría recibir más información sobre sus esmeraldas.",
	);
	const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

	return (
		<div className="min-h-screen bg-brand-surface">
			{/* ── Header ── */}
			<div className="border-b border-brand-primary-dark/10 bg-white py-8">
				<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
					<Link
						to="/emeralds/tienda"
						className="mb-4 inline-flex items-center gap-2 text-sm text-brand-primary-dark/70 hover:text-brand-primary-dark transition-colors"
					>
						<ArrowLeft className="h-4 w-4" />
						Seguir comprando
					</Link>
					<div className="flex items-baseline gap-3">
						<h1 className="font-heading text-3xl text-brand-primary-dark md:text-4xl">
							Carrito de compra
						</h1>
						{totalItems > 0 && (
							<span className="text-sm text-brand-primary-dark/50">
								{totalItems} {totalItems === 1 ? "artículo" : "artículos"}
							</span>
						)}
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
				{items.length === 0 ? (
					/* ── Empty state ── */
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<ShoppingBag className="h-20 w-20 text-brand-primary-dark/15" />
						<h2 className="mt-6 font-heading text-2xl text-brand-primary-dark">
							Tu carrito está vacío
						</h2>
						<p className="mt-2 max-w-sm text-brand-primary-dark/60">
							Explora nuestra colección de esmeraldas colombianas y añade las
							que te interesen.
						</p>
						<Link
							to="/emeralds/tienda"
							className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-primary-dark px-8 py-3.5 font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85"
						>
							Ver esmeraldas
						</Link>
					</div>
				) : (
					/* ── Cart content ── */
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
						{/* Left — item list */}
						<div className="lg:col-span-2 space-y-4">
							{/* Clear cart */}
							<div className="flex justify-end">
								<button
									type="button"
									onClick={clearCart}
									className="flex items-center gap-1.5 text-xs text-brand-primary-dark/50 hover:text-red-600 transition-colors"
								>
									<Trash2 className="h-3.5 w-3.5" />
									Vaciar carrito
								</button>
							</div>

							{/* Items */}
							<ul className="divide-y divide-brand-primary-dark/10 rounded-2xl bg-white shadow-sm">
								{items.map(({ product, quantity }) => (
									<li key={product.id} className="flex gap-4 p-5 sm:gap-6">
										{/* Thumbnail */}
										<Link
											to="/emeralds/tienda/$slug"
											params={{ slug: product.slug }}
											className="shrink-0"
										>
											<div className="h-20 w-20 overflow-hidden rounded-xl bg-brand-primary-lighter sm:h-24 sm:w-24">
												<OptimizedImage
													src={product.image}
													alt={product.name}
													width={96}
													height={96}
													className="h-full w-full object-cover"
												/>
											</div>
										</Link>

										{/* Info */}
										<div className="flex flex-1 flex-col gap-1 min-w-0">
											<Link
												to="/emeralds/tienda/$slug"
												params={{ slug: product.slug }}
												className="font-heading text-sm leading-snug text-brand-primary-dark hover:underline underline-offset-2 truncate"
											>
												{product.name}
											</Link>
											<p className="text-xs text-brand-primary-dark/50">
												{product.carat} ct · {product.clarity} ·{" "}
												{product.origin}
											</p>
											<p className="mt-1 font-medium text-brand-primary-dark">
												${(product.price * quantity).toLocaleString()}{" "}
												<span className="text-xs font-normal text-brand-primary-dark/40">
													USD
												</span>
											</p>

											{/* Qty + remove row */}
											<div className="mt-auto flex items-center justify-between pt-2">
												{/* Quantity stepper */}
												<div className="flex items-center rounded-full border border-brand-primary-dark/20 overflow-hidden">
													<button
														type="button"
														aria-label="Disminuir cantidad"
														onClick={() =>
															updateQuantity(product.id, quantity - 1)
														}
														className="flex h-8 w-8 items-center justify-center text-brand-primary-dark/60 hover:bg-brand-primary-dark/5 transition-colors"
													>
														<Minus className="h-3.5 w-3.5" />
													</button>
													<span className="w-8 text-center text-sm font-medium text-brand-primary-dark">
														{quantity}
													</span>
													<button
														type="button"
														aria-label="Aumentar cantidad"
														onClick={() =>
															updateQuantity(product.id, quantity + 1)
														}
														className="flex h-8 w-8 items-center justify-center text-brand-primary-dark/60 hover:bg-brand-primary-dark/5 transition-colors"
													>
														<Plus className="h-3.5 w-3.5" />
													</button>
												</div>

												{/* Remove */}
												<button
													type="button"
													aria-label="Eliminar producto"
													onClick={() => removeFromCart(product.id)}
													className="flex items-center gap-1 text-xs text-brand-primary-dark/40 hover:text-red-600 transition-colors"
												>
													<Trash2 className="h-3.5 w-3.5" />
													Eliminar
												</button>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>

						{/* Right — order summary */}
						<div className="lg:col-span-1">
							<div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm space-y-5">
								<h2 className="font-heading text-lg text-brand-primary-dark">
									Resumen del pedido
								</h2>

								{/* Line items summary */}
								<ul className="space-y-2">
									{items.map(({ product, quantity }) => (
										<li
											key={product.id}
											className="flex justify-between text-sm"
										>
											<span className="text-brand-primary-dark/70 truncate pr-4 max-w-[65%]">
												{product.name}{" "}
												{quantity > 1 && (
													<span className="text-brand-primary-dark/40">
														×{quantity}
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

								{/* Total */}
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

								{/* WhatsApp CTA */}
								<a
									href={waUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3.5 font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85"
								>
									<MessageCircle className="h-5 w-5" />
									Finalizar por WhatsApp
								</a>

								<p className="text-center text-xs text-brand-primary-dark/40">
									Los precios se confirman con nuestro equipo por WhatsApp.
								</p>

								{/* Trust badges */}
								<div className="rounded-xl bg-brand-primary-lighter/50 p-4 text-xs text-brand-primary-dark/60 space-y-1.5">
									<p>✓ Certificado de autenticidad incluido</p>
									<p>✓ Envío asegurado a todo el mundo</p>
									<p>✓ 30 días de garantía de devolución</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
