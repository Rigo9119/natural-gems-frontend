import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table"
import {
	ArrowUpDown,
	ChevronDown,
	ExternalLink,
	Gem,
	MoreHorizontal,
	Search,
} from "lucide-react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
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
	type Clarity,
	type Cut,
	type EmeraldWithImage,
	type Origin,
	clarities,
	cuts,
	origins,
	retailEmeraldsQueryOptions,
} from "@/lib/supabase-queries"

export const Route = createFileRoute("/admin/emeralds")({
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(retailEmeraldsQueryOptions())
	},
	component: AdminEmeralds,
})

// ── Status ────────────────────────────────────────────────────────────────────

type EmeraldStatus = "available" | "reserved" | "sold"

type EmeraldRow = EmeraldWithImage

const statusConfig: Record<EmeraldStatus, { label: string; style: string }> = {
	available: {
		label: "Disponible",
		style: "bg-green-50 text-green-700 border-green-200",
	},
	reserved: {
		label: "Reservada",
		style:
			"bg-brand-secondary-golden/20 text-brand-secondary-terra border-brand-secondary-golden/30",
	},
	sold: {
		label: "Vendida",
		style: "bg-gray-100 text-gray-500 border-gray-200",
	},
}

function StatusBadge({ status }: { status: EmeraldStatus }) {
	const cfg = statusConfig[status] ?? statusConfig.available
	return (
		<span
			className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-body text-xs font-medium ${cfg.style}`}
		>
			{cfg.label}
		</span>
	)
}

// ── Column definitions ────────────────────────────────────────────────────────

const columns: ColumnDef<EmeraldRow>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<Button
				variant="ghost"
				size="sm"
				className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Nombre
				<ArrowUpDown className="ml-1.5 h-3 w-3" />
			</Button>
		),
		cell: ({ row }) => (
			<div>
				<p className="font-body font-medium text-brand-primary-dark">
					{row.original.name}
				</p>
				<p className="font-body text-xs text-gray-400">{row.original.slug}</p>
			</div>
		),
	},
	{
		accessorKey: "origin",
		header: ({ column }) => (
			<Button
				variant="ghost"
				size="sm"
				className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Origen
				<ArrowUpDown className="ml-1.5 h-3 w-3" />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-body text-sm text-gray-600">
				{row.original.origin}
			</span>
		),
	},
	{
		accessorKey: "clarity",
		header: ({ column }) => (
			<Button
				variant="ghost"
				size="sm"
				className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Claridad
				<ArrowUpDown className="ml-1.5 h-3 w-3" />
			</Button>
		),
		cell: ({ row }) => (
			<span className="rounded-full bg-brand-primary-dark/5 px-2.5 py-0.5 font-body text-xs font-medium text-brand-primary-dark">
				{row.original.clarity}
			</span>
		),
	},
	{
		accessorKey: "cut",
		header: ({ column }) => (
			<Button
				variant="ghost"
				size="sm"
				className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Corte
				<ArrowUpDown className="ml-1.5 h-3 w-3" />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-body text-sm text-gray-600">
				{row.original.cut}
			</span>
		),
	},
	{
		accessorKey: "carats",
		header: ({ column }) => (
			<Button
				variant="ghost"
				size="sm"
				className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Quilates
				<ArrowUpDown className="ml-1.5 h-3 w-3" />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-body text-sm text-gray-600">
				{row.original.carats} ct
			</span>
		),
	},
	{
		accessorKey: "price",
		header: ({ column }) => (
			<Button
				variant="ghost"
				size="sm"
				className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Precio
				<ArrowUpDown className="ml-1.5 h-3 w-3" />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-body font-medium text-brand-primary-dark">
				${row.original.price.toLocaleString()}
			</span>
		),
	},
	{
		accessorKey: "status",
		header: () => (
			<span className="font-body text-xs uppercase tracking-wider text-brand-primary-lighter/80">
				Estado
			</span>
		),
		cell: ({ row }) => (
			<StatusBadge status={(row.original.status ?? "available") as EmeraldStatus} />
		),
		filterFn: (row, _id, value) =>
			value === "all" || row.original.status === value,
	},
	{
		id: "actions",
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-gray-400 hover:text-brand-primary-dark"
					>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="font-body text-sm">
					<DropdownMenuLabel className="font-body text-xs text-gray-400">
						Acciones
					</DropdownMenuLabel>
					<DropdownMenuItem asChild>
						<a
							href={`/emeralds/tienda/${row.original.slug}`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2"
						>
							<ExternalLink className="h-3.5 w-3.5" />
							Ver en tienda
						</a>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Marcar como reservada</DropdownMenuItem>
					<DropdownMenuItem>Marcar como vendida</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
]

// ── Component ─────────────────────────────────────────────────────────────────

function AdminEmeralds() {
	const { data } = useSuspenseQuery(retailEmeraldsQueryOptions())
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [globalFilter, setGlobalFilter] = useState("")
	const [originFilter, setOriginFilter] = useState("all")
	const [clarityFilter, setClarityFilter] = useState("all")
	const [cutFilter, setCutFilter] = useState("all")
	const [statusFilter, setStatusFilter] = useState("all")

	// Apply dropdown filters as pre-filtered data so TanStack Table handles the rest
	const filteredData = useMemo(
		() =>
			data.filter(
				(p) =>
					(originFilter === "all" || p.origin === (originFilter as Origin)) &&
					(clarityFilter === "all" ||
						p.clarity === (clarityFilter as Clarity)) &&
					(cutFilter === "all" || p.cut === (cutFilter as Cut)) &&
					(statusFilter === "all" || p.status === statusFilter),
			),
		[data, originFilter, clarityFilter, cutFilter, statusFilter],
	)

	const table = useReactTable({
		data: filteredData,
		columns,
		state: { sorting, columnFilters, columnVisibility, globalFilter },
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	})

	const totalValue = filteredData.reduce((sum, p) => sum + p.price, 0)
	const available = data.filter((p) => p.status === "available").length

	const clearFilters = () => {
		setGlobalFilter("")
		setOriginFilter("all")
		setClarityFilter("all")
		setCutFilter("all")
		setStatusFilter("all")
	}

	const hasActiveFilters =
		globalFilter ||
		originFilter !== "all" ||
		clarityFilter !== "all" ||
		cutFilter !== "all" ||
		statusFilter !== "all"

	return (
		<div className="space-y-6">
			{/* Summary strip */}
			<div className="flex flex-wrap gap-4">
				{[
					{ label: "Total", value: data.length, suffix: "piedras" },
					{ label: "Disponibles", value: available, suffix: "piedras" },
					{
						label: "Valor filtrado",
						value: `$${totalValue.toLocaleString()}`,
						suffix: "USD",
					},
				].map((s) => (
					<div
						key={s.label}
						className="rounded-lg border border-gray-200 bg-white px-5 py-3 shadow-sm"
					>
						<p className="font-body text-xs text-gray-400">{s.label}</p>
						<p className="font-heading text-xl text-brand-primary-dark">
							{s.value}{" "}
							<span className="font-body text-xs font-normal text-gray-400">
								{s.suffix}
							</span>
						</p>
					</div>
				))}
			</div>

			{/* Toolbar */}
			<div className="flex flex-wrap items-center gap-3">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
					<Input
						placeholder="Buscar por nombre o slug..."
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="w-64 border-gray-200 pl-8 font-body text-sm"
					/>
				</div>

				<Select value={originFilter} onValueChange={setOriginFilter}>
					<SelectTrigger className="w-36 border-gray-200 font-body text-sm">
						<SelectValue placeholder="Origen" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Todos los orígenes</SelectItem>
						{origins.map((o) => (
							<SelectItem key={o} value={o}>
								{o}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select value={clarityFilter} onValueChange={setClarityFilter}>
					<SelectTrigger className="w-32 border-gray-200 font-body text-sm">
						<SelectValue placeholder="Claridad" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Todas</SelectItem>
						{clarities.map((c) => (
							<SelectItem key={c} value={c}>
								{c}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select value={cutFilter} onValueChange={setCutFilter}>
					<SelectTrigger className="w-32 border-gray-200 font-body text-sm">
						<SelectValue placeholder="Corte" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Todos</SelectItem>
						{cuts.map((c) => (
							<SelectItem key={c} value={c}>
								{c}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-36 border-gray-200 font-body text-sm">
						<SelectValue placeholder="Estado" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Todos los estados</SelectItem>
						{(Object.keys(statusConfig) as EmeraldStatus[]).map((s) => (
							<SelectItem key={s} value={s}>
								{statusConfig[s].label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="sm"
						onClick={clearFilters}
						className="font-body text-sm text-gray-400 hover:text-brand-primary-dark"
					>
						Limpiar filtros
					</Button>
				)}

				{/* Column visibility toggle */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="sm"
							className="ml-auto border-gray-200 font-body text-sm text-gray-500"
						>
							Columnas <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="font-body text-sm">
						{table
							.getAllColumns()
							.filter((col) => col.getCanHide())
							.map((col) => (
								<DropdownMenuCheckboxItem
									key={col.id}
									checked={col.getIsVisible()}
									onCheckedChange={(v) => col.toggleVisibility(v)}
									className="capitalize"
								>
									{col.id}
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>

				<span className="font-body text-sm text-gray-400">
					{table.getRowModel().rows.length} resultado
					{table.getRowModel().rows.length !== 1 ? "s" : ""}
				</span>
			</div>

			{/* Table */}
			<Card className="overflow-hidden rounded-2xl border-brand-primary-dark/10 shadow-sm">
				<CardContent className="p-0">
					{table.getRowModel().rows.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-20 text-center">
							<span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-dark/5">
								<Gem className="h-6 w-6 text-brand-primary-dark/30" />
							</span>
							<p className="font-body text-sm text-gray-400">
								No se encontraron esmeraldas con los filtros aplicados
							</p>
						</div>
					) : (
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((hg) => (
									<TableRow
										key={hg.id}
										className="bg-brand-primary-dark hover:bg-brand-primary-dark border-brand-primary-dark"
									>
										{hg.headers.map((header) => (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</TableHead>
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										className={
											row.index % 2 === 0
												? "bg-white border-brand-primary-dark/5 hover:bg-brand-primary-lighter/20"
												: "bg-brand-primary-lighter/40 border-brand-primary-dark/5 hover:bg-brand-primary-lighter/60"
										}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
