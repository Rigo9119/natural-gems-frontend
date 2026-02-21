import {
	COMPANY_LOCATION,
	COMPANY_NAME,
	INSTAGRAM_URL,
	WHATSAPP_NUMBER,
	WHATSAPP_URL,
} from "./constants";

export const SITE_URL = "https://naturagems.co";
export const SITE_NAME = COMPANY_NAME;
export const DEFAULT_DESCRIPTION =
	"Esmeraldas colombianas certificadas directamente desde las minas de Muzo. Joyería artesanal exclusiva con gemas de la más alta calidad. Envío asegurado a todo el mundo.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SeoOverrides {
	metaTitle?: string;
	metaDescription?: string;
	ogImage?: { asset?: { _ref?: string; url?: string } };
	noIndex?: boolean;
}

interface BuildMetaOptions {
	title?: string;
	description?: string;
	path?: string;
	ogImage?: string;
	ogType?: string;
	jsonLd?: object[];
	noIndex?: boolean;
}

// ── Core meta builder ─────────────────────────────────────────────────────────

export function buildMeta({
	title,
	description = DEFAULT_DESCRIPTION,
	path = "/",
	ogImage = DEFAULT_OG_IMAGE,
	ogType = "website",
	jsonLd = [],
	noIndex = false,
}: BuildMetaOptions = {}) {
	const fullTitle = title
		? `${title} | ${SITE_NAME}`
		: `${SITE_NAME} — Esmeraldas Colombianas y Joyería`;
	const canonicalUrl = `${SITE_URL}${path}`;
	const enUrl = `${SITE_URL}/en${path === "/" ? "" : path}`;

	return {
		meta: [
			{ title: fullTitle },
			{ name: "description", content: description },
			{
				name: "robots",
				content: noIndex
					? "noindex, follow"
					: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
			},
			{ property: "og:title", content: fullTitle },
			{ property: "og:description", content: description },
			{ property: "og:image", content: ogImage },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:url", content: canonicalUrl },
			{ property: "og:type", content: ogType },
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:locale", content: "es_CO" },
			{ property: "og:locale:alternate", content: "en_US" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:site", content: "@naturagems" },
			{ name: "twitter:title", content: fullTitle },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: ogImage },
		],
		links: [
			{ rel: "canonical", href: canonicalUrl },
			{ rel: "alternate", hreflang: "es", href: canonicalUrl },
			{ rel: "alternate", hreflang: "en", href: enUrl },
			{ rel: "alternate", hreflang: "x-default", href: canonicalUrl },
		],
		scripts: jsonLd.map((data) => ({
			type: "application/ld+json",
			children: JSON.stringify(data),
		})),
	};
}

// ── Sanity CMS SEO override resolver ─────────────────────────────────────────

export function resolveSanityMeta(
	sanity: SeoOverrides | null | undefined,
	defaults: BuildMetaOptions,
): BuildMetaOptions {
	if (!sanity) return defaults;
	let ogImage = defaults.ogImage;
	if (sanity.ogImage?.asset?.url) ogImage = sanity.ogImage.asset.url;
	return {
		...defaults,
		title: sanity.metaTitle ?? defaults.title,
		description: sanity.metaDescription ?? defaults.description,
		ogImage,
		noIndex: sanity.noIndex ?? defaults.noIndex ?? false,
	};
}

// ── Organization / LocalBusiness JSON-LD ─────────────────────────────────────

export function organizationJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SITE_NAME,
		url: SITE_URL,
		logo: `${SITE_URL}/logo512.png`,
		foundingDate: "1985",
		foundingLocation: { "@type": "Place", name: "Muzo, Boyaca, Colombia" },
		description:
			"Familia colombiana con tres generaciones de experiencia en el comercio de esmeraldas, directamente desde las minas de Muzo, Chivor y Coscuez.",
		sameAs: [INSTAGRAM_URL, WHATSAPP_URL],
		contactPoint: {
			"@type": "ContactPoint",
			telephone: `+${WHATSAPP_NUMBER}`,
			contactType: "customer service",
			availableLanguage: ["Spanish", "English"],
		},
		areaServed: "Worldwide",
		knowsAbout: [
			"Colombian emeralds",
			"Emerald grading",
			"Gemstone certification",
			"Muzo emeralds",
			"Chivor emeralds",
			"Emerald jewelry",
			"Gemological appraisal",
			"Wholesale gemstones",
		],
	};
}

