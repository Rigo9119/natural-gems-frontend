import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { ArrowLeft } from "lucide-react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"
import { generateSlug } from "@/lib/import-emeralds"
import { clarities, cuts, origins } from "@/lib/supabase-queries"

export const Route = createFileRoute("/admin/emeralds/new")({
	component: NewEmeraldPage,
})

function FieldError({ errors }: { errors: (string | { message: string } | undefined)[] }) {
	const filtered = errors.filter((e): e is string | { message: string } => !!e)
	if (!filtered.length) return null
	const first = filtered[0]
	const msg = typeof first === "string" ? first : first.message
	return <p className="mt-1 font-body text-xs text-red-600">{msg}</p>
}

function NewEmeraldPage() {
	const navigate = useNavigate()
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const form = useForm({
		defaultValues: {
			name: "",
			carats: "",
			price: "",
			currency: "USD",
			stone_count: "1",
			status: "available",
			clarity: "",
			cut: "",
			origin: "",
			dimensions: "",
			color: "",
			description: "",
			certificate_url: "",
			certified_by: "",
			min_order_quantity: "",
			total_grams: "",
		},
		onSubmit: async ({ value }) => {
			setSubmitError(null)

			const carats = Number.parseFloat(value.carats)
			const price = Number.parseFloat(value.price)
			const stoneCount = Number.parseInt(value.stone_count, 10)

			const { error } = await supabase.from("emeralds").insert({
				name: value.name.trim(),
				slug: generateSlug(value.name.trim()),
				carats,
				price,
				currency: value.currency || "USD",
				stone_count: Number.isNaN(stoneCount) ? 1 : stoneCount,
				status: value.status || "available",
				clarity: value.clarity,
				cut: value.cut,
				origin: value.origin,
				description: value.description.trim() || null,
				dimensions: value.dimensions.trim() || null,
				color: value.color.trim() || null,
				certificate_url: value.certificate_url.trim() || null,
				certified_by: value.certified_by.trim() || null,
				min_order_quantity: value.min_order_quantity
					? Number.parseInt(value.min_order_quantity, 10)
					: undefined,
				total_grams: value.total_grams
					? Number.parseFloat(value.total_grams)
					: null,
			} as any)

			if (error) {
				setSubmitError(error.message)
				return
			}

			setSuccess(true)
			setTimeout(() => navigate({ to: "/admin/emeralds" }), 1500)
		},
	})

	return (
		<div className="space-y-6">
			{/* Page header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link
						to="/admin/emeralds"
						className="flex items-center gap-1.5 font-body text-sm text-gray-400 hover:text-brand-primary-dark transition-colors"
					>
						<ArrowLeft className="h-4 w-4" />
						Cancelar
					</Link>
					<h2 className="font-heading text-2xl text-brand-primary-dark">
						Nueva Esmeralda
					</h2>
				</div>
			</div>

			{success && (
				<div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 font-body text-sm text-green-700">
					Esmeralda creada exitosamente. Redirigiendo...
				</div>
			)}

			{submitError && (
				<div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
					{submitError}
				</div>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
				className="space-y-6"
			>
				{/* Main fields card */}
				<Card className="rounded-2xl border-brand-primary-dark/10 shadow-sm">
					<CardHeader>
						<CardTitle className="font-heading text-lg text-brand-primary-dark">
							Información principal
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{/* Left column */}
							<div className="space-y-5">
								{/* Nombre */}
								<form.Field
									name="name"
									validators={{
										onChange: ({ value }) =>
											!value.trim() ? "Nombre requerido" : undefined,
									}}
								>
									{(field) => (
										<div>
											<Label htmlFor={field.name} className="font-body text-sm font-medium text-brand-primary-dark">
												Nombre *
											</Label>
											<Input
												id={field.name}
												className="mt-1.5 border-gray-200 font-body text-sm"
												placeholder="Ej. Esmeralda Muzo Premium"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
											/>
											<SlugPreview name={field.state.value} />
											<FieldError errors={field.state.meta.errors} />
										</div>
									)}
								</form.Field>

								{/* Quilates */}
								<form.Field
									name="carats"
									validators={{
										onChange: ({ value }) => {
											const n = Number.parseFloat(value)
											if (!value || Number.isNaN(n) || n <= 0)
												return "Quilates debe ser un número positivo"
										},
									}}
								>
									{(field) => (
										<div>
											<Label htmlFor={field.name} className="font-body text-sm font-medium text-brand-primary-dark">
												Quilates *
											</Label>
											<Input
												id={field.name}
												type="number"
												step="0.01"
												min="0"
												className="mt-1.5 border-gray-200 font-body text-sm"
												placeholder="Ej. 2.50"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
											/>
											<FieldError errors={field.state.meta.errors} />
										</div>
									)}
								</form.Field>

								{/* Precio */}
								<form.Field
									name="price"
									validators={{
										onChange: ({ value }) => {
											const n = Number.parseFloat(value)
											if (!value || Number.isNaN(n) || n <= 0)
												return "Precio debe ser un número positivo"
										},
									}}
								>
									{(field) => (
										<div>
											<Label htmlFor={field.name} className="font-body text-sm font-medium text-brand-primary-dark">
												Precio *
											</Label>
											<Input
												id={field.name}
												type="number"
												step="0.01"
												min="0"
												className="mt-1.5 border-gray-200 font-body text-sm"
												placeholder="Ej. 4500"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
											/>
											<FieldError errors={field.state.meta.errors} />
										</div>
									)}
								</form.Field>

								{/* Moneda */}
								<form.Field name="currency">
									{(field) => (
										<div>
											<Label className="font-body text-sm font-medium text-brand-primary-dark">
												Moneda
											</Label>
											<Select
												value={field.state.value}
												onValueChange={field.handleChange}
											>
												<SelectTrigger className="mt-1.5 border-gray-200 font-body text-sm">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="USD">USD</SelectItem>
													<SelectItem value="COP">COP</SelectItem>
													<SelectItem value="EUR">EUR</SelectItem>
												</SelectContent>
											</Select>
										</div>
									)}
								</form.Field>

								{/* Cantidad de piedras */}
								<form.Field name="stone_count">
									{(field) => (
										<div>
											<Label htmlFor={field.name} className="font-body text-sm font-medium text-brand-primary-dark">
												Cantidad de piedras
											</Label>
											<Input
												id={field.name}
												type="number"
												min="1"
												step="1"
												className="mt-1.5 border-gray-200 font-body text-sm"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
											/>
										</div>
									)}
								</form.Field>

								{/* Estado */}
								<form.Field name="status">
									{(field) => (
										<div>
											<Label className="font-body text-sm font-medium text-brand-primary-dark">
												Estado
											</Label>
											<Select
												value={field.state.value}
												onValueChange={field.handleChange}
											>
												<SelectTrigger className="mt-1.5 border-gray-200 font-body text-sm">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="available">Disponible</SelectItem>
													<SelectItem value="reserved">Reservada</SelectItem>
													<SelectItem value="sold">Vendida</SelectItem>
												</SelectContent>
											</Select>
										</div>
									)}
								</form.Field>
							</div>

							{/* Right column */}
							<div className="space-y-5">
								{/* Claridad */}
								<form.Field
									name="clarity"
									validators={{
										onChange: ({ value }) =>
											!value ? "Claridad requerida" : undefined,
									}}
								>
									{(field) => (
										<div>
											<Label className="font-body text-sm font-medium text-brand-primary-dark">
												Claridad *
											</Label>
											<Select
												value={field.state.value}
												onValueChange={field.handleChange}
											>
												<SelectTrigger className="mt-1.5 border-gray-200 font-body text-sm">
													<SelectValue placeholder="Seleccionar..." />
												</SelectTrigger>
												<SelectContent>
													{clarities.map((c) => (
														<SelectItem key={c} value={c}>
															{c}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FieldError errors={field.state.meta.errors} />
										</div>
									)}
								</form.Field>

								{/* Corte */}
								<form.Field
									name="cut"
									validators={{
										onChange: ({ value }) =>
											!value ? "Corte requerido" : undefined,
									}}
								>
									{(field) => (
										<div>
											<Label className="font-body text-sm font-medium text-brand-primary-dark">
												Corte *
											</Label>
											<Select
												value={field.state.value}
												onValueChange={field.handleChange}
											>
												<SelectTrigger className="mt-1.5 border-gray-200 font-body text-sm">
													<SelectValue placeholder="Seleccionar..." />
												</SelectTrigger>
												<SelectContent>
													{cuts.map((c) => (
														<SelectItem key={c} value={c}>
															{c}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FieldError errors={field.state.meta.errors} />
										</div>
									)}
								</form.Field>

								{/* Origen */}
								<form.Field
									name="origin"
									validators={{
										onChange: ({ value }) =>
											!value ? "Origen requerido" : undefined,
									}}
								>
									{(field) => (
										<div>
											<Label className="font-body text-sm font-medium text-brand-primary-dark">
												Origen *
											</Label>
											<Select
												value={field.state.value}
												onValueChange={field.handleChange}
											>
												<SelectTrigger className="mt-1.5 border-gray-200 font-body text-sm">
													<SelectValue placeholder="Seleccionar..." />
												</SelectTrigger>
												<SelectContent>
													{origins.map((o) => (
														<SelectItem key={o} value={o}>
															{o}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FieldError errors={field.state.meta.errors} />
										</div>
									)}
								</form.Field>

								{/* Dimensiones */}
								<form.Field name="dimensions">
									{(field) => (
										<div>
											<Label htmlFor={field.name} className="font-body text-sm font-medium text-brand-primary-dark">
												Dimensiones
											</Label>
											<Input
												id={field.name}
												className="mt-1.5 border-gray-200 font-body text-sm"
												placeholder="Ej. 10x8x5mm"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
											/>
										</div>
									)}
								</form.Field>

								{/* Color */}
								<form.Field name="color">
									{(field) => (
										<div>
											<Label htmlFor={field.name} className="font-body text-sm font-medium text-brand-primary-dark">
												Color
											</Label>
											<Input
												id={field.name}
												className="mt-1.5 border-gray-200 font-body text-sm"
												placeholder="Ej. Verde intenso"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
											/>
										</div>
									)}
								</form.Field>

								{/* Descripción */}
								<form.Field name="description">
									{(field) => (
										<div>
											<Label htmlFor={field.name} className="font-body text-sm font-medium text-brand-primary-dark">
												Descripción
											</Label>
											<Textarea
												id={field.name}
												className="mt-1.5 border-gray-200 font-body text-sm"
												placeholder="Descripción de la esmeralda..."
												rows={3}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
											/>
										</div>
									)}
								</form.Field>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Certificate + optional fields */}
				<Card className="rounded-2xl border-brand-primary-dark/10 shadow-sm">
					<CardHeader>
						<CardTitle className="font-heading text-lg text-brand-primary-dark">
							Certificado y campos opcionales
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
							{/* URL certificado */}
							<form.Field name="certificate_url">
								{(field) => (
									<div>
										<Label htmlFor={field.name} className="font-body text-sm font-medium text-brand-primary-dark">
											URL del certificado
										</Label>
										<Input
											id={field.name}
											type="url"
											className="mt-1.5 border-gray-200 font-body text-sm"
											placeholder="https://..."
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
										/>
									</div>
								)}
							</form.Field>

							{/* Certificado por */}
							<form.Field name="certified_by">
								{(field) => (
									<div>
										<Label htmlFor={field.name} className="font-body text-sm font-medium text-brand-primary-dark">
											Certificado por
										</Label>
										<Input
											id={field.name}
											className="mt-1.5 border-gray-200 font-body text-sm"
											placeholder="Ej. GIA, CDTec"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
										/>
									</div>
								)}
							</form.Field>

							{/* Cantidad mínima */}
							<form.Field name="min_order_quantity">
								{(field) => (
									<div>
										<Label htmlFor={field.name} className="font-body text-sm font-medium text-brand-primary-dark">
											Cantidad mínima de pedido
										</Label>
										<Input
											id={field.name}
											type="number"
											min="1"
											step="1"
											className="mt-1.5 border-gray-200 font-body text-sm"
											placeholder="Ej. 5"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
										/>
									</div>
								)}
							</form.Field>

							{/* Gramos totales */}
							<form.Field name="total_grams">
								{(field) => (
									<div>
										<Label htmlFor={field.name} className="font-body text-sm font-medium text-brand-primary-dark">
											Gramos totales
										</Label>
										<Input
											id={field.name}
											type="number"
											step="0.01"
											min="0"
											className="mt-1.5 border-gray-200 font-body text-sm"
											placeholder="Ej. 3.6"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
										/>
									</div>
								)}
							</form.Field>
						</div>
					</CardContent>
				</Card>

				{/* Submit */}
				<div className="flex justify-end gap-3">
					<Button
						type="button"
						variant="outline"
						className="border-gray-200 font-body text-sm text-gray-600"
						asChild
					>
						<Link to="/admin/emeralds">Cancelar</Link>
					</Button>
					<form.Subscribe selector={(state) => state.isSubmitting}>
						{(isSubmitting) => (
							<Button
								type="submit"
								disabled={isSubmitting}
								className="bg-brand-primary-dark font-body text-sm text-brand-primary-lighter hover:bg-brand-primary-dark/90"
							>
								{isSubmitting ? "Guardando..." : "Crear esmeralda"}
							</Button>
						)}
					</form.Subscribe>
				</div>
			</form>
		</div>
	)
}

function SlugPreview({ name }: { name: string }) {
	const slug = useMemo(() => (name.trim() ? generateSlug(name.trim()) : ""), [name])
	if (!slug) return null
	return (
		<p className="mt-1 font-body text-xs text-gray-400">
			Slug: <span className="font-mono text-brand-primary-dark/60">{slug}</span>
		</p>
	)
}
