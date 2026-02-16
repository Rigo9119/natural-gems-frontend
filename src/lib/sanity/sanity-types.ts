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
export interface HeroSection {
  _id: string;
  slug?: { current: string };
  image?: SanityImage;
  subTitle?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedString;
  ctaLeft?: Cta;
  ctaRight?: Cta;
}

export interface Cta {
  text?: LocalizedString;
  link?: string;
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
  _id: string;
  slug?: { current: string };
  subtitle?: LocalizedString;
  title?: LocalizedString;
  cards?: DualCategoryCard[];
}

export interface FeaturedProductsSection {
  _id: string;
  slug?: { current: string };
  subtitle?: LocalizedString;
  title?: LocalizedString;
  cta?: Cta;
}

export interface IconCard {
  _key: string;
  icon?: string;
  title?: LocalizedString;
  description?: LocalizedString;
}

export interface WarrantySection {
  _id: string;
  slug?: { current: string };
  subtitle?: LocalizedString;
  title?: LocalizedString;
  cards?: IconCard[];
}

export interface NewsletterSection {
  _id: string;
  slug?: { current: string };
  title?: LocalizedString;
  description?: LocalizedString;
  placeholder?: LocalizedString;
  cta?: Cta;
}

export interface WhatsAppSection {
  _id: string;
  slug?: { current: string };
  title?: LocalizedString;
  description?: LocalizedString;
  cta?: Cta;
  location?: LocalizedString;
}

export interface StatCard {
  _key: string;
  value?: LocalizedString;
  label?: LocalizedString;
}

export interface BrandStorySection {
  _id: string;
  slug?: { current: string };
  image?: SanityImage;
  subTitle?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedString;
  stats?: StatCard[];
  cta?: Cta;
}
