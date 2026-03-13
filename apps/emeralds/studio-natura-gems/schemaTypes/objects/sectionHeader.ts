import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Encabezado de sección',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'localizedString',
      description: 'Texto pequeño que aparece encima del título (ej. "Dos mundos, una pasión")',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localizedString',
      description: 'Título principal de la sección',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localizedString',
      description: 'Texto descriptivo que aparece debajo del título',
    }),
    defineField({
      name: 'cta',
      title: 'Botón de acción',
      type: 'cta',
      description: 'CTA opcional de la sección',
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'subtitle.es',
    },
  },
})
