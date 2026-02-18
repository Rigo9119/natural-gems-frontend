import type {StructureResolver} from 'sanity/structure'
import {HomeIcon, DiamondIcon, EnvelopeIcon} from '@sanity/icons'

// Document types managed inside page/section groups — excluded from the auto-generated list
const MANAGED_TYPES = [
  'homePage',
  'emeraldPage',
  'aboutPage',
  'newsletterSection',
  'whatsAppSection',
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      // ── Home Page (singleton) ──
      S.listItem()
        .title('Página de Inicio')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Pagina principal de esmeraldas')
        .icon(DiamondIcon)
        .child(S.document().schemaType('emeraldPage').documentId('emeraldPage')),
      S.listItem()
        .title('Pagina principal sobre nosotros')
        .icon(DiamondIcon)
        .child(S.document().schemaType('aboutPage').documentId('emeraldPage')),

      // ── Shared Sections ──
      S.listItem()
        .title('Secciones Compartidas')
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title('Secciones Compartidas')
            .items([
              S.listItem()
                .title('Newsletter')
                .child(S.documentList().title('Newsletter').filter('_type == "newsletterSection"')),
              S.listItem()
                .title('WhatsApp')
                .child(S.documentList().title('WhatsApp').filter('_type == "whatsAppSection"')),
            ]),
        ),

      S.divider(),

      // ── Everything else (auto-generated, excluding managed types) ──
      ...S.documentTypeListItems().filter(
        (listItem) => !MANAGED_TYPES.includes(listItem.getId() as string),
      ),
    ])
