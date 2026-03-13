import {
	COMPANY_NAME,
	INSTAGRAM_URL,
	WHATSAPP_NUMBER,
	WHATSAPP_URL,
} from "./constants";
import type { SeoMetadata } from "./sanity/sanity-types";

export const SITE_URL = "https://naturagems.co";
export const SITE_NAME = COMPANY_NAME;
export const DEFAULT_DESCRIPTION =
	"Esmeraldas colombianas certificadas directamente desde las minas de Muzo. Joyería artesanal exclusiva con gemas de la más alta calidad. Envío asegurado a todo el mundo.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface BuildMetaOptions {
	title?: string;
	description?: string;
	path?: string;
	ogImage?: string;
	ogType?: string;
	jsonLd?: object[];
	/** Set to true for UI-state pages that should not be indexed (e.g. compare) */
	noIndex?: boolean;
}

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
			// Robots
			...(noIndex
				? [{ name: "robots", content: "noindex, follow" }]
				: [
						{
							name: "robots",
							content:
								"index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
						},
					]),
			// Open Graph
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
			// Twitter / X
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:site", content: "@naturagems" },
			{ name: "twitter:title", content: fullTitle },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: ogImage },
		],
		links: [
			{ rel: "canonical", href: canonicalUrl },
			// hreflang alternates for bilingual site
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

/**
 * Resolves SEO options from a Sanity `seoMetadata` object, falling back to
 * hardcoded defaults when fields are empty or the document hasn't been filled in.
 *
 * Usage in a route head():
 *   const seo = resolveSanityMeta(page?.seo, { path: '/about', title: 'Quiénes Somos', ... })
 *   return buildMeta(seo)
 */
export function resolveSanityMeta(
	sanityData: SeoMetadata | undefined | null,
	defaults: BuildMetaOptions,
): BuildMetaOptions {
	// If Sanity supplied an ogImage, resolve its CDN URL from the asset reference
	const sanityOgImage = (
		sanityData?.ogImage as unknown as { asset?: { url?: string } } | undefined
	)?.asset?.url;

	return {
		...defaults,
		...(sanityData?.metaTitle ? { title: sanityData.metaTitle } : {}),
		...(sanityData?.metaDescription
			? { description: sanityData.metaDescription }
			: {}),
		...(sanityOgImage ? { ogImage: sanityOgImage } : {}),
		...(sanityData?.noIndex != null ? { noIndex: sanityData.noIndex } : {}),
	};
}

// ─── Schema.org JSON-LD Helpers ─────────────────────────────────────────────

export function organizationJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SITE_NAME,
		url: SITE_URL,
		logo: `${SITE_URL}/logo512.png`,
		image: `${SITE_URL}/og-image.jpg`,
		description:
			"Natura Gems es una empresa familiar colombiana con más de 3 generaciones de experiencia en la comercialización de esmeraldas colombianas certificadas y joyería artesanal.",
		foundingDate: "1985",
		foundingLocation: {
			"@type": "Place",
			name: "Muzo, Boyacá, Colombia",
		},
		address: {
			"@type": "PostalAddress",
			addressLocality: "Bogotá",
			addressCountry: "CO",
		},
		contactPoint: {
			"@type": "ContactPoint",
			telephone: `+${WHATSAPP_NUMBER}`,
			contactType: "customer service",
			availableLanguage: ["Spanish", "English"],
		},
		sameAs: [INSTAGRAM_URL, WHATSAPP_URL],
		areaServed: "Worldwide",
		knowsAbout: [
			"Colombian emeralds",
			"emerald grading",
			"gemstone certification",
			"Muzo emeralds",
			"Chivor emeralds",
			"Coscuez emeralds",
			"artisan jewelry",
			"GIA certification",
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
		description:
			"Tienda especializada en esmeraldas colombianas certificadas y joyería artesanal con gemas de las minas de Muzo, Chivor y Coscuez.",
		address: {
			"@type": "PostalAddress",
			streetAddress: "Centro Internacional de Esmeraldas, Oficina 301",
			addressLocality: "Bogotá",
			addressRegion: "Cundinamarca",
			addressCountry: "CO",
		},
		telephone: `+${WHATSAPP_NUMBER}`,
		email: "info@naturagems.co",
		priceRange: "$$$$",
		currenciesAccepted: "USD, COP",
		paymentAccepted: "Cash, Credit Card, Wire Transfer",
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
		geo: {
			"@type": "GeoCoordinates",
			latitude: 4.711,
			longitude: -74.0721,
		},
		hasMap: "https://maps.google.com/?q=Bogotá,Colombia",
		areaServed: "Worldwide",
		sameAs: [INSTAGRAM_URL, WHATSAPP_URL],
	};
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};
}

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

interface EmeraldProductJsonLdOptions {
	id: number;
	name: string;
	price: number;
	carat: number;
	origin: string;
	clarity: string;
	cut: string;
	image: string;
}

