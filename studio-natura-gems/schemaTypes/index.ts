import {localizedBlock, localizedString} from './locale'
import {
  cta,
  dualCategoryCard,
  iconCard,
  sectionHeader,
  statCard,
  sectionWithIconCard,
} from './objects'
import {carousel, aboutPage} from './pages/about'
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

  // Objects — Home page sections (inline)
  heroSection,
  brandStorySection,
  dualCategorySection,
  warrantySection,

  // Objects — Emerald page sections (inline)
  qualitySection,

  // Objects — About page sections (inline)
  carousel,

  // Documents — Pages
  homePage,
  emeraldPage,
  aboutPage,

  // Documents — Shared sections
  newsletterSection,
  whatsAppSection,
]
