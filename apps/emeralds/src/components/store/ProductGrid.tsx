import ProductCard from "@/components/ProductCard"
import type { EmeraldWithImage } from "@/lib/supabase-queries"

interface ProductGridProps {
	products: EmeraldWithImage[]
}

export function ProductGrid({ products }: ProductGridProps) {
	if (products.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 text-center">
				<p className="text-lg font-medium text-brand-primary-dark">
					No se encontraron productos
				</p>
				<p className="mt-2 text-sm text-brand-primary-dark/60">
					Intenta ajustar los filtros para ver más resultados
				</p>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} showCompare />
			))}
		</div>
	)
}
