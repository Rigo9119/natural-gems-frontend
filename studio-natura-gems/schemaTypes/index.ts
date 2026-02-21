import {localizedBlock, localizedString} from './locale'
import {
  cta,
  dualCategoryCard,
  iconCard,
  sectionHeader,
  statCard,
  sectionWithIconCard,
  seoMetadata,
} from './objects'

import {
  brandStorySection,
  dualCategorySection,
  emeraldPage,
  heroSection,
  homePage,
  newsletterSection,
  qualitySection,
  warrantySection,
  whatsAppSection,
  carousel,
  aboutPage,
  faqPage,
  emeraldGuideSection,
  faqType,
  guide,
} from './sections'

export const schemaTypes = [
  // Locale
  localizedString,
  localizedBlock,

  // Objects (reusable)
  cta,
  sectionHeader,
  dualCategoryCard,
  iconCard,
  statCard,
  sectionWithIconCard,
  seoMetadata,

  // Objects — Home page sections (inline)
  heroSection,
  brandStorySection,
  dualCategorySection,
  warrantySection,

  // Objects — Emerald page sections (inline)
  qualitySection,

  // Objects — About page sections (inline)
  carousel,

  // Objects — FAQ page sections (inline)
  emeraldGuideSection,
  faqType,

  // Documents — Pages
  homePage,
  emeraldPage,
  aboutPage,
  faqPage,
  guide,

  // Documents — Shared sections
  newsletterSection,
  whatsAppSection,
]
