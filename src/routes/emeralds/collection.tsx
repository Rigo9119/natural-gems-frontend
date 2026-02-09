import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { type Clarity, demoProducts } from "@/data/demo-products";

export const Route = createFileRoute("/emeralds/collection")({
	component: CollectionPage,
});

const collections: {
	grade: Clarity;
	title: string;
	description: string;
	image: string;
}[] = [
	{
		grade: "AAA",
		title: "Premium",
		description:
			"Las esmeraldas de mayor pureza y brillo, seleccionadas por su excepcional transparencia y color intenso",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&h=800&fit=crop",
	},
	{
		grade: "AA",
		title: "Selecta",
		description:
			"Piedras de alta calidad con excelente saturación de color y mínimas inclusiones visibles",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&h=800&fit=crop",
	},
	{
		grade: "A",
		title: "Clásica",
		description:
			"Esmeraldas con buen color y claridad, ideales para joyería elegante del día a día",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&h=800&fit=crop",
	},
	{
		grade: "B",
		title: "Natural",
		description:
			"Piedras con carácter natural, perfectas para diseños artesanales y piezas únicas",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&h=800&fit=crop",
	},
];

function CollectionPage() {
	const statsByGrade = useMemo(() => {
		const map = new Map<
			Clarity,
			{ count: number; minPrice: number; maxPrice: number }
		>()
		for (const product of demoProducts) {
			const entry = map.get(product.clarity);
			if (entry) {
				entry.count++;
				entry.minPrice = Math.min(entry.minPrice, product.price);
				entry.maxPrice = Math.max(entry.maxPrice, product.price);
			} else {
				map.set(product.clarity, {
					count: 1,
					minPrice: product.price,
					maxPrice: product.price,
				})
			}
		}
		return map;
	}, []);

	return (
		<div className="min-h-screen bg-brand-surface pb-24">
			<div className="border-b border-brand-primary-dark/10 bg-white py-8">
				<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
					<h1 className="font-heading text-3xl text-brand-primary-dark md:text-4xl">
						Colección
					</h1>
					<p className="mt-2 text-brand-primary-dark/70">
						Explora nuestras esmeraldas organizadas por grado de claridad
					</p>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					{collections.map((collection) => {
						const stats = statsByGrade.get(collection.grade);
						return (
							<Link
								key={collection.grade}
								to="/emeralds/tienda"
								search={{ clarity: collection.grade }}
								className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
							>
								<img
									src={collection.image}
									alt={`Colección ${collection.title}`}
									className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
								<div className="absolute bottom-0 left-0 right-0 p-6">
									<span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
										Claridad {collection.grade}
									</span>
									<h2 className="font-heading text-2xl text-white md:text-3xl">
										{collection.title}
									</h2>
									<p className="mt-1 text-sm text-white/70">
										{collection.description}
									</p>
									{stats && (
										<p className="mt-3 text-xs text-white/60">
											{stats.count} piedra
											{stats.count !== 1 ? "s" : ""} · Desde $
											{stats.minPrice.toLocaleString()}
										</p>
									)}
								</div>
							</Link>
						)
					})}
				</div>
			</div>
		</div>
	)
}
