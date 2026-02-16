import { useSuspenseQuery } from "@tanstack/react-query";
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
  dualCategorySectionQueryOptions,
  heroSectionQueryOptions,
  featuredProductSectionQueryOptions,
  warrantySectionQueryOptions,
  newsletterSectionQueryOptions,
  whatsAppSectionQueryOptions,
  brandStorySectionQueryOptions,
} from "@/lib/sanity-queries";
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
    await Promise.all([
      context.queryClient.ensureQueryData(heroSectionQueryOptions("home")),
      context.queryClient.ensureQueryData(
        dualCategorySectionQueryOptions("home"),
      ),
      context.queryClient.ensureQueryData(
        featuredProductSectionQueryOptions("featured-emeralds"),
      ),
      context.queryClient.ensureQueryData(
        featuredProductSectionQueryOptions("best-sellers-jewelry"),
      ),
      context.queryClient.ensureQueryData(
        warrantySectionQueryOptions("warranties"),
      ),
      context.queryClient.ensureQueryData(
        newsletterSectionQueryOptions("newsletter"),
      ),
      context.queryClient.ensureQueryData(
        whatsAppSectionQueryOptions("whatsapp"),
      ),
      context.queryClient.ensureQueryData(
        brandStorySectionQueryOptions("brand-story"),
      ),
    ]);
  },
  component: HomePage,
});

function HomePage() {
  const { data: hero } = useSuspenseQuery(heroSectionQueryOptions("home"));
  const { data: dualCategory } = useSuspenseQuery(
    dualCategorySectionQueryOptions("home"),
  );
  const { data: featuredEmeraldsContent } = useSuspenseQuery(
    featuredProductSectionQueryOptions("featured-emeralds"),
  );
  const { data: brandStoryContent } = useSuspenseQuery(
    brandStorySectionQueryOptions("brand-story"),
  );
  const { data: bestSellersContent } = useSuspenseQuery(
    featuredProductSectionQueryOptions("best-sellers-jewelry"),
  );
  const { data: warrantiesContent } = useSuspenseQuery(
    warrantySectionQueryOptions("warranties"),
  );
  const { data: whatsAppSectionContent } = useSuspenseQuery(
    whatsAppSectionQueryOptions("whatsapp"),
  );
  const { data: newsletterContent } = useSuspenseQuery(
    newsletterSectionQueryOptions("newsletter"),
  );
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
