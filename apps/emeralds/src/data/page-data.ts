import { useSuspenseQuery } from "@tanstack/react-query";
import {
	aboutPageQueryOptions,
	emeraldPageQueryOptions,
	faqPageQueryOptions,
	guideBySlugQueryOptions,
	guidesListQueryOptions,
	homePageQueryOptions,
} from "@/lib/sanity/sanity-queries";

// ── Emerald Page ──────────────────────────────────────────────────────────────

export function useEmeraldPageData() {
	const { data } = useSuspenseQuery(emeraldPageQueryOptions());
	return data;
}

// ── About Page ────────────────────────────────────────────────────────────────

export function useAboutPageData() {
	const { data } = useSuspenseQuery(aboutPageQueryOptions());
	return data;
}

// ── FAQ Page ──────────────────────────────────────────────────────────────────

export function useFaqPageData() {
	const { data } = useSuspenseQuery(faqPageQueryOptions());
	return data;
}

// ── Guides list ───────────────────────────────────────────────────────────────

export function useGuidesList() {
	const { data } = useSuspenseQuery(guidesListQueryOptions());
	return data ?? [];
}

// ── Single guide by slug ──────────────────────────────────────────────────────

export function useGuideBySlug(slug: string) {
	const { data } = useSuspenseQuery(guideBySlugQueryOptions(slug));
	return data;
}

// ── Home Page ─────────────────────────────────────────────────────────────────

export function useHomePageData() {
	const { data } = useSuspenseQuery(homePageQueryOptions());
	return data;
}
