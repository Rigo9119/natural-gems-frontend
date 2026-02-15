import { queryOptions } from "@tanstack/react-query";
import { sanityClient } from "./sanity";

interface LocalizedString {
	es?: string;
	en?: string;
}

export interface HeroSection {
	_id: string;
	subTitle?: LocalizedString;
	title?: LocalizedString;
	description?: LocalizedString;
	ctaTextLeft?: LocalizedString;
	ctaTextRight?: LocalizedString;
}

const heroSectionQuery = `*[_type == "heroSection"][0]`;

export const heroSectionQueryOptions = queryOptions({
	queryKey: ["sanity", "heroSection"],
	queryFn: async () => {
		const data = await sanityClient.fetch<HeroSection | null>(
			heroSectionQuery,
		);
		return data;
	},
	staleTime: 5 * 60 * 1000,
});
