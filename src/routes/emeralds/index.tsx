import ProductCard from "@/components/ProductCard";
import { demoProducts, Product } from "@/data/demo-products";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/emeralds/")({
  component: RouteComponent,
});

function RouteComponent() {
  <div>
    <section
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
      <Link
        to="/emeralds/collection"
        className="inline-flex items-center gap-2 border border-brand-primary-lighter text-brand-primary-lighter px-6 sm:px-8 py-3 sm:py-4 rounded-full font-body font-medium text-base sm:text-lg transition-all duration-300 hover:bg-brand-primary-lighter hover:text-brand-primary-dark"
      >
        Ver Colección
      </Link>
      <a
        href="#collections"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Desplazarse hacia abajo"
      >
        <ChevronDown
          className="w-6 h-6 text-brand-primary-lighter/60"
          aria-hidden="true"
        />
      </a>
    </section>
    <section id="collections" className="py-12 sm:py-16 px-6 sm:px-8 bg-white">
      <h2 className="font-heading text-3xl sm:text-4xl text-brand-primary-dark text-center mb-8 sm:mb-12">
        Nuestra Colección
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {demoProducts.slice(0, 4).map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  </div>;
}
