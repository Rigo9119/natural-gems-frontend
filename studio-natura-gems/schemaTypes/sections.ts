import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

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
      name: 'ctaLeft',
      title: 'Botón izquierdo',
      type: 'cta',
      description: 'Primer botón de acción del hero',
    }),
    defineField({
      name: 'ctaRight',
      title: 'Botón derecho',
      type: 'cta',
      description: 'Segundo botón de acción del hero',
    }),
  ],
})

export const dualCategorySection = defineType({
  name: 'dualCategorySection',
  title: 'Sección Doble Categoría',
  type: 'document',
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

export const featuredProductsSection = defineType({
  name: 'featuredProductsSection',
  title: 'Productos destacados',
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
      name: 'title',
      title: 'Título',
      type: 'localizedString',
      description: 'Título principal de la sección (ej. "Descubre Nuestra Esmeraldas")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'localizedString',
      description: 'Texto pequeño sobre el título (ej. "Dos mundos, una pasión")',
    }),
    defineField({
      name: 'cta',
      title: 'Botón de acción',
      type: 'cta',
      description: 'CTA que se muestra en el botón de acción',
    }),
  ],
})

export const brandStorySection = defineType({
  name: 'brandStorySection',
  title: 'Historia de marca',
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
      type: 'localizedString',
      description: 'Texto descriptivo que aparece debajo del título',
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'array',
      of: [{type: 'statCard'}],
      description: 'Datos destacados de la marca (ej. 3 Generaciones, 100% Colombianas)',
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'cta',
      title: 'Botón de acción',
      type: 'cta',
      description: 'CTA que se muestra en el botón de acción',
    }),
  ],
})

export const warrantySection = defineType({
  name: 'warrantySection',
  title: 'Sección de garantias',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Identificador de sección',
      type: 'slug',
      description: 'Identifica esta sección (ej. "warranties")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'localizedString',
      description: 'Texto pequeño sobre el título',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localizedString',
      description: 'Título principal de la sección',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Tarjetas',
      type: 'array',
      of: [{type: 'iconCard'}],
      description: 'Las tarjetas con ícono que se muestran en la sección',
      validation: (rule) => rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'slug.current',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Sección de tarjetas con ícono',
        subtitle: `Sección: ${subtitle || '—'}`,
      }
    },
  },
})

export const newsletterSection = defineType({
  name: 'newsletterSection',
  title: 'Sección de newsletter',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Identificador de sección',
      type: 'slug',
      description: 'Identifica esta sección (ej. "newsletter")',
      validation: (rule) => rule.required(),
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
      description: 'Descripción de la sección',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'localizedString',
      description: 'Texto de marcador de posición para el campo de entrada',
    }),
    defineField({
      name: 'cta',
      title: 'Botón de acción',
      type: 'cta',
      description: 'CTA que se muestra en el botón de acción',
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'slug.current',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Sección de newsletter',
        subtitle: `Sección: ${subtitle || '—'}`,
      }
    },
  },
})

export const whatsAppSection = defineType({
  name: 'whatsAppSection',
  title: 'Sección de WhatsApp',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Identificador de sección',
      type: 'slug',
      description: 'Identifica esta sección (ej. "whatsapp")',
      validation: (rule) => rule.required(),
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
      description: 'Descripción de la sección',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Botón de acción',
      type: 'cta',
      description: 'CTA que se muestra en el botón de acción',
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'localizedString',
      description: 'Ubicación de la empresa',
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'slug.current',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Sección de WhatsApp',
        subtitle: `Sección: ${subtitle || '—'}`,
      }
    },
  },
})
