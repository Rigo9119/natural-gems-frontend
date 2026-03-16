import { createFileRoute } from "@tanstack/react-router"
import { sanityClient } from "@/lib/sanity/sanity"
import type { GuidePost } from "@/lib/sanity/sanity-types"
import { supabaseAdmin } from "@/lib/supabase-server"

const SITE_URL = "https://naturagems.co"

interface SitemapUrl {
	loc: string
	lastmod?: string
	changefreq?: string
	priority?: string
}

function urlEntry(entry: SitemapUrl): string {
	return `  <url>
    <loc>${entry.loc}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ""}
    <changefreq>${entry.changefreq ?? "monthly"}</changefreq>
    <priority>${entry.priority ?? "0.5"}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${entry.loc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${entry.loc.replace(SITE_URL, `${SITE_URL}/en`)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${entry.loc}"/>
  </url>`
}

async function fetchEmeralds() {
	try {
		const { data } = await supabaseAdmin
			.from("emeralds")
			.select("slug, created_at, status")
			.eq("status", "available")
			.eq("stone_count", 1)
		return data ?? []
	} catch {
		return []
	}
}

async function fetchGuides() {
	try {
		const data = await sanityClient.fetch<Pick<GuidePost, "_id" | "slug" | "publishedAt">[]>(
			`*[_type == "guide"] | order(publishedAt desc) { _id, slug, publishedAt }`,
		)
		return data ?? []
	} catch {
		return []
	}
}

export const Route = createFileRoute("/api/sitemap")({
	server: {
		handlers: {
			GET: async () => {
		const today = new Date().toISOString().slice(0, 10)

		const [emeralds, guides] = await Promise.all([
			fetchEmeralds(),
			fetchGuides(),
		])

		// Static routes
		const staticUrls: SitemapUrl[] = [
			{ loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0", lastmod: today },
			{ loc: `${SITE_URL}/emeralds`, changefreq: "weekly", priority: "0.9", lastmod: today },
			{ loc: `${SITE_URL}/emeralds/shop`, changefreq: "weekly", priority: "0.9", lastmod: today },
			{ loc: `${SITE_URL}/emeralds/collection`, changefreq: "monthly", priority: "0.7" },
			{ loc: `${SITE_URL}/emeralds/mayoristas`, changefreq: "monthly", priority: "0.7" },
			{ loc: `${SITE_URL}/jewelry`, changefreq: "weekly", priority: "0.9", lastmod: today },
			{ loc: `${SITE_URL}/guides`, changefreq: "weekly", priority: "0.8", lastmod: today },
			{ loc: `${SITE_URL}/about`, changefreq: "monthly", priority: "0.6" },
			{ loc: `${SITE_URL}/faq`, changefreq: "monthly", priority: "0.7" },
			{ loc: `${SITE_URL}/contact`, changefreq: "monthly", priority: "0.7" },
		]

		// Dynamic emerald detail pages
		const emeraldUrls: SitemapUrl[] = emeralds.map((e) => ({
			loc: `${SITE_URL}/emeralds/shop/${e.slug}`,
			lastmod: e.created_at ? e.created_at.slice(0, 10) : today,
			changefreq: "weekly",
			priority: "0.8",
		}))

		// Dynamic guide/blog pages
		const guideUrls: SitemapUrl[] = guides.map((g) => ({
			loc: `${SITE_URL}/guides/${g.slug.current}`,
			lastmod: g.publishedAt ? g.publishedAt.slice(0, 10) : today,
			changefreq: "monthly",
			priority: "0.7",
		}))

		const allUrls = [...staticUrls, ...emeraldUrls, ...guideUrls]

		const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

${allUrls.map(urlEntry).join("\n\n")}

</urlset>`

		return new Response(xml, {
				headers: {
					"Content-Type": "application/xml; charset=utf-8",
					"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
				},
			})
		},
		},
	},
})
