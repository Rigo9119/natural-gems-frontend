import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Gem, MapPin, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { type Clarity, demoProducts } from "@/data/demo-products";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/emeralds/")({
	head: () =>
		buildMeta({
			title: "Esmeraldas Colombianas",
			description:
				"Descubre esmeraldas colombianas certificadas por claridad, peso y origen. Gemas sueltas desde las minas de Muzo, Chivor y Coscuez. Envío asegurado.",
			path: "/emeralds",
			jsonLd: [
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Esmeraldas", path: "/emeralds" },
				]),
			],
		}),
	component: EmeraldsIndexPage,
});

const miningRegions = [
	{
		name: "Muzo",
		region: "Boyaca occidental",
		colorProfile: "Verde intenso calido con tonos azulados",
		knownFor:
			"Las esmeraldas mas valoradas del mundo. Color profundo, alta saturacion y el caracteristico verde Muzo reconocido internacionalmente por GIA.",
		priceNote: "Prima de precio de hasta 30-50% sobre otras regiones",
	},
	{
		name: "Chivor",
		region: "Boyaca oriental",
		colorProfile: "Verde azulado frio y cristalino",
		knownFor:
			"Transparencia excepcional y tonos azul-verde frios. Hogar de la Esmeralda Patricia (632 ct) expuesta en el Museo Americano de Historia Natural.",
		priceNote: "Alta demanda en el mercado asiatico y de coleccionistas",
	},
	{
		name: "Coscuez",
		region: "Boyaca norte",
		colorProfile: "Verde medio con tonos amarillentos",
		knownFor:
			"Gran volumen de produccion. Piedras con buena saturacion, frecuentemente utilizadas en joyeria de alta gama por su excelente relacion calidad-precio.",
		priceNote: "Excelente valor para joyeria comercial y diseno",
	},
	{
		name: "Gachala",
		region: "Cundinamarca",
		colorProfile: "Verde puro intenso, raramente azulado",
		knownFor:
			"Origen de la Esmeralda Gachala (858 ct), una de las mayores del mundo. Produccion limitada que confiere exclusividad a cada pieza certificada.",
		priceNote: "Prima por rareza y proveniencia documentada",
	},
];

const clarityGrades: {
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
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=1000&fit=crop",
	},
	{
		grade: "AA",
		title: "Selecta",
		description:
			"Piedras de alta calidad con excelente saturación de color y mínimas inclusiones visibles",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=600&fit=crop",
	},
	{
		grade: "A",
		title: "Clásica",
		description:
			"Esmeraldas con buen color y claridad, ideales para joyería elegante del día a día",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=600&fit=crop",
	},
	{
		grade: "B",
		title: "Natural",
		description:
			"Piedras con carácter natural, perfectas para diseños artesanales y piezas únicas",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=1000&fit=crop",
	},
];

