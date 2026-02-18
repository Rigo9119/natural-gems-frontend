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

// ── Page singleton ──

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
}
