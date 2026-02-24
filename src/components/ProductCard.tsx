import { Link } from "@tanstack/react-router";
import { Checkbox } from "@/components/ui/checkbox";
import { OptimizedImage } from "@/components/ui/optimized-image";
import type { JewelryProduct } from "@/data/demo-jewelry-products";
import type { Product } from "@/data/demo-products";
import { useCompareStore } from "@/store/compareStore";

type AnyProduct = Product | JewelryProduct;

interface ProductCardProps {
	product: AnyProduct;
	showCompare?: boolean;
}

function isEmerald(product: AnyProduct): product is Product {
	return "carat" in product;
}

export default function ProductCard({
	product,
	showCompare = false,
}: ProductCardProps) {
	const { isInCompare, addToCompare, removeFromCompare, canAddMore } =
		useCompareStore();
	const isSelected = isInCompare(product.id);

	const handleCompareToggle = () => {
		if (isSelected) {
			removeFromCompare(product.id);
		} else if (canAddMore) {
			if (isEmerald(product)) {
				addToCompare(product);
			}
		}
	};

	const detailHref = isEmerald(product)
		? `/emeralds/tienda/${product.slug}`
		: undefined;

	const imageAndBadges = (
		<figure className="relative aspect-square overflow-hidden rounded-lg bg-brand-primary-lighter">
			<OptimizedImage
				src={product.image}
				alt={product.name}
				width={400}
				height={400}
				className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			{!isEmerald(product) && product.isBestSeller && (
				<span className="absolute left-3 top-3 rounded-full bg-brand-secondary-terra px-3 py-1 text-xs font-medium text-white">
					Más Vendido
				</span>
			)}
			{showCompare && isEmerald(product) && (
				<div className="absolute right-2 top-2 z-10">
					<label
						className={`flex h-10 cursor-pointer items-center gap-2 rounded-full px-3 transition-colors ${
							isSelected
								? "bg-brand-primary text-white"
								: "bg-brand-primary-dark text-white hover:bg-brand-primary-dark/90"
						}`}
					>
						<Checkbox
							checked={isSelected}
							onCheckedChange={handleCompareToggle}
							disabled={!isSelected && !canAddMore}
							className="border-white data-[state=checked]:bg-white data-[state=checked]:text-brand-primary"
						/>
						<span className="text-xs font-medium">Comparar</span>
					</label>
				</div>
			)}
		</figure>
	);

	return (
		<article className="group flex flex-col">
			{detailHref ? (
				<Link to={detailHref} aria-label={`Ver detalles de ${product.name}`}>
					{imageAndBadges}
				</Link>
			) : (
				imageAndBadges
			)}

			<dl className="mt-4 flex flex-1 flex-col space-y-1">
				<dt className="sr-only">Nombre</dt>
				<dd className="font-heading text-xl text-brand-primary-dark">
					{detailHref ? (
						<Link
							to={detailHref}
							className="hover:text-brand-secondary-terra transition-colors"
						>
							{product.name}
						</Link>
					) : (
						product.name
					)}
				</dd>
				<dt className="sr-only">
					{isEmerald(product) ? "Quilates" : "Material"}
				</dt>
				<dd className="text-sm text-brand-primary-dark/70">
					{isEmerald(product) ? `${product.carat} quilates` : product.material}
				</dd>
				<dt className="sr-only">Precio</dt>
				<dd className="font-body font-semibold text-brand-primary-dark">
					<data value={product.price}>${product.price.toLocaleString()}</data>
				</dd>
				{detailHref && (
					<dd className="mt-3">
						<Link
							to={detailHref}
							className="inline-block rounded-full border border-brand-primary-dark px-4 py-1.5 text-xs font-medium text-brand-primary-dark transition-colors hover:bg-brand-primary-dark hover:text-brand-primary-lighter"
						>
							Ver detalles
						</Link>
					</dd>
				)}
			</dl>
		</article>
	);
}
