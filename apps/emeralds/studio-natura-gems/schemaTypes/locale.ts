import {defineField, defineType} from 'sanity'

const supportedLanguages = [
  {id: 'es', title: 'Español', isDefault: true},
  {id: 'en', title: 'English'},
]

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: supportedLanguages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'string',
    }),
  ),
})

export const localizedBlock = defineType({
  name: 'localizedBlock',
  title: 'Localized Block',
  type: 'object',
  fields: supportedLanguages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'text',
    }),
  ),
})
