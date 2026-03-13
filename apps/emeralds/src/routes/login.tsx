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
			throw redirect({ to: "/admin" });
		}
	},
	component: LoginPage,
});

const emailSchema = z
	.string()
	.min(1, "El correo es requerido")
	.email("Ingresa un correo electrónico válido");

function LoginPage() {
	const { redirect: redirectTo } = Route.useSearch();
	const [sent, setSent] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: { email: "" },
		onSubmit: async ({ value }) => {
			setSubmitError(null);
			const { error } = await supabase.auth.signInWithOtp({
				email: value.email,
				options: {
					emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo ?? "/admin")}`,
					shouldCreateUser: false,
				},
			});
			if (error) {
				setSubmitError("Este correo no está autorizado para acceder al panel.");
				return;
			}
			setSent(true);
		},
	});

	return (
		<div className="flex min-h-screen items-center justify-center bg-brand-primary-lighter px-4">
			<div className="w-full max-w-sm">
				{/* Logo */}
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

				{/* Card */}
				<div className="rounded-2xl bg-white p-8 shadow-sm">
					{sent ? (
						<div className="text-center">
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-dark/10">
								<Gem className="h-6 w-6 text-brand-primary-dark" />
							</div>
							<h2 className="mb-2 font-heading text-xl text-brand-primary-dark">
								Revisa tu correo
							</h2>
							<p className="font-body text-sm leading-relaxed text-brand-primary-dark/60">
								Te enviamos un enlace de acceso a{" "}
								<span className="font-medium text-brand-primary-dark">
									{form.getFieldValue("email")}
								</span>
								. El enlace expira en 10 minutos.
							</p>
							<button
								type="button"
								onClick={() => {
									setSent(false);
									setSubmitError(null);
									form.reset();
								}}
								className="mt-6 font-body text-sm text-brand-primary-dark/50 underline-offset-2 hover:underline"
							>
								Usar otro correo
							</button>
						</div>
					) : (
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
									Te enviaremos un enlace de acceso a tu correo.
								</p>
							</div>

							<form.Field
								name="email"
								validators={{
									onChange: ({ value }) => {
										const result = emailSchema.safeParse(value);
										return result.success
											? undefined
											: result.error.issues[0].message;
									},
									onBlur: ({ value }) => {
										const result = emailSchema.safeParse(value);
										return result.success
											? undefined
											: result.error.issues[0].message;
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
											className="border-brand-primary-dark/20 focus-visible:ring-brand-primary-dark"
										/>
										{field.state.meta.isTouched &&
											field.state.meta.errors.length > 0 && (
												<p className="font-body text-xs text-red-500">
													{field.state.meta.errors[0]}
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
										{isSubmitting ? "Enviando..." : "Enviar enlace mágico"}
									</Button>
								)}
							</form.Subscribe>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
