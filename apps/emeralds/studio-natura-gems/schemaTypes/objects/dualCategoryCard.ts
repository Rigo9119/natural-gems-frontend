import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

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
