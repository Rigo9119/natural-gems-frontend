import { X, GitCompare } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/CompareContext";

export function CompareTray() {
	const { compareItems, removeFromCompare, clearCompare } = useCompare();

	if (compareItems.length === 0) {
		return null;
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-primary-dark/10 bg-white shadow-lg animate-in slide-in-from-bottom duration-300">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
				<div className="flex items-center gap-3 overflow-x-auto">
					{compareItems.map((product) => (
						<div
							key={product.id}
							className="relative flex-shrink-0 rounded-lg border border-brand-primary-dark/10 bg-brand-primary-lighter p-1"
						>
							<img
								src={product.image}
								alt={product.name}
								className="h-12 w-12 rounded object-cover"
							/>
							<button
								type="button"
								onClick={() => removeFromCompare(product.id)}
								className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary-dark text-white hover:bg-brand-primary-dark/80"
								aria-label={`Eliminar ${product.name} de la comparación`}
							>
								<X className="h-3 w-3" />
							</button>
						</div>
					))}
					{compareItems.length < 4 && (
						<div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-brand-primary-dark/20 text-brand-primary-dark/40">
							<span className="text-xl">+</span>
						</div>
					)}
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={clearCompare}
						className="text-brand-primary-dark/70 hover:text-brand-primary-dark"
					>
						Limpiar
					</Button>
					<Button asChild className="gap-2 bg-brand-primary-dark hover:bg-brand-primary-dark/90">
						<Link to="/emeralds/tienda/compare">
							<GitCompare className="h-4 w-4" />
							Comparar ({compareItems.length})
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