function EmeraldsIndexPage() {
	const featuredProducts = useMemo(
		() => [...demoProducts].sort((a, b) => b.price - a.price).slice(0, 4),
		[],
	);

	const accessibleProducts = useMemo(
		() => [...demoProducts].sort((a, b) => a.price - b.price).slice(0, 4),
		[],
	);

	return (
		<div className="min-h-screen">
			{/* ── Section 1: Full-Screen Cinematic Hero ── */}
			<section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden">
				<OptimizedImage
					src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1600&h=900&fit=crop"
					alt="Esmeraldas colombianas"
					className="absolute inset-0 h-full w-full object-cover"
					width={1600}
					height={900}
					priority
				/>
				<div className="absolute inset-0 bg-brand-primary-dark/80" />
				<div className="relative z-10 px-6 text-center sm:px-8">
					<p className="mb-4 font-body text-xs tracking-[0.3em] uppercase text-brand-secondary-golden sm:mb-6 sm:text-sm">
						Desde las minas de Colombia
					</p>
					<h1 className="mb-4 font-heading text-5xl text-brand-primary-lighter sm:mb-6 sm:text-6xl md:text-8xl">
						Esmeraldas
					</h1>
					<p className="mx-auto mb-8 max-w-xl font-body text-base leading-relaxed text-brand-primary-lighter/80 sm:mb-12 sm:text-lg">
						Descubre la belleza única de las esmeraldas colombianas, extraídas
						de las minas más prestigiosas del mundo.
					</p>
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
						<Link
							to="/emeralds/collection"
							className="inline-flex items-center gap-2 rounded-full border border-brand-primary-lighter px-6 py-3 font-body font-medium text-brand-primary-lighter transition-all duration-300 hover:bg-brand-primary-lighter hover:text-brand-primary-dark sm:px-8 sm:py-4 sm:text-lg"
						>
							Ver Colección
						</Link>
						<Link
							to="/emeralds/tienda"
							className="inline-flex items-center gap-2 rounded-full bg-brand-secondary-golden px-6 py-3 font-body font-medium text-brand-primary-dark transition-all duration-300 hover:scale-105 hover:bg-brand-secondary-golden/90 sm:px-8 sm:py-4 sm:text-lg"
						>
							Explorar Tienda
						</Link>
					</div>
				</div>
				<a
					href="#featured"
					className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
					aria-label="Desplazarse hacia abajo"
				>
					<ChevronDown
						className="h-6 w-6 text-brand-primary-lighter/60"
						aria-hidden="true"
					/>
				</a>
			</section>

			{/* ── Section 2: Featured — Spotlight Layout ── */}
			<section id="featured" className="bg-white py-16 sm:py-24">
				<div className="mx-auto max-w-7xl px-6 sm:px-8">
					<div className="mb-12 flex items-center justify-between">
						<div>
							<p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-primary-dark/60 sm:text-sm">
								Selección Exclusiva
							</p>
							<h2 className="font-heading text-3xl text-brand-primary-dark sm:text-4xl">
								Esmeraldas Premium
							</h2>
						</div>
						<Button
							asChild
							variant="outline"
							className="hidden rounded-full border-brand-primary-dark text-brand-primary-dark hover:bg-brand-primary-dark hover:text-brand-primary-lighter sm:flex"
						>
							<Link to="/emeralds/tienda">
								Ver Todas
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>

					{/* Hero product + 3 smaller */}
					<div className="grid gap-6 md:grid-cols-2 lg:gap-8">
						{/* Large spotlight card */}
						<div className="group cursor-pointer">
							<div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-primary-lighter">
								<OptimizedImage
									src={featuredProducts[0].image}
									alt={featuredProducts[0].name}
									className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									width={400}
									height={400}
								/>
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 sm:p-8">
									<span className="mb-2 inline-block rounded-full bg-brand-secondary-golden px-3 py-1 text-xs font-medium text-brand-primary-dark">
										Destacada
									</span>
									<h3 className="font-heading text-2xl text-white sm:text-3xl">
										{featuredProducts[0].name}
									</h3>
									<p className="mt-1 text-sm text-white/70">
										{featuredProducts[0].carat} ct ·{" "}
										{featuredProducts[0].origin} · {featuredProducts[0].clarity}
									</p>
									<p className="mt-2 font-body text-xl font-semibold text-white">
										${featuredProducts[0].price.toLocaleString()}
									</p>
								</div>
							</div>
						</div>

						{/* 3 regular cards stacked */}
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-1 lg:gap-8">
							{featuredProducts.slice(1).map((product) => (
								<div
									key={product.id}
									className="group flex cursor-pointer gap-4"
								>
									<div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-brand-primary-lighter sm:h-32 sm:w-32">
										<OptimizedImage
											src={product.image}
											alt={product.name}
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
											width={160}
											height={160}
										/>
									</div>
									<div className="flex flex-col justify-center">
										<h3 className="font-heading text-lg text-brand-primary-dark transition-colors group-hover:text-brand-primary-dark/70">
											{product.name}
										</h3>
										<p className="mt-1 text-sm text-brand-primary-dark/60">
											{product.carat} ct · {product.origin} · {product.clarity}
										</p>
										<p className="mt-1 font-body font-semibold text-brand-primary-dark">
											${product.price.toLocaleString()}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="mt-8 text-center sm:hidden">
						<Button
							asChild
							variant="outline"
							className="rounded-full border-brand-primary-dark text-brand-primary-dark hover:bg-brand-primary-dark hover:text-brand-primary-lighter"
						>
							<Link to="/emeralds/tienda">
								Ver Todas
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* ── Section 4: Heritage — Full-Bleed Image + Overlay ── */}
			<section className="relative overflow-hidden py-20 sm:py-32">
				<OptimizedImage
					src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1600&h=900&fit=crop"
					alt="Minas de esmeraldas colombianas"
					className="absolute inset-0 h-full w-full object-cover"
					width={1600}
					height={900}
				/>
				<div className="absolute inset-0 bg-brand-primary-dark/85" />
				<div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<Sparkles className="mx-auto mb-6 h-10 w-10 text-brand-secondary-golden" />
						<h2 className="mb-6 font-heading text-3xl text-brand-primary-lighter sm:text-4xl md:text-5xl">
							El Verde Más Preciado del Mundo
						</h2>
						<p className="mx-auto mb-12 max-w-2xl font-body text-base leading-relaxed text-brand-primary-lighter/80 sm:text-lg">
							Colombia produce más del 70% de las esmeraldas del mundo. Cada
							piedra que seleccionamos cuenta con trazabilidad completa desde la
							mina hasta tu mano.
						</p>
					</div>

					{/* Stats in a horizontal strip */}
					<div className="mx-auto mb-12 grid max-w-2xl grid-cols-3 divide-x divide-brand-primary-lighter/20">
						<div className="px-4 text-center sm:px-8">
							<dd className="font-heading text-3xl text-brand-secondary-golden sm:text-4xl">
								70%
							</dd>
							<dt className="mt-1 text-xs text-brand-primary-lighter/60 sm:text-sm">
								Producción Mundial
							</dt>
						</div>
						<div className="px-4 text-center sm:px-8">
							<dd className="font-heading text-3xl text-brand-secondary-golden sm:text-4xl">
								4
							</dd>
							<dt className="mt-1 text-xs text-brand-primary-lighter/60 sm:text-sm">
								Minas de Origen
							</dt>
						</div>
						<div className="px-4 text-center sm:px-8">
							<dd className="font-heading text-3xl text-brand-secondary-golden sm:text-4xl">
								GIA
							</dd>
							<dt className="mt-1 text-xs text-brand-primary-lighter/60 sm:text-sm">
								Certificadas
							</dt>
						</div>
					</div>

					<div className="text-center">
						<Button
							asChild
							className="rounded-full bg-brand-secondary-golden px-8 text-brand-primary-dark hover:bg-brand-secondary-golden/90"
						>
							<Link to="/about">
								Nuestra Historia
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* ── Section 4b: Mining Regions ── */}
			<section className="bg-brand-primary-lighter py-16 sm:py-24">
				<div className="mx-auto max-w-7xl px-6 sm:px-8">
					<div className="mb-12 text-center">
						<p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-primary-dark/60 sm:text-sm">
							Trazabilidad de Origen
						</p>
						<h2 className="font-heading text-3xl text-brand-primary-dark sm:text-4xl md:text-5xl">
							Regiones Mineras de Colombia
						</h2>
						<p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-brand-primary-dark/70 sm:text-base">
							El origen de una esmeralda define su caracter. Cada region minera
							imprime en la piedra un perfil de color, inclusiones y valor
							unicos que los gemologos identifican con precision.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{miningRegions.map((region) => (
							<div
								key={region.name}
								className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"
							>
								<div className="mb-4 flex items-center gap-3">
									<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary-dark/10">
										<MapPin className="h-5 w-5 text-brand-primary-dark" />
									</span>
									<div>
										<h3 className="font-heading text-xl text-brand-primary-dark">
											{region.name}
										</h3>
										<p className="text-xs text-brand-primary-dark/50">
											{region.region}
										</p>
									</div>
								</div>
								<p className="mb-3 text-xs font-medium uppercase tracking-wider text-brand-secondary-golden">
									{region.colorProfile}
								</p>
								<p className="flex-1 text-sm leading-relaxed text-brand-primary-dark/70">
									{region.knownFor}
								</p>
								<p className="mt-4 rounded-lg bg-brand-primary-lighter px-3 py-2 text-xs text-brand-primary-dark/60">
									{region.priceNote}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Section 5: Accessible — Horizontal Detail Cards ── */}
			<section className="bg-brand-primary-lighter py-16 sm:py-24">
				<div className="mx-auto max-w-7xl px-6 sm:px-8">
					<div className="mb-12 flex items-center justify-between">
						<div>
							<p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-primary-dark/60 sm:text-sm">
								Para Todos
							</p>
							<h2 className="font-heading text-3xl text-brand-primary-dark sm:text-4xl">
								Colección Accesible
							</h2>
						</div>
						<Button
							asChild
							variant="outline"
							className="hidden rounded-full border-brand-primary-dark text-brand-primary-dark hover:bg-brand-primary-dark hover:text-brand-primary-lighter sm:flex"
						>
							<Link to="/emeralds/tienda">
								Ver Todas
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
						{accessibleProducts.map((product) => (
							<div
								key={product.id}
								className="group flex cursor-pointer gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-lg sm:gap-6 sm:p-5"
							>
								<div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-brand-primary-lighter sm:h-40 sm:w-40">
									<OptimizedImage
										src={product.image}
										alt={product.name}
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										width={160}
										height={160}
									/>
								</div>
								<div className="flex flex-col justify-center">
									<h3 className="font-heading text-lg text-brand-primary-dark transition-colors group-hover:text-brand-primary-dark/70 sm:text-xl">
										{product.name}
									</h3>
									<div className="mt-2 flex flex-wrap gap-2">
										<span className="rounded-full bg-brand-primary-lighter px-2.5 py-0.5 text-xs text-brand-primary-dark/70">
											{product.carat} ct
										</span>
										<span className="rounded-full bg-brand-primary-lighter px-2.5 py-0.5 text-xs text-brand-primary-dark/70">
											{product.origin}
										</span>
										<span className="rounded-full bg-brand-primary-lighter px-2.5 py-0.5 text-xs text-brand-primary-dark/70">
											{product.clarity}
										</span>
									</div>
									<p className="mt-3 font-body text-lg font-semibold text-brand-primary-dark">
										${product.price.toLocaleString()}
									</p>
								</div>
							</div>
						))}
					</div>

					<div className="mt-8 text-center sm:hidden">
						<Button
							asChild
							variant="outline"
							className="rounded-full border-brand-primary-dark text-brand-primary-dark hover:bg-brand-primary-dark hover:text-brand-primary-lighter"
						>
							<Link to="/emeralds/tienda">
								Ver Todas
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* ── Section 6: Clarity Grades — Alternating Horizontal Cards ── */}
			<section className="bg-white py-16 sm:py-24">
				<div className="mx-auto max-w-7xl px-6 sm:px-8">
					<div className="mb-12 text-center">
						<p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-primary-dark/60 sm:text-sm">
							Calidad Certificada
						</p>
						<h2 className="font-heading text-3xl text-brand-primary-dark sm:text-4xl md:text-5xl">
							Grados de Claridad
						</h2>
					</div>

					<div className="space-y-6">
						{clarityGrades.map((item, index) => (
							<Link
								key={item.grade}
								to="/emeralds/tienda"
								search={{ clarity: item.grade }}
								className={`group flex flex-col overflow-hidden rounded-2xl bg-brand-primary-lighter/50 transition-shadow hover:shadow-lg sm:h-56 sm:flex-row ${
									index % 2 !== 0 ? "sm:flex-row-reverse" : ""
								}`}
							>
								<div className="relative h-48 shrink-0 overflow-hidden sm:h-auto sm:w-2/5">
									<OptimizedImage
										src={item.image}
										alt={`Claridad ${item.grade}`}
										className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
										width={600}
										height={800}
									/>
								</div>
								<div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
									<span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary-dark/10 px-3 py-1 text-xs font-medium text-brand-primary-dark">
										<Gem className="h-3 w-3" />
										Claridad {item.grade}
									</span>
									<h3 className="font-heading text-2xl text-brand-primary-dark sm:text-3xl">
										{item.title}
									</h3>
									<p className="mt-2 max-w-md text-sm leading-relaxed text-brand-primary-dark/70 sm:text-base">
										{item.description}
									</p>
									<span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary-dark transition-colors group-hover:text-brand-secondary-golden">
										Ver Piedras
										<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* ── Section 7: Wholesale CTA ── */}
			<section className="bg-brand-secondary-terra py-16 sm:py-24">
				<div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
					<Gem className="mx-auto mb-6 h-10 w-10 text-brand-secondary-golden" />
					<h2 className="mb-4 font-heading text-3xl text-white sm:text-4xl">
						Compra al Por Mayor
					</h2>
					<p className="mb-8 font-body leading-relaxed text-white/80">
						Ofrecemos lotes de esmeraldas colombianas certificadas para joyeros,
						distribuidores y coleccionistas. Precios especiales y atención
						personalizada para compras mayoristas.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							asChild
							size="lg"
							className="rounded-full bg-brand-secondary-golden px-8 text-brand-secondary-terra hover:bg-brand-secondary-golden/90"
						>
							<Link to="/emeralds/mayoristas">
								Ver Lotes Mayoristas
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
						<Button
							asChild
							size="lg"
							variant="outline"
							className="rounded-full border-white px-8 text-white hover:bg-white hover:text-brand-secondary-terra"
						>
							<Link to="/contact">Contactar</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
