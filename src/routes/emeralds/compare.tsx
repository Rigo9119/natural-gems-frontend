import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { CompareTable } from "@/components/store/CompareTable";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";
import { useCompareStore } from "@/store/compareStore";

export const Route = createFileRoute("/emeralds/compare")({
	head: () =>
		buildMeta({
			title: "Comparar Esmeraldas",
			description:
				"Compara esmeraldas colombianas lado a lado por claridad, peso en quilates, origen, corte y precio. Encuentra la piedra perfecta para ti.",
			path: "/emeralds/compare",
			noIndex: true,
			jsonLd: [
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Esmeraldas", path: "/emeralds" },
					{ name: "Comparar", path: "/emeralds/compare" },
				]),
			],
		}),
	component: ComparePage,
});

function ComparePage() {
	const { compareItems } = useCompareStore();

	return (
		<div className="min-h-screen bg-brand-surface">
			<div className="border-b border-brand-primary-dark/10 bg-white py-8">
				<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
					<Link
						to="/emeralds"
						className="mb-4 inline-flex items-center gap-2 text-sm text-brand-primary-dark/70 hover:text-brand-primary-dark"
					>
						<ArrowLeft className="h-4 w-4" />
						Volver a la tienda
					</Link>
					<h1 className="font-heading text-3xl text-brand-primary-dark md:text-4xl">
						Comparar Esmeraldas
					</h1>
					<p className="mt-2 text-brand-primary-dark/70">
						Compara hasta 4 esmeraldas lado a lado
					</p>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
				{compareItems.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<ShoppingBag className="h-16 w-16 text-brand-primary-dark/20" />
						<h2 className="mt-4 font-heading text-xl text-brand-primary-dark">
							No hay productos para comparar
						</h2>
						<p className="mt-2 text-sm text-brand-primary-dark/60">
							Selecciona productos desde la tienda para compararlos
						</p>
						<Button
							asChild
							className="mt-6 bg-brand-primary hover:bg-brand-primary/90"
						>
							<Link to="/emeralds">Ir a la tienda</Link>
						</Button>
					</div>
				) : (
					<div className="rounded-lg border border-brand-primary-dark/10 bg-white p-6">
						<CompareTable />
					</div>
				)}
			</div>
		</div>
	);
}
