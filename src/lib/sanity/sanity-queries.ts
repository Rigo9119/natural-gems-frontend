import { queryOptions } from "@tanstack/react-query";
import { sanityClient } from "./sanity";
import {
	type AboutPage,
	type EmeraldPage,
	type FaqPage,
	type HomePage,
	STALE_TIME,
} from "./sanity-types";

// ── Shared SEO fragment ───────────────────────────────────────────────────────
// Fetches the seo object including the OG image asset URL via the image pipeline
const SEO_FRAGMENT = `
  seo {
    metaTitle,
    metaDescription,
    noIndex,
    ogImage { asset->{ url } }
  }
`;

// ── Home Page ─────────────────────────────────────────────────────────────────

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

// ── Emerald Page ──────────────────────────────────────────────────────────────

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

// ── About Page ────────────────────────────────────────────────────────────────

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

// ── FAQ Page ──────────────────────────────────────────────────────────────────

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
