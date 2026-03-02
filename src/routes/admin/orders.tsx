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
import { ArrowUpDown, MoreHorizontal, ShoppingBag } from "lucide-react";
import { useState } from "react";
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

export const Route = createFileRoute("/admin/orders")({
	component: AdminOrders,
});

// ── Types (mirror Supabase schema) ────────────────────────────────────────────

type OrderStatus =
	| "pending"
	| "confirmed"
	| "shipped"
	| "delivered"
	| "cancelled";
type PaymentStatus = "unpaid" | "partial" | "paid";

interface OrderItem {
	emerald_name: string;
	emerald_slug: string;
	unit_price: number;
	currency: string;
	quantity: number;
	carat: number;
	clarity: string;
	origin: string;
}

interface Order {
	id: string;
	order_number: string;
	customer_name: string;
	customer_whatsapp: string;
	customer_email?: string;
	shipping_address?: string;
	shipping_country?: string;
	tracking_number?: string;
	subtotal: number;
	currency: string;
	status: OrderStatus;
	payment_method?: string;
	payment_status: PaymentStatus;
	notes?: string;
	created_at: string;
	items: OrderItem[];
}

// ── Placeholder data (replace with Supabase query) ───────────────────────────

const mockOrders: Order[] = [];

// ── Status config ─────────────────────────────────────────────────────────────

const statusConfig: Record<OrderStatus, { label: string; style: string }> = {
	pending: {
		label: "Pendiente",
		style:
			"bg-brand-secondary-golden/20 text-brand-secondary-terra border-brand-secondary-golden/30",
	},
	confirmed: {
		label: "Confirmada",
		style:
			"bg-brand-primary-dark/10 text-brand-primary-dark border-brand-primary-dark/20",
	},
	shipped: {
		label: "Enviada",
		style: "bg-blue-50 text-blue-700 border-blue-200",
	},
	delivered: {
		label: "Entregada",
		style: "bg-green-50 text-green-700 border-green-200",
	},
	cancelled: {
		label: "Cancelada",
		style: "bg-red-50 text-red-600 border-red-200",
	},
};

const paymentConfig: Record<PaymentStatus, { label: string; style: string }> = {
	unpaid: { label: "Sin pago", style: "bg-red-50 text-red-600 border-red-200" },
	partial: {
		label: "Parcial",
		style:
			"bg-brand-secondary-golden/20 text-brand-secondary-terra border-brand-secondary-golden/30",
	},
	paid: {
		label: "Pagada",
		style: "bg-green-50 text-green-700 border-green-200",
	},
};

function StatusBadge({ status }: { status: OrderStatus }) {
	const cfg = statusConfig[status];
	return (
		<span
			className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-body text-xs font-medium ${cfg.style}`}
		>
			{cfg.label}
		</span>
	);
}

function PaymentBadge({ status }: { status: PaymentStatus }) {
	const cfg = paymentConfig[status];
	return (
		<span
			className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-body text-xs font-medium ${cfg.style}`}
		>
			{cfg.label}
		</span>
	);
}

// ── Detail dialog ─────────────────────────────────────────────────────────────

