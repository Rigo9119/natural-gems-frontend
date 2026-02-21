export const STALE_TIME = 5 * 60 * 1000;

export interface LocalizedString {
	es?: string;
	en?: string;
}

export interface SanityImage {
	_type: "image";
	asset: {
		_ref: string;
		_type: "reference";
		url?: string;
	};
	hotspot?: {
		x: number;
		y: number;
	};
}

export interface Cta {
	text?: LocalizedString;
	link?: string;
}

export interface SectionHeader {
	subtitle?: LocalizedString;
	title?: LocalizedString;
	description?: LocalizedString;
	cta?: Cta;
}

// ── Inline object types (page-specific sections) ──

export interface HeroSection {
	image?: SanityImage;
	subTitle?: LocalizedString;
	title?: LocalizedString;
	description?: LocalizedString;
	ctaLeft?: Cta;
	ctaRight?: Cta;
}

export interface DualCategoryCard {
	_key: string;
	image?: SanityImage;
	subtitle?: LocalizedString;
	title?: LocalizedString;
	description?: LocalizedString;
	cta?: Cta;
}

export interface DualCategorySection {
	header?: SectionHeader;
	cards?: DualCategoryCard[];
}

export interface FeaturedProductsSection {
	header?: SectionHeader;
}

export interface IconCard {
	_key: string;
	icon?: string;
	title?: LocalizedString;
	description?: LocalizedString;
}

export interface WarrantySection {
	header?: SectionHeader;
	cards?: IconCard[];
}

export interface StatCard {
	_key: string;
	value?: LocalizedString;
	label?: LocalizedString;
}

export interface BrandStorySection {
	image?: SanityImage;
	header?: SectionHeader;
	stats?: StatCard[];
}

// ── Document types (shared sections) ──

export interface NewsletterSection {
	_id: string;
	slug?: { current: string };
	header?: SectionHeader;
	placeholder?: LocalizedString;
}

export interface WhatsAppSection {
	_id: string;
	slug?: { current: string };
	header?: SectionHeader;
	location?: LocalizedString;
}

// ── SEO metadata (shared across all page singletons) ──

export interface SeoMetadata {
	metaTitle?: string;
	metaDescription?: string;
	ogImage?: SanityImage;
	noIndex?: boolean;
}

// ── Page singletons ──

export interface HomePage {
	_id: string;
	hero?: HeroSection;
	dualCategory?: DualCategorySection;
	featuredEmeralds?: FeaturedProductsSection;
	brandStory?: BrandStorySection;
	bestSellersJewelry?: FeaturedProductsSection;
	warranty?: WarrantySection;
	newsletter?: NewsletterSection;
	whatsApp?: WhatsAppSection;
	seo?: SeoMetadata;
}

export interface EmeraldPage {
	_id: string;
	hero?: HeroSection;
	exclusive?: SectionHeader;
	brandStory?: BrandStorySection;
	collection?: SectionHeader;
	seo?: SeoMetadata;
}

export interface AboutPage {
	_id: string;
	seo?: SeoMetadata;
}

export interface FaqPage {
	_id: string;
	seo?: SeoMetadata;
}

// ── Portable Text (for guide body) ──

export interface PortableTextSpan {
	_type: "span";
	_key: string;
	text: string;
	marks?: string[];
}

export interface PortableTextImage {
	_type: "image";
	_key: string;
	asset: { _ref: string; _type: "reference"; url?: string };
	alt?: string;
	caption?: string;
}

export type PortableTextChild = PortableTextSpan | PortableTextImage;

export interface PortableTextBlock {
	_type: "block" | "image";
	_key: string;
	style?: "normal" | "h2" | "h3" | "h4" | "blockquote";
	listItem?: "bullet" | "number";
	level?: number;
	children?: PortableTextChild[];
	markDefs?: { _key: string; _type: string; href?: string }[];
	// image block fields
	asset?: { _ref: string; _type: "reference"; url?: string };
	alt?: string;
	caption?: string;
}

// ── Guide (blog post) ──

export interface GuidePost {
	_id: string;
	title: string;
	slug: { current: string };
	category?: string;
	publishedAt: string;
	author?: string;
	coverImage?: SanityImage;
	metaDescription?: string;
	body?: PortableTextBlock[];
}
