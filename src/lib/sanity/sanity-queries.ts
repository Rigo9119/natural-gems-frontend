import { queryOptions } from "@tanstack/react-query";
import { sanityClient } from "./sanity";
import {
  HeroSection,
  STALE_TIME,
  DualCategorySection,
  FeaturedProductsSection,
  WarrantySection,
  NewsletterSection,
  WhatsAppSection,
  BrandStorySection,
} from "./sanity-types";

function heroSectionQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["sanity", "heroSection", slug],
    queryFn: async () => {
      const data = await sanityClient.fetch<HeroSection | null>(
        `*[_type == "heroSection" && slug.current == $slug][0]`,
        { slug },
      );
      return data;
    },
    staleTime: STALE_TIME,
  });
}

function dualCategorySectionQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["sanity", "dualCategorySection", slug],
    queryFn: async () => {
      const data = await sanityClient.fetch<DualCategorySection | null>(
        `*[_type == "dualCategorySection" && slug.current == $slug][0]`,
        { slug },
      );
      return data;
    },
    staleTime: STALE_TIME,
  });
}

function featuredProductSectionQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["sanity", "featuredProductSection", slug],
    queryFn: async () => {
      const data = await sanityClient.fetch<FeaturedProductsSection | null>(
        `*[_type == "featuredProductsSection" && slug.current == $slug][0]`,
        { slug },
      );
      return data;
    },
    staleTime: STALE_TIME,
  });
}

function warrantySectionQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["sanity", "warrantySection", slug],
    queryFn: async () => {
      const data = await sanityClient.fetch<WarrantySection | null>(
        `*[_type == "warrantySection" && slug.current == $slug][0]`,
        { slug },
      );
      return data;
    },
    staleTime: STALE_TIME,
  });
}

function newsletterSectionQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["sanity", "newsletterSection", slug],
    queryFn: async () => {
      const data = await sanityClient.fetch<NewsletterSection | null>(
        `*[_type == "newsletterSection" && slug.current == $slug][0]`,
        { slug },
      );
      return data;
    },
    staleTime: STALE_TIME,
  });
}

function whatsAppSectionQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["sanity", "whatsAppSection", slug],
    queryFn: async () => {
      const data = await sanityClient.fetch<WhatsAppSection | null>(
        `*[_type == "whatsAppSection" && slug.current == $slug][0]`,
        { slug },
      );
      return data;
    },
    staleTime: STALE_TIME,
  });
}

function brandStorySectionQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["sanity", "brandStorySection", slug],
    queryFn: async () => {
      const data = await sanityClient.fetch<BrandStorySection | null>(
        `*[_type == "brandStorySection" && slug.current == $slug][0]`,
        { slug },
      );
      return data;
    },
    staleTime: STALE_TIME,
  });
}

export {
  heroSectionQueryOptions,
  dualCategorySectionQueryOptions,
  featuredProductSectionQueryOptions,
  warrantySectionQueryOptions,
  newsletterSectionQueryOptions,
  whatsAppSectionQueryOptions,
  brandStorySectionQueryOptions,
};
