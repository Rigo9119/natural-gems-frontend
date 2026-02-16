import { queryOptions } from "@tanstack/react-query";
import { sanityClient } from "./sanity";

export const STALE_TIME = 5 * 60 * 1000;

export interface LocalizedString {
  es?: string;
  en?: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
  };
}
export interface HeroSection {
  _id: string;
  slug?: { current: string };
  image?: SanityImage;
  subTitle?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedString;
  ctaLeft?: Cta;
  ctaRight?: Cta;
}

export interface Cta {
  text?: LocalizedString;
  link?: string;
}

export interface DualCategoryCard {
  _key: string;
  image?: SanityImage;
  subtitle?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedString;
  cta?: Cta;
}

export interface DualCategorySection {
  _id: string;
  slug?: { current: string };
  subtitle?: LocalizedString;
  title?: LocalizedString;
  cards?: DualCategoryCard[];
}

export interface FeaturedProductsSection {
  _id: string;
  slug?: { current: string };
  subtitle?: LocalizedString;
  title?: LocalizedString;
  cta?: Cta;
}

export interface IconCard {
  _key: string;
  icon?: string;
  title?: LocalizedString;
  description?: LocalizedString;
}

export interface WarrantySection {
  _id: string;
  slug?: { current: string };
  subtitle?: LocalizedString;
  title?: LocalizedString;
  cards?: IconCard[];
}

export interface NewsletterSection {
  _id: string;
  slug?: { current: string };
  title?: LocalizedString;
  description?: LocalizedString;
  placeholder?: LocalizedString;
  cta?: Cta;
}

export interface WhatsAppSection {
  _id: string;
  slug?: { current: string };
  title?: LocalizedString;
  description?: LocalizedString;
  cta?: Cta;
  location?: LocalizedString;
}

export interface StatCard {
  _key: string;
  value?: LocalizedString;
  label?: LocalizedString;
}

export interface BrandStorySection {
  _id: string;
  slug?: { current: string };
  image?: SanityImage;
  subTitle?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedString;
  stats?: StatCard[];
  cta?: Cta;
}

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
