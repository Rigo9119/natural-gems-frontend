import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Minus,
	Plus,
	ShoppingBag,
	Tag,
	Trash2,
	X,
} from "lucide-react";
import { useRef, useState } from "react";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";
import { useCartStore, selectTotalItems, selectTotalPrice, selectDiscountAmount, selectFinalPrice } from "@/store/cartStore";

export const Route = createFileRoute("/emeralds/cart")({
	head: () =>
		buildMeta({
			title: "Carrito de compra",
			description:
				"Revisa las esmeraldas colombianas que has seleccionado y consulta tu pedido por WhatsApp.",
			path: "/emeralds/cart",
			noIndex: true,
			jsonLd: [
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Esmeraldas", path: "/emeralds" },
					{ name: "Carrito", path: "/emeralds/cart" },
				]),
			],
		}),
	component: CartPage,
});

function CartPage() {
	const { items, removeFromCart, updateQuantity, clearCart, appliedPromo, applyPromo, removePromo } = useCartStore();
	const totalItems = useCartStore(selectTotalItems);
	const totalPrice = useCartStore(selectTotalPrice);
	const discountAmount = useCartStore(selectDiscountAmount);
	const finalPrice = useCartStore(selectFinalPrice);

	const [promoCode, setPromoCode] = useState("");
	const [promoError, setPromoError] = useState<string | null>(null);
	const [promoLoading, setPromoLoading] = useState(false);
	const promoInputRef = useRef<HTMLInputElement>(null);

	async function handleApplyPromo() {
		const code = promoCode.trim();
		if (!code) return;
		setPromoError(null);
		setPromoLoading(true);
		try {
			const res = await fetch("/api/promo/validate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ code, subtotal: totalPrice }),
			});
			const data = await res.json();
			if (data.valid) {
				applyPromo(data);
				setPromoCode("");
			} else {
				setPromoError(data.error ?? "Código inválido");
			}
		} catch {
			setPromoError("No se pudo validar el código");
		} finally {
			setPromoLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-brand-surface">
			<AppBreadcrumb
				items={[
					{ label: "Inicio", href: "/" },
					{ label: "Tienda", href: "/emeralds/shop" },
					{ label: "Carrito" },
				]}
			/>
			{/* ── Header ── */}
			<div className="border-b border-brand-primary-dark/10 bg-white py-8">
				<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
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
							to="/emeralds/shop"
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
											to="/emeralds/shop/$slug"
											params={{ slug: product.slug }}
											className="shrink-0"
										>
											<div className="h-20 w-20 overflow-hidden rounded-xl bg-brand-primary-lighter sm:h-24 sm:w-24">
												<OptimizedImage
													src={product.image_url ?? ""}
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
												to="/emeralds/shop/$slug"
												params={{ slug: product.slug }}
												className="font-heading text-sm leading-snug text-brand-primary-dark hover:underline underline-offset-2 truncate"
											>
												{product.name}
											</Link>
											<p className="text-xs text-brand-primary-dark/50">
												{product.carats} ct · {product.clarity} ·{" "}
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

								{/* Promo code */}
								{appliedPromo ? (
									<div className="flex items-center justify-between rounded-xl bg-brand-primary-dark/5 px-4 py-3">
										<div className="flex items-center gap-2 text-sm">
											<Tag className="h-4 w-4 text-brand-primary-dark/60" />
											<span className="font-medium text-brand-primary-dark">
												{appliedPromo.code}
											</span>
											<span className="text-brand-primary-dark/50">
												{appliedPromo.type === "percentage"
													? `−${appliedPromo.value}%`
													: `−$${appliedPromo.value}`}
											</span>
										</div>
										<button
											type="button"
											onClick={removePromo}
											aria-label="Eliminar código"
											className="text-brand-primary-dark/40 hover:text-red-500 transition-colors"
										>
											<X className="h-4 w-4" />
										</button>
									</div>
								) : (
									<div className="space-y-2">
										<div className="flex gap-2">
											<input
												ref={promoInputRef}
												type="text"
												placeholder="Código de descuento"
												value={promoCode}
												onChange={(e) => {
													setPromoCode(e.target.value.toUpperCase());
													setPromoError(null);
												}}
												onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
												className="flex-1 rounded-xl border border-brand-primary-dark/20 bg-transparent px-3 py-2 text-sm text-brand-primary-dark placeholder:text-brand-primary-dark/30 focus:border-brand-primary-dark/50 focus:outline-none"
											/>
											<button
												type="button"
												onClick={handleApplyPromo}
												disabled={promoLoading || !promoCode.trim()}
												className="rounded-xl bg-brand-primary-dark px-4 py-2 text-sm font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85 disabled:opacity-50"
											>
												{promoLoading ? "…" : "Aplicar"}
											</button>
										</div>
										{promoError && (
											<p className="text-xs text-red-500">{promoError}</p>
										)}
									</div>
								)}

								{/* Subtotal + discount rows */}
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

								<Link
									to="/emeralds/checkout"
									className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3.5 font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85"
								>
									Solicitar pedido
								</Link>

								<p className="text-center text-xs text-brand-primary-dark/40">
									Los precios se confirman con nuestro equipo por WhatsApp.
								</p>

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
