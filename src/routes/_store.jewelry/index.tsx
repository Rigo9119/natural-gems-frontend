import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  demoJewelryProducts,
  jewelryCategories,
  getNewArrivals,
  getBestSellers,
  type JewelryCategory,
} from "@/data/demo-jewelry-products";

export const Route = createFileRoute("/_store/jewelry/")({
  component: JewelryIndexPage,
});

// Category images mapping
const categoryImages: Record<JewelryCategory, string> = {
  Anillos:
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
  Collares:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
  Pulseras:
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop",
  Aretes:
    "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&h=600&fit=crop",
  Dijes:
    "https://images.unsplash.com/photo-1576022162028-22f12f9ed217?w=600&h=600&fit=crop",
};

function JewelryIndexPage() {
  const newArrivals = getNewArrivals().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-brand-secondary-terra overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-brand-secondary-golden font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-6">
            Nueva Colección 2026
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl text-white mb-6">
            Joyería Artesanal
          </h1>
          <p className="font-body text-white/80 max-w-xl mx-auto mb-10 text-base sm:text-lg leading-relaxed">
            Piezas únicas elaboradas a mano con esmeraldas colombianas y los más
            finos metales preciosos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-brand-secondary-golden text-brand-secondary-terra hover:bg-brand-secondary-golden/90 rounded-full px-8"
            >
              <Link to="/jewelry">
                Explorar Colección
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-secondary-terra rounded-full px-8"
            >
              <a href="#categories">Ver Categorías</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section
        id="categories"
        className="py-16 sm:py-24 bg-brand-primary-lighter"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
              Explora
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-secondary-terra">
              Nuestras Categorías
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {jewelryCategories.map((category) => (
              <Link
                key={category}
                to="/jewelry"
                search={{ category }}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={categoryImages[category]}
                  alt={category}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="font-heading text-xl sm:text-2xl text-white">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
                Los Favoritos
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl text-brand-secondary-terra">
                Más Vendidos
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="hidden sm:flex border-brand-secondary-terra text-brand-secondary-terra hover:bg-brand-secondary-terra hover:text-white rounded-full"
            >
              <Link to="/jewelry">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <article key={product.id} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-brand-primary-lighter mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.isBestSeller && (
                    <span className="absolute top-3 left-3 bg-brand-secondary-terra text-white text-xs font-medium px-3 py-1 rounded-full">
                      Más Vendido
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-lg text-brand-secondary-terra group-hover:text-brand-secondary-golden transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-brand-secondary-terra/60 mb-1">
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
              className="border-brand-secondary-terra text-brand-secondary-terra hover:bg-brand-secondary-terra hover:text-white rounded-full"
            >
              <Link to="/jewelry">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 sm:py-24 bg-brand-secondary-terra">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <Sparkles className="h-10 w-10 text-brand-secondary-golden mb-4 mx-auto md:mx-0" />
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-4">
                Diseños Exclusivos con Esmeraldas
              </h2>
              <p className="text-white/80 mb-8 max-w-lg">
                Cada pieza de nuestra colección está elaborada con esmeraldas
                colombianas certificadas y metales preciosos de la más alta
                calidad.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-brand-secondary-golden text-brand-secondary-terra hover:bg-brand-secondary-golden/90 rounded-full px-8"
              >
                <Link to="/jewelry">
                  Descubrir Ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=500&fit=crop"
                alt="Anillo de esmeralda"
                className="rounded-2xl w-full h-48 sm:h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop"
                alt="Collar de esmeralda"
                className="rounded-2xl w-full h-48 sm:h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 sm:py-24 bg-brand-primary-lighter">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
                Recién Llegados
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl text-brand-secondary-terra">
                Nuevos Diseños
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="hidden sm:flex border-brand-secondary-terra text-brand-secondary-terra hover:bg-brand-secondary-terra hover:text-white rounded-full"
            >
              <Link to="/jewelry">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <article key={product.id} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-white mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-brand-secondary-golden text-brand-secondary-terra text-xs font-medium px-3 py-1 rounded-full">
                      Nuevo
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-lg text-brand-secondary-terra group-hover:text-brand-secondary-golden transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-brand-secondary-terra/60 mb-1">
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
              className="border-brand-secondary-terra text-brand-secondary-terra hover:bg-brand-secondary-terra hover:text-white rounded-full"
            >
              <Link to="/jewelry">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
              Descubre
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-secondary-terra">
              Nuestras Colecciones
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Clásica",
                description: "Elegancia atemporal",
                image:
                  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop",
              },
              {
                name: "Moderna",
                description: "Diseños contemporáneos",
                image:
                  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop",
              },
              {
                name: "Bohemia",
                description: "Espíritu libre",
                image:
                  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=800&fit=crop",
              },
              {
                name: "Elegante",
                description: "Lujo refinado",
                image:
                  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop",
              },
            ].map((collection) => (
              <Link
                key={collection.name}
                to="/jewelry"
                search={{ collection: collection.name }}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-2xl text-white mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-24 bg-brand-secondary-terra">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
            Únete a Nuestra Comunidad
          </h2>
          <p className="text-white/80 mb-8">
            Suscríbete para recibir novedades, ofertas exclusivas y ser la
            primera en conocer nuestras nuevas colecciones.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-secondary-golden"
            />
            <Button
              type="submit"
              className="bg-brand-secondary-golden text-brand-secondary-terra hover:bg-brand-secondary-golden/90 rounded-full px-8"
            >
              Suscribirse
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
