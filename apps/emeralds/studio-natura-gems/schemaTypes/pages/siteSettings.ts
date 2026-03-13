import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  icon: CogIcon,
  // Singleton — no create/delete, only edit+publish
  __experimental_actions: ['update', 'publish'],
  groups: [
    {name: 'identity', title: 'Identidad'},
    {name: 'contact', title: 'Contacto'},
    {name: 'hours', title: 'Horario'},
    {name: 'social', title: 'Redes sociales'},
    {name: 'seo', title: 'SEO global'},
  ],
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    defineField({
      name: 'companyName',
      title: 'Nombre de la empresa',
      type: 'string',
      group: 'identity',
      description: 'Aparece en JSON-LD, llms.txt y metadatos globales.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'identity',
      description: 'Frase corta que describe el negocio. Aparece en llms.txt y resultados de IA.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'about',
      title: 'Sobre nosotros (resumen)',
      type: 'text',
      rows: 4,
      group: 'identity',
      description: 'Párrafo corto para motores de búsqueda y crawlers de IA (llms.txt). No es el contenido de la página /about.',
    }),
    defineField({
      name: 'values',
      title: 'Valores de la empresa',
      type: 'array',
      group: 'identity',
      description: 'Usados en llms-full.txt para contexto de marca ante crawlers de IA.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Descripción', type: 'string', validation: (Rule) => Rule.required()}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        },
      ],
    }),

    // ── Contact ───────────────────────────────────────────────────────────────
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp (con código de país)',
      type: 'string',
      group: 'contact',
      description: 'Incluir + y código de país. Ej: +573001234567. Aparece en JSON-LD y llms.txt.',
      validation: (Rule) => Rule.regex(/^\+\d{7,15}$/, {name: 'E.164', invert: false}).warning('Formato esperado: +573001234567'),
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono fijo (opcional)',
      type: 'string',
      group: 'contact',
      description: 'Si es diferente al WhatsApp. Ej: +5712345678.',
    }),
    defineField({
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'object',
      group: 'contact',
      description: 'Aparece en LocalBusiness JSON-LD y llms.txt.',
      fields: [
        defineField({name: 'street', title: 'Calle / Oficina', type: 'string'}),
        defineField({name: 'city', title: 'Ciudad', type: 'string'}),
        defineField({name: 'region', title: 'Departamento / Región', type: 'string'}),
        defineField({name: 'country', title: 'País', type: 'string', initialValue: 'Colombia'}),
        defineField({name: 'postalCode', title: 'Código postal', type: 'string'}),
      ],
    }),

    // ── Hours ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'businessHours',
      title: 'Horario de atención',
      type: 'array',
      group: 'hours',
      description: 'Aparece en LocalBusiness JSON-LD, llms.txt y sitemaps. Añade una fila por bloque de días.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'days', title: 'Días', type: 'string', description: 'Ej: Lunes a Viernes', validation: (Rule) => Rule.required()}),
            defineField({name: 'hours', title: 'Horario', type: 'string', description: 'Ej: 9:00 AM – 6:00 PM (COT)', validation: (Rule) => Rule.required()}),
            defineField({
              name: 'dayOfWeek',
              title: 'Días de la semana (para JSON-LD)',
              type: 'array',
              description: 'Selecciona los días que corresponden a esta fila para el schema.org estructurado.',
              of: [{type: 'string'}],
              options: {
                list: [
                  {title: 'Lunes', value: 'Monday'},
                  {title: 'Martes', value: 'Tuesday'},
                  {title: 'Miércoles', value: 'Wednesday'},
                  {title: 'Jueves', value: 'Thursday'},
                  {title: 'Viernes', value: 'Friday'},
                  {title: 'Sábado', value: 'Saturday'},
                  {title: 'Domingo', value: 'Sunday'},
                ],
              },
            }),
            defineField({name: 'opens', title: 'Apertura (HH:MM)', type: 'string', description: 'Ej: 09:00'}),
            defineField({name: 'closes', title: 'Cierre (HH:MM)', type: 'string', description: 'Ej: 18:00'}),
          ],
          preview: {
            select: {title: 'days', subtitle: 'hours'},
          },
        },
      ],
    }),

    // ── Social ────────────────────────────────────────────────────────────────
    defineField({
      name: 'socialInstagram',
      title: 'Instagram (sin @)',
      type: 'string',
      group: 'social',
      description: 'Solo el nombre de usuario. Ej: naturagems',
    }),
    defineField({
      name: 'socialFacebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'socialLinkedin',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'social',
    }),

    // ── SEO Global ────────────────────────────────────────────────────────────
    defineField({
      name: 'defaultOgImage',
      title: 'Imagen OG por defecto',
      type: 'image',
      group: 'seo',
      description: 'Imagen de respaldo cuando una página no tiene su propia OG image. Tamaño ideal: 1200 × 630 px.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'priceRange',
      title: 'Rango de precios (JSON-LD)',
      type: 'string',
      group: 'seo',
      description: 'Valor schema.org para LocalBusiness. Ej: $$$',
      options: {
        list: [
          {title: '$ — Económico', value: '$'},
          {title: '$$ — Moderado', value: '$$'},
          {title: '$$$ — Alto', value: '$$$'},
          {title: '$$$$ — Lujo', value: '$$$$'},
        ],
      },
      initialValue: '$$$',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Configuración del sitio',
        subtitle: 'Identidad, contacto, horario, SEO global',
      }
    },
  },
})
