import type { QueryClient } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { homePageQueryOptions } from "@/lib/sanity/sanity-queries";

export async function prefetchHomePageContentData(queryClient: QueryClient) {
	await queryClient.ensureQueryData(homePageQueryOptions());
}

export function useHomePageData() {
	const { data: homePage } = useSuspenseQuery(homePageQueryOptions());
	return homePage;
}
