# E-Commerce para Natura Gems — Opciones y Recomendación

## Contexto
La sección de joyería necesita funcionalidad de e-commerce: carrito de compras, checkout, pagos, gestión de pedidos e inventario. El frontend ya existe (TanStack Start + Sanity CMS). Se necesita decidir qué plataforma/stack usar para la parte transaccional.

---

## Opción 1: Shopify Storefront API (Headless)

### Cómo funciona
Shopify actúa como el "backend de comercio". Tu frontend (TanStack Start) se comunica con Shopify vía su API GraphQL para mostrar productos, manejar el carrito y procesar pagos. El cliente gestiona pedidos, inventario y envíos desde el admin de Shopify.

### Arquitectura
```
Frontend (TanStack Start)
  ├── Contenido → Sanity CMS
  ├── Productos/Carrito/Checkout → Shopify Storefront API (GraphQL)
  └── Auth (opcional) → Shopify Customer API o Supabase
```

### Qué incluye Shopify
- Catálogo de productos con variantes (talla, material, piedra)
- Carrito persistente (Storefront API Cart)
- Checkout seguro (PCI DSS Level 1 — el más alto)
- Procesamiento de pagos (Stripe, PayPal, tarjetas, PSE para Colombia)
- Cálculo automático de impuestos por país
- Tarifas de envío (integración con DHL, FedEx, etc.)
- Gestión de pedidos y reembolsos
- Dashboard de analytics
- Notificaciones por email (confirmación, envío, entrega)
- Gestión de inventario
- Descuentos y códigos promocionales
- Multi-moneda

### Paquete necesario
```bash
bun add @shopify/storefront-api-client
```

### Ejemplo de integración
```tsx
// Fetch de productos desde Shopify
const { data } = await storefront.request(PRODUCTS_QUERY);

// Crear carrito
const cart = await storefront.request(CREATE_CART_MUTATION, {
  variables: { lines: [{ merchandiseId: variantId, quantity: 1 }] }
});

// Redirigir a checkout
window.location.href = cart.checkoutUrl;
```

### Flujo del usuario
1. Navega la joyería en tu frontend
2. Agrega al carrito (manejado por Shopify Storefront API)
3. Click en "Pagar" → Redirige al checkout de Shopify (o checkout embebido)
4. Paga con tarjeta/PayPal/PSE
5. Recibe confirmación por email
6. El cliente ve el pedido en su admin de Shopify

### Pros
- **Confiabilidad probada** — Shopify procesa +$444 billones en ventas, lo usan marcas de joyería de lujo a nivel mundial
- **PCI Compliance incluida** — No manejas datos de tarjetas, Shopify se encarga (esto es crítico para joyería de alto valor)
- **Infraestructura completa** — Pagos, envíos, impuestos, inventario, reembolsos, todo resuelto
- **Dashboard para el cliente** — El dueño gestiona pedidos sin necesitar a un desarrollador
- **Multi-moneda y multi-idioma** — Importante para ventas internacionales de esmeraldas
- **Fraud protection** — Detección de fraude incluida (importante para transacciones de alto valor)
- **Ecosistema de apps** — Miles de integraciones (email marketing, loyalty, reviews, etc.)
- **Velocidad de implementación** — Se integra en días, no semanas
- **Uptime 99.99%** — No te preocupas por la infraestructura

### Contras
- **Costo mensual** — Basic $39/mes, Shopify $105/mes, Advanced $399/mes + tarifas de transacción (2.9% + $0.30 por venta o menos según plan)
- **Dependencia de vendor** — Tu catálogo y pedidos viven en Shopify
- **Checkout limitado en personalización** — El checkout de Shopify tiene diseño propio (se puede customizar con Checkout Extensions pero tiene límites)
- **Duplicación de datos** — Productos en Shopify + contenido en Sanity = dos fuentes de verdad para catálogo
- **GraphQL obligatorio** — La Storefront API es solo GraphQL, no REST
- **Overkill para pocas ventas** — Si el volumen es bajo, el costo fijo mensual pesa

### Costos estimados
| Concepto | Costo |
|---|---|
| Plan Basic | $39/mes |
| Tarifa por transacción | 2.9% + $0.30 por venta |
| Dominio personalizado | Incluido |
| SSL | Incluido |
| Apps adicionales | $0-50/mes (opcional) |

