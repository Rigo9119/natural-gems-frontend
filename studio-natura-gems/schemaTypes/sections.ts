import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero section',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Page Identifier',
      type: 'slug',
      description: 'Identifies which page this hero belongs to (e.g. "home", "emeralds")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
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
      name: 'ctaLinkLeft',
      title: 'CTA link left',
      type: 'string',
      description: 'Internal path (e.g. /emeralds) or external URL (e.g. https://...)',
    }),
    defineField({
      name: 'ctaTextRight',
      title: 'CTA text right',
      type: 'localizedString',
    }),
    defineField({
      name: 'ctaLinkRight',
      title: 'CTA link right',
      type: 'string',
      description: 'Internal path (e.g. /jewelry) or external URL (e.g. https://...)',
    }),
  ],
})
