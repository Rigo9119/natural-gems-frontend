import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calendar, Gem, Tag } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { prefetchGuidesList, useGuidesList } from "@/data/page-data";
import { urlFor } from "@/lib/sanity/sanity";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/guides/")({
	head: () =>
		buildMeta({
			title: "Guias de Esmeraldas Colombianas",
			description:
				"Aprende todo sobre esmeraldas colombianas: como comprar, como distinguir calidad, certificacion, regiones mineras e inversion. Guias expertas de Natura Gems.",
			path: "/guides",
			ogType: "website",
			jsonLd: [
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Guias", path: "/guides" },
				]),
			],
		}),
	loader: async ({ context }) => {
		await prefetchGuidesList(context.queryClient);
	},
	component: GuidesIndexPage,
});

// Fallback cards shown when no guides exist in Sanity yet
const upcomingGuides = [
	{
		title: "Como elegir una esmeralda colombiana",
		description:
			"Guia completa para evaluar color, claridad, corte y carat weight. Que preguntar al vendedor y como leer un certificado gemologico.",
		tag: "Compra",
	},
	{
		title: "Certificados gemologicos explicados",
		description:
			"GIA, Gubelin, SSEF: que certifica cada laboratorio, cuando necesitas uno y como interpretar el reporte. Todo lo que debes saber antes de comprar.",
		tag: "Autenticidad",
	},
	{
		title: "Las 4 regiones mineras de Colombia",
		description:
			"Muzo, Chivor, Coscuez y Gachala: diferencias de color, inclusiones caracteristicas, piedras historicas y como el origen afecta el precio.",
		tag: "Origen",
	},
	{
		title: "Esmeraldas como inversion",
		description:
			"Que hace que una esmeralda sea inversion-grado, historial de apreciacion, liquidez del mercado y como almacenar y asegurar tu gema.",
		tag: "Inversion",
	},
];

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("es-CO", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function GuidesIndexPage() {
	const guides = useGuidesList();

	return (
		<div className="min-h-screen bg-brand-surface">
			{/* Header */}
			<div className="border-b border-brand-primary-dark/10 bg-white py-12">
				<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
					<p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-primary-dark/60">
						Conocimiento Experto
					</p>
					<h1 className="font-heading text-3xl text-brand-primary-dark md:text-4xl lg:text-5xl">
						Guias de Esmeraldas
					</h1>
					<p className="mt-4 max-w-2xl text-brand-primary-dark/70 md:text-lg">
						Todo lo que necesitas saber para comprar, valorar e invertir en
						esmeraldas colombianas con confianza. Contenido elaborado por
						gemologos certificados con mas de 40 anos en el sector.
					</p>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
				{guides.length > 0 ? (
					/* ── Real guides from Sanity ── */
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{guides.map((guide) => {
							const coverUrl = guide.coverImage?.asset?.url
								? guide.coverImage.asset.url
								: guide.coverImage
									? urlFor(guide.coverImage).width(600).height(400).url()
									: null;

							return (
								<Link
									key={guide._id}
									to="/guides/$slug"
									params={{ slug: guide.slug.current }}
									className="group flex flex-col overflow-hidden rounded-2xl border border-brand-primary-dark/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
								>
									{/* Cover image */}
									{coverUrl ? (
										<div className="relative aspect-[3/2] overflow-hidden bg-brand-primary-lighter">
											<OptimizedImage
												src={coverUrl}
												alt={guide.title}
												width={600}
												height={400}
												className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										</div>
									) : (
										<div className="flex aspect-[3/2] items-center justify-center bg-brand-primary-lighter">
											<BookOpen className="h-12 w-12 text-brand-primary-dark/20" />
										</div>
									)}

									{/* Content */}
									<div className="flex flex-1 flex-col p-6">
										{/* Category + date */}
										<div className="mb-3 flex items-center gap-3">
											{guide.category && (
												<span className="flex items-center gap-1 rounded-full bg-brand-secondary-golden/20 px-3 py-0.5 text-xs font-medium text-brand-primary-dark">
													<Tag className="h-3 w-3" />
													{guide.category}
												</span>
											)}
											{guide.publishedAt && (
												<span className="flex items-center gap-1 text-xs text-brand-primary-dark/40">
													<Calendar className="h-3 w-3" />
													{formatDate(guide.publishedAt)}
												</span>
											)}
										</div>

										<h2 className="mb-2 font-heading text-xl text-brand-primary-dark transition-colors group-hover:text-brand-primary-dark/70">
											{guide.title}
										</h2>

										{guide.metaDescription && (
											<p className="flex-1 text-sm leading-relaxed text-brand-primary-dark/60">
												{guide.metaDescription}
											</p>
										)}

										<span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-primary-dark transition-colors group-hover:text-brand-secondary-golden">
											Leer guia
											<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
										</span>
									</div>
								</Link>
							);
						})}
					</div>
				) : (
					/* ── Fallback: coming soon cards ── */
					<>
						<p className="mb-8 font-body text-sm text-brand-primary-dark/50">
							Proximas guias — suscribete para recibirlas cuando se publiquen
						</p>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
							{upcomingGuides.map((guide) => (
								<div
									key={guide.title}
									className="flex flex-col rounded-2xl border border-brand-primary-dark/10 bg-white p-6 shadow-sm"
								>
									<div className="mb-4 flex items-start gap-4">
										<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary-dark/10">
											<BookOpen className="h-5 w-5 text-brand-primary-dark" />
										</span>
										<span className="mt-1 rounded-full bg-brand-secondary-golden/20 px-3 py-0.5 text-xs font-medium text-brand-primary-dark">
											{guide.tag}
										</span>
									</div>
									<h2 className="mb-2 font-heading text-xl text-brand-primary-dark">
										{guide.title}
									</h2>
									<p className="flex-1 text-sm leading-relaxed text-brand-primary-dark/70">
										{guide.description}
									</p>
									<p className="mt-4 text-xs font-medium uppercase tracking-wider text-brand-primary-dark/40">
										Proximamente
									</p>
								</div>
							))}
						</div>
					</>
				)}

				{/* CTA */}
				<div className="mt-16 rounded-2xl bg-brand-primary-dark px-8 py-10 text-center">
					<Gem className="mx-auto mb-4 h-10 w-10 text-brand-secondary-golden" />
					<h2 className="mb-3 font-heading text-2xl text-brand-primary-lighter sm:text-3xl">
						Listo para elegir tu esmeralda?
					</h2>
					<p className="mx-auto mb-6 max-w-xl font-body text-brand-primary-lighter/70">
						Explora nuestra coleccion de esmeraldas colombianas certificadas.
					</p>
					<Link
						to="/emeralds/tienda"
						className="inline-flex items-center gap-2 rounded-full bg-brand-secondary-golden px-8 py-3 font-body font-medium text-brand-primary-dark transition-all hover:scale-105 hover:bg-brand-secondary-golden/90"
					>
						Explorar Tienda
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</div>
	);
}
