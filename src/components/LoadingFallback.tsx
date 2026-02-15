import { Gem } from "lucide-react";

export function LoadingFallback() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
			<div className="relative flex h-16 w-16 items-center justify-center">
				<div className="absolute inset-0 animate-spin rounded-full border-2 border-brand-primary-dark/10 border-t-brand-primary-dark" />
				<Gem className="h-6 w-6 text-brand-primary-dark/40" />
			</div>
			<p className="mt-6 font-body text-sm text-brand-primary-dark/50">
				Cargando...
			</p>
		</div>
	);
}