export function localBusinessJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": ["LocalBusiness", "JewelryStore"],
		name: SITE_NAME,
		url: SITE_URL,
		image: `${SITE_URL}/og-image.jpg`,
		logo: `${SITE_URL}/logo512.png`,
		email: "info@naturagems.co",
		telephone: `+${WHATSAPP_NUMBER}`,
		priceRange: "$$$",
		currenciesAccepted: "USD, COP",
		paymentAccepted: "Cash, Credit Card, Wire Transfer",
		hasMap: `https://maps.google.com/?q=${encodeURIComponent(COMPANY_LOCATION)}`,
		address: {
			"@type": "PostalAddress",
			streetAddress: "Centro Internacional de Esmeraldas, Oficina 301",
			addressLocality: "Bogota",
			addressRegion: "Cundinamarca",
			addressCountry: "CO",
		},
		geo: { "@type": "GeoCoordinates", latitude: 4.711, longitude: -74.0721 },
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
				opens: "09:00",
				closes: "18:00",
			},
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: "Saturday",
				opens: "10:00",
				closes: "14:00",
			},
		],
		areaServed: "Worldwide",
	};
}

// ── FAQ JSON-LD ───────────────────────────────────────────────────────────────

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: { "@type": "Answer", text: faq.answer },
		})),
	};
}

// ── Breadcrumb JSON-LD ────────────────────────────────────────────────────────

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${SITE_URL}${item.path}`,
		})),
	};
}

// ── HowTo JSON-LD ─────────────────────────────────────────────────────────────

export function howToJsonLd(opts: {
	name: string;
	description: string;
	steps: { name: string; text: string }[];
}) {
	return {
		"@context": "https://schema.org",
		"@type": "HowTo",
		name: opts.name,
		description: opts.description,
		step: opts.steps.map((s, i) => ({
			"@type": "HowToStep",
			position: i + 1,
			name: s.name,
			text: s.text,
		})),
	};
}

// ── Article JSON-LD ───────────────────────────────────────────────────────────

export function articleJsonLd(opts: {
	title: string;
	description?: string;
	publishedAt: string;
	author?: string;
	coverImageUrl?: string;
	path: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: opts.title,
		description: opts.description ?? "",
		datePublished: opts.publishedAt,
		dateModified: opts.publishedAt,
		author: {
			"@type": "Person",
			name: opts.author ?? SITE_NAME,
		},
		publisher: {
			"@type": "Organization",
			name: SITE_NAME,
			logo: { "@type": "ImageObject", url: `${SITE_URL}/logo512.png` },
		},
		image: opts.coverImageUrl ?? DEFAULT_OG_IMAGE,
		url: `${SITE_URL}${opts.path}`,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${SITE_URL}${opts.path}`,
		},
	};
}

// ── Emerald ItemList JSON-LD ──────────────────────────────────────────────────

export function emeraldItemListJsonLd(
	products: {
		id: number;
		name: string;
		price: number;
		clarity: string;
		origin: string;
		carat: number;
		image: string;
	}[],
) {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Esmeraldas Colombianas",
		numberOfItems: products.length,
		itemListElement: products.map((p, i) => ({
			"@type": "ListItem",
			position: i + 1,
			item: {
				"@type": "Product",
				name: p.name,
				image: p.image,
				description: `Esmeralda colombiana ${p.clarity} de ${p.carat} quilates, origen ${p.origin}. Certificada con trazabilidad completa.`,
				brand: { "@type": "Brand", name: SITE_NAME },
				offers: {
					"@type": "Offer",
					priceCurrency: "USD",
					price: p.price,
					availability: "https://schema.org/InStock",
					seller: { "@type": "Organization", name: SITE_NAME },
				},
			},
		})),
	};
}

// ── Jewelry ItemList JSON-LD ──────────────────────────────────────────────────

export function jewelryItemListJsonLd(
	products: {
		id: number;
		name: string;
		price: number;
		category: string;
		material: string;
		image: string;
	}[],
) {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Joyeria con Esmeraldas Colombianas",
		numberOfItems: products.length,
		itemListElement: products.map((p, i) => ({
			"@type": "ListItem",
			position: i + 1,
			item: {
				"@type": "Product",
				name: p.name,
				image: p.image,
				description: `${p.category} artesanal en ${p.material} con esmeraldas colombianas certificadas.`,
				brand: { "@type": "Brand", name: SITE_NAME },
				offers: {
					"@type": "Offer",
					priceCurrency: "USD",
					price: p.price,
					availability: "https://schema.org/InStock",
					seller: { "@type": "Organization", name: SITE_NAME },
				},
			},
		})),
	};
}
