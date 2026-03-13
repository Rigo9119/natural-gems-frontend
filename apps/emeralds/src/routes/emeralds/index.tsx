import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Gem } from "lucide-react"
import { useMemo } from "react"
import BrandStory from "@/components/BrandStory"
import Hero from "@/components/Hero"
import { prefetchEmeraldPageData, useEmeraldPageData } from "@/data/page-data"
import { useLocalizedContent } from "@/hooks/sanity-helper"
import type {
	BrandStorySection,
	EmeraldPage,
	SeoMetadata,
} from "@/lib/sanity/sanity-types"
import { breadcrumbJsonLd, buildMeta, resolveSanityMeta } from "@/lib/seo"
import FeaturedProductsCMP from "@/components/FeaturedProductsCMP"
import FeatureCallout from "@/components/FeatureCallout"
import FeatureGrid from "@/components/FeatureGrid"
import LargeSpotlightCard from "@/components/Cards/LargeSpotlightCard"
import SpotlightCard from "@/components/Cards/SpotlightCard"
import MiningRegionCard from "@/components/Cards/MiningRegionCard"
import AccessibleCollectionCard from "@/components/Cards/AccessibleCollectionCard"
import ClarityItemCard from "@/components/Cards/ClarityItemCard"
import { clarityGrades, miningRegions } from "@/data/demo-data-emeralds-page"
import { retailEmeraldsQueryOptions } from "@/lib/supabase-queries"

