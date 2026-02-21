import { queryOptions } from "@tanstack/react-query";
import { sanityClient } from "./sanity";
import {
	type AboutPage,
	type EmeraldPage,
	type FaqPage,
	type GuidePost,
	type HomePage,
	STALE_TIME,
} from "./sanity-types";

// ── SEO fragment (reused across all page queries) ─────────────────────────────

const SEO_FRAGMENT = `
  seo {
    metaTitle,
    metaDescription,
    noIndex,
    ogImage { asset->{ _ref, url } }
  }
`;

// ── Home page ─────────────────────────────────────────────────────────────────

export function homePageQueryOptions() {
	return queryOptions({
		queryKey: ["sanity", "homePage"],
		queryFn: async () => {
			const data = await sanityClient.fetch<HomePage | null>(
				`*[_type == "homePage"][0]{
					...,
					newsletter->{...},
					whatsApp->{...},
					${SEO_FRAGMENT}
				}`,
			);
			return data;
		},
		staleTime: STALE_TIME,
	});
}

// ── Emerald page ──────────────────────────────────────────────────────────────

export function emeraldPageQueryOptions() {
	return queryOptions({
		queryKey: ["sanity", "emeraldPage"],
		queryFn: async () => {
			const data = await sanityClient.fetch<EmeraldPage | null>(
				`*[_type == "emeraldPage"][0]{
					...,
					${SEO_FRAGMENT}
				}`,
			);
			return data;
		},
		staleTime: STALE_TIME,
	});
}

// ── About page ────────────────────────────────────────────────────────────────

export function aboutPageQueryOptions() {
	return queryOptions({
		queryKey: ["sanity", "aboutPage"],
		queryFn: async () => {
			const data = await sanityClient.fetch<AboutPage | null>(
				`*[_type == "aboutPage"][0]{
					...,
					${SEO_FRAGMENT}
				}`,
			);
			return data;
		},
		staleTime: STALE_TIME,
	});
}

// ── FAQ page ──────────────────────────────────────────────────────────────────

export function faqPageQueryOptions() {
	return queryOptions({
		queryKey: ["sanity", "faqPage"],
		queryFn: async () => {
			const data = await sanityClient.fetch<FaqPage | null>(
				`*[_type == "faqPage"][0]{
					...,
					${SEO_FRAGMENT}
				}`,
			);
			return data;
		},
		staleTime: STALE_TIME,
	});
}

// ── Guides list (no body — too heavy for listing) ─────────────────────────────

export function guidesListQueryOptions() {
	return queryOptions({
		queryKey: ["sanity", "guides"],
		queryFn: async () => {
			const data = await sanityClient.fetch<GuidePost[]>(
				`*[_type == "guide"] | order(publishedAt desc) {
					_id,
					title,
					slug,
					category,
					publishedAt,
					author,
					metaDescription,
					coverImage { asset->{ _ref, url } }
				}`,
			);
			return data ?? [];
		},
		staleTime: STALE_TIME,
	});
}

// ── Single guide by slug (includes full body) ─────────────────────────────────

export function guideBySlugQueryOptions(slug: string) {
	return queryOptions({
		queryKey: ["sanity", "guide", slug],
		queryFn: async () => {
			const data = await sanityClient.fetch<GuidePost | null>(
				`*[_type == "guide" && slug.current == $slug][0]{
					_id,
					title,
					slug,
					category,
					publishedAt,
					author,
					metaDescription,
					coverImage { asset->{ _ref, url } },
					body[] {
						...,
						_type == "image" => {
							...,
							asset->{ _ref, url }
						}
					}
				}`,
				{ slug },
			);
			return data;
		},
		staleTime: STALE_TIME,
	});
}
