import {defineField, defineType} from 'sanity'

// ── Inline object types (page-specific sections) ──

export const carousel = defineType({
  name: 'carousel',
  title: 'Carrusel',
  description: 'Un carrusel de imágenes para mostrar',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {name: 'image', type: 'image', options: {hotspot: true}},
        {name: 'alt', type: 'localizedString'},
        {name: 'caption', type: 'localizedString'},
      ],
    },
  ],
})

// ── Page singleton document ──

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Pagina principal sobre nosotros',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutCarousel',
      title: 'Carrusel de la página sobre nosotros',
      type: 'carousel',
    }),
    defineField({
      name: 'brandStory',
      title: 'Historia de la marca',
      type: 'brandStorySection',
      description: 'Sección de historia de la marca',
    }),
    defineField({
      name: 'ourValues',
      title: 'Nuestros valores',
      type: 'sectionWithIconCard',
    }),
    defineField({
      name: 'ourProces',
      title: 'Nuestro proceso',
      type: 'sectionWithIconCard',
    }),
    defineField({
      name: 'certificationsAndWarranties',
      title: 'Certificados y Garantías',
      type: 'object',
      fields: [
        defineField({
          name: 'subTitle',
          title: 'Subtítulo',
          type: 'localizedString',
          description: 'Subtítulo de la sección',
        }),
        defineField({
          name: 'title',
          title: 'Título',
          type: 'localizedString',
          description: 'Título de la sección',
        }),
        defineField({
          name: 'stats',
          title: 'Cartas de garantias y certificaciones',
          type: 'array',
          of: [{type: 'statCard'}],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      icon: 'icon',
    },
    prepare({title, icon}) {
      return {
        title: title || 'Tarjeta con ícono',
        subtitle: icon || '—',
      }
    },
  },
})
