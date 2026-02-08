import ProductCard from "@/components/ProductCard";
import { demoProducts } from "@/data/demo-products";
import { WHATSAPP_URL } from "@/lib/constants";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

export const Route = createFileRoute("/_store/emeralds/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <section
        id="hero"
        aria-label="Presentación"
        className="h-screen flex flex-col items-center justify-center bg-brand-primary-dark px-6 sm:px-8 text-center relative"
      >
        <p className="text-brand-secondary-golden font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6">
          Desde las minas de Colombia
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl text-brand-primary-lighter mb-4 sm:mb-6">
          Esmeraldas
        </h1>
        <p className="font-body text-brand-primary-lighter/80 max-w-xl mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed">
          Descubre la belleza única de las esmeraldas colombianas, extraídas de
          las minas más prestigiosas del mundo.
        </p>
        <a
          href="#collections"
          className="inline-flex items-center gap-2 border border-brand-primary-lighter text-brand-primary-lighter px-6 sm:px-8 py-3 sm:py-4 rounded-full font-body font-medium text-base sm:text-lg transition-all duration-300 hover:bg-brand-primary-lighter hover:text-brand-primary-dark"
        >
          Ver Colección
        </a>
        <a
          href="#who-we-are"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          aria-label="Desplazarse hacia abajo"
        >
          <ChevronDown
            className="w-6 h-6 text-brand-primary-lighter/60"
            aria-hidden="true"
          />
        </a>
      </section>
      <section
        id="who-we-are"
        aria-labelledby="who-we-are-title"
        className="min-h-screen flex flex-col md:flex-row items-stretch bg-brand-primary-lighter"
      >
        <div className="flex flex-col justify-center min-h-screen md:min-h-0 w-full md:w-1/2 px-6 sm:px-8 py-12 sm:py-16 md:px-16 lg:px-24">
          <p className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
            Nuestra Historia
          </p>
          <h2
            id="who-we-are-title"
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-primary-dark mb-4 sm:mb-6"
          >
            Quiénes Somos
          </h2>
          <hr className="w-12 sm:w-16 border-t-2 border-brand-secondary-terra mb-6 sm:mb-8" />
          <p className="font-body text-brand-primary-dark/80 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            Somos una familia con más de tres generaciones dedicadas al arte de
            las esmeraldas colombianas. Nuestra pasión nació en las minas de
            Muzo, donde aprendimos a reconocer la verdadera belleza de cada
            piedra.
          </p>
          <p className="font-body text-brand-primary-dark/80 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
            Hoy, llevamos esa tradición al mundo, ofreciendo gemas
            cuidadosamente seleccionadas con la garantía de autenticidad y la
            atención personalizada que nos caracteriza.
          </p>
          <dl className="flex flex-wrap gap-6 sm:gap-8">
            <div>
              <dd className="font-heading text-2xl sm:text-3xl text-brand-secondary-terra">3</dd>
              <dt className="text-xs sm:text-sm text-brand-primary-dark/60">Generaciones</dt>
            </div>
            <div>
              <dd className="font-heading text-2xl sm:text-3xl text-brand-secondary-terra">100%</dd>
              <dt className="text-xs sm:text-sm text-brand-primary-dark/60">Colombianas</dt>
            </div>
            <div>
              <dd className="font-heading text-2xl sm:text-3xl text-brand-secondary-terra">Muzo</dd>
              <dt className="text-xs sm:text-sm text-brand-primary-dark/60">Origen</dt>
            </div>
          </dl>
        </div>
        <figure className="hidden md:flex md:w-1/2 items-center justify-center bg-brand-primary-light/30 relative overflow-hidden">
          <img
            alt="Esmeraldas colombianas"
            src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=1000&fit=crop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-primary-dark/10" aria-hidden="true" />
        </figure>
      </section>
      <section id="collections" className="py-12 sm:py-16 px-6 sm:px-8 bg-white">
        <h2 className="font-heading text-3xl sm:text-4xl text-brand-primary-dark text-center mb-8 sm:mb-12">
          Nuestra Colección
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {demoProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              carat={product.carat}
            />
          ))}
        </div>
      </section>
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="min-h-screen flex flex-col items-center justify-center bg-brand-secondary-terra px-6 sm:px-8 py-16 sm:py-24 text-center"
      >
        <p className="text-brand-secondary-golden font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6">
          Experiencia Personalizada
        </p>
        <h2
          id="contact-title"
          className="font-heading text-3xl sm:text-4xl md:text-6xl text-brand-primary-lighter mb-4 sm:mb-6 max-w-3xl"
        >
          Encuentra tu gema perfecta
        </h2>
        <p className="font-body text-brand-primary-lighter/80 max-w-xl mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed">
          Cada esmeralda es única, como tú. Permítenos guiarte en la selección
          de la piedra perfecta con una atención exclusiva y personalizada.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 sm:gap-3 bg-brand-primary-dark text-brand-primary-lighter px-6 sm:px-8 py-3 sm:py-4 rounded-full font-body font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-brand-primary-light hover:text-brand-primary-dark hover:scale-105"
        >
          <SiWhatsapp className="w-6 h-6" aria-hidden="true" />
          <span className="sr-only">Contactar por </span>Escríbenos por WhatsApp
        </a>
        <dl className="mt-12 sm:mt-16 flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-16 text-brand-primary-lighter/70">
          <div className="flex flex-col items-center">
            <dd className="font-heading text-2xl sm:text-3xl text-brand-primary-dark">15+</dd>
            <dt className="text-xs sm:text-sm tracking-wide">Años de experiencia</dt>
          </div>
          <div className="flex flex-col items-center">
            <dd className="font-heading text-2xl sm:text-3xl text-brand-primary-dark">500+</dd>
            <dt className="text-xs sm:text-sm tracking-wide">Clientes satisfechos</dt>
          </div>
          <div className="flex flex-col items-center">
            <dd className="font-heading text-2xl sm:text-3xl text-brand-primary-dark">100+</dd>
            <dt className="text-xs sm:text-sm tracking-wide">Gemas certificadas</dt>
          </div>
        </dl>
      </section>
    </>
  );
}
