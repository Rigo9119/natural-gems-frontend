import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'

export const guide = defineType({
  name: 'guide',
  title: 'Guias / Blog',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      description: 'Titulo del articulo. Aparece en la pagina y en los resultados de busqueda.',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'URL del articulo. Se genera automaticamente desde el titulo.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      description: 'Categoria tematica del articulo.',
      options: {
        list: [
          {title: 'Compra', value: 'Compra'},
          {title: 'Inversion', value: 'Inversion'},
          {title: 'Autenticidad', value: 'Autenticidad'},
          {title: 'Origen', value: 'Origen'},
          {title: 'Calidad', value: 'Calidad'},
          {title: 'Joyeria', value: 'Joyeria'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicacion',
      type: 'date',
      description: 'Fecha en que se publica el articulo.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      description: 'Nombre del autor del articulo.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      description: 'Imagen principal del articulo. Tamanio ideal: 1200 x 630 px.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Descripcion de la imagen para accesibilidad y SEO.',
        }),
      ],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Descripcion SEO',
      type: 'text',
      rows: 3,
      description:
        'Resumen del articulo para Google y redes sociales. Recomendado: 120-160 caracteres.',
      validation: (Rule) =>
        Rule.max(160).warning('Las descripciones de mas de 160 caracteres se recortan en Google.'),
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      description: 'Contenido principal del articulo. Soporta texto enriquecido e imagenes.',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Cita', value: 'blockquote'},
          ],
          lists: [
            {title: 'Lista con puntos', value: 'bullet'},
            {title: 'Lista numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrita', value: 'strong'},
              {title: 'Italica', value: 'em'},
              {title: 'Subrayado', value: 'underline'},
              {title: 'Codigo', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto']}),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Abrir en nueva pestana',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              description: 'Descripcion de la imagen para accesibilidad y SEO.',
            }),
            defineField({
              name: 'caption',
              title: 'Pie de foto',
              type: 'string',
              description: 'Texto que aparece debajo de la imagen.',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      publishedAt: 'publishedAt',
      media: 'coverImage',
    },
    prepare({title, category, publishedAt, media}) {
      return {
        title: title || 'Sin titulo',
        subtitle: [category, publishedAt].filter(Boolean).join(' · '),
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Mas reciente primero',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
