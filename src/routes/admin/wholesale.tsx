import { createFileRoute } from "@tanstack/react-router";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Package, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	type Clarity,
	type Cut,
	clarities,
	cuts,
	demoWholesaleLots,
	type Origin,
	origins,
	type WholesaleLot,
} from "@/data/demo-wholesale-lots";

export const Route = createFileRoute("/admin/wholesale")({
	component: AdminWholesale,
});

// ── Status ────────────────────────────────────────────────────────────────────

type LotStatus = "available" | "reserved" | "sold";

type LotRow = WholesaleLot & { status: LotStatus };

const statusConfig: Record<LotStatus, { label: string; style: string }> = {
	available: {
		label: "Disponible",
		style: "bg-green-50 text-green-700 border-green-200",
	},
	reserved: {
		label: "Reservado",
		style:
			"bg-brand-secondary-golden/20 text-brand-secondary-terra border-brand-secondary-golden/30",
	},
	sold: {
		label: "Vendido",
		style: "bg-gray-100 text-gray-500 border-gray-200",
	},
};

function getDemoStatus(id: number): LotStatus {
	if (id % 4 === 0) return "sold";
	if (id % 3 === 0) return "reserved";
	return "available";
}

function StatusBadge({ status }: { status: LotStatus }) {
	const cfg = statusConfig[status];
	return (
		<span
			className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-body text-xs font-medium ${cfg.style}`}
		>
			{cfg.label}
		</span>
	);
}

// ── Detail dialog ─────────────────────────────────────────────────────────────

function LotDetailDialog({
	lot,
	open,
	onClose,
}: {
	lot: LotRow | null;
	open: boolean;
	onClose: () => void;
}) {
	if (!lot) return null;
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle className="font-heading text-xl text-brand-primary-dark">
						{lot.name}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-5">
					<div className="flex items-center gap-3">
						<StatusBadge status={lot.status} />
						<span className="font-body text-xs text-gray-400">
							ID: {lot.id}
						</span>
					</div>
					<div className="aspect-video w-full overflow-hidden rounded-lg bg-brand-primary-lighter">
						<img
							src={lot.image}
							alt={lot.name}
							className="h-full w-full object-cover"
						/>
					</div>
					<p className="font-body text-sm leading-relaxed text-gray-600">
						{lot.description}
					</p>
					<div className="grid grid-cols-2 gap-3">
						{[
							{ label: "Origen", value: lot.origin },
							{ label: "Claridad", value: lot.clarity },
							{ label: "Corte", value: lot.cut },
							{ label: "Piedras", value: `${lot.stoneCount} unidades` },
							{ label: "Total quilates", value: `${lot.totalCarats} ct` },
							{
								label: "Precio total",
								value: `$${lot.totalPrice.toLocaleString()} USD`,
							},
						].map((spec) => (
							<div
								key={spec.label}
								className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
							>
								<p className="font-body text-xs text-gray-400">{spec.label}</p>
								<p className="font-body text-sm font-medium text-brand-primary-dark">
									{spec.value}
								</p>
							</div>
						))}
					</div>
					<div className="rounded-lg border border-brand-secondary-golden/30 bg-brand-secondary-golden/10 px-4 py-3">
						<p className="font-body text-xs text-brand-secondary-terra">
							Precio por quilate
						</p>
						<p className="font-heading text-2xl text-brand-primary-dark">
							${(lot.totalPrice / lot.totalCarats).toFixed(0)}{" "}
							<span className="font-body text-sm font-normal text-gray-400">
								USD/ct
							</span>
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

// ── Column definitions ────────────────────────────────────────────────────────

function buildColumns(onOpen: (lot: LotRow) => void): ColumnDef<LotRow>[] {
	return [
		{
			accessorKey: "name",
			header: ({ column }) => (
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Lote <ArrowUpDown className="ml-1.5 h-3 w-3" />
				</Button>
			),
			cell: ({ row }) => (
				<div>
					<p className="font-body font-medium text-brand-primary-dark">
						{row.original.name}
					</p>
					<p className="max-w-xs truncate font-body text-xs text-gray-400">
						{row.original.description}
					</p>
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
					Origen <ArrowUpDown className="ml-1.5 h-3 w-3" />
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
					Claridad <ArrowUpDown className="ml-1.5 h-3 w-3" />
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
					Corte <ArrowUpDown className="ml-1.5 h-3 w-3" />
				</Button>
			),
			cell: ({ row }) => (
				<span className="font-body text-sm text-gray-600">
					{row.original.cut}
				</span>
			),
		},
		{
			accessorKey: "stoneCount",
			header: ({ column }) => (
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Piedras <ArrowUpDown className="ml-1.5 h-3 w-3" />
				</Button>
			),
			cell: ({ row }) => (
				<span className="font-body text-sm text-gray-600">
					{row.original.stoneCount}
				</span>
			),
		},
		{
			accessorKey: "totalCarats",
			header: ({ column }) => (
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Total ct <ArrowUpDown className="ml-1.5 h-3 w-3" />
				</Button>
			),
			cell: ({ row }) => (
				<span className="font-body text-sm text-gray-600">
					{row.original.totalCarats} ct
				</span>
			),
		},
		{
			accessorKey: "totalPrice",
			header: ({ column }) => (
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Precio lote <ArrowUpDown className="ml-1.5 h-3 w-3" />
				</Button>
			),
			cell: ({ row }) => (
				<span className="font-body font-medium text-brand-primary-dark">
					${row.original.totalPrice.toLocaleString()}
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
			cell: ({ row }) => <StatusBadge status={row.original.status} />,
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
							onClick={(e) => e.stopPropagation()}
						>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="font-body text-sm">
						<DropdownMenuItem onClick={() => onOpen(row.original)}>
							Ver detalle
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Marcar como reservado</DropdownMenuItem>
						<DropdownMenuItem>Marcar como vendido</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-red-600">
							Eliminar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];
}

// ── Component ─────────────────────────────────────────────────────────────────

function AdminWholesale() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [globalFilter, setGlobalFilter] = useState("");
	const [originFilter, setOriginFilter] = useState("all");
	const [clarityFilter, setClarityFilter] = useState("all");
	const [cutFilter, setCutFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");
	const [selectedLot, setSelectedLot] = useState<LotRow | null>(null);

	const data = useMemo<LotRow[]>(
		() => demoWholesaleLots.map((l) => ({ ...l, status: getDemoStatus(l.id) })),
		[],
	);

	const filteredData = useMemo(
		() =>
			data.filter(
				(l) =>
					(originFilter === "all" || l.origin === (originFilter as Origin)) &&
					(clarityFilter === "all" ||
						l.clarity === (clarityFilter as Clarity)) &&
					(cutFilter === "all" || l.cut === (cutFilter as Cut)) &&
					(statusFilter === "all" || l.status === (statusFilter as LotStatus)),
			),
		[data, originFilter, clarityFilter, cutFilter, statusFilter],
	);

	const columns = buildColumns(setSelectedLot);

	const table = useReactTable({
		data: filteredData,
		columns,
		state: { sorting, columnVisibility, globalFilter },
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	const totalValue = filteredData.reduce((s, l) => s + l.totalPrice, 0);
	const totalCarats = filteredData.reduce((s, l) => s + l.totalCarats, 0);
	const available = data.filter((l) => l.status === "available").length;

	const clearFilters = () => {
		setGlobalFilter("");
		setOriginFilter("all");
		setClarityFilter("all");
		setCutFilter("all");
		setStatusFilter("all");
	};

	const hasActiveFilters =
		globalFilter ||
		originFilter !== "all" ||
		clarityFilter !== "all" ||
		cutFilter !== "all" ||
		statusFilter !== "all";

	return (
		<div className="space-y-6">
			{/* Summary strip */}
			<div className="flex flex-wrap gap-4">
				{[
					{ label: "Lotes", value: data.length, suffix: "total" },
					{ label: "Disponibles", value: available, suffix: "lotes" },
					{
						label: "Valor filtrado",
						value: `$${totalValue.toLocaleString()}`,
						suffix: "USD",
					},
					{
						label: "Quilates filtrados",
						value: totalCarats.toFixed(1),
						suffix: "ct",
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
						placeholder="Buscar por nombre..."
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="w-60 border-gray-200 pl-8 font-body text-sm"
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
						{(Object.keys(statusConfig) as LotStatus[]).map((s) => (
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

				<span className="ml-auto font-body text-sm text-gray-400">
					{table.getRowModel().rows.length} lote
					{table.getRowModel().rows.length !== 1 ? "s" : ""}
				</span>
			</div>

			{/* Table */}
			<Card className="overflow-hidden rounded-2xl border-brand-primary-dark/10 shadow-sm">
				<CardContent className="p-0">
					{table.getRowModel().rows.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-20 text-center">
							<span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-dark/5">
								<Package className="h-6 w-6 text-brand-primary-dark/30" />
							</span>
							<p className="font-body text-sm text-gray-400">
								No se encontraron lotes con los filtros aplicados
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
										className={row.index % 2 === 0 ? "cursor-pointer bg-white border-brand-primary-dark/5 hover:bg-brand-primary-lighter/20" : "cursor-pointer bg-brand-primary-lighter/40 border-brand-primary-dark/5 hover:bg-brand-primary-lighter/60"}
										onClick={() => setSelectedLot(row.original)}
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

			<LotDetailDialog
				lot={selectedLot}
				open={!!selectedLot}
				onClose={() => setSelectedLot(null)}
			/>
		</div>
	);
}
