import { WholesaleLotCard } from "@/components/WholesaleLotCard";
import type { WholesaleLot } from "@/data/demo-wholesale-lots";

interface WholesaleLotGridProps {
	lots: WholesaleLot[];
}

export function WholesaleLotGrid({ lots }: WholesaleLotGridProps) {
	if (lots.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 text-center">
				<p className="text-lg font-medium text-brand-primary-dark">
					No se encontraron lotes
				</p>
				<p className="mt-2 text-sm text-brand-primary-dark/60">
					Intenta ajustar los filtros para ver más resultados
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
			{lots.map((lot) => (
				<WholesaleLotCard key={lot.id} lot={lot} />
			))}
		</div>
	);
}
