# SEO & GEO — Guía de Aprendizaje

## Parte 1: SEO (Search Engine Optimization)

### Qué es
Optimización para que tu sitio aparezca como **enlace** en los resultados de Google, Bing, etc.

### Los 3 pilares del SEO

#### 1. SEO Técnico
Todo lo que ayuda a los motores de búsqueda a **encontrar y entender** tu sitio.

- **Meta tags** — `<title>` y `<meta name="description">` son lo que Google muestra en los resultados:
  ```html
  <title>Esmeraldas Colombianas | Natura Gems</title>
  <meta name="description" content="Esmeraldas certificadas directamente desde las minas de Muzo..." />
  ```
  - El **title** debe tener máximo ~60 caracteres
  - La **description** debe tener máximo ~155 caracteres
  - Cada página debe tener título y descripción únicos

- **Canonical URL** — Le dice a Google cuál es la URL "oficial" de una página, evitando contenido duplicado:
  ```html
  <link rel="canonical" href="https://naturagems.co/emeralds" />
  ```

- **Sitemap.xml** — Un archivo XML que lista todas las páginas de tu sitio para que Google las descubra:
  ```xml
  <urlset>
    <url>
      <loc>https://naturagems.co/</loc>
      <lastmod>2025-01-01</lastmod>
      <priority>1.0</priority>
    </url>
  </urlset>
  ```

- **Robots.txt** — Le dice a los crawlers qué pueden y qué no pueden indexar:
  ```
  User-agent: *
  Disallow: /admin
  Sitemap: https://naturagems.co/sitemap.xml
  ```

- **SSR (Server-Side Rendering)** — Crítico porque los crawlers necesitan ver el HTML completo. TanStack Start ya hace esto por defecto.

- **Velocidad de carga** — Google penaliza sitios lentos. Core Web Vitals (LCP, FID, CLS) son métricas clave.

#### 2. SEO On-Page
El contenido y estructura de cada página.

- **Encabezados jerárquicos** — Un solo `<h1>` por página, seguido de `<h2>`, `<h3>`, etc.
- **Alt text en imágenes** — Describe la imagen para Google Images y accesibilidad
- **URLs descriptivas** — `/emeralds/collection` es mejor que `/page?id=123`
- **Links internos** — Conecta tus páginas entre sí (ya lo haces con el nav y CTAs)
- **Contenido de calidad** — Texto original, relevante, que responda preguntas del usuario

#### 3. SEO Off-Page
Señales externas que aumentan la autoridad de tu sitio.

- **Backlinks** — Otros sitios que enlazan al tuyo (calidad > cantidad)
- **Redes sociales** — Presencia activa ayuda indirectamente
- **Google Business Profile** — Para negocios locales (Bogotá)

---

### Open Graph & Twitter Cards

Controlan cómo se ve tu sitio cuando alguien comparte un enlace en redes sociales.

**Open Graph** (Facebook, LinkedIn, WhatsApp):
```html
<meta property="og:title" content="Natura Gems — Esmeraldas Colombianas" />
<meta property="og:description" content="Esmeraldas certificadas desde Muzo..." />
<meta property="og:image" content="https://naturagems.co/og-image.jpg" />
<meta property="og:url" content="https://naturagems.co/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Natura Gems" />
```

**Twitter Cards**:
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Natura Gems — Esmeraldas Colombianas" />
<meta name="twitter:description" content="Esmeraldas certificadas desde Muzo..." />
<meta name="twitter:image" content="https://naturagems.co/og-image.jpg" />
```

**Tip**: La imagen OG ideal es 1200x630px.

---

### JSON-LD (Structured Data)

Le dice a Google exactamente qué tipo de contenido tiene tu página usando el vocabulario de schema.org. Esto habilita **rich snippets** (estrellas, FAQs, breadcrumbs en los resultados).

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Natura Gems",
  "url": "https://naturagems.co",
  "logo": "https://naturagems.co/logo512.png",
  "sameAs": [
    "https://instagram.com/naturagems"
  ]
}
</script>
```

**Tipos útiles para Natura Gems:**

| Tipo | Dónde | Qué hace |
|---|---|---|
| `Organization` | Global | Identifica la empresa |
| `LocalBusiness` | /contact | Muestra dirección, horario, teléfono en Google |
| `FAQPage` | /contact | Muestra preguntas y respuestas directamente en Google |
| `BreadcrumbList` | Subpáginas | Muestra la ruta de navegación (Home > Esmeraldas > Tienda) |
| `Product` | Páginas de producto | Muestra precio, disponibilidad, reviews en Google |

**Validador**: https://validator.schema.org — pega tu URL y verifica que el JSON-LD sea correcto.

---

## Parte 2: GEO (Generative Engine Optimization)

### Qué es
Optimización para que tu contenido sea **citado** por motores de IA (ChatGPT, Perplexity, Google AI Overviews, Bing Copilot) cuando generan respuestas.

### Por qué importa
Cada vez más personas buscan información a través de IA en lugar de Google tradicional. Si alguien pregunta "¿Dónde comprar esmeraldas colombianas online?", quieres que la IA mencione Natura Gems en su respuesta.

