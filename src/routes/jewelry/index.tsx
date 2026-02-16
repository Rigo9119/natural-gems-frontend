import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { useMemo } from "react";
import { z } from "zod";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  demoJewelryProducts,
  getBestSellers,
  getNewArrivals,
  type JewelryCategory,
  jewelryCategories,
} from "@/data/demo-jewelry-products";

const searchSchema = z.object({
  category: z.string().optional(),
  collection: z.string().optional(),
});

export const Route = createFileRoute("/jewelry/")({
  head: () =>
    buildMeta({
      title: "Joyería con Esmeraldas",
      description:
        "Piezas únicas de joyería artesanal con esmeraldas colombianas. Anillos, collares, aretes y pulseras elaborados a mano. Envío asegurado a todo el mundo.",
      path: "/jewelry",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Joyería", path: "/jewelry" },
        ]),
      ],
    }),
  validateSearch: searchSchema,
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

const collectionsMosaic = [
  {
    name: "Clásica" as const,
    description: "Elegancia atemporal",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop",
  },
  {
    name: "Moderna" as const,
    description: "Diseños contemporáneos",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=600&fit=crop",
  },
  {
    name: "Bohemia" as const,
    description: "Espíritu libre",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=600&fit=crop",
  },
  {
    name: "Elegante" as const,
    description: "Lujo refinado",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop",
  },
];

function JewelryIndexPage() {
  const { category, collection } = Route.useSearch();
  const newArrivals = getNewArrivals().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);

  const isFiltered = !!category || !!collection;

  const filteredProducts = useMemo(() => {
    return demoJewelryProducts.filter((product) => {
      if (category && product.category !== category) return false;
      if (collection && product.collection !== collection) return false;
      return true;
    });
  }, [category, collection]);

  if (isFiltered) {
    const title = category || collection;
    return (
      <div className="min-h-screen bg-brand-surface">
        <div className="border-b border-brand-primary-dark/10 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-3xl text-brand-secondary-terra md:text-4xl">
                {title}
              </h1>
              <Link
                to="/jewelry"
                className="inline-flex items-center gap-1 rounded-full border border-brand-secondary-terra/20 px-3 py-1 text-xs text-brand-secondary-terra/70 hover:bg-brand-secondary-terra/5 transition-colors"
              >
                <X className="h-3 w-3" />
                Limpiar filtro
              </Link>
            </div>
            <p className="mt-2 text-brand-secondary-terra/70">
              {filteredProducts.length} producto
              {filteredProducts.length !== 1 ? "s" : ""} encontrado
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-brand-secondary-terra/50 text-lg">
                No se encontraron productos
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <article key={product.id} className="group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-white mb-4">
                    <OptimizedImage
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-brand-secondary-golden text-brand-secondary-terra text-xs font-medium px-3 py-1 rounded-full">
                        Nuevo
                      </span>
                    )}
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
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Collections Mosaic Hero */}
      <section className="bg-brand-secondary-terra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-brand-secondary-golden font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">
              Nueva Colección 2026
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-white mb-3">
              Joyería Artesanal
            </h1>
            <p className="font-body text-white/70 max-w-lg mx-auto text-sm sm:text-base">
              Piezas únicas elaboradas a mano con esmeraldas colombianas
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 sm:gap-4 h-[380px] sm:h-[600px] lg:h-[520px]">
            {/* Clásica — tall left */}
            <Link
              to="/jewelry"
              search={{ collection: collectionsMosaic[0].name }}
              className="group relative overflow-hidden rounded-2xl col-span-1 row-span-2"
            >
              <OptimizedImage
                src={collectionsMosaic[0].image}
                alt={collectionsMosaic[0].name}
                width={800}
                height={1000}
                priority
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h2 className="font-heading text-xl sm:text-2xl text-white mb-1">
                  {collectionsMosaic[0].name}
                </h2>
                <p className="text-white/70 text-xs sm:text-sm">
                  {collectionsMosaic[0].description}
                </p>
              </div>
            </Link>

            {/* Moderna — top middle */}
            <Link
              to="/jewelry"
              search={{ collection: collectionsMosaic[1].name }}
              className="group relative overflow-hidden rounded-2xl col-span-1 lg:col-span-2 row-span-1"
            >
              <OptimizedImage
                src={collectionsMosaic[1].image}
                alt={collectionsMosaic[1].name}
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h2 className="font-heading text-xl sm:text-2xl text-white mb-1">
                  {collectionsMosaic[1].name}
                </h2>
                <p className="text-white/70 text-xs sm:text-sm">
                  {collectionsMosaic[1].description}
                </p>
              </div>
            </Link>

            {/* Elegante — tall right */}
            <Link
              to="/jewelry"
              search={{ collection: collectionsMosaic[3].name }}
              className="group relative overflow-hidden rounded-2xl col-span-1 row-span-2 hidden lg:block"
            >
              <OptimizedImage
                src={collectionsMosaic[3].image}
                alt={collectionsMosaic[3].name}
                width={800}
                height={1000}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h2 className="font-heading text-xl sm:text-2xl text-white mb-1">
                  {collectionsMosaic[3].name}
                </h2>
                <p className="text-white/70 text-xs sm:text-sm">
                  {collectionsMosaic[3].description}
                </p>
              </div>
            </Link>

            {/* Bohemia — bottom middle */}
            <Link
              to="/jewelry"
              search={{ collection: collectionsMosaic[2].name }}
              className="group relative overflow-hidden rounded-2xl col-span-1 lg:col-span-2 row-span-1"
            >
              <OptimizedImage
                src={collectionsMosaic[2].image}
                alt={collectionsMosaic[2].name}
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h2 className="font-heading text-xl sm:text-2xl text-white mb-1">
                  {collectionsMosaic[2].name}
                </h2>
                <p className="text-white/70 text-xs sm:text-sm">
                  {collectionsMosaic[2].description}
                </p>
              </div>
            </Link>

            {/* Elegante — mobile/tablet only (shown as regular card) */}
            <Link
              to="/jewelry"
              search={{ collection: collectionsMosaic[3].name }}
              className="group relative overflow-hidden rounded-2xl col-span-2 row-span-1 lg:hidden"
            >
              <OptimizedImage
                src={collectionsMosaic[3].image}
                alt={collectionsMosaic[3].name}
                width={800}
                height={1000}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h2 className="font-heading text-xl sm:text-2xl text-white mb-1">
                  {collectionsMosaic[3].name}
                </h2>
                <p className="text-white/70 text-xs sm:text-sm">
                  {collectionsMosaic[3].description}
                </p>
              </div>
            </Link>
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
            {jewelryCategories.map((category, index) => (
              <Link
                key={category}
                to="/jewelry"
                search={{ category }}
                className={`group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow ${index === jewelryCategories.length - 1 && jewelryCategories.length % 2 !== 0 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <OptimizedImage
                  src={categoryImages[category]}
                  alt={category}
                  width={600}
                  height={600}
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
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
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
              <OptimizedImage
                src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=500&fit=crop"
                alt="Anillo de esmeralda"
                width={400}
                height={500}
                className="rounded-2xl w-full h-48 sm:h-64 object-cover"
              />
              <OptimizedImage
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop"
                alt="Collar de esmeralda"
                width={400}
                height={500}
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
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
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
                <OptimizedImage
                  src={collection.image}
                  alt={collection.name}
                  width={800}
                  height={1000}
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
