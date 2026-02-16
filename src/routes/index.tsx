import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Gem, Shield, Sparkles, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { getBestSellers } from "@/data/demo-jewelry-products";
import { demoProducts } from "@/data/demo-products";
import { COMPANY_LOCATION, COMPANY_NAME, WHATSAPP_URL } from "@/lib/constants";
import {
  type DualCategorySection,
  type HeroSection,
  dualCategorySectionQueryOptions,
  heroSectionQueryOptions,
} from "@/lib/sanity-queries";
import { buildMeta } from "@/lib/seo";
import DualCategoryCard from "@/components/DualCategoryCard";
import Hero from "@/components/Hero";
import { localizeContent } from "@/hooks/sanity-helper";

export const Route = createFileRoute("/")({
  head: () =>
    buildMeta({
      path: "/",
      description:
        "Esmeraldas colombianas certificadas directamente desde las minas de Muzo. Joyería artesanal exclusiva con gemas de la más alta calidad. Envío asegurado a todo el mundo.",
    }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(heroSectionQueryOptions("home")),
      context.queryClient.ensureQueryData(
        dualCategorySectionQueryOptions("home"),
      ),
    ]);
  },
  component: HomePage,
});

const guarantees = [
  {
    icon: Shield,
    title: "Certificado GIA",
    description:
      "Todas nuestras esmeraldas pueden ser certificadas por el Gemological Institute of America.",
  },
  {
    icon: Award,
    title: "Origen Verificado",
    description:
      "Cada piedra cuenta con trazabilidad completa desde la mina hasta tu mano.",
  },
  {
    icon: Truck,
    title: "Envío Asegurado",
    description:
      "Todos los envíos incluyen seguro completo contra pérdida o daño durante el transporte.",
  },
  {
    icon: Gem,
    title: "Garantía 30 Días",
    description:
      "Si no estás satisfecho, tienes 30 días para devolver tu esmeralda sin preguntas.",
  },
];

