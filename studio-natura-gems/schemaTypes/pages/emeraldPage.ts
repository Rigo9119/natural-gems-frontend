import {defineField, defineType} from 'sanity'

// ── Inline object types (page-specific sections) ──

export const qualitySection = defineType({
  name: 'qualitySection',
  title: 'Sección de calidad',
  type: 'object',
  description: 'Sección exclusiva de la página de inicio',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localizedString',
      description: 'Título de la sección',
    }),
    defineField({
      name: 'subTitle',
      title: 'Subtitulo',
      type: 'localizedString',
      description: 'Subtitulo de la sección',
    }),
  ],
})

// ── Page singleton document ──

export const emeraldPage = defineType({
  name: 'emeraldPage',
  title: 'Pagina principal esmeraldas',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'heroSection',
      description: 'Sección hero principal de la página de inicio',
    }),
    defineField({
      name: 'exclusive',
      title: 'Sección exclusiva',
      type: 'sectionHeader',
      description: 'Sección exclusiva de la página de inicio',
    }),
    defineField({
      name: 'brandStory',
      title: 'Historia de la marca',
      type: 'brandStorySection',
      description: 'Sección de historia de la marca',
    }),
    defineField({
      name: 'collection',
      title: 'Sección coleccion',
      type: 'sectionHeader',
      description: 'Sección exclusiva de la página de inicio',
    }),
    defineField({
      name: 'qualitySection',
      title: 'Sección de calidad',
      type: 'qualitySection',
      description: 'Sección exclusiva de la página de inicio',
    }),
    defineField({
      name: 'wholeSaleSection',
      title: 'Sección de compra al por mayor',
      type: 'heroSection',
      description: 'Sección de compra al por mayor',
    }),
    defineField({
      name: 'seo',
      title: 'SEO / Metadatos',
      type: 'seoMetadata',
      description: 'Configuracion de SEO para esta pagina.',
    }),
  ],
})
