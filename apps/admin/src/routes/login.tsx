import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { Gem } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/login")({
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (session) {
			throw redirect({ to: "/" });
		}
	},
	component: LoginPage,
});

function LoginPage() {
	const { redirect: redirectTo } = Route.useSearch();
	const [submitError, setSubmitError] = useState<string | null>(null);
	const navigate = Route.useNavigate();

	const form = useForm({
		defaultValues: { email: "", password: "" },
		onSubmit: async ({ value }) => {
			setSubmitError(null);
			const { error } = await supabase.auth.signInWithPassword({
				email: value.email,
				password: value.password,
			});
			if (error) {
				setSubmitError("Credenciales incorrectas. Intenta de nuevo.");
				return;
			}
			const { data: { session } } = await supabase.auth.getSession();
			const role = session?.user?.app_metadata?.role;
			if (role !== "admin") {
				await supabase.auth.signOut();
				setSubmitError("No tienes permisos de administrador.");
				return;
			}
			navigate({ to: (redirectTo as "/") ?? "/" });
		},
	});

	return (
		<div className="flex min-h-screen items-center justify-center bg-brand-primary-lighter px-4">
			<div className="w-full max-w-sm">
				<div className="mb-8 text-center">
					<span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary-dark">
						<Gem className="h-7 w-7 text-brand-secondary-golden" />
					</span>
					<h1 className="font-heading text-3xl text-brand-primary-dark">
						Natura Gems
					</h1>
					<p className="mt-1 font-body text-sm tracking-widest uppercase text-brand-primary-dark/50">
						Panel Administrativo
					</p>
				</div>

				<div className="rounded-2xl bg-white p-8 shadow-sm">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
						className="space-y-4"
					>
						<div>
							<h2 className="mb-1 font-heading text-xl text-brand-primary-dark">
								Iniciar sesión
							</h2>
							<p className="font-body text-sm text-brand-primary-dark/50">
								Acceso restringido al equipo de Natura Gems.
							</p>
						</div>

						<form.Field
							name="email"
							validators={{
								onChange: ({ value }) => {
									const r = z
										.string()
										.min(1, "Requerido")
										.email("Correo inválido")
										.safeParse(value);
									return r.success ? undefined : r.error.issues[0].message;
								},
							}}
						>
							{(field) => (
								<div className="space-y-1.5">
									<label
										htmlFor={field.name}
										className="font-body text-xs font-medium uppercase tracking-wider text-brand-primary-dark/60"
									>
										Correo electrónico
									</label>
									<Input
										id={field.name}
										type="email"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										placeholder="admin@naturagems.com"
										autoFocus
										autoComplete="email"
										className="border-brand-primary-dark/20 focus-visible:ring-brand-primary-dark"
									/>
									{field.state.meta.isTouched &&
										field.state.meta.errors.length > 0 && (
											<p className="font-body text-xs text-red-500">
												{field.state.meta.errors[0]?.toString()}
											</p>
										)}
								</div>
							)}
						</form.Field>

						<form.Field
							name="password"
							validators={{
								onChange: ({ value }) =>
									value.length < 1 ? "Requerido" : undefined,
							}}
						>
							{(field) => (
								<div className="space-y-1.5">
									<label
										htmlFor={field.name}
										className="font-body text-xs font-medium uppercase tracking-wider text-brand-primary-dark/60"
									>
										Contraseña
									</label>
									<Input
										id={field.name}
										type="password"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										placeholder="••••••••"
										autoComplete="current-password"
										className="border-brand-primary-dark/20 focus-visible:ring-brand-primary-dark"
									/>
									{field.state.meta.isTouched &&
										field.state.meta.errors.length > 0 && (
											<p className="font-body text-xs text-red-500">
												{field.state.meta.errors[0]?.toString()}
											</p>
										)}
								</div>
							)}
						</form.Field>

						{submitError && (
							<p className="rounded-lg bg-red-50 px-3 py-2 font-body text-sm text-red-600">
								{submitError}
							</p>
						)}

						<form.Subscribe
							selector={(state) => ({
								canSubmit: state.canSubmit,
								isSubmitting: state.isSubmitting,
							})}
						>
							{({ canSubmit, isSubmitting }) => (
								<Button
									type="submit"
									disabled={!canSubmit || isSubmitting}
									className="w-full rounded-full bg-brand-primary-dark text-brand-primary-lighter hover:bg-brand-primary-dark/90"
								>
									{isSubmitting ? "Ingresando..." : "Ingresar"}
								</Button>
							)}
						</form.Subscribe>
					</form>
				</div>
			</div>
		</div>
	);
}
