import {defineType, defineField} from 'sanity'

export const faqType = defineType({
  name: 'faqType',
  title: 'Sección de Preguntas y Respuestas',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta',
      type: 'localizedString',
      description: 'Pregunta de la tarjeta (ej. "¿Qué es un emerald?")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Respuesta',
      type: 'localizedString',
      description: 'Respuesta de la tarjeta (ej. "Un emerald es un mineral de hierro")',
    }),
  ],
})

export const emeraldGuideSection = defineType({
  name: 'emeraldGuideSection',
  title: 'Guía de Esmeraldas',
  type: 'object',
  fields: [
    defineField({
      name: 'pageHeader',
      title: 'Header de la sección',
      type: 'sectionHeader',
    }),
    defineField({
      name: 'sectioCards',
      title: 'Seccion con iconos y textos',
      type: 'array',
      of: [{type: 'iconCard'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare({title, icon}) {
      return {
        title: title || '-',
        subtitle: icon || '—',
      }
    },
  },
})

export const faqPage = defineType({
  name: 'faqPage',
  title: 'Página de preguntas frecuentes',
  type: 'document',
  fields: [
    defineField({
      name: 'pageHeader',
      title: 'Header de la sección',
      type: 'sectionHeader',
    }),
    defineField({
      name: 'emeraldGuideSection',
      title: 'Guía de Esmeraldas',
      type: 'emeraldGuideSection',
    }),
    defineField({
      name: 'faqSection',
      title: 'Sección de FAQ',
      type: 'faqType',
    }),
    defineField({
      name: 'seo',
      title: 'SEO / Metadatos',
      type: 'seoMetadata',
      description: 'Configuracion de SEO para esta pagina.',
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
