import {
	COMPANY_LOCATION,
	COMPANY_NAME,
	INSTAGRAM_URL,
	WHATSAPP_URL,
} from "./constants";

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
}

export function buildMeta({
	title,
	description = DEFAULT_DESCRIPTION,
	path = "/",
	ogImage = DEFAULT_OG_IMAGE,
	ogType = "website",
	jsonLd = [],
}: BuildMetaOptions = {}) {
	const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Esmeraldas Colombianas y Joyería`;
	const canonicalUrl = `${SITE_URL}${path}`;

	return {
		meta: [
			{ title: fullTitle },
			{ name: "description", content: description },
			{ property: "og:title", content: fullTitle },
			{ property: "og:description", content: description },
			{ property: "og:image", content: ogImage },
			{ property: "og:url", content: canonicalUrl },
			{ property: "og:type", content: ogType },
			{ property: "og:site_name", content: SITE_NAME },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: fullTitle },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: ogImage },
		],
		links: [{ rel: "canonical", href: canonicalUrl }],
		scripts: jsonLd.map((data) => ({
			type: "application/ld+json",
			children: JSON.stringify(data),
		})),
	};
}

export function organizationJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SITE_NAME,
		url: SITE_URL,
		logo: `${SITE_URL}/logo512.png`,
		sameAs: [INSTAGRAM_URL, WHATSAPP_URL],
	};
}

export function localBusinessJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: SITE_NAME,
		url: SITE_URL,
		image: `${SITE_URL}/logo512.png`,
		address: {
			"@type": "PostalAddress",
			addressLocality: "Bogotá",
			addressCountry: "CO",
		},
		telephone: "+5712345678",
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
		areaServed: "Worldwide",
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

export function breadcrumbJsonLd(
	items: { name: string; path: string }[],
) {
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