function HomePage() {
  const { data: hero } = useSuspenseQuery(heroSectionQueryOptions("home"));
  const { data: dualCategory } = useSuspenseQuery(
    dualCategorySectionQueryOptions("home"),
  );
  const bestSellers = getBestSellers().slice(0, 4);
  const featuredEmeralds = demoProducts.slice(0, 4);

  return (
    <div>
      {/* ── Section 1: Full-Screen Hero ── */}
      <Hero hero={hero as HeroSection} />

      {/* ── Section 2: Dual Category Showcase ── */}
      {dualCategory && (
        <section
          id="discover"
          className="bg-brand-primary-lighter py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="mb-10 text-center sm:mb-14">
              <p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-primary-dark/60 sm:text-sm">
                {localizeContent(dualCategory.subtitle ?? {})}
              </p>
              <h2 className="font-heading text-3xl text-brand-primary-dark sm:text-4xl md:text-5xl">
                {localizeContent(dualCategory.title ?? {})}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
              {dualCategory.cards?.map((card) => (
                <DualCategoryCard
                  key={card._key}
                  title={localizeContent(card.title ?? {}) ?? ""}
                  subtitle={localizeContent(card.subtitle ?? {}) ?? ""}
                  description={localizeContent(card.description ?? {}) ?? ""}
                  imageSrc={card.image ?? ""}
                  imageAlt={localizeContent(card.title ?? {}) ?? ""}
                  linkTo={card.cta?.link ?? "/"}
                  linkText={localizeContent(card.cta?.text ?? {}) ?? ""}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 3: Featured Emeralds ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-primary-dark/60 sm:text-sm">
                Gemas Selectas
              </p>
              <h2 className="font-heading text-3xl text-brand-primary-dark sm:text-4xl">
                Esmeraldas Destacadas
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="hidden rounded-full border-brand-primary-dark text-brand-primary-dark hover:bg-brand-primary-dark hover:text-brand-primary-lighter sm:flex"
            >
              <Link to="/emeralds/collection">
                Ver Colección
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEmeralds.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-brand-primary-dark text-brand-primary-dark hover:bg-brand-primary-dark hover:text-brand-primary-lighter"
            >
              <Link to="/emeralds/collection">
                Ver Colección
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Section 4: Heritage / Brand Story ── */}
      <section className="bg-brand-primary-dark py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-brand-secondary-golden md:mx-0" />
              <h2 className="mb-4 font-heading text-3xl text-brand-primary-lighter sm:text-4xl md:text-5xl">
                Desde las Minas de Muzo al Mundo
              </h2>
              <p className="mb-8 max-w-lg font-body leading-relaxed text-brand-primary-lighter/80">
                Tres generaciones dedicadas al arte de las esmeraldas
                colombianas. Nuestra pasión nació en las minas de Muzo, donde
                aprendimos a reconocer la verdadera belleza de cada piedra. Hoy,
                llevamos esa tradición al mundo.
              </p>
              <dl className="mb-8 flex flex-wrap justify-center gap-8 md:justify-start">
                <div>
                  <dd className="font-heading text-2xl text-brand-secondary-golden sm:text-3xl">
                    3
                  </dd>
                  <dt className="text-xs text-brand-primary-lighter/60 sm:text-sm">
                    Generaciones
                  </dt>
                </div>
                <div>
                  <dd className="font-heading text-2xl text-brand-secondary-golden sm:text-3xl">
                    100%
                  </dd>
                  <dt className="text-xs text-brand-primary-lighter/60 sm:text-sm">
                    Colombianas
                  </dt>
                </div>
                <div>
                  <dd className="font-heading text-2xl text-brand-secondary-golden sm:text-3xl">
                    GIA
                  </dd>
                  <dt className="text-xs text-brand-primary-lighter/60 sm:text-sm">
                    Certificadas
                  </dt>
                </div>
              </dl>
              <Button
                asChild
                className="rounded-full bg-brand-secondary-golden px-8 text-brand-primary-dark hover:bg-brand-secondary-golden/90"
              >
                <Link to="/about">
                  Conoce Nuestra Historia
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="hidden flex-1 md:block">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&h=800&fit=crop"
                alt="Esmeraldas colombianas de Muzo"
                width={600}
                height={800}
                className="h-[500px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Jewelry Best Sellers ── */}
      <section className="bg-brand-primary-lighter py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-secondary-terra sm:text-sm">
                Los Favoritos
              </p>
              <h2 className="font-heading text-3xl text-brand-secondary-terra sm:text-4xl">
                Joyería Más Vendida
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="hidden rounded-full border-brand-secondary-terra text-brand-secondary-terra hover:bg-brand-secondary-terra hover:text-white sm:flex"
            >
              <Link to="/jewelry">
                Explorar Joyería
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {bestSellers.map((product) => (
              <article key={product.id} className="group cursor-pointer">
                <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-white">
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.isBestSeller && (
                    <span className="absolute left-3 top-3 rounded-full bg-brand-secondary-terra px-3 py-1 text-xs font-medium text-white">
                      Más Vendido
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-lg text-brand-secondary-terra transition-colors group-hover:text-brand-secondary-golden">
                  {product.name}
                </h3>
                <p className="mb-1 text-sm text-brand-secondary-terra/60">
                  {product.material}
                </p>
                <p className="font-body font-semibold text-brand-secondary-terra">
                  ${product.price.toLocaleString()}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-brand-secondary-terra text-brand-secondary-terra hover:bg-brand-secondary-terra hover:text-white"
            >
              <Link to="/jewelry">
                Explorar Joyería
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Section 6: Trust & Guarantees ── */}
      <section className="bg-brand-secondary-terra py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-secondary-golden sm:text-sm">
              Tu confianza es nuestra prioridad
            </p>
            <h2 className="font-heading text-3xl text-brand-primary-lighter sm:text-4xl">
              Nuestras Garantías
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/20 p-6 sm:p-8"
              >
                <item.icon className="mb-4 h-8 w-8 text-brand-secondary-golden" />
                <h3 className="mb-2 font-heading text-lg text-brand-primary-lighter">
                  {item.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-brand-primary-lighter/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: WhatsApp CTA ── */}
      <section className="bg-brand-primary-dark py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
          <SiWhatsapp className="mx-auto mb-6 h-10 w-10 text-brand-secondary-golden" />
          <h2 className="mb-4 font-heading text-3xl text-brand-primary-lighter sm:text-4xl">
            Atención Personalizada
          </h2>
          <p className="mb-8 font-body leading-relaxed text-brand-primary-lighter/80">
            Cada esmeralda es única, como tú. Nuestros expertos gemólogos están
            listos para ayudarte a encontrar la piedra perfecta con una atención
            exclusiva y personalizada.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-brand-secondary-golden px-8 text-brand-primary-dark hover:bg-brand-secondary-golden/90"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <SiWhatsapp className="mr-2 h-5 w-5" />
              Escríbenos por WhatsApp
            </a>
          </Button>
          <p className="mt-6 text-sm text-brand-primary-lighter/50">
            {COMPANY_LOCATION}
          </p>
        </div>
      </section>

      {/* ── Section 8: Newsletter ── */}
      <section className="bg-brand-secondary-terra py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
          <h2 className="mb-4 font-heading text-3xl text-white sm:text-4xl">
            Únete a Nuestra Comunidad
          </h2>
          <p className="mb-8 text-white/80">
            Suscríbete para recibir novedades, ofertas exclusivas y ser la
            primera en conocer nuestras nuevas colecciones.
          </p>
          <form
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/50 focus:border-brand-secondary-golden focus:outline-none"
            />
            <Button
              type="submit"
              className="rounded-full bg-brand-secondary-golden px-8 text-brand-secondary-terra hover:bg-brand-secondary-golden/90"
            >
              Suscribirse
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
