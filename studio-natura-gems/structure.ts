import type {StructureResolver} from 'sanity/structure'
import {HomeIcon} from '@sanity/icons'

// Document types managed inside page groups — excluded from the auto-generated list
const PAGE_MANAGED_TYPES = ['heroSection', 'dualCategorySection']

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
            .title('Página de Inicio')
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
            ]),
        ),

      S.divider(),

      // ── Everything else (auto-generated, excluding page-managed types) ──
      ...S.documentTypeListItems().filter(
        (listItem) => !PAGE_MANAGED_TYPES.includes(listItem.getId() as string),
      ),
    ])
