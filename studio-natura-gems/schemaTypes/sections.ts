import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero section',
  type: 'document',
  fields: [
    defineField({
      name: 'subTitle',
      title: 'Hero Subtitle',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Hero description',
      type: 'localizedBlock',
    }),
    defineField({
      name: 'ctaTextLeft',
      title: 'CTA text left',
      type: 'localizedString',
    }),
    defineField({
      name: 'ctaTextRight',
      title: 'CTA text right',
      type: 'localizedString',
    }),
  ],
})