---

## Opción 2: Stripe + Supabase (Custom)

### Cómo funciona
Construyes tu propio sistema de e-commerce. Supabase almacena productos, carrito, pedidos y usuarios. Stripe procesa los pagos. Tú controlas toda la experiencia.

### Arquitectura
```
Frontend (TanStack Start)
  ├── Contenido → Sanity CMS
  ├── Productos/Pedidos/Auth → Supabase (PostgreSQL + Auth + Storage)
  ├── Pagos → Stripe (Checkout Sessions o Payment Intents)
  └── Emails → Resend / SendGrid / Supabase Edge Functions
```

### Lo que construyes tú
- Tablas en Supabase: `products`, `product_variants`, `cart_items`, `orders`, `order_items`
- Row Level Security (RLS) para proteger datos de usuarios
- Carrito persistente (Supabase + TanStack Query)
- Flujo de checkout (Stripe Checkout o Payment Elements embebidos)
- Webhook de Stripe → Supabase Edge Function (confirmar pago, actualizar inventario)
- Gestión de inventario (decrementar stock al confirmar pago)
- Panel de admin (o usar Supabase Dashboard directamente)
- Emails transaccionales (confirmación, envío)

### Paquetes necesarios
```bash
bun add stripe @stripe/stripe-js
# @supabase/supabase-js ya está instalado
```