export function emeraldProductJsonLd(product: EmeraldProductJsonLdOptions) {
	const clarityDescriptions: Record<string, string> = {
		AAA: "Premium — máxima pureza y brillantez, menos del 5% de las esmeraldas extraídas alcanzan esta calidad",
		AA: "Selecta — alta calidad con excelente saturación de color y mínimas inclusiones visibles",
		A: "Clásica — buen color y claridad, ideal para joyería elegante del día a día",
		B: "Natural — piedras con carácter natural, perfectas para diseños artesanales únicos",
	};

	return {
		"@context": "https://schema.org",
		"@type": "Product",
		"@id": `${SITE_URL}/emeralds/tienda#product-${product.id}`,
		name: product.name,
		description: `Esmeralda colombiana ${product.clarity} de ${product.carat} quilates, origen ${product.origin}, corte ${product.cut}. ${clarityDescriptions[product.clarity] ?? ""}`,
		image: product.image,
		brand: {
			"@type": "Brand",
			name: SITE_NAME,
		},
		material: "Esmeralda colombiana natural",
		additionalProperty: [
			{
				"@type": "PropertyValue",
				name: "Quilates",
				value: `${product.carat} ct`,
			},
			{
				"@type": "PropertyValue",
				name: "Origen",
				value: `${product.origin}, Boyacá, Colombia`,
			},
			{
				"@type": "PropertyValue",
				name: "Claridad",
				value: product.clarity,
			},
			{
				"@type": "PropertyValue",
				name: "Corte",
				value: product.cut,
			},
			{
				"@type": "PropertyValue",
				name: "Certificado",
				value: "Incluye certificado de autenticidad",
			},
		],
		offers: {
			"@type": "Offer",
			url: `${SITE_URL}/emeralds/tienda`,
			price: product.price,
			priceCurrency: "USD",
			availability: "https://schema.org/InStock",
			seller: {
				"@type": "Organization",
				name: SITE_NAME,
			},
		},
	};
}

export function emeraldItemListJsonLd(products: EmeraldProductJsonLdOptions[]) {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Esmeraldas Colombianas Certificadas — Natura Gems",
		description:
			"Colección de esmeraldas colombianas sueltas certificadas, directamente desde las minas de Muzo, Chivor y Coscuez.",
		url: `${SITE_URL}/emeralds/tienda`,
		numberOfItems: products.length,
		itemListElement: products.map((product, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: emeraldProductJsonLd(product),
		})),
	};
}

interface JewelryProductJsonLdOptions {
	id: number;
	name: string;
	price: number;
	category: string;
	material: string;
	collection: string;
	image: string;
	isNew?: boolean;
	isBestSeller?: boolean;
}

export function jewelryProductJsonLd(product: JewelryProductJsonLdOptions) {
	const categoryTypeMap: Record<string, string> = {
		Anillos: "Ring",
		Collares: "Necklace",
		Pulseras: "Bracelet",
		Aretes: "Earring",
		Dijes: "Pendant",
	};

	return {
		"@context": "https://schema.org",
		"@type": "Product",
		"@id": `${SITE_URL}/jewelry#product-${product.id}`,
		name: product.name,
		description: `${product.category} artesanal con esmeralda colombiana certificada. Material: ${product.material}. Colección ${product.collection}.${product.isBestSeller ? " Más vendido." : ""}${product.isNew ? " Nuevo." : ""}`,
		image: product.image,
		brand: {
			"@type": "Brand",
			name: SITE_NAME,
		},
		category: categoryTypeMap[product.category] ?? product.category,
		material: `${product.material} con esmeralda colombiana natural`,
		additionalProperty: [
			{
				"@type": "PropertyValue",
				name: "Material",
				value: product.material,
			},
			{
				"@type": "PropertyValue",
				name: "Colección",
				value: product.collection,
			},
			{
				"@type": "PropertyValue",
				name: "Gema",
				value: "Esmeralda colombiana certificada",
			},
		],
		offers: {
			"@type": "Offer",
			url: `${SITE_URL}/jewelry`,
			price: product.price,
			priceCurrency: "COP",
			availability: "https://schema.org/InStock",
			seller: {
				"@type": "Organization",
				name: SITE_NAME,
			},
		},
	};
}

export function jewelryItemListJsonLd(products: JewelryProductJsonLdOptions[]) {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Joyería Artesanal con Esmeraldas Colombianas — Natura Gems",
		description:
			"Colección de joyería artesanal elaborada con esmeraldas colombianas certificadas y metales preciosos.",
		url: `${SITE_URL}/jewelry`,
		numberOfItems: products.length,
		itemListElement: products.map((product, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: jewelryProductJsonLd(product),
		})),
	};
}

export function howToJsonLd(
	name: string,
	description: string,
	steps: { name: string; text: string }[],
) {
	return {
		"@context": "https://schema.org",
		"@type": "HowTo",
		name,
		description,
		step: steps.map((step, index) => ({
			"@type": "HowToStep",
			position: index + 1,
			name: step.name,
			text: step.text,
		})),
	};
}
