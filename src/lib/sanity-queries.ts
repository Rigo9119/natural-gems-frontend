import { queryOptions } from "@tanstack/react-query";
import { sanityClient } from "./sanity";

interface LocalizedString {
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
	ctaTextLeft?: LocalizedString;
	ctaLinkLeft?: string;
	ctaTextRight?: LocalizedString;
	ctaLinkRight?: string;
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
		staleTime: 5 * 60 * 1000,
	});
}

interface Cta {
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
		staleTime: 5 * 60 * 1000,
	});
}

export { heroSectionQueryOptions, dualCategorySectionQueryOptions };