### Diferencia clave con SEO

| | SEO | GEO |
|---|---|---|
| **Objetivo** | Aparecer como enlace | Ser citado en respuestas de IA |
| **Target** | Crawlers de Google/Bing | LLMs (ChatGPT, Perplexity, Gemini) |
| **Señales clave** | Backlinks, keywords, velocidad | Datos estructurados, autoridad, respuestas directas |
| **Estilo de contenido** | Optimizado por keywords | Factual, citable, con estadísticas |
| **Técnico** | Meta tags, sitemap, robots.txt | JSON-LD, HTML semántico, llms.txt |

### Principios del GEO

#### 1. Contenido autoritativo y citable
La IA prefiere contenido que responde preguntas directamente con datos concretos.

**Malo** (vago, marketing):
> "Somos los mejores en esmeraldas"

**Bueno** (factual, citable):
> "Natura Gems ofrece esmeraldas colombianas certificadas por GIA, extraídas de las minas de Muzo, Boyacá, con envío asegurado a más de 50 países."

#### 2. Claridad de entidad
La IA construye "grafos de entidades" — necesita saber exactamente **qué** es tu sitio, **quién** eres, **dónde** operas.

Esto se logra con:
- JSON-LD (Organization, LocalBusiness)
- Consistencia en nombre, dirección, teléfono (NAP) en toda la web
- Página "Quiénes Somos" completa

#### 3. Formato pregunta-respuesta
Las IAs aman el formato Q&A. Tu sección FAQ en `/contact` ya es perfecta para esto. Cuantas más páginas tengan pares pregunta-respuesta claros, mejor.

#### 4. Datos estructurados (JSON-LD)
Lo mismo que en SEO, pero aún más importante para GEO. Los LLMs parsean JSON-LD para entender tu contenido de forma programática.

#### 5. Estadísticas y datos específicos
Contenido con números concretos se cita más:
- "3 generaciones de experiencia"
- "Esmeraldas desde 0.5 hasta 15 quilates"
- "Certificación GIA disponible"
- "Envío a más de 50 países"

#### 6. Archivo llms.txt
Similar a robots.txt pero para IAs. Un archivo en la raíz del sitio que describe tu negocio en texto plano, optimizado para que los LLMs lo lean:

```
# Natura Gems
> Colombian emerald dealer based in Bogotá, Colombia

## About
Natura Gems is a family-owned business with 3+ generations of experience in Colombian emeralds.
We source directly from the mines of Muzo, Boyacá.

## Products
- Loose emeralds (AAA, AA, A, B clarity grades)
- Emerald jewelry (rings, necklaces, earrings, bracelets)
- Wholesale pricing available

## Certifications
- GIA certification available
- Full origin traceability
- 30-day satisfaction guarantee

## Contact
- Location: Bogotá, Colombia
- WhatsApp: +57 300 123 4567
- Website: https://naturagems.co
```

