import {defineField, defineType} from 'sanity'

export const newsletterSection = defineType({
  name: 'newsletterSection',
  title: 'Sección de newsletter',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Identificador de sección',
      type: 'slug',
      description: 'Identifica esta sección (ej. "newsletter")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'header',
      title: 'Encabezado',
      type: 'sectionHeader',
      description: 'Título, descripción y CTA de la sección',
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'localizedString',
      description: 'Texto de marcador de posición para el campo de entrada',
    }),
  ],
  preview: {
    select: {
      title: 'header.title.es',
      subtitle: 'slug.current',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Sección de newsletter',
        subtitle: `Sección: ${subtitle || '—'}`,
      }
    },
  },
})

export const whatsAppSection = defineType({
  name: 'whatsAppSection',
  title: 'Sección de WhatsApp',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Identificador de sección',
      type: 'slug',
      description: 'Identifica esta sección (ej. "whatsapp")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'header',
      title: 'Encabezado',
      type: 'sectionHeader',
      description: 'Título, descripción y CTA de la sección',
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'localizedString',
      description: 'Ubicación de la empresa',
    }),
  ],
  preview: {
    select: {
      title: 'header.title.es',
      subtitle: 'slug.current',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Sección de WhatsApp',
        subtitle: `Sección: ${subtitle || '—'}`,
      }
    },
  },
})
