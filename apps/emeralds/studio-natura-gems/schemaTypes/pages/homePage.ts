import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

// ── Inline object types (page-specific sections) ──

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Sección Hero',
  type: 'object',
  fields: [
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
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'subtitle.es',
    },
  },
})

export const dualCategorySection = defineType({
  name: 'dualCategorySection',
  title: 'Sección Doble Categoría',
  type: 'object',
  fields: [
    defineField({
      name: 'header',
      title: 'Encabezado',
      type: 'sectionHeader',
      description: 'Subtítulo, título y CTA de la sección',
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
})

export const brandStorySection = defineType({
  name: 'brandStorySection',
  title: 'Historia de marca',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Imagen de fondo',
      type: 'image',
      description: 'Imagen principal que se muestra de fondo en la sección',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'header',
      title: 'Encabezado',
      type: 'sectionHeader',
      description: 'Subtítulo, título, descripción y CTA de la sección',
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'array',
      of: [{type: 'statCard'}],
      description: 'Datos destacados de la marca (ej. 3 Generaciones, 100% Colombianas)',
      validation: (rule) => rule.max(6),
    }),
  ],
})

export const warrantySection = defineType({
  name: 'warrantySection',
  title: 'Sección de garantías',
  type: 'object',
  fields: [
    defineField({
      name: 'header',
      title: 'Encabezado',
      type: 'sectionHeader',
      description: 'Subtítulo y título de la sección',
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
})

// ── Page singleton document ──

export const homePage = defineType({
  name: 'homePage',
  title: 'Página de Inicio',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'heroSection',
      description: 'Sección hero principal de la página de inicio',
    }),
    defineField({
      name: 'dualCategory',
      title: 'Doble Categoría',
      type: 'dualCategorySection',
      description: 'Sección de categorías (Esmeraldas y Joyería)',
    }),
    defineField({
      name: 'featuredEmeralds',
      title: 'Esmeraldas Destacadas',
      type: 'sectionHeader',
      description: 'Encabezado de la sección de esmeraldas destacadas',
    }),
    defineField({
      name: 'brandStory',
      title: 'Historia de Marca',
      type: 'brandStorySection',
      description: 'Sección de historia y herencia de la marca',
    }),
    defineField({
      name: 'bestSellersJewelry',
      title: 'Joyería más Vendida',
      type: 'sectionHeader',
      description: 'Encabezado de la sección de joyería más vendida',
    }),
    defineField({
      name: 'warranty',
      title: 'Garantías',
      type: 'warrantySection',
      description: 'Sección de garantías y confianza',
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter',
      type: 'reference',
      to: [{type: 'newsletterSection'}],
      description: 'Referencia a la sección compartida de newsletter',
    }),
    defineField({
      name: 'whatsApp',
      title: 'WhatsApp',
      type: 'reference',
      to: [{type: 'whatsAppSection'}],
      description: 'Referencia a la sección compartida de WhatsApp',
    }),
    defineField({
      name: 'seo',
      title: 'SEO / Metadatos',
      type: 'seoMetadata',
      description: 'Configuracion de SEO para esta pagina. Si se deja vacio se usan los valores por defecto.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Página de Inicio',
      }
    },
  },
})
