import {defineField, defineType} from 'sanity'
import {LinkIcon, ImageIcon, StarIcon, BarChartIcon} from '@sanity/icons'

export const cta = defineType({
  name: 'cta',
  title: 'Llamada a la acción',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Texto',
      type: 'localizedString',
      description: 'Texto visible del botón o enlace',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Enlace',
      type: 'string',
      description: 'Ruta interna (ej. /emeralds) o URL externa (ej. https://...)',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const dualCategoryCard = defineType({
  name: 'dualCategoryCard',
  title: 'Tarjeta de categoría',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      description: 'Imagen de fondo de la tarjeta',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'localizedString',
      description: 'Texto pequeño sobre el título (ej. "Gemas Sueltas")',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localizedString',
      description: 'Título principal de la tarjeta (ej. "Esmeraldas")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localizedString',
      description: 'Texto breve debajo del título',
    }),
    defineField({
      name: 'cta',
      title: 'Enlace',
      type: 'cta',
      description: 'Botón de acción de la tarjeta',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'subtitle.es',
      media: 'image',
    },
  },
})

export const iconCard = defineType({
  name: 'iconCard',
  title: 'Tarjeta con ícono',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Ícono',
      type: 'string',
      description: 'Nombre del ícono a mostrar',
      options: {
        list: [
          {title: 'Escudo (Certificado)', value: 'shield'},
          {title: 'Premio (Origen)', value: 'award'},
          {title: 'Camión (Envío)', value: 'truck'},
          {title: 'Gema (Garantía)', value: 'gem'},
          {title: 'Estrella', value: 'sparkles'},
          {title: 'Corazón', value: 'heart'},
          {title: 'Verificado', value: 'check-circle'},
          {title: 'Candado', value: 'lock'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localizedString',
      description: 'Título de la tarjeta (ej. "Certificado GIA")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localizedString',
      description: 'Texto descriptivo de la tarjeta',
      validation: (rule) => rule.required(),
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

export const statCard = defineType({
  name: 'statCard',
  title: 'Estadística',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Valor',
      type: 'localizedString',
      description: 'El número o dato destacado (ej. "3", "100%", "GIA")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Etiqueta',
      type: 'localizedString',
      description: 'Descripción corta del dato (ej. "Generaciones", "Colombianas")',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'value.es',
      subtitle: 'label.es',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Estadística',
        subtitle: subtitle || '—',
      }
    },
  },
})
