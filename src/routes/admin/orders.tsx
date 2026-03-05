import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
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
import { ArrowUpDown, MessageCircle, MoreHorizontal, ShoppingBag } from "lucide-react";
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
import {
	ordersQueryOptions,
	updateOrderStatus,
	type OrderWithItems,
} from "@/lib/supabase-queries";

export const Route = createFileRoute("/admin/orders")({
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(ordersQueryOptions())
	},
	component: AdminOrders,
});

// ── Status config ─────────────────────────────────────────────────────────────

type OrderStatus =
	| "pending"
	| "in_progress"
	| "confirmed"
	| "shipped"
	| "delivered"
	| "cancelled";
type PaymentStatus = "unpaid" | "partial" | "paid";

const statusConfig: Record<OrderStatus, { label: string; style: string }> = {
	pending: {
		label: "Pendiente",
		style:
			"bg-brand-secondary-golden/20 text-brand-secondary-terra border-brand-secondary-golden/30",
	},
	in_progress: {
		label: "En proceso",
		style:
			"bg-blue-50 text-blue-700 border-blue-200",
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

function StatusBadge({ status }: { status: string }) {
	const cfg = statusConfig[status as OrderStatus] ?? {
		label: status,
		style: "bg-gray-100 text-gray-600 border-gray-200",
	};
	return (
		<span
			className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-body text-xs font-medium ${cfg.style}`}
		>
			{cfg.label}
		</span>
	);
}

function PaymentBadge({ status }: { status: string }) {
	const cfg = paymentConfig[status as PaymentStatus] ?? {
		label: status,
		style: "bg-gray-100 text-gray-600 border-gray-200",
	};
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
	order: OrderWithItems | null;
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
							<div className="flex items-center gap-2 mt-1">
								<p className="font-body text-sm text-gray-500">
									WhatsApp: {order.customer_whatsapp}
								</p>
								<a
									href={`https://wa.me/${order.customer_whatsapp.replace(/\D/g, "")}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-brand-primary-dark/50 hover:text-brand-primary-dark transition-colors"
									aria-label="Abrir WhatsApp"
								>
									<MessageCircle className="h-4 w-4" />
								</a>
							</div>
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
							{order.order_items.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between px-4 py-3"
								>
									<div>
										<p className="font-body text-sm font-medium text-brand-primary-dark">
											{item.product_name}
										</p>
										<p className="font-body text-xs text-gray-400">
											{item.carats} ct · {item.clarity} · {item.origin}
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

function buildColumns(
	onOpen: (order: OrderWithItems) => void,
	onStatusChange: (orderId: string, status: string) => void,
): ColumnDef<OrderWithItems>[] {
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
					{row.original.customer_whatsapp && (
						<div className="flex items-center gap-1">
							<p className="font-body text-xs text-gray-400">
								{row.original.customer_whatsapp}
							</p>
							<a
								href={`https://wa.me/${row.original.customer_whatsapp.replace(/\D/g, "")}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-brand-primary-dark transition-colors"
								onClick={(e) => e.stopPropagation()}
								aria-label="WhatsApp"
							>
								<MessageCircle className="h-3.5 w-3.5" />
							</a>
						</div>
					)}
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
					{new Date(row.original.created_at ?? "").toLocaleDateString("es-CO", {
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
						{(["pending", "in_progress", "confirmed", "shipped", "delivered"] as OrderStatus[])
							.filter((s) => s !== row.original.status)
							.map((s) => (
								<DropdownMenuItem
									key={s}
									onClick={(e) => {
										e.stopPropagation()
										onStatusChange(row.original.id, s)
									}}
								>
									→ {statusConfig[s].label}
								</DropdownMenuItem>
							))}
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="text-red-600"
							onClick={(e) => {
								e.stopPropagation()
								onStatusChange(row.original.id, "cancelled")
							}}
						>
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
	const queryClient = useQueryClient()
	const { data } = useSuspenseQuery(ordersQueryOptions())
	const [sorting, setSorting] = useState<SortingState>([
		{ id: "created_at", desc: true },
	]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [statusFilter, setStatusFilter] = useState("all");
	const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null);

	const statusMutation = useMutation({
		mutationFn: ({ id, status }: { id: string; status: string }) =>
			updateOrderStatus(id, status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] })
		},
	})

	const filteredData =
		statusFilter === "all"
			? data
			: data.filter((o) => o.status === statusFilter);

	const columns = buildColumns(setSelectedOrder, (id, status) =>
		statusMutation.mutate({ id, status }),
	);

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
								Las órdenes aparecen cuando los clientes confirman en /checkout
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
