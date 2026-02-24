import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import BrandStory from "@/components/BrandStory";
import DualCategorySectionCMP from "@/components/DualCategory/DualCategorySection";
import FeaturedProductsCMP from "@/components/FeaturedProductsCMP";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";
import WarrantiesSectionCMP from "@/components/WarrantiesSectionCMP";
import WhatsAppSectionCMP from "@/components/WhatsAppSectionCMP";
import { demoProducts } from "@/data/demo-products";
import {
	prefetchHomePageContentData,
	useHomePageData,
} from "@/data/home-page-data";
import { WHATSAPP_NUMBER } from "@/lib/constants";
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
	const featuredEmeralds = demoProducts.slice(0, 4);

	const waJewelryUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
		"Hola, me interesa la colección de joyería con esmeraldas colombianas. ¿Cuándo estará disponible?",
	)}`;

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

			{/* ── Section 5: Jewelry teaser banner ── */}
			<section className="bg-brand-primary-lighter py-16 sm:py-24">
				<div className="mx-auto max-w-7xl px-6 sm:px-8">
					<div className="relative overflow-hidden rounded-3xl bg-brand-secondary-terra px-8 py-16 text-center sm:px-16 sm:py-20">
						{/* Decorative background circles */}
						<div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-secondary-golden/10" />
						<div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/5" />

						<div className="relative">
							<Sparkles className="mx-auto mb-4 h-8 w-8 text-brand-secondary-golden" />

							<span className="inline-block rounded-full border border-brand-secondary-golden/40 bg-brand-secondary-golden/10 px-4 py-1 text-xs font-medium tracking-widest text-brand-secondary-golden uppercase mb-4">
								Próximamente
							</span>

							<h2 className="font-heading text-4xl text-white sm:text-5xl md:text-6xl">
								Joyería con Esmeraldas
							</h2>

							<p className="mx-auto mt-4 max-w-lg text-white/70">
								Anillos, collares, aretes y pulseras elaborados a mano con
								esmeraldas colombianas certificadas. Nuestra tienda de joyería
								llega pronto.
							</p>

							<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
								<a
									href={waJewelryUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-medium text-brand-secondary-terra transition-colors hover:bg-white/90"
								>
									Consultar por WhatsApp
								</a>
								<Link
									to="/jewelry"
									className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
								>
									Ver más detalles
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

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
