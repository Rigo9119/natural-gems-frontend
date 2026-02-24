import { createFileRoute } from "@tanstack/react-router";
import BrandStory from "@/components/BrandStory";
import DualCategorySectionCMP from "@/components/DualCategory/DualCategorySection";
import FeaturedProductsCMP from "@/components/FeaturedProductsCMP";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";
import WarrantiesSectionCMP from "@/components/WarrantiesSectionCMP";
import WhatsAppSectionCMP from "@/components/WhatsAppSectionCMP";
import { getBestSellers } from "@/data/demo-jewelry-products";
import { demoProducts } from "@/data/demo-products";
import {
	prefetchHomePageContentData,
	useHomePageData,
} from "@/data/home-page-data";
import type {
	BrandStorySection,
	DualCategorySection,
	HeroSection,
	HomePage,
	NewsletterSection,
	SeoMetadata,
	WarrantySection,
	WhatsAppSection,
} from "@/lib/sanity/sanity-types";
import { buildMeta, resolveSanityMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
	head: ({ loaderData }) => {
		const seo = (loaderData as { seo?: SeoMetadata } | undefined)?.seo;
		return buildMeta(
			resolveSanityMeta(seo, {
				path: "/",
				description:
					"Esmeraldas colombianas certificadas directamente desde las minas de Muzo. Joyería artesanal exclusiva con gemas de la más alta calidad. Envío asegurado a todo el mundo.",
			}),
		);
	},
	loader: async ({ context }) => {
		await prefetchHomePageContentData(context.queryClient);
		const page = context.queryClient.getQueryData<HomePage | null>([
			"sanity",
			"homePage",
		]);
		return { seo: page?.seo ?? null };
	},
	component: HomePageComponent,
});

function HomePageComponent() {
	const homePage = useHomePageData();
	//TODO -> estos datos llegan desde supabase y el ecommerce que se elija
	const bestSellers = getBestSellers().slice(0, 4);
	const featuredEmeralds = demoProducts.slice(0, 4);

	return (
		<div>
			{/* ── Section 1: Full-Screen Hero ── */}
			<Hero hero={homePage?.hero as HeroSection} />

			{/* ── Section 2: Dual Category Showcase ── */}
			{homePage?.dualCategory && (
				<DualCategorySectionCMP
					dualCategory={homePage.dualCategory as DualCategorySection}
				/>
			)}

			{/* ── Section 3: Featured Emeralds ── */}
			<FeaturedProductsCMP sectionContent={homePage?.featuredEmeralds}>
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{featuredEmeralds.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</FeaturedProductsCMP>

			{/* ── Section 4: Heritage / Brand Story ── */}
			<BrandStory sectionContent={homePage?.brandStory as BrandStorySection} />

			{/* ── Section 5: Jewelry Best Sellers ── */}
			<FeaturedProductsCMP
				sectionContent={homePage?.bestSellersJewelry}
				variant="jewelry"
			>
				<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
					{bestSellers.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</FeaturedProductsCMP>

			{/* ── Section 6: Trust & warranties ── */}
			<WarrantiesSectionCMP
				sectionContent={homePage?.warranty as WarrantySection}
			/>

			{/* ── Section 7: WhatsApp CTA ── */}
			<WhatsAppSectionCMP
				sectionContent={homePage?.whatsApp as WhatsAppSection}
			/>

			{/* ── Section 8: Newsletter ── */}
			<Newsletter sectionContent={homePage?.newsletter as NewsletterSection} />
		</div>
	);
}
