import { CompareTray } from "@/components/store/CompareTray";
import * as ProductFilters from "@/components/store/ProductFilters";
import { ProductGrid } from "@/components/store/ProductGrid";
import {
  demoProducts,
  type Clarity,
  type Cut,
  type Origin,
} from "@/data/demo-products";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";

const searchSchema = z.object({
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  caratMin: z.number().optional(),
  caratMax: z.number().optional(),
  origin: z.string().optional(),
  clarity: z.string().optional(),
  cut: z.string().optional(),
});

export const Route = createFileRoute("/emeralds/tienda")({
  head: () => buildMeta({
    title: "Tienda de Esmeraldas",
    description: "Explora nuestra colección de esmeraldas sueltas colombianas. Filtra por claridad, quilates, origen y precio. Todas las piedras con certificado de autenticidad.",
    path: "/emeralds/tienda",
    jsonLd: [breadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Esmeraldas", path: "/emeralds" },
      { name: "Tienda", path: "/emeralds/tienda" },
    ])],
  }),
  validateSearch: searchSchema,
  component: TiendaPage,
});

function TiendaPage() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const priceRange = useMemo(() => {
    const prices = demoProducts.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, []);

  const caratRange = useMemo(() => {
    const carats = demoProducts.map((p) => p.carat);
    return {
      min: Math.floor(Math.min(...carats) * 10) / 10,
      max: Math.ceil(Math.max(...carats) * 10) / 10,
    };
  }, []);

  const filters: ProductFilters.FilterState = useMemo(
    () => ({
      priceMin: search.priceMin ?? priceRange.min,
      priceMax: search.priceMax ?? priceRange.max,
      caratMin: search.caratMin ?? caratRange.min,
      caratMax: search.caratMax ?? caratRange.max,
      origins: search.origin ? (search.origin.split(",") as Origin[]) : [],
      clarities: search.clarity ? (search.clarity.split(",") as Clarity[]) : [],
      cuts: search.cut ? (search.cut.split(",") as Cut[]) : [],
    }),
    [search, priceRange, caratRange],
  );

  const handleFiltersChange = (newFilters: ProductFilters.FilterState) => {
    navigate({
      search: {
        priceMin:
          newFilters.priceMin > priceRange.min
            ? newFilters.priceMin
            : undefined,
        priceMax:
          newFilters.priceMax < priceRange.max
            ? newFilters.priceMax
            : undefined,
        caratMin:
          newFilters.caratMin > caratRange.min
            ? newFilters.caratMin
            : undefined,
        caratMax:
          newFilters.caratMax < caratRange.max
            ? newFilters.caratMax
            : undefined,
        origin:
          newFilters.origins.length > 0
            ? newFilters.origins.join(",")
            : undefined,
        clarity:
          newFilters.clarities.length > 0
            ? newFilters.clarities.join(",")
            : undefined,
        cut: newFilters.cuts.length > 0 ? newFilters.cuts.join(",") : undefined,
      },
      replace: true,
    });
  };

  const filteredProducts = useMemo(() => {
    return demoProducts.filter((product) => {
      if (product.price < filters.priceMin || product.price > filters.priceMax)
        return false;
      if (product.carat < filters.caratMin || product.carat > filters.caratMax)
        return false;
      if (
        filters.origins.length > 0 &&
        !filters.origins.includes(product.origin)
      )
        return false;
      if (
        filters.clarities.length > 0 &&
        !filters.clarities.includes(product.clarity)
      )
        return false;
      if (filters.cuts.length > 0 && !filters.cuts.includes(product.cut))
        return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-brand-surface pb-24">
      <div className="border-b border-brand-primary-dark/10 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h1 className="font-heading text-3xl text-brand-primary-dark md:text-4xl">
            Tienda de Esmeraldas
          </h1>
          <p className="mt-2 text-brand-primary-dark/70">
            Explora nuestra colección de esmeraldas colombianas
          </p>
        </div>
      </div>

      <ProductFilters.ProductFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        priceRange={priceRange}
        caratRange={caratRange}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <p className="mb-6 text-sm text-brand-primary-dark/60">
          {filteredProducts.length} producto
          {filteredProducts.length !== 1 ? "s" : ""} encontrado
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>
        <ProductGrid products={filteredProducts} />
      </div>

      <CompareTray />
    </div>
  );
}
