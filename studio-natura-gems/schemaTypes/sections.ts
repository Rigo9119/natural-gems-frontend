import {defineField, defineType} from 'sanity'
import {InlineIcon} from '@sanity/icons'

export const dualCategorySection = defineType({
  name: 'dualCategorySection',
  title: 'Sección Doble Categoría',
  type: 'document',
  icon: InlineIcon,
  fields: [
    defineField({
      name: 'slug',
      title: 'Identificador de página',
      type: 'slug',
      description: 'Identifica a qué página pertenece esta sección (ej. "home")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'localizedString',
      description: 'Texto pequeño sobre el título (ej. "Dos mundos, una pasión")',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localizedString',
      description: 'Título principal de la sección (ej. "Descubre Nuestra Esencia")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Tarjetas',
      type: 'array',
      of: [{type: 'dualCategoryCard'}],
      description: 'Las tarjetas de categoría que se muestran en la sección',
      validation: (rule) => rule.required().min(1).max(4),
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'slug.current',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Sección Doble Categoría',
        subtitle: `Página: ${subtitle || '—'}`,
      }
    },
  },
})

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Sección Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Identificador de página',
      type: 'slug',
      description: 'Identifica a qué página pertenece este hero (ej. "home", "emeralds")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen de fondo',
      type: 'image',
      description: 'Imagen principal que se muestra de fondo en la sección hero',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'subTitle',
      title: 'Subtítulo',
      type: 'localizedString',
      description: 'Texto pequeño que aparece encima del título principal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título principal',
      type: 'localizedString',
      description: 'El título grande y destacado de la sección hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localizedBlock',
      description: 'Texto descriptivo que aparece debajo del título',
    }),
    defineField({
      name: 'ctaTextLeft',
      title: 'Texto del botón izquierdo',
      type: 'localizedString',
      description: 'Texto que se muestra en el primer botón de acción',
    }),
    defineField({
      name: 'ctaLinkLeft',
      title: 'Enlace del botón izquierdo',
      type: 'string',
      description: 'Ruta interna (ej. /emeralds) o URL externa (ej. https://...)',
    }),
    defineField({
      name: 'ctaTextRight',
      title: 'Texto del botón derecho',
      type: 'localizedString',
      description: 'Texto que se muestra en el segundo botón de acción',
    }),
    defineField({
      name: 'ctaLinkRight',
      title: 'Enlace del botón derecho',
      type: 'string',
      description: 'Ruta interna (ej. /jewelry) o URL externa (ej. https://...)',
    }),
  ],
})