#### 7. HTML semántico
Usar tags HTML correctos (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<figure>`, `<dl>`) ayuda a las IAs a entender la estructura del contenido. Tu sitio ya hace esto bien.

---

## Checklist de implementación

### SEO — Implementado
- [x] Meta tags por página (title, description) — `src/lib/seo.ts` + `head()` en cada ruta
- [x] Open Graph tags por página — via `buildMeta()`
- [x] Twitter Card tags por página — via `buildMeta()`
- [x] Canonical URLs — via `buildMeta()`
- [x] JSON-LD: Organization (global) — `__root.tsx`
- [x] JSON-LD: LocalBusiness (/contact) — `contact.tsx`
- [x] JSON-LD: FAQPage (/contact) — `contact.tsx`
- [x] JSON-LD: BreadcrumbList (subpáginas) — todas las rutas hijas
- [x] Sitemap.xml (API route) — `src/routes/api.sitemap.ts`
- [x] Robots.txt (actualizado con sitemap) — `public/robots.txt`
- [x] Manifest.json (branding correcto) — `public/manifest.json`
- [x] Security headers (Netlify) — `netlify.toml`

### GEO — Implementado
- [x] Archivo `llms.txt` — `public/llms.txt` (resumen conciso)
- [x] Archivo `llms-full.txt` — `public/llms-full.txt` (información completa)
- [x] Referencia en `robots.txt` — apunta a ambos archivos llms
- [ ] Revisar contenido para hacerlo más factual/citable (tarea de contenido)
- [ ] Expandir secciones FAQ con más preguntas (tarea de contenido)
- [ ] Asegurar consistencia NAP (Name, Address, Phone) en toda la web

---

## Parte 3: GEO — Detalles Técnicos de Implementación

### No necesitas librerías

GEO no requiere ningún paquete npm. Es 100% contenido y archivos estáticos. La razón es simple: los LLMs no ejecutan JavaScript — leen texto plano y HTML renderizado. Todo lo que necesitas es:

1. Archivos `.txt` en `public/`
2. JSON-LD (que ya implementamos para SEO)
3. HTML semántico (que ya usamos)
4. Contenido bien escrito

### llms.txt — El estándar emergente

#### Qué es
Un archivo de texto plano en la raíz de tu sitio web (`/llms.txt`) que describe tu negocio de forma estructurada para que los LLMs lo puedan leer y entender fácilmente. Es como un `robots.txt` pero para inteligencia artificial.

#### Por qué funciona
Cuando una IA como ChatGPT o Perplexity necesita información sobre un sitio web, puede:
1. Buscar `/llms.txt` primero (como hace Google con `robots.txt`)
2. Leer un resumen claro y estructurado sin parsear HTML
3. Usar esa información para generar respuestas

#### Formato estándar
El formato sigue Markdown simple:
```
# Nombre de la Empresa
> Descripción corta de una línea

## Sección
Contenido relevante...
```

#### Dos versiones
- **`llms.txt`** — Resumen conciso (lo que una IA necesita para una respuesta rápida)
- **`llms-full.txt`** — Información completa (para cuando la IA necesita profundizar)

El estándar está definido en https://llmstxt.org

#### Cómo referenciarlo
En `robots.txt`:
```
LLMs-Txt: https://tudominio.com/llms.txt
LLMs-Full-Txt: https://tudominio.com/llms-full.txt
```

### Contenido GEO-friendly vs. Marketing tradicional

La diferencia más importante entre contenido optimizado para SEO/marketing y contenido optimizado para GEO:

| Aspecto | Marketing / SEO | GEO |
|---|---|---|
| Tono | Persuasivo, emocional | Informativo, factual |
| Datos | "Los mejores del mercado" | "3 generaciones, certificación GIA, minas de Muzo" |
| Estructura | Párrafos con keywords | Listas, Q&A, datos estructurados |
| Objetivo | Que el usuario haga clic | Que la IA cite tu información |
| Formato | Optimizado para humanos | Optimizado para parsing automático |

**Clave**: No reemplazas tu contenido de marketing — lo **complementas** con contenido factual. Tu landing page puede ser emocional y aspiracional, pero tu `llms.txt`, tus FAQs y tu JSON-LD deben ser factuales y directos.

### Señales que los LLMs usan para decidir qué citar

1. **Especificidad** — "Esmeraldas de 0.5 a 15 quilates desde Muzo" > "Vendemos esmeraldas"
2. **Estructura** — Listas y Q&A > párrafos largos
3. **Consistencia** — La misma info (nombre, dirección, teléfono) en todo el sitio
4. **Frescura** — Contenido actualizado recientemente (importante mantener CMS activo)
5. **Autoridad** — Mencionar certificaciones reales (GIA), procesos verificables
6. **Formato machine-readable** — JSON-LD, Markdown estructurado, HTML semántico

### Cómo verificar tu GEO

No hay una herramienta oficial como Google Search Console para GEO, pero puedes:

1. **Preguntarle directamente a las IAs** — Busca "¿Dónde comprar esmeraldas colombianas?" en ChatGPT, Perplexity, Google AI Overview
2. **Verificar indexación** — Busca `site:naturagems.co` en Perplexity o Bing (que alimenta a muchas IAs)
3. **Revisar tu llms.txt** — Simplemente visita `https://naturagems.co/llms.txt` y verifica que sea legible
4. **Probar con diferentes preguntas**:
   - "Best Colombian emerald dealers online"
   - "Where to buy certified emeralds from Muzo"
   - "Colombian emerald wholesale suppliers"
   - Si la IA te menciona, tu GEO funciona

### GEO es un campo nuevo

Importante saber que GEO es un campo que está emergiendo (2024-2025). Las "reglas" aún no están tan establecidas como en SEO (que tiene 20+ años). Lo que sí sabemos:

- **El tráfico desde IAs está creciendo rápidamente** — Cada vez más gente usa ChatGPT/Perplexity en vez de Google
- **No hay un algoritmo público** — A diferencia de Google que documenta factores de ranking, los LLMs son más opacos
- **El estándar llms.txt está ganando tracción** — Más sitios lo adoptan y más IAs lo buscan
- **JSON-LD es doblemente importante** — Sirve tanto para SEO (rich snippets) como para GEO (entity understanding)
- **El contenido es rey** — Más que nunca, el contenido factual, específico y bien estructurado gana

---

## Recursos para seguir aprendiendo

### SEO
- **Google Search Central**: https://developers.google.com/search/docs
- **Schema.org**: https://schema.org/docs/documents.html
- **Rich Results Test**: https://search.google.com/test/rich-results
- **PageSpeed Insights**: https://pagespeed.web.dev
- **Open Graph Debugger (Facebook)**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator

### GEO
- **llms.txt Standard**: https://llmstxt.org
- **GEO Paper (Princeton)**: Buscar "GEO: Generative Engine Optimization" — el paper académico que introdujo el concepto
- **Perplexity**: https://perplexity.ai — úsalo para probar si tu sitio aparece en respuestas de IA
- **Bing Webmaster Tools**: https://www.bing.com/webmasters — Bing alimenta muchos LLMs (ChatGPT usa Bing para búsquedas)
