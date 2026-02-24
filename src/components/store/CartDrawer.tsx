import { Link } from "@tanstack/react-router";
import { Gem, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useCartStore } from "@/store/cartStore";

interface CartDrawerProps {
	open: boolean;
	onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
	const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
		useCartStore();

	const totalItems = useCartStore((s) => s.totalItems);

	const buildWhatsAppMessage = () => {
		const lines = items.map(
			(i) =>
				`• ${i.product.name} (${i.product.carat} ct, ${i.product.clarity}) × ${i.quantity} — $${(i.product.price * i.quantity).toLocaleString()} USD`,
		);
		const msg = [
			"Hola, me interesa realizar el siguiente pedido:",
			"",
			...lines,
			"",
			`Total estimado: $${totalPrice.toLocaleString()} USD`,
			"",
			"¿Me pueden confirmar disponibilidad y condiciones de envío?",
		].join("\n");
		return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
	};

	return (
		<Sheet open={open} onOpenChange={(v) => !v && onClose()}>
			<SheetContent
				side="right"
				className="flex w-full flex-col p-0 sm:max-w-md bg-white"
			>
				{/* Header */}
				<SheetHeader className="flex flex-row items-center justify-between border-b border-brand-primary-dark/10 px-5 py-4">
					<SheetTitle className="flex items-center gap-2 font-heading text-xl text-brand-primary-dark">
						<ShoppingCart className="h-5 w-5" aria-hidden="true" />
						Tu Carrito
						{totalItems > 0 && (
							<span className="ml-1 rounded-full bg-brand-primary-dark px-2 py-0.5 text-xs font-medium text-brand-primary-lighter">
								{totalItems}
							</span>
						)}
					</SheetTitle>
					<button
						type="button"
						onClick={onClose}
						aria-label="Cerrar carrito"
						className="rounded-full p-1.5 text-brand-primary-dark/50 transition-colors hover:bg-brand-primary-dark/5 hover:text-brand-primary-dark"
					>
						<X className="h-5 w-5" aria-hidden="true" />
					</button>
				</SheetHeader>

				{/* Empty state */}
				{items.length === 0 ? (
					<div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
						<Gem
							className="h-16 w-16 text-brand-primary-dark/15"
							aria-hidden="true"
						/>
						<p className="font-heading text-lg text-brand-primary-dark">
							Tu carrito está vacío
						</p>
						<p className="text-sm text-brand-primary-dark/60">
							Explora nuestra colección de esmeraldas colombianas
						</p>
						<Link
							to="/emeralds/tienda"
							onClick={onClose}
							className="mt-2 rounded-full bg-brand-primary-dark px-6 py-2.5 text-sm font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85"
						>
							Ver tienda
						</Link>
					</div>
				) : (
					<>
						{/* Item list */}
						<ul className="flex-1 divide-y divide-brand-primary-dark/8 overflow-y-auto">
							{items.map(({ product, quantity }) => (
								<li key={product.id} className="flex gap-3 px-5 py-4">
									{/* Thumbnail */}
									<div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-brand-primary-lighter">
										<OptimizedImage
											src={product.image}
											alt={product.name}
											width={64}
											height={64}
											className="h-full w-full object-cover"
										/>
									</div>

									{/* Info */}
									<div className="flex flex-1 flex-col gap-1 min-w-0">
										<p className="font-medium text-sm text-brand-primary-dark leading-snug line-clamp-2">
											{product.name}
										</p>
										<p className="text-xs text-brand-primary-dark/60">
											{product.carat} ct · {product.clarity} · {product.origin}
										</p>
										<p className="text-sm font-semibold text-brand-primary-dark">
											${(product.price * quantity).toLocaleString()} USD
										</p>
									</div>

									{/* Qty + remove */}
									<div className="flex flex-col items-end justify-between gap-2 shrink-0">
										<button
											type="button"
											onClick={() => removeFromCart(product.id)}
											aria-label={`Eliminar ${product.name}`}
											className="text-brand-primary-dark/30 hover:text-brand-secondary-terra transition-colors"
										>
											<Trash2 className="h-4 w-4" aria-hidden="true" />
										</button>
										<div className="flex items-center gap-1 rounded-full border border-brand-primary-dark/20 px-1.5 py-0.5">
											<button
												type="button"
												onClick={() => updateQuantity(product.id, quantity - 1)}
												aria-label="Reducir cantidad"
												className="flex h-5 w-5 items-center justify-center rounded-full text-brand-primary-dark/60 hover:bg-brand-primary-dark/10 transition-colors"
											>
												<Minus className="h-3 w-3" aria-hidden="true" />
											</button>
											<span className="w-5 text-center text-xs font-medium text-brand-primary-dark">
												{quantity}
											</span>
											<button
												type="button"
												onClick={() => updateQuantity(product.id, quantity + 1)}
												aria-label="Aumentar cantidad"
												className="flex h-5 w-5 items-center justify-center rounded-full text-brand-primary-dark/60 hover:bg-brand-primary-dark/10 transition-colors"
											>
												<Plus className="h-3 w-3" aria-hidden="true" />
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>

						{/* Footer */}
						<div className="border-t border-brand-primary-dark/10 bg-white px-5 py-5 space-y-4">
							{/* Subtotal */}
							<div className="flex items-center justify-between">
								<span className="text-sm text-brand-primary-dark/70">
									Subtotal estimado
								</span>
								<span className="font-heading text-xl text-brand-primary-dark">
									${totalPrice.toLocaleString()}
									<span className="ml-1 text-sm font-body font-normal text-brand-primary-dark/50">
										USD
									</span>
								</span>
							</div>

							{/* CTAs */}
							<a
								href={buildWhatsAppMessage()}
								target="_blank"
								rel="noopener noreferrer"
								className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3 text-sm font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85"
							>
								Finalizar por WhatsApp
							</a>

							<Link
								to="/cart"
								onClick={onClose}
								className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-primary-dark px-6 py-3 text-sm font-medium text-brand-primary-dark transition-colors hover:bg-brand-primary-dark hover:text-brand-primary-lighter"
							>
								Ver carrito completo
							</Link>

							<button
								type="button"
								onClick={clearCart}
								className="w-full text-center text-xs text-brand-primary-dark/40 hover:text-brand-secondary-terra transition-colors"
							>
								Vaciar carrito
							</button>
						</div>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
