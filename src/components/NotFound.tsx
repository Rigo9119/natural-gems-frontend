import { Link } from "@tanstack/react-router";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-primary-lighter">
        <Search className="h-12 w-12 text-brand-primary-dark" />
      </div>

      <h1 className="font-heading text-4xl text-brand-primary-dark md:text-5xl">
        404
      </h1>
      <h2 className="mt-2 font-heading text-xl text-brand-primary-dark md:text-2xl">
        Página no encontrada
      </h2>

      <p className="mt-4 max-w-md text-brand-primary-dark/70">
        Lo sentimos, la página que buscas no existe o ha sido movida a otra
        ubicación.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          className="gap-2 bg-brand-primary-dark hover:bg-brand-primary-dark/90"
        >
          <Link to="/">
            <Home className="h-4 w-4" />
            Ir al inicio
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="gap-2 border-brand-primary-dark/20 text-brand-primary-dark hover:bg-brand-primary-lighter"
        >
          <Link to="/emeralds">
            <Search className="h-4 w-4" />
            Ver tienda
          </Link>
        </Button>
      </div>
    </div>
  );
}
