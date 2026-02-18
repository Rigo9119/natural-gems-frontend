import { queryOptions } from "@tanstack/react-query";
import { sanityClient } from "./sanity";
import { type HomePage, STALE_TIME } from "./sanity-types";

export function homePageQueryOptions() {
	return queryOptions({
		queryKey: ["sanity", "homePage"],
		queryFn: async () => {
			const data = await sanityClient.fetch<HomePage | null>(
				`*[_type == "homePage"][0]{
					...,
					newsletter->{...},
					whatsApp->{...}
				}`,
			);
			return data;
		},
		staleTime: STALE_TIME,
	});
}
