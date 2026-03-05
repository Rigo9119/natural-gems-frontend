import { ShoppingCart } from "lucide-react"
import { OptimizedImage } from "@/components/ui/optimized-image"
import type { EmeraldWithImage } from "@/lib/supabase-queries"
import { useCartStore } from "@/store/cartStore"

interface WholesaleLotCardProps {
	lot: EmeraldWithImage
}

export function WholesaleLotCard({ lot }: WholesaleLotCardProps) {
	const { addToCart, isInCart } = useCartStore()
	const inCart = isInCart(lot.id)

	return (
		<article className="group cursor-pointer">
			<figure className="relative aspect-square overflow-hidden rounded-lg bg-brand-primary-lighter">
				<OptimizedImage
					src={lot.image_url ?? ""}
					alt={lot.name}
					width={400}
					height={400}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<div className="absolute left-2 top-2 z-10">
					<span className="inline-flex items-center rounded-full bg-brand-primary-dark px-3 py-1 text-xs font-medium text-white">
						{lot.stone_count} piedras
					</span>
				</div>
			</figure>
			<dl className="mt-4 space-y-1">
				<dt className="sr-only">Nombre</dt>
				<dd className="font-heading text-xl text-brand-primary-dark">
					{lot.name}
				</dd>
				<dt className="sr-only">Descripción</dt>
				<dd className="line-clamp-2 text-sm text-brand-primary-dark/60">
					{lot.description}
				</dd>
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
					<dt className="sr-only">Quilates totales</dt>
					<dd className="text-sm text-brand-primary-dark/70">{lot.carats} ct</dd>
					<dt className="sr-only">Origen</dt>
					<dd className="text-sm text-brand-primary-dark/70">{lot.origin}</dd>
					<dt className="sr-only">Claridad</dt>
					<dd className="text-sm text-brand-primary-dark/70">{lot.clarity}</dd>
				</div>
				<dt className="sr-only">Precio total</dt>
				<dd className="font-body font-semibold text-brand-primary-dark">
					<data value={lot.price}>${lot.price.toLocaleString()}</data>
				</dd>
			</dl>
			<button
				type="button"
				onClick={() => addToCart(lot)}
				disabled={inCart}
				className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
					inCart
						? "bg-brand-primary-dark/10 text-brand-primary-dark/50 cursor-default"
						: "bg-brand-primary-dark text-brand-primary-lighter hover:bg-brand-primary-dark/85"
				}`}
			>
				<ShoppingCart className="h-4 w-4" />
				{inCart ? "En el carrito" : "Añadir al pedido"}
			</button>
		</article>
	)
}
