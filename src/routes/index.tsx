import { createFileRoute } from "@tanstack/react-router";
import { getBestSellers } from "@/data/demo-jewelry-products";
import { demoProducts } from "@/data/demo-products";
import {
  type HeroSection,
  type DualCategorySection,
  type WarrantySection,
  type NewsletterSection,
  type BrandStorySection,
  type WhatsAppSection,
} from "@/lib/sanity/sanity-types";
import {
  prefetchHomePageContentData,
  useHomePageData,
} from "@/data/home-page-data";
import { buildMeta } from "@/lib/seo";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import DualCategorySectionCMP from "@/components/DualCategory/DualCategorySection";
import FeaturedProductsCMP from "@/components/FeaturedProductsCMP";
import WarrantiesSectionCMP from "@/components/WarrantiesSectionCMP";
import Newsletter from "@/components/Newsletter";
import WhatsAppSectionCMP from "@/components/WhatsAppSectionCMP";
import BrandStory from "@/components/BrandStory";

export const Route = createFileRoute("/")({
  head: () =>
    buildMeta({
      path: "/",
      description:
        "Esmeraldas colombianas certificadas directamente desde las minas de Muzo. Joyería artesanal exclusiva con gemas de la más alta calidad. Envío asegurado a todo el mundo.",
    }),
  loader: async ({ context }) => {
    await prefetchHomePageContentData(context.queryClient);
  },
  component: HomePage,
});

function HomePage() {
  const {
    hero,
    dualCategory,
    featuredEmeraldsContent,
    brandStoryContent,
    bestSellersContent,
    warrantiesContent,
    whatsAppSectionContent,
    newsletterContent,
  } = useHomePageData();
  //TODO -> estos datos llegan desde supabase y el ecommerce que se elija
  const bestSellers = getBestSellers().slice(0, 4);
  const featuredEmeralds = demoProducts.slice(0, 4);

  return (
    <div>
      {/* ── Section 1: Full-Screen Hero ── */}
      <Hero hero={hero as HeroSection} />

      {/* ── Section 2: Dual Category Showcase ── */}
      {dualCategory && (
        <DualCategorySectionCMP
          dualCategory={dualCategory as DualCategorySection}
        />
      )}

      {/* ── Section 3: Featured Emeralds ── */}
      <FeaturedProductsCMP sectionContent={featuredEmeraldsContent}>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredEmeralds.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </FeaturedProductsCMP>

      {/* ── Section 4: Heritage / Brand Story ── */}
      <BrandStory sectionContent={brandStoryContent as BrandStorySection} />

      {/* ── Section 5: Jewelry Best Sellers ── */}
      <FeaturedProductsCMP
        sectionContent={bestSellersContent}
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
        sectionContent={warrantiesContent as WarrantySection}
      />

      {/* ── Section 7: WhatsApp CTA ── */}
      <WhatsAppSectionCMP
        sectionContent={whatsAppSectionContent as WhatsAppSection}
      />

      {/* ── Section 8: Newsletter ── */}
      <Newsletter sectionContent={newsletterContent as NewsletterSection} />
    </div>
  );
}
