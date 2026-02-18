import {defineType, defineField} from 'sanity'

export const sectionWithIconCard = defineType({
  name: 'ourValues',
  title: 'Nuestros valores',
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
      type: 'iconCards',
    }),
  ],
})
