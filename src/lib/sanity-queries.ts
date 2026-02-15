import { queryOptions } from "@tanstack/react-query";
import { sanityClient } from "./sanity";

export interface HeroSection {
	_id: string;
	subTitle?: string;
	title?: string;
	description?: string;
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
