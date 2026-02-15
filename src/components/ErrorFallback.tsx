import { Link, useRouter } from "@tanstack/react-router";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
	error: Error;
	reset?: () => void;
}

export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
	const router = useRouter();

	const handleRetry = () => {
		if (reset) {
			reset();
		} else {
			router.invalidate();
		}
	};

	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
			<div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-primary-lighter">
				<AlertTriangle className="h-12 w-12 text-brand-secondary-terra" />
			</div>

			<h1 className="font-heading text-3xl text-brand-primary-dark md:text-4xl">
				Algo salió mal
			</h1>

			<p className="mt-4 max-w-md text-brand-primary-dark/70">
				Lo sentimos, ocurrió un error inesperado. Por favor intenta de nuevo
				o vuelve al inicio.
			</p>

			{import.meta.env.DEV && error.message && (
				<pre className="mt-4 max-w-lg overflow-auto rounded-lg bg-brand-primary-dark/5 p-4 text-left text-xs text-brand-primary-dark/60">
					{error.message}
				</pre>
			)}

			<div className="mt-8 flex flex-col gap-3 sm:flex-row">
				<Button
					onClick={handleRetry}
					className="gap-2 bg-brand-primary-dark hover:bg-brand-primary-dark/90"
				>
					<RotateCcw className="h-4 w-4" />
					Reintentar
				</Button>
				<Button
					asChild
					variant="outline"
					className="gap-2 border-brand-primary-dark/20 text-brand-primary-dark hover:bg-brand-primary-lighter"
				>
					<Link to="/">
						<Home className="h-4 w-4" />
						Ir al inicio
					</Link>
				</Button>
			</div>
		</div>
	);
}
