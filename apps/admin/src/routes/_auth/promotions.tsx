import { createFileRoute } from "@tanstack/react-router"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	createPromoCode,
	deletePromoCode,
	promoCodesQueryOptions,
	updatePromoCode,
	type PromoCode,
} from "@/lib/supabase-queries"

export const Route = createFileRoute("/_auth/promotions")({
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(promoCodesQueryOptions())
	},
	component: PromotionsPage,
})

// ── Form state ────────────────────────────────────────────────────────────────

type PromoForm = {
	code: string
	type: "percentage" | "fixed"
	value: string
	description: string
	valid_until: string
	active: boolean
}

const emptyForm: PromoForm = {
	code: "",
	type: "percentage",
	value: "",
	description: "",
	valid_until: "",
	active: true,
}

function promoToForm(promo: PromoCode): PromoForm {
	return {
		code: promo.code,
		type: promo.type,
		value: String(promo.value),
		description: promo.description ?? "",
		valid_until: promo.valid_until ? promo.valid_until.slice(0, 10) : "",
		active: promo.active,
	}
}

// ── Promo form dialog ─────────────────────────────────────────────────────────

function PromoDialog({
	open,
	editing,
	onClose,
}: {
	open: boolean
	editing: PromoCode | null
	onClose: () => void
}) {
	const qc = useQueryClient()
	const [form, setForm] = useState<PromoForm>(editing ? promoToForm(editing) : emptyForm)
	const [error, setError] = useState<string | null>(null)

	function set(patch: Partial<PromoForm>) {
		setForm((f) => ({ ...f, ...patch }))
	}

	const mutation = useMutation({
		mutationFn: async () => {
			const value = Number(form.value)
			if (!form.code.trim()) throw new Error("El código es requerido")
			if (Number.isNaN(value) || value <= 0) throw new Error("El valor debe ser mayor a 0")
			if (form.type === "percentage" && value > 100) throw new Error("El porcentaje no puede superar 100")

			const payload = {
				code: form.code.trim().toUpperCase(),
				type: form.type,
				value,
				description: form.description.trim() || null,
				valid_until: form.valid_until ? new Date(form.valid_until).toISOString() : null,
				active: form.active,
			}

			if (editing) {
				await updatePromoCode(editing.id, payload)
			} else {
				await createPromoCode(payload)
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["promo_codes"] })
			onClose()
		},
		onError: (e: Error) => setError(e.message),
	})

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="font-heading text-xl text-brand-primary-dark">
						{editing ? "Editar código" : "Nuevo código de descuento"}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					<div className="space-y-1.5">
						<Label>Código *</Label>
						<Input
							placeholder="Ej. NATURA20"
							value={form.code}
							onChange={(e) => set({ code: e.target.value.toUpperCase() })}
						/>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1.5">
							<Label>Tipo *</Label>
							<Select
								value={form.type}
								onValueChange={(v) => set({ type: v as "percentage" | "fixed" })}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="percentage">Porcentaje (%)</SelectItem>
									<SelectItem value="fixed">Monto fijo (USD)</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-1.5">
							<Label>Valor *</Label>
							<Input
								type="number"
								min="0.01"
								step="0.01"
								placeholder={form.type === "percentage" ? "Ej. 10" : "Ej. 50"}
								value={form.value}
								onChange={(e) => set({ value: e.target.value })}
							/>
						</div>
					</div>

					<div className="space-y-1.5">
						<Label>Descripción</Label>
						<Input
							placeholder="Uso interno (opcional)"
							value={form.description}
							onChange={(e) => set({ description: e.target.value })}
						/>
					</div>

					<div className="space-y-1.5">
						<Label>Válido hasta</Label>
						<Input
							type="date"
							value={form.valid_until}
							onChange={(e) => set({ valid_until: e.target.value })}
						/>
						<p className="text-xs text-gray-400">Déjalo vacío para que no expire.</p>
					</div>

					<div className="flex items-center gap-3">
						<button
							type="button"
							role="switch"
							aria-checked={form.active}
							onClick={() => set({ active: !form.active })}
							className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none ${form.active ? "bg-brand-primary-dark" : "bg-gray-200"}`}
						>
							<span
								className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.active ? "translate-x-4" : "translate-x-0"}`}
							/>
						</button>
						<Label>Activo</Label>
					</div>

					{error && <p className="text-sm text-red-500">{error}</p>}
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancelar
					</Button>
					<Button
						onClick={() => mutation.mutate()}
						disabled={mutation.isPending}
						className="bg-brand-primary-dark text-brand-primary-lighter hover:bg-brand-primary-dark/85"
					>
						{mutation.isPending ? "Guardando…" : editing ? "Guardar cambios" : "Crear código"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

// ── Delete confirmation ────────────────────────────────────────────────────────

function DeleteDialog({
	promo,
	onClose,
}: {
	promo: PromoCode | null
	onClose: () => void
}) {
	const qc = useQueryClient()
	const mutation = useMutation({
		mutationFn: () => deletePromoCode(promo!.id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["promo_codes"] })
			onClose()
		},
	})
	return (
		<Dialog open={!!promo} onOpenChange={onClose}>
			<DialogContent className="max-w-sm">
				<DialogHeader>
					<DialogTitle className="font-heading text-xl text-brand-primary-dark">
						¿Eliminar código?
					</DialogTitle>
				</DialogHeader>
				<p className="text-sm text-gray-500">
					Se eliminará el código <strong>{promo?.code}</strong>. Esta acción no se puede deshacer.
				</p>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancelar
					</Button>
					<Button
						variant="destructive"
						onClick={() => mutation.mutate()}
						disabled={mutation.isPending}
					>
						{mutation.isPending ? "Eliminando…" : "Eliminar"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

// ── Main page ─────────────────────────────────────────────────────────────────

function PromotionsPage() {
	const qc = useQueryClient()
	const { data: promos } = useSuspenseQuery(promoCodesQueryOptions())
	const [sorting, setSorting] = useState<SortingState>([])
	const [dialogOpen, setDialogOpen] = useState(false)
	const [editing, setEditing] = useState<PromoCode | null>(null)
	const [deleting, setDeleting] = useState<PromoCode | null>(null)

	const toggleActive = useMutation({
		mutationFn: ({ id, active }: { id: string; active: boolean }) =>
			updatePromoCode(id, { active }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["promo_codes"] }),
	})

	const columns: ColumnDef<PromoCode>[] = [
		{
			accessorKey: "code",
			header: ({ column }) => (
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Código <ArrowUpDown className="ml-1.5 h-3 w-3" />
				</Button>
			),
			cell: ({ row }) => (
				<span className="font-mono font-medium text-brand-primary-dark">
					{row.original.code}
				</span>
			),
		},
		{
			accessorKey: "type",
			header: () => (
				<span className="font-body text-xs uppercase tracking-wider text-brand-primary-lighter/80">
					Tipo
				</span>
			),
			cell: ({ row }) => (
				<span className="text-sm text-gray-600">
					{row.original.type === "percentage" ? "Porcentaje" : "Monto fijo"}
				</span>
			),
		},
		{
			accessorKey: "value",
			header: () => (
				<span className="font-body text-xs uppercase tracking-wider text-brand-primary-lighter/80">
					Valor
				</span>
			),
			cell: ({ row }) => (
				<span className="font-medium text-brand-primary-dark">
					{row.original.type === "percentage"
						? `${row.original.value}%`
						: `$${row.original.value} USD`}
				</span>
			),
		},
		{
			accessorKey: "valid_until",
			header: () => (
				<span className="font-body text-xs uppercase tracking-wider text-brand-primary-lighter/80">
					Vence
				</span>
			),
			cell: ({ row }) =>
				row.original.valid_until ? (
					<span className="text-sm text-gray-500">
						{new Date(row.original.valid_until).toLocaleDateString("es-CO", {
							day: "2-digit",
							month: "short",
							year: "numeric",
						})}
					</span>
				) : (
					<span className="text-sm text-gray-400">Sin vencimiento</span>
				),
		},
		{
			accessorKey: "active",
			header: () => (
				<span className="font-body text-xs uppercase tracking-wider text-brand-primary-lighter/80">
					Estado
				</span>
			),
			cell: ({ row }) => {
				const active = row.original.active
				return (
					<button
						type="button"
						role="switch"
						aria-checked={active}
						onClick={() =>
							toggleActive.mutate({ id: row.original.id, active: !active })
						}
						className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none ${active ? "bg-brand-primary-dark" : "bg-gray-200"}`}
					>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${active ? "translate-x-4" : "translate-x-0"}`}
						/>
					</button>
				)
			},
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => {
							setEditing(row.original)
							setDialogOpen(true)
						}}
						className="h-8 w-8 p-0 text-gray-400 hover:text-brand-primary-dark"
					>
						<Pencil className="h-3.5 w-3.5" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setDeleting(row.original)}
						className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
					>
						<Trash2 className="h-3.5 w-3.5" />
					</Button>
				</div>
			),
		},
	]

	const table = useReactTable({
		data: promos,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	const activeCount = promos.filter((p) => p.active).length

	return (
		<div className="space-y-6">
			{/* Stats */}
			<div className="grid grid-cols-3 gap-4">
				{[
					{ label: "Total de códigos", value: promos.length },
					{ label: "Códigos activos", value: activeCount },
					{ label: "Inactivos", value: promos.length - activeCount },
				].map((s) => (
					<Card key={s.label}>
						<CardContent className="p-5">
							<p className="font-body text-xs font-medium uppercase tracking-wider text-gray-400">
								{s.label}
							</p>
							<p className="mt-1 font-heading text-3xl text-brand-primary-dark">
								{s.value}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Table */}
			<Card>
				<CardContent className="p-0">
					<div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
						<h2 className="font-heading text-lg text-brand-primary-dark">
							Códigos de descuento
						</h2>
						<Button
							onClick={() => {
								setEditing(null)
								setDialogOpen(true)
							}}
							className="bg-brand-primary-dark text-brand-primary-lighter hover:bg-brand-primary-dark/85"
						>
							<Plus className="mr-2 h-4 w-4" />
							Nuevo código
						</Button>
					</div>

					{promos.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-16 text-center">
							<p className="text-gray-400">No hay códigos de descuento todavía.</p>
							<Button
								variant="outline"
								className="mt-4"
								onClick={() => {
									setEditing(null)
									setDialogOpen(true)
								}}
							>
								Crear el primero
							</Button>
						</div>
					) : (
						<div className="overflow-x-auto">
							<Table>
								<TableHeader className="bg-brand-primary-dark">
									{table.getHeaderGroups().map((hg) => (
										<TableRow key={hg.id} className="border-brand-primary-dark/20 hover:bg-transparent">
											{hg.headers.map((header) => (
												<TableHead key={header.id} className="py-3 first:pl-6 last:pr-6">
													{header.isPlaceholder
														? null
														: flexRender(header.column.columnDef.header, header.getContext())}
												</TableHead>
											))}
										</TableRow>
									))}
								</TableHeader>
								<TableBody>
									{table.getRowModel().rows.map((row, idx) => (
										<TableRow
											key={row.id}
											className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id} className="py-3 first:pl-6 last:pr-6">
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					)}
				</CardContent>
			</Card>

			<PromoDialog
				open={dialogOpen}
				editing={editing}
				onClose={() => {
					setDialogOpen(false)
					setEditing(null)
				}}
			/>
			<DeleteDialog promo={deleting} onClose={() => setDeleting(null)} />
		</div>
	)
}
