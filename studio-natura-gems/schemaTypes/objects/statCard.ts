import {defineField, defineType} from 'sanity'
import {BarChartIcon} from '@sanity/icons'

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
