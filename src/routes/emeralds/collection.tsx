import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { useMemo } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { type Clarity, demoProducts } from "@/data/demo-products";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/emeralds/collection")({
	head: () =>
		buildMeta({
			title: "Colección por Claridad",
			description:
				"Esmeraldas colombianas clasificadas por grado de claridad: AAA Premium, AA Selecta, A Clásica y B Natural. Cada piedra con certificado de autenticidad.",
			path: "/emeralds/collection",
			jsonLd: [
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Esmeraldas", path: "/emeralds" },
					{ name: "Colección", path: "/emeralds/collection" },
				]),
			],
		}),
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

const clarityComparison: {
	attribute: string;
	AAA: string | boolean;
	AA: string | boolean;
	A: string | boolean;
	B: string | boolean;
}[] = [
	{
		attribute: "Transparencia",
		AAA: "Excepcional",
		AA: "Alta",
		A: "Buena",
		B: "Moderada",
	},
	{
		attribute: "Saturacion de color",
		AAA: "Vivid / Intensa",
		AA: "Intensa",
		A: "Moderada",
		B: "Ligera",
	},
	{
		attribute: "Inclusiones visibles",
		AAA: "Ninguna a ojo desnudo",
		AA: "Minimas",
		A: "Algunas",
		B: "Visibles",
	},
	{
		attribute: "Aceite cedro tipico",
		AAA: "Sin aceite / minimo",
		AA: "Ligero",
		A: "Moderado",
		B: "Abundante",
	},
	{
		attribute: "Certificado recomendado",
		AAA: "GIA / Gubelin",
		AA: "GIA / SSEF",
		A: "GIA",
		B: "Opcional",
	},
	{
		attribute: "Ideal para inversion",
		AAA: true,
		AA: true,
		A: false,
		B: false,
	},
	{
		attribute: "Ideal para joyeria diaria",
		AAA: false,
		AA: true,
		A: true,
		B: true,
	},
];

function CollectionPage() {
	const statsByGrade = useMemo(() => {
		const map = new Map<
			Clarity,
			{ count: number; minPrice: number; maxPrice: number }
		>();
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
				});
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
								to="/emeralds"
								search={{ clarity: collection.grade }}
								className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
							>
								<OptimizedImage
									src={collection.image}
									alt={`Colección ${collection.title}`}
									width={600}
									height={800}
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
						);
					})}
				</div>
			</div>

			{/* ── Clarity Comparison Table ── */}
			<div className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:px-8">
				<div className="mb-8 text-center">
					<h2 className="font-heading text-2xl text-brand-primary-dark md:text-3xl">
						Comparativa de Claridades
					</h2>
					<p className="mt-2 text-sm text-brand-primary-dark/60">
						Referencia tecnica para elegir la piedra adecuada a tu proposito
					</p>
				</div>
				<div className="overflow-x-auto rounded-2xl border border-brand-primary-dark/10 bg-white shadow-sm">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-brand-primary-dark/10 bg-brand-primary-dark">
								<th className="px-4 py-4 text-left font-body font-medium text-brand-primary-lighter/80">
									Caracteristica
								</th>
								{(["AAA", "AA", "A", "B"] as Clarity[]).map((grade) => (
									<th
										key={grade}
										className="px-4 py-4 text-center font-heading text-lg text-brand-secondary-golden"
									>
										{grade}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{clarityComparison.map((row, i) => (
								<tr
									key={row.attribute}
									className={
										i % 2 === 0 ? "bg-white" : "bg-brand-primary-lighter/40"
									}
								>
									<td className="px-4 py-3 font-medium text-brand-primary-dark">
										{row.attribute}
									</td>
									{(["AAA", "AA", "A", "B"] as Clarity[]).map((grade) => {
										const val = row[grade];
										return (
											<td
												key={grade}
												className="px-4 py-3 text-center text-brand-primary-dark/70"
											>
												{typeof val === "boolean" ? (
													val ? (
														<Check className="mx-auto h-4 w-4 text-emerald-600" />
													) : (
														<Minus className="mx-auto h-4 w-4 text-brand-primary-dark/30" />
													)
												) : (
													val
												)}
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
