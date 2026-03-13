import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

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
      name: 'subTitle',
      title: 'Sub Título',
      type: 'localizedString',
      description: 'Sub Título de la tarjeta (ej. "Certificado GIA")',
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