export const Route = createFileRoute("/emeralds/")({
	head: ({ loaderData }) => {
		const seo = (loaderData as { seo?: SeoMetadata } | undefined)?.seo
		return buildMeta(
			resolveSanityMeta(seo, {
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
		)
	},
	// @ts-expect-error — TanStack Router infers loaderData as `never` on child routes
	loader: async ({ context }) => {
		await prefetchEmeraldPageData(context.queryClient)
		await context.queryClient.ensureQueryData(retailEmeraldsQueryOptions())
		const page = context.queryClient.getQueryData<EmeraldPage | null>([
			"sanity",
			"emeraldPage",
		])
		return { seo: page?.seo ?? null }
	},
	component: EmeraldsIndexPage,
})

function EmeraldsIndexPage() {
	const page = useEmeraldPageData()
	const { data: emeralds } = useSuspenseQuery(retailEmeraldsQueryOptions())

	const featuredProducts = useMemo(
		() => [...emeralds].sort((a, b) => b.price - a.price).slice(0, 4),
		[emeralds],
	)

	const accessibleProducts = useMemo(
		() => [...emeralds].sort((a, b) => a.price - b.price).slice(0, 4),
		[emeralds],
	)

	// ── Localized content from Sanity ──
	const collectionSubtitle = useLocalizedContent(
		page?.collection?.subtitle ?? {},
	)
	const collectionTitle = useLocalizedContent(page?.collection?.title ?? {})
	const wholesaleTitle = useLocalizedContent(
		page?.wholeSaleSection?.title ?? {},
	)
	const wholesaleDesc = useLocalizedContent(
		page?.wholeSaleSection?.description ?? {},
	)
	const wholesaleCtaLeft = useLocalizedContent(
		page?.wholeSaleSection?.ctaLeft?.text ?? {},
	)
	const wholesaleCtaRight = useLocalizedContent(
		page?.wholeSaleSection?.ctaRight?.text ?? {},
	)

	if (featuredProducts.length === 0) return null

	return (
		<div className="min-h-screen">
			{/* ── Section 1: Full-Screen Cinematic Hero ── */}
			<Hero hero={page?.hero ?? {}} />

			{/* ── Section 2: Featured — Spotlight Layout ── */}
			<FeaturedProductsCMP
				sectionContent={{
					header: {
						subtitle: { es: "Selección Premium" },
						title: { es: "Esmeraldas Destacadas" },
						cta: { text: { es: "Ver Colección" }, link: "/emeralds" },
					},
				}}
			>
				<div className="grid gap-6 md:grid-cols-2 lg:gap-8">
					{/* Large spotlight card */}
					<LargeSpotlightCard
						image={featuredProducts[0].image_url ?? ""}
						alt={featuredProducts[0].name}
						name={featuredProducts[0].name}
						meta={`${featuredProducts[0].carats} ct · ${featuredProducts[0].origin} · ${featuredProducts[0].clarity}`}
						price={`$${featuredProducts[0].price.toLocaleString()}`}
						badge="Destacada"
					/>

					{/* 3 regular cards stacked */}
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-1 lg:gap-8">
						{featuredProducts.slice(1).map((product) => (
							<SpotlightCard
								key={product.id}
								image={product.image_url ?? ""}
								alt={product.name}
								name={product.name}
								meta={`${product.carats} ct · ${product.origin} · ${product.clarity}`}
								price={`$${product.price.toLocaleString()}`}
							/>
						))}
					</div>
				</div>
			</FeaturedProductsCMP>

			{/* ── Section 3: Heritage — Brand Story with background image ── */}
			<BrandStory
				sectionContent={(page?.brandStory ?? {}) as BrandStorySection}
				variant="background"
			/>

			{/* ── Section 4: Mining Regions ── */}
			<FeatureGrid
				subTitle={collectionSubtitle || "Trazabilidad de Origen"}
				title={collectionTitle || "Regiones Mineras de Colombia"}
				description="El origen de una esmeralda define su caracter. Cada region minera imprime en la piedra un perfil de color, inclusiones y valor unicos que los gemologos identifican con precision."
			>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{miningRegions.map((region) => (
						<MiningRegionCard
							key={region.name}
							name={region.name}
							region={region.region}
							colorProfile={region.colorProfile}
							knownFor={region.knownFor}
							priceNote={region.priceNote}
						/>
					))}
				</div>
			</FeatureGrid>

			{/* ── Section 5: Accessible — Horizontal Detail Cards ── */}
			<FeaturedProductsCMP
				backgroundColor="bg-brand-primary-lighter"
				sectionContent={{
					header: {
						subtitle: page?.exclusive?.subtitle ?? { es: "Para Todos" },
						title: page?.exclusive?.title ?? { es: "Colección Accesible" },
						cta: page?.exclusive?.cta ?? {
							text: { es: "Ver Todas" },
							link: "/emeralds/shop",
						},
					},
				}}
			>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
					{accessibleProducts.map((product) => (
						<AccessibleCollectionCard
							key={product.id}
							image={product.image_url ?? ""}
							alt={product.name}
							name={product.name}
							carat={product.carats}
							origin={product.origin}
							clarity={product.clarity}
							price={`$${product.price.toLocaleString()}`}
						/>
					))}
				</div>
			</FeaturedProductsCMP>

			{/* ── Section 6: Clarity Grades — Alternating Horizontal Cards ── */}
			<FeaturedProductsCMP
				backgroundColor="bg-white"
				sectionContent={{
					header: {
						subtitle: page?.qualitySection?.subTitle ?? {
							es: "Calidad Certificada",
						},
						title: page?.qualitySection?.title ?? { es: "Grados de Claridad" },
					},
				}}
			>
				<div className="space-y-6">
					{clarityGrades.map((item, index) => (
						<ClarityItemCard
							key={item.grade}
							grade={item.grade}
							title={item.title}
							description={item.description}
							image={item.image}
							reverse={index % 2 !== 0}
						/>
					))}
				</div>
			</FeaturedProductsCMP>

			{/* ── Section 7: Wholesale CTA ── */}
			<FeatureCallout
				icon={<Gem className="h-10 w-10 text-brand-secondary-golden" />}
				title={wholesaleTitle || "Compra al Por Mayor"}
				description={
					wholesaleDesc ||
					"Ofrecemos lotes de esmeraldas colombianas certificadas para joyeros, distribuidores y coleccionistas. Precios especiales y atención personalizada para compras mayoristas."
				}
				ctas={[
					{
						ctaText: wholesaleCtaLeft || "Ver Lotes Mayoristas",
						ctaLink:
							page?.wholeSaleSection?.ctaLeft?.link || "/emeralds/mayoristas",
					},
					{
						ctaText: wholesaleCtaRight || "Contactar",
						ctaLink: page?.wholeSaleSection?.ctaRight?.link || "/contact",
					},
				]}
			/>
		</div>
	)
}