function OrderDetailDialog({
	order,
	open,
	onClose,
}: {
	order: Order | null;
	open: boolean;
	onClose: () => void;
}) {
	if (!order) return null;
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="font-heading text-xl text-brand-primary-dark">
						Orden {order.order_number}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-5">
					<div className="flex flex-wrap items-center gap-3">
						<StatusBadge status={order.status} />
						<PaymentBadge status={order.payment_status} />
						{order.payment_method && (
							<span className="font-body text-xs text-gray-400">
								Pago: {order.payment_method}
							</span>
						)}
					</div>
					<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
						<p className="mb-2 font-body text-xs font-medium uppercase tracking-wider text-gray-400">
							Cliente
						</p>
						<p className="font-body font-medium text-brand-primary-dark">
							{order.customer_name}
						</p>
						{order.customer_whatsapp && (
							<p className="font-body text-sm text-gray-500">
								WhatsApp: {order.customer_whatsapp}
							</p>
						)}
						{order.customer_email && (
							<p className="font-body text-sm text-gray-500">
								{order.customer_email}
							</p>
						)}
						{order.shipping_address && (
							<p className="mt-2 font-body text-sm text-gray-500">
								{order.shipping_address}
								{order.shipping_country ? `, ${order.shipping_country}` : ""}
							</p>
						)}
						{order.tracking_number && (
							<p className="mt-2 font-body text-xs text-brand-primary-dark/60">
								Tracking:{" "}
								<span className="font-medium">{order.tracking_number}</span>
							</p>
						)}
					</div>
					<div>
						<p className="mb-2 font-body text-xs font-medium uppercase tracking-wider text-gray-400">
							Artículos
						</p>
						<div className="divide-y divide-gray-100 rounded-lg border border-gray-100">
							{order.items.map((item) => (
								<div
									key={item.emerald_slug}
									className="flex items-center justify-between px-4 py-3"
								>
									<div>
										<p className="font-body text-sm font-medium text-brand-primary-dark">
											{item.emerald_name}
										</p>
										<p className="font-body text-xs text-gray-400">
											{item.carat} ct · {item.clarity} · {item.origin}
										</p>
									</div>
									<p className="font-body text-sm font-medium text-brand-primary-dark">
										${item.unit_price.toLocaleString()} {item.currency}
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="flex justify-between border-t border-gray-100 pt-3">
						<p className="font-body font-medium text-gray-500">Total</p>
						<p className="font-heading text-lg text-brand-primary-dark">
							${order.subtotal.toLocaleString()} {order.currency}
						</p>
					</div>
					{order.notes && (
						<div className="rounded-lg bg-brand-secondary-golden/10 p-3">
							<p className="font-body text-xs font-medium uppercase tracking-wider text-brand-secondary-terra">
								Notas internas
							</p>
							<p className="mt-1 font-body text-sm text-brand-primary-dark/70">
								{order.notes}
							</p>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

// ── Column definitions ────────────────────────────────────────────────────────

function buildColumns(onOpen: (order: Order) => void): ColumnDef<Order>[] {
	return [
		{
			accessorKey: "order_number",
			header: ({ column }) => (
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Orden <ArrowUpDown className="ml-1.5 h-3 w-3" />
				</Button>
			),
			cell: ({ row }) => (
				<span className="font-body font-medium text-brand-primary-dark">
					{row.original.order_number}
				</span>
			),
		},
		{
			accessorKey: "customer_name",
			header: ({ column }) => (
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Cliente <ArrowUpDown className="ml-1.5 h-3 w-3" />
				</Button>
			),
			cell: ({ row }) => (
				<div>
					<p className="font-body text-sm text-gray-700">
						{row.original.customer_name}
					</p>
					<p className="font-body text-xs text-gray-400">
						{row.original.customer_whatsapp}
					</p>
				</div>
			),
		},
		{
			accessorKey: "subtotal",
			header: ({ column }) => (
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Total <ArrowUpDown className="ml-1.5 h-3 w-3" />
				</Button>
			),
			cell: ({ row }) => (
				<span className="font-body font-medium text-brand-primary-dark">
					${row.original.subtotal.toLocaleString()} {row.original.currency}
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
			accessorKey: "payment_status",
			header: () => (
				<span className="font-body text-xs uppercase tracking-wider text-brand-primary-lighter/80">
					Pago
				</span>
			),
			cell: ({ row }) => <PaymentBadge status={row.original.payment_status} />,
		},
		{
			accessorKey: "created_at",
			header: ({ column }) => (
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3 font-body text-xs uppercase tracking-wider text-brand-secondary-golden hover:text-brand-primary-lighter"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Fecha <ArrowUpDown className="ml-1.5 h-3 w-3" />
				</Button>
			),
			cell: ({ row }) => (
				<span className="font-body text-sm text-gray-400">
					{new Date(row.original.created_at).toLocaleDateString("es-CO", {
						day: "2-digit",
						month: "short",
						year: "numeric",
					})}
				</span>
			),
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
						<DropdownMenuItem className="text-red-600">
							Cancelar orden
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];
}

// ── Component ─────────────────────────────────────────────────────────────────

function AdminOrders() {
	const [sorting, setSorting] = useState<SortingState>([
		{ id: "created_at", desc: true },
	]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [statusFilter, setStatusFilter] = useState("all");
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

	const filteredData =
		statusFilter === "all"
			? mockOrders
			: mockOrders.filter((o) => o.status === statusFilter);

	const columns = buildColumns(setSelectedOrder);

	const table = useReactTable({
		data: filteredData,
		columns,
		state: { sorting, columnVisibility },
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<div className="space-y-6">
			{/* Toolbar */}
			<div className="flex items-center gap-3">
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-48 border-gray-200 font-body text-sm">
						<SelectValue placeholder="Filtrar por estado" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Todos los estados</SelectItem>
						{(Object.keys(statusConfig) as OrderStatus[]).map((s) => (
							<SelectItem key={s} value={s}>
								{statusConfig[s].label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<span className="font-body text-sm text-gray-400">
					{table.getRowModel().rows.length} orden
					{table.getRowModel().rows.length !== 1 ? "es" : ""}
				</span>
			</div>

			{/* Table */}
			<Card className="overflow-hidden rounded-2xl border-brand-primary-dark/10 shadow-sm">
				<CardContent className="p-0">
					{table.getRowModel().rows.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-20 text-center">
							<span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-dark/5">
								<ShoppingBag className="h-6 w-6 text-brand-primary-dark/30" />
							</span>
							<p className="font-body text-sm text-gray-400">
								No hay órdenes
								{statusFilter !== "all"
									? ` con estado "${statusConfig[statusFilter as OrderStatus]?.label}"`
									: ""}
							</p>
							<p className="mt-1 font-body text-xs text-gray-300">
								Las órdenes se crean automáticamente al hacer clic en el botón
								de WhatsApp en el carrito
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
										onClick={() => setSelectedOrder(row.original)}
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

			<OrderDetailDialog
				order={selectedOrder}
				open={!!selectedOrder}
				onClose={() => setSelectedOrder(null)}
			/>
		</div>
	);
}
