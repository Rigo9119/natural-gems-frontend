import ProductCard from "@/components/ProductCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_store/emeralds/")({
  component: RouteComponent,
});

const demoProducts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
    name: "Esmeralda Muzo",
    price: 2500,
    carat: 1.5,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
    name: "Esmeralda Chivor",
    price: 3200,
    carat: 2.1,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
    name: "Esmeralda Coscuez",
    price: 1800,
    carat: 1.2,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
    name: "Esmeralda Gachalá",
    price: 4500,
    carat: 3.0,
  },
];

function RouteComponent() {
  return (
    <div>
      <section
        id="hero"
        className="h-screen flex flex-col items-center justify-center bg-brand-primary-dark px-6 sm:px-8 text-center relative"
      >
        <span className="text-brand-secondary-golden font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6">
          Desde las minas de Colombia
        </span>
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-brand-primary-lighter/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
      <section
        id="who-we-are"
        className="min-h-screen flex flex-col md:flex-row items-stretch bg-brand-primary-lighter"
      >
        <div className="flex flex-col justify-center min-h-screen md:min-h-0 w-full md:w-1/2 px-6 sm:px-8 py-12 sm:py-16 md:px-16 lg:px-24">
          <span className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
            Nuestra Historia
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-primary-dark mb-4 sm:mb-6">
            Quiénes Somos
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-brand-secondary-terra mb-6 sm:mb-8" />
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
          <div className="flex flex-wrap gap-6 sm:gap-8">
            <div>
              <span className="font-heading text-2xl sm:text-3xl text-brand-secondary-terra">3</span>
              <p className="text-xs sm:text-sm text-brand-primary-dark/60">Generaciones</p>
            </div>
            <div>
              <span className="font-heading text-2xl sm:text-3xl text-brand-secondary-terra">100%</span>
              <p className="text-xs sm:text-sm text-brand-primary-dark/60">Colombianas</p>
            </div>
            <div>
              <span className="font-heading text-2xl sm:text-3xl text-brand-secondary-terra">Muzo</span>
              <p className="text-xs sm:text-sm text-brand-primary-dark/60">Origen</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-brand-primary-light/30 relative overflow-hidden">
          <img
            alt="Esmeraldas colombianas"
            src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=1000&fit=crop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-primary-dark/10" />
        </div>
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
        className="min-h-screen flex flex-col items-center justify-center bg-brand-secondary-terra px-6 sm:px-8 py-16 sm:py-24 text-center"
      >
        <span className="text-brand-secondary-golden font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6">
          Experiencia Personalizada
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl text-brand-primary-lighter mb-4 sm:mb-6 max-w-3xl">
          Encuentra tu gema perfecta
        </h2>
        <p className="font-body text-brand-primary-lighter/80 max-w-xl mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed">
          Cada esmeralda es única, como tú. Permítenos guiarte en la selección
          de la piedra perfecta con una atención exclusiva y personalizada.
        </p>
        <a
          href="https://wa.me/573001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 sm:gap-3 bg-brand-primary-dark text-brand-primary-lighter px-6 sm:px-8 py-3 sm:py-4 rounded-full font-body font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-brand-primary-light hover:text-brand-primary-dark hover:scale-105"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Escríbenos por WhatsApp
        </a>
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-16 text-brand-primary-lighter/70">
          <div className="flex flex-col items-center">
            <span className="font-heading text-2xl sm:text-3xl text-brand-primary-dark">15+</span>
            <span className="text-xs sm:text-sm tracking-wide">Años de experiencia</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading text-2xl sm:text-3xl text-brand-primary-dark">500+</span>
            <span className="text-xs sm:text-sm tracking-wide">Clientes satisfechos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading text-2xl sm:text-3xl text-brand-primary-dark">100+</span>
            <span className="text-xs sm:text-sm tracking-wide">Gemas certificadas</span>
          </div>
        </div>
      </section>
    </div>
  );
}
