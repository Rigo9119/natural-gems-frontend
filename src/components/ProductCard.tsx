import { Checkbox } from "@/components/ui/checkbox";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useCompare } from "@/context/CompareContext";
import type { Product } from "@/data/demo-products";

interface ProductCardProps {
	product: Product;
	showCompare?: boolean;
}

export default function ProductCard({
	product,
	showCompare = false,
}: ProductCardProps) {
	const { isInCompare, addToCompare, removeFromCompare, canAddMore } =
		useCompare();
	const isSelected = isInCompare(product.id);

	const handleCompareToggle = () => {
		if (isSelected) {
			removeFromCompare(product.id);
		} else if (canAddMore) {
			addToCompare(product);
		}
	};

	return (
		<article className="group cursor-pointer">
			<figure className="relative aspect-square overflow-hidden rounded-lg bg-brand-primary-lighter">
				<OptimizedImage
					src={product.image}
					alt={product.name}
					width={400}
					height={400}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				{showCompare && (
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
			<dl className="mt-4 space-y-1">
				<dt className="sr-only">Nombre</dt>
				<dd className="font-heading text-xl text-brand-primary-dark">
					{product.name}
				</dd>
				<dt className="sr-only">Quilates</dt>
				<dd className="text-sm text-brand-primary-dark/70">
					{product.carat} quilates
				</dd>
				<dt className="sr-only">Precio</dt>
				<dd className="font-body font-semibold text-brand-primary-dark">
					<data value={product.price}>${product.price.toLocaleString()}</data>
				</dd>
			</dl>
		</article>
	);
}
