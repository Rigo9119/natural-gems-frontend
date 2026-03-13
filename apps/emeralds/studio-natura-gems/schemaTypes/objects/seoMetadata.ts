import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

/**
 * Reusable SEO metadata object — add to any page document as:
 *   defineField({ name: 'seo', type: 'seoMetadata' })
 *
 * All fields are optional. The frontend falls back to hardcoded
 * defaults from src/lib/seo.ts when a field is empty.
 */
export const seoMetadata = defineType({
  name: 'seoMetadata',
  title: 'SEO / Metadatos',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Título SEO',
      type: 'string',
      description:
        'Título que aparece en Google y en la pestaña del navegador. Si se deja vacío se usa el título por defecto. Recomendado: 50-60 caracteres.',
      validation: (Rule) =>
        Rule.max(60).warning('Los títulos de más de 60 caracteres se recortan en Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Descripción SEO',
      type: 'text',
      rows: 3,
      description:
        'Resumen de la página que aparece en los resultados de búsqueda y en los previews de redes sociales. Recomendado: 120-160 caracteres.',
      validation: (Rule) =>
        Rule.max(160).warning('Las descripciones de más de 160 caracteres se recortan en Google.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para redes sociales (OG Image)',
      type: 'image',
      description:
        'Imagen que aparece cuando se comparte la página en WhatsApp, Instagram, X (Twitter), Facebook, etc. Tamaño ideal: 1200 × 630 px.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'Ocultar de buscadores',
      type: 'boolean',
      description:
        'Activa esto para que Google y otros buscadores NO indexen esta página. Útil para páginas en construcción o contenido privado.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      subtitle: 'metaDescription',
    },
    prepare({title, subtitle}) {
      return {
        title: title || '(sin título SEO)',
        subtitle: subtitle || '(sin descripción SEO)',
      }
    },
  },
})
