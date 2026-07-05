import { Link } from "@tanstack/react-router";
import { Check, ShoppingCart } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { OptimizedImage } from "@/components/ui/optimized-image";
import type { EmeraldWithImage } from "@/lib/supabase-queries";
import { useCartStore } from "@/store/cartStore";
import { selectCanAddMore, useCompareStore } from "@/store/compareStore";

interface ProductCardProps {
	product: EmeraldWithImage;
	showCompare?: boolean;
}

export default function ProductCard({
	product,
	showCompare = false,
}: ProductCardProps) {
	const { addToCart, isInCart } = useCartStore();
	const inCart = isInCart(product.id);

	const { isInCompare, addToCompare, removeFromCompare } = useCompareStore();
	const canAddMore = useCompareStore(selectCanAddMore);
	const isSelected = isInCompare(product.id);

	const handleCompareToggle = () => {
		if (isSelected) {
			removeFromCompare(product.id);
		} else if (canAddMore) {
			addToCompare(product);
		}
	};

	const detailHref = `/emeralds/shop/${product.slug}`;

	return (
		<article className="group flex flex-col">
			<figure className="relative aspect-square overflow-hidden rounded-lg bg-brand-primary-lighter">
				<Link
					to={detailHref}
					className="block h-full w-full"
					aria-label={`Ver detalles de ${product.name}`}
				>
					<OptimizedImage
						src={product.image_url ?? ""}
						alt={product.name}
						width={400}
						height={400}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</Link>
				{isSelected && (
					<div className="pointer-events-none absolute inset-0 rounded-lg bg-brand-secondary-terra/45 ring-4 ring-inset ring-brand-secondary-terra" />
				)}
				{showCompare && (
					<div className="absolute right-2 top-2 z-10">
						<button
							type="button"
							tabIndex={!isSelected && !canAddMore ? -1 : 0}
							onClick={handleCompareToggle}
							aria-pressed={isSelected}
							aria-disabled={!isSelected && !canAddMore}
							className={`flex h-10 cursor-pointer items-center gap-2 rounded-full px-3 transition-colors ${!isSelected && !canAddMore ? "opacity-50 pointer-events-none" : ""} ${
								isSelected
									? "bg-brand-primary text-white"
									: "bg-brand-primary-dark text-white hover:bg-brand-primary-dark/90"
							}`}
						>
							<Checkbox
								checked={isSelected}
								tabIndex={-1}
								className="pointer-events-none border-white data-[state=checked]:bg-white data-[state=checked]:text-brand-primary-dark"
							/>
							<span className="text-xs font-medium">
								{isSelected ? "Remover" : "Comparar"}
							</span>
						</button>
					</div>
				)}
			</figure>

			<dl className="mt-4 flex flex-1 flex-col space-y-1">
				<dt className="sr-only">Nombre</dt>
				<dd className="font-heading text-xl text-brand-primary-dark">
					<Link
						to={detailHref}
						className="hover:text-brand-secondary-terra transition-colors"
					>
						{product.name}
					</Link>
				</dd>
				<dt className="sr-only">Quilates</dt>
				<dd className="text-sm text-brand-primary-dark/70">
					{product.carats} quilates
				</dd>
				<dt className="sr-only">Precio</dt>
				<dd className="font-body font-semibold text-brand-primary-dark">
					<data value={product.price}>${product.price.toLocaleString()}</data>
				</dd>
				<dd className="mt-3 flex gap-2">
					<button
						type="button"
						onClick={() => addToCart(product)}
						disabled={inCart}
						className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
							inCart
								? "bg-brand-primary-dark/10 text-brand-primary-dark cursor-default"
								: "bg-brand-primary-dark text-brand-primary-lighter hover:bg-brand-primary-dark/85"
						}`}
					>
						{inCart ? (
							<>
								<Check className="h-3.5 w-3.5" />
								En carrito
							</>
						) : (
							<>
								<ShoppingCart className="h-3.5 w-3.5" />
								Agregar
							</>
						)}
					</button>
					<Link
						to={detailHref}
						className="flex items-center rounded-full border border-brand-primary-dark px-4 py-1.5 text-xs font-medium text-brand-primary-dark transition-colors hover:bg-brand-primary-dark hover:text-brand-primary-lighter"
					>
						Ver detalles
					</Link>
				</dd>
			</dl>
		</article>
	);
}
