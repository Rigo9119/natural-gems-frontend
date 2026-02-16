import type {StructureResolver} from 'sanity/structure'
import {HomeIcon} from '@sanity/icons'

// Document types managed inside page groups — excluded from the auto-generated list
const PAGE_MANAGED_TYPES = [
  'heroSection',
  'dualCategorySection',
  'featuredProductsSection',
  'warrantySection',
  'newsletterSection',
  'whatsAppSection',
  'brandStorySection',
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      // ── Pages ──
      S.listItem()
        .title('Página de Inicio')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Secciones Página de Inicio')
            .items([
              S.listItem()
                .title('Hero')
                .child(
                  S.documentList()
                    .title('Hero')
                    .filter('_type == "heroSection" && slug.current == "home"'),
                ),
              S.listItem()
                .title('Doble Categoría')
                .child(
                  S.documentList()
                    .title('Doble Categoría')
                    .filter('_type == "dualCategorySection" && slug.current == "home"'),
                ),
              S.listItem()
                .title('Esmeraldas Destacadas')
                .child(
                  S.documentList()
                    .title('Esmeraldas Destacadas')
                    .filter(
                      '_type == "featuredProductsSection" && slug.current == "featured-emeralds"',
                    ),
                ),
              S.listItem()
                .title('Historia de marca')
                .child(
                  S.documentList()
                    .title('Historia de marca')
                    .filter('_type == "brandStorySection" && slug.current == "brand-story"'),
                ),
              S.listItem()
                .title('Joyería más Vendida')
                .child(
                  S.documentList()
                    .title('Joyería más Vendida')
                    .filter(
                      '_type == "featuredProductsSection" && slug.current == "best-sellers-jewelry"',
                    ),
                ),
              S.listItem()
                .title('Garantias')
                .child(
                  S.documentList()
                    .title('Garantias')
                    .filter('_type == "warrantySection" && slug.current == "warranties"'),
                ),
              S.listItem()
                .title('Newsletter')
                .child(
                  S.documentList()
                    .title('Newsletter')
                    .filter('_type == "newsletterSection" && slug.current == "newsletter"'),
                ),
              S.listItem()
                .title('Sección de WhatsApp')
                .child(
                  S.documentList()
                    .title('Sección de WhatsApp')
                    .filter('_type == "whatsAppSection" && slug.current == "whatsapp"'),
                ),
            ]),
        ),

      S.divider(),

      // ── Everything else (auto-generated, excluding page-managed types) ──
      ...S.documentTypeListItems().filter(
        (listItem) => !PAGE_MANAGED_TYPES.includes(listItem.getId() as string),
      ),
    ])