### Ejemplo de integración
```tsx
// API route: crear sesión de Stripe Checkout
const session = await stripe.checkout.sessions.create({
  line_items: cartItems.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  })),
  mode: 'payment',
  success_url: `${SITE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${SITE_URL}/jewelry`,
});

// Redirigir al checkout de Stripe
window.location.href = session.url;
```

### Flujo del usuario
1. Navega la joyería en tu frontend
2. Agrega al carrito (guardado en Supabase)
3. Click en "Pagar" → Redirige a Stripe Checkout (o checkout embebido)
4. Paga con tarjeta/PSE/otros métodos
5. Stripe webhook → Supabase Edge Function confirma el pago
6. Se crea el pedido en Supabase, se decrementa inventario
7. Se envía email de confirmación
8. El cliente ve pedidos en su dashboard (que tú construyes) o en Supabase

### Pros
- **Sin costos fijos mensuales** — Solo pagas las transacciones de Stripe (2.9% + $0.30)
- **Control total** — Diseñas cada parte de la experiencia, sin limitaciones de plataforma
- **Una sola fuente de datos** — Productos, usuarios, pedidos, todo en Supabase (PostgreSQL)
- **Stack unificado** — Ya planeabas usar Supabase para auth y database
- **Sin vendor lock-in** — Supabase es open-source, Stripe es el estándar de la industria
- **Checkout personalizable** — Puedes usar Stripe Checkout (hosted) o Payment Elements (embebido) con tu propio diseño
- **Supabase Realtime** — Notificaciones en tiempo real de nuevos pedidos
- **Edge Functions** — Webhooks y lógica server-side sin servidor adicional
- **Escalable** — Supabase Free tier es generoso, Pro es $25/mes con mucho espacio

### Contras
- **Mucho más trabajo de desarrollo** — Semanas vs. días. Necesitas construir: carrito, checkout, webhooks, gestión de inventario, emails, panel admin
- **PCI Compliance es tu responsabilidad parcial** — Stripe Checkout maneja la parte más crítica, pero el resto del flujo depende de ti
- **Sin gestión de envíos incluida** — Necesitas integrar un servicio aparte (Shippo, EasyPost) o manejar envíos manualmente
- **Sin cálculo automático de impuestos** — Necesitas Stripe Tax ($0.50 por transacción) o implementar tu propia lógica
- **Sin fraud protection avanzada** — Stripe Radar está incluido en nivel básico, pero no es tan completo como Shopify
- **Mantenimiento continuo** — Actualizaciones de seguridad, migraciones de DB, edge cases de pagos
- **Sin dashboard de pedidos listo** — O usas Supabase Dashboard directamente, o construyes un panel de admin
- **Emails transaccionales** — Necesitas configurar un servicio aparte (Resend, SendGrid)
- **No hay ecosistema de apps** — Cada funcionalidad adicional (reviews, loyalty, descuentos) la construyes tú

### Costos estimados
| Concepto | Costo |
|---|---|
| Supabase Free tier | $0/mes (hasta 500MB DB, 50K auth users) |
| Supabase Pro (si necesitas más) | $25/mes |
| Stripe por transacción | 2.9% + $0.30 por venta |
| Stripe Tax (opcional) | $0.50 por transacción |
| Servicio de email (Resend) | $0/mes (hasta 3K emails) o $20/mes |
| Servicio de envíos (Shippo) | Gratis (pagas solo las etiquetas) |

---

## Comparación directa

| Aspecto | Shopify Headless | Stripe + Supabase |
|---|---|---|
| **Tiempo de implementación** | 1-2 semanas | 4-8 semanas |
| **Costo mensual fijo** | ~$39-105/mes | ~$0-25/mes |
| **Costo por transacción** | 2.9% + $0.30 | 2.9% + $0.30 |
| **Pagos** | Incluido (múltiples métodos) | Stripe (múltiples métodos) |
| **Inventario** | Incluido + dashboard | Lo construyes tú |
| **Envíos** | Incluido (tarifas automáticas) | Integración manual |
| **Impuestos** | Automático por país | Stripe Tax ($0.50/tx) o manual |
| **Fraude** | Protección avanzada incluida | Stripe Radar (básico) |
| **Emails** | Incluidos (confirmación, envío) | Servicio aparte |
| **Panel admin** | Dashboard completo | Supabase Dashboard o custom |
| **Personalización** | Media (checkout limitado) | Total |
| **Vendor lock-in** | Alto (datos en Shopify) | Bajo (open-source) |
| **Mantenimiento** | Bajo (Shopify se encarga) | Alto (tú te encargas) |
| **Escalabilidad** | Probada a cualquier escala | Depende de tu implementación |

---

## Recomendación

### Para Natura Gems: **Shopify Storefront API (Headless)**

**Razón principal**: Natura Gems vende joyería de alto valor con esmeraldas colombianas a clientes internacionales. Este tipo de negocio necesita:

1. **Confianza del comprador** — Un checkout seguro y conocido. Cuando alguien va a gastar $500-$5000+ en una joya, necesita sentir que su pago es seguro. Shopify es reconocido mundialmente.

2. **Envíos internacionales** — Vender esmeraldas a Europa, Asia y América requiere cálculo de impuestos por país, tarifas de envío reales, y tracking. Shopify lo tiene resuelto.

3. **Gestión de pedidos profesional** — El cliente (dueño de Natura Gems) necesita ver pedidos, gestionar reembolsos, imprimir etiquetas de envío, sin depender de un desarrollador.

4. **Tiempo al mercado** — Con Shopify Headless puedes lanzar el e-commerce en 1-2 semanas. Con Stripe + Supabase son 4-8 semanas y mucho más código que mantener.

5. **Protección contra fraude** — En joyería de alto valor, el fraude es un riesgo real. Shopify tiene detección avanzada de fraude incluida.

### Cuándo elegiría Stripe + Supabase en su lugar

- Si el volumen de ventas es muy bajo (< 5 ventas/mes) y el costo fijo de Shopify no se justifica
- Si necesitas una experiencia de checkout 100% personalizada que Shopify no permite
- Si el negocio es solo Colombia (sin complejidad de impuestos internacionales)
- Si prefieres tener control total del stack y no depender de terceros
- Si el presupuesto de desarrollo es alto pero el presupuesto mensual es bajo

### Enfoque híbrido recomendado

```
Sanity CMS → Contenido editorial (historia, about, blog, FAQs)
Shopify    → Catálogo de productos, precios, inventario, checkout, pedidos
Supabase   → Auth de usuarios, wishlists, reviews, datos propios
Frontend   → TanStack Start consume las 3 APIs
```

Esto te da lo mejor de cada mundo:
- Sanity para contenido que el cliente edita libremente
- Shopify para la maquinaria de comercio que no quieres construir
- Supabase para features personalizadas que Shopify no cubre
