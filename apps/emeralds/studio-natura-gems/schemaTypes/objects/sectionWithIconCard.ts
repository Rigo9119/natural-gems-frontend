import {defineType, defineField} from 'sanity'

export const sectionWithIconCard = defineType({
  name: 'sectionWithIconCard',
  title: 'Sección con iconos y textos',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionHeader',
      title: 'Header de sección',
      type: 'sectionHeader',
    }),
    defineField({
      name: 'iconCards',
      title: 'Cards con iconos',
      type: 'array',
      of: [{type: 'iconCard'}],
    }),
  ],
})
