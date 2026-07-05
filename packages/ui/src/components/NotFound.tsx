import { Link } from "@tanstack/react-router";
import { Home, Search } from "lucide-react";

export interface NotFoundProps {
	shopHref?: string;
	shopLabel?: string;
}

export function NotFound({ shopHref, shopLabel = "Ver tienda" }: NotFoundProps) {
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
				<Link
					to="/"
					className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-primary-dark px-4 py-2 text-sm font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/90"
				>
					<Home className="h-4 w-4" />
					Ir al inicio
				</Link>
				{shopHref && (
					<Link
						to={shopHref}
						className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-primary-dark/20 px-4 py-2 text-sm font-medium text-brand-primary-dark transition-colors hover:bg-brand-primary-lighter"
					>
						<Search className="h-4 w-4" />
						{shopLabel}
					</Link>
				)}
			</div>
		</div>
	);
}
