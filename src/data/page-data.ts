import type { QueryClient } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	aboutPageQueryOptions,
	emeraldPageQueryOptions,
	faqPageQueryOptions,
	guideBySlugQueryOptions,
	guidesListQueryOptions,
} from "@/lib/sanity/sanity-queries";

// ── Emerald Page ──────────────────────────────────────────────────────────────

export async function prefetchEmeraldPageData(queryClient: QueryClient) {
	await queryClient.ensureQueryData(emeraldPageQueryOptions());
}

export function useEmeraldPageData() {
	const { data } = useSuspenseQuery(emeraldPageQueryOptions());
	return data;
}

// ── About Page ────────────────────────────────────────────────────────────────

export async function prefetchAboutPageData(queryClient: QueryClient) {
	await queryClient.ensureQueryData(aboutPageQueryOptions());
}

export function useAboutPageData() {
	const { data } = useSuspenseQuery(aboutPageQueryOptions());
	return data;
}

// ── FAQ Page ──────────────────────────────────────────────────────────────────

export async function prefetchFaqPageData(queryClient: QueryClient) {
	await queryClient.ensureQueryData(faqPageQueryOptions());
}

export function useFaqPageData() {
	const { data } = useSuspenseQuery(faqPageQueryOptions());
	return data;
}

// ── Guides list ───────────────────────────────────────────────────────────────

export async function prefetchGuidesList(queryClient: QueryClient) {
	await queryClient.ensureQueryData(guidesListQueryOptions());
}

export function useGuidesList() {
	const { data } = useSuspenseQuery(guidesListQueryOptions());
	return data ?? [];
}

// ── Single guide by slug ──────────────────────────────────────────────────────

export async function prefetchGuideBySlug(
	queryClient: QueryClient,
	slug: string,
) {
	await queryClient.ensureQueryData(guideBySlugQueryOptions(slug));
}

export function useGuideBySlug(slug: string) {
	const { data } = useSuspenseQuery(guideBySlugQueryOptions(slug));
	return data;
}
