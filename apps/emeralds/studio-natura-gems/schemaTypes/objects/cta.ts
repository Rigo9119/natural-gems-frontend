import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

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
