import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Gem } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/auth/callback")({
	validateSearch: z.object({
		code: z.string().optional(),
		redirect: z.string().optional(),
	}),
	component: AuthCallbackPage,
});

function AuthCallbackPage() {
	const { code, redirect: redirectTo } = Route.useSearch();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!code) {
			navigate({ to: "/login" });
			return;
		}

		supabase.auth.exchangeCodeForSession(code).then(({ error: authError }) => {
			if (authError) {
				setError("El enlace no es válido o ya expiró.");
				return;
			}
			// Only allow internal paths to prevent open-redirect attacks
			const safeTo =
				redirectTo?.startsWith("/") && !redirectTo.startsWith("//")
					? redirectTo
					: "/admin";
			navigate({ to: safeTo as any });
		});
	}, [code, redirectTo, navigate]);

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-brand-primary-lighter px-4">
				<div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-sm">
					<h2 className="mb-2 font-heading text-xl text-brand-primary-dark">
						Enlace inválido
					</h2>
					<p className="mb-6 font-body text-sm text-brand-primary-dark/60">
						{error}
					</p>
					<a
						href="/login"
						className="font-body text-sm font-medium text-brand-primary-dark underline underline-offset-2"
					>
						Volver al inicio de sesión
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-brand-primary-lighter">
			<div className="text-center">
				<Gem className="mx-auto mb-4 h-10 w-10 animate-pulse text-brand-primary-dark/40" />
				<p className="font-body text-sm text-brand-primary-dark/50">
					Verificando acceso...
				</p>
			</div>
		</div>
	);
}
