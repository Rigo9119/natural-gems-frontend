import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, X } from "lucide-react";
import { useMemo, useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import type { Product } from "@/data/demo-products";
import { useCompareStore } from "@/store/compareStore";

interface CompareRow {
	attribute: string;
	attributeKey: keyof Product;
	[productId: string]: string | number | keyof Product;
}

const formatValue = (key: keyof Product, value: unknown): string => {
	if (value === undefined || value === null) return "—";
	if (key === "price") return `$${(value as number).toLocaleString()}`;
	if (key === "carat") return `${value} ct`;
	return String(value);
};

const attributeLabels: Record<string, string> = {
	price: "Precio",
	carat: "Quilates",
	origin: "Origen",
	clarity: "Claridad",
	cut: "Corte",
};

export function CompareTable() {
	const { compareItems, removeFromCompare } = useCompareStore();
	const [sorting, setSorting] = useState<SortingState>([]);

	const columnHelper = createColumnHelper<CompareRow>();

	const columns = useMemo(() => {
		const cols = [
			columnHelper.accessor("attribute", {
				header: ({ column }) => (
					<button
						type="button"
						className="flex items-center gap-1 text-sm font-medium text-brand-primary-lighter/80 hover:text-brand-primary-lighter"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Atributo
						<ArrowUpDown className="h-3 w-3" />
					</button>
				),
				cell: (info) => (
					<span className="text-sm font-medium text-brand-primary-dark/70">
						{info.getValue()}
					</span>
				),
			}),
		];

		compareItems.forEach((product) => {
			cols.push(
				columnHelper.accessor(`product_${product.id}` as keyof CompareRow, {
					header: () => (
						<div className="flex flex-col items-center gap-2">
							<div className="relative">
								<OptimizedImage
									src={product.image}
									alt={product.name}
									width={80}
									height={80}
									className="h-20 w-20 rounded-lg object-cover"
								/>
								<button
									type="button"
									onClick={() => removeFromCompare(product.id)}
									className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-brand-primary-dark hover:bg-brand-primary-lighter"
									aria-label={`Eliminar ${product.name}`}
								>
									<X className="h-3 w-3" />
								</button>
							</div>
							<span className="max-w-24 text-center font-heading text-xs font-medium text-brand-primary-lighter">
								{product.name}
							</span>
						</div>
					),
					cell: (info) => (
						<span className="text-center text-sm font-medium text-brand-primary-dark">
							{info.getValue() as string}
						</span>
					),
				}),
			);
		});

		// Add empty columns for remaining slots
		const emptySlots = 4 - compareItems.length;
		for (let i = 0; i < emptySlots; i++) {
			cols.push(
				columnHelper.display({
					id: `empty_${i}`,
					header: () => (
						<div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-brand-primary-lighter/30">
							<span className="text-xs text-brand-primary-lighter/40">
								Vacío
							</span>
						</div>
					),
					cell: () => (
						<span className="text-center text-sm text-brand-primary-dark/30">
							—
						</span>
					),
				}),
			);
		}

		return cols;
	}, [compareItems, columnHelper, removeFromCompare]);

	const data = useMemo<CompareRow[]>(() => {
		const attributes: (keyof Product)[] = [
			"price",
			"carat",
			"origin",
			"clarity",
			"cut",
		];

		return attributes.map((attr) => {
			const row: CompareRow = {
				attribute: attributeLabels[attr],
				attributeKey: attr,
			};

			compareItems.forEach((product) => {
				row[`product_${product.id}`] = formatValue(attr, product[attr]);
			});

			return row;
		});
	}, [compareItems]);

	const table = useReactTable({
		data,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<>
			{/* Mobile: card-based layout */}
			<div className="space-y-6 md:hidden">
				{compareItems.map((product) => (
					<div
						key={product.id}
						className="rounded-lg border border-brand-primary-dark/10 p-4"
					>
						<div className="mb-4 flex items-center gap-3">
							<OptimizedImage
								src={product.image}
								alt={product.name}
								width={64}
								height={64}
								className="h-16 w-16 rounded-lg object-cover"
							/>
							<div className="min-w-0 flex-1">
								<h3 className="truncate font-heading text-sm font-medium text-brand-primary-dark">
									{product.name}
								</h3>
								<button
									type="button"
									onClick={() => removeFromCompare(product.id)}
									className="mt-1 flex items-center gap-1 text-xs text-brand-primary-dark/50 hover:text-brand-primary-dark"
								>
									<X className="h-3 w-3" />
									Eliminar
								</button>
							</div>
						</div>
						<dl className="space-y-2">
							{(
								[
									"price",
									"carat",
									"origin",
									"clarity",
									"cut",
								] as (keyof Product)[]
							).map((attr) => (
								<div
									key={attr}
									className="flex items-center justify-between border-b border-brand-primary-dark/5 py-1.5 last:border-0"
								>
									<dt className="text-xs text-brand-primary-dark/50">
										{attributeLabels[attr]}
									</dt>
									<dd className="text-sm font-medium text-brand-primary-dark">
										{formatValue(attr, product[attr])}
									</dd>
								</div>
							))}
						</dl>
					</div>
				))}
			</div>

			{/* Desktop: table layout */}
			<div className="hidden overflow-x-auto rounded-2xl border border-brand-primary-dark/10 shadow-sm md:block">
				<table className="w-full">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr
								key={headerGroup.id}
								className="border-b border-brand-primary-dark/10 bg-brand-primary-dark"
							>
								{headerGroup.headers.map((header, i) => (
									<th
										key={header.id}
										className={
											i === 0
												? "w-28 px-4 py-4 text-left"
												: "px-4 py-4 text-center"
										}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className={`border-b border-brand-primary-dark/10 last:border-0 ${
									row.index % 2 === 0
										? "bg-white"
										: "bg-brand-primary-lighter/40"
								}`}
							>
								{row.getVisibleCells().map((cell, j) => (
									<td
										key={cell.id}
										className={
											j === 0
												? "px-4 py-3 text-left"
												: "px-4 py-3 text-center"
										}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
