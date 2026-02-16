import type { QueryClient } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  brandStorySectionQueryOptions,
  dualCategorySectionQueryOptions,
  featuredProductSectionQueryOptions,
  heroSectionQueryOptions,
  newsletterSectionQueryOptions,
  warrantySectionQueryOptions,
  whatsAppSectionQueryOptions,
} from "@/lib/sanity/sanity-queries";

export async function prefetchHomePageContentData(queryClient: QueryClient) {
  await Promise.all([
    queryClient.ensureQueryData(heroSectionQueryOptions("home")),
    queryClient.ensureQueryData(dualCategorySectionQueryOptions("home")),
    queryClient.ensureQueryData(
      featuredProductSectionQueryOptions("featured-emeralds"),
    ),
    queryClient.ensureQueryData(
      featuredProductSectionQueryOptions("best-sellers-jewelry"),
    ),
    queryClient.ensureQueryData(warrantySectionQueryOptions("warranties")),
    queryClient.ensureQueryData(newsletterSectionQueryOptions("newsletter")),
    queryClient.ensureQueryData(whatsAppSectionQueryOptions("whatsapp")),
    queryClient.ensureQueryData(brandStorySectionQueryOptions("brand-story")),
  ]);
}

export function useHomePageData() {
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

  return {
    hero,
    dualCategory,
    featuredEmeraldsContent,
    brandStoryContent,
    bestSellersContent,
    warrantiesContent,
    whatsAppSectionContent,
    newsletterContent,
  };
}
