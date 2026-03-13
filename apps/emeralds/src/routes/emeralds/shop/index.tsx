import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { Check, Minus } from "lucide-react"
import { useMemo } from "react"
import { z } from "zod"
import { MineCarousel } from "@natura-gems/ui"
import type { CarouselSlide } from "@natura-gems/ui"
import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { CompareTray } from "@/components/store/CompareTray"
import * as ProductFilters from "@/components/store/ProductFilters"
import { ProductGrid } from "@/components/store/ProductGrid"
import {
	type WholesaleFilterState,
	WholesaleLotFilters,
} from "@/components/store/WholesaleLotFilters"
import { WholesaleLotGrid } from "@/components/store/WholesaleLotGrid"
import { OptimizedImage } from "@/components/ui/optimized-image"
import {
	type Clarity,
	type Cut,
	type Origin,
	retailEmeraldsQueryOptions,
	wholesaleEmeraldsQueryOptions,
} from "@/lib/supabase-queries"
import {
	breadcrumbJsonLd,
	buildMeta,
	emeraldItemListJsonLd,
} from "@/lib/seo"
import type { EmeraldWithImage } from "@/lib/supabase-queries"

// ── Search schema ─────────────────────────────────────────────────────────────

const searchSchema = z.object({
	view: z.enum(["retail", "wholesale", "collection"]).optional(),
	// shared filters
	priceMin: z.number().optional(),
	priceMax: z.number().optional(),
	caratMin: z.number().optional(),
	caratMax: z.number().optional(),
	origin: z.string().optional(),
	clarity: z.string().optional(),
	cut: z.string().optional(),
	// wholesale-only
	stoneCountMin: z.number().optional(),
	stoneCountMax: z.number().optional(),
})

// ── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/emeralds/shop/")({
	head: ({ loaderData }) => {
		const emeralds =
			(loaderData as { emeralds?: EmeraldWithImage[] })?.emeralds ?? []
		return buildMeta({
			title: "Tienda de Esmeraldas",
			description:
				"Explora nuestra colección de esmeraldas colombianas. Filtra por claridad, quilates, origen y precio. Piedras individuales, lotes mayoristas y colección por claridad.",
			path: "/emeralds/shop",
			jsonLd: [
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Esmeraldas", path: "/emeralds" },
					{ name: "Tienda", path: "/emeralds/shop" },
				]),
				emeraldItemListJsonLd(emeralds),
			],
		})
	},
	loader: async ({ context }) => {
		const [emeralds] = await Promise.all([
			context.queryClient.ensureQueryData(retailEmeraldsQueryOptions()),
			context.queryClient.ensureQueryData(wholesaleEmeraldsQueryOptions()),
		])
		return { emeralds }
	},
	validateSearch: searchSchema,
	component: ShopPage,
})

// ── Collection data ───────────────────────────────────────────────────────────

const collections: {
	grade: Clarity
	title: string
	description: string
	image: string
}[] = [
	{
		grade: "AAA",
		title: "Premium",
		description:
			"Las esmeraldas de mayor pureza y brillo, seleccionadas por su excepcional transparencia y color intenso",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&h=800&fit=crop",
	},
	{
		grade: "AA",
		title: "Selecta",
		description:
			"Piedras de alta calidad con excelente saturación de color y mínimas inclusiones visibles",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&h=800&fit=crop",
	},
	{
		grade: "A",
		title: "Clásica",
		description:
			"Esmeraldas con buen color y claridad, ideales para joyería elegante del día a día",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&h=800&fit=crop",
	},
	{
		grade: "B",
		title: "Natural",
		description:
			"Piedras con carácter natural, perfectas para diseños artesanales y piezas únicas",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&h=800&fit=crop",
	},
]

const clarityComparison: {
	attribute: string
	AAA: string | boolean
	AA: string | boolean
	A: string | boolean
	B: string | boolean
}[] = [
	{
		attribute: "Transparencia",
		AAA: "Excepcional",
		AA: "Alta",
		A: "Buena",
		B: "Moderada",
	},
	{
		attribute: "Saturacion de color",
		AAA: "Vivid / Intensa",
		AA: "Intensa",
		A: "Moderada",
		B: "Ligera",
	},
	{
		attribute: "Inclusiones visibles",
		AAA: "Ninguna a ojo desnudo",
		AA: "Minimas",
		A: "Algunas",
		B: "Visibles",
	},
	{
		attribute: "Aceite cedro tipico",
		AAA: "Sin aceite / minimo",
		AA: "Ligero",
		A: "Moderado",
		B: "Abundante",
	},
	{
		attribute: "Certificado recomendado",
		AAA: "GIA / Gubelin",
		AA: "GIA / SSEF",
		A: "GIA",
		B: "Opcional",
	},
	{
		attribute: "Ideal para inversion",
		AAA: true,
		AA: true,
		A: false,
		B: false,
	},
	{
		attribute: "Ideal para joyeria diaria",
		AAA: false,
		AA: true,
		A: true,
		B: true,
	},
]

type ClarityRow = (typeof clarityComparison)[0]

const clarityColumnHelper = createColumnHelper<ClarityRow>()

const clarityColumns = [
	clarityColumnHelper.accessor("attribute", {
		header: () => "Caracteristica",
		cell: (info) => info.getValue(),
	}),
	...(["AAA", "AA", "A", "B"] as Clarity[]).map((grade) =>
		clarityColumnHelper.accessor(grade, {
			id: grade,
			header: () => grade,
			cell: (info) => {
				const val = info.getValue()
				if (typeof val !== "boolean") return val
				return val ? (
					<Check className="mx-auto h-4 w-4 text-emerald-600" />
				) : (
					<Minus className="mx-auto h-4 w-4 text-brand-primary-dark/30" />
				)
			},
		}),
	),
]

// ── Carousel slides ───────────────────────────────────────────────────────────

const carouselSlides: CarouselSlide[] = [
	{
		src: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=1400&h=700&fit=crop",
		alt: "Interior de una mina de esmeraldas en Colombia",
		caption: "Las minas de Muzo, corazón esmeraldera de Colombia",
	},
	{
		src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&h=700&fit=crop",
		alt: "Esmeraldas en bruto recién extraídas",
		caption: "Piedras en bruto, pureza directa de la tierra",
	},
	{
		src: "https://images.unsplash.com/photo-1601134467661-3d775b999c18?w=1400&h=700&fit=crop",
		alt: "Proceso de selección de esmeraldas",
		caption: "Selección artesanal piedra por piedra",
	},
	{
		src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=700&fit=crop",
		alt: "Montañas de la región esmeraldera de Colombia",
		caption: "La cordillera colombiana, cuna de las mejores esmeraldas del mundo",
	},
	{
		src: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=1400&h=700&fit=crop",
		alt: "Gemas de esmeralda con su característico verde intenso",
		caption: "El verde más puro, sello de las esmeraldas de Muzo",
	},
]

// ── Tabs ──────────────────────────────────────────────────────────────────────

const tabs = [
	{ id: "retail", label: "Esmeraldas" },
	{ id: "wholesale", label: "Mayoristas" },
	{ id: "collection", label: "Colección" },
] as const

// ── Page component ────────────────────────────────────────────────────────────

function ShopPage() {
	const navigate = Route.useNavigate()
	const search = Route.useSearch()
	const view = search.view ?? "retail"

	function switchView(newView: "retail" | "wholesale" | "collection") {
		navigate({ search: { view: newView }, replace: true })
	}

	return (
		<div className="min-h-screen bg-brand-surface pb-24">
			<AppBreadcrumb
				items={[
					{ label: "Inicio", href: "/" },
					{ label: "Tienda" },
				]}
			/>
			<MineCarousel slides={carouselSlides} />
			{/* ── Page header ── */}
			<div className="border-b border-brand-primary-dark/10 bg-white">
				<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
					<div className="py-8">
						<h1 className="font-heading text-3xl text-brand-primary-dark md:text-4xl">
							Tienda
						</h1>
						<p className="mt-2 text-brand-primary-dark/70">
							Esmeraldas colombianas con certificado de autenticidad
						</p>
					</div>

					{/* ── Tab bar ── */}
					<div className="flex gap-1 -mb-px">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								type="button"
								onClick={() => switchView(tab.id)}
								className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
									view === tab.id
										? "border-brand-primary-dark text-brand-primary-dark"
										: "border-transparent text-brand-primary-dark/50 hover:text-brand-primary-dark hover:border-brand-primary-dark/30"
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* ── View content ── */}
			{view === "retail" && <RetailView search={search} navigate={navigate} />}
			{view === "wholesale" && (
				<WholesaleView search={search} navigate={navigate} />
			)}
			{view === "collection" && <CollectionView />}
		</div>
	)
}

// ── Retail view ───────────────────────────────────────────────────────────────

type SearchParams = ReturnType<typeof Route.useSearch>
type NavigateFn = ReturnType<typeof Route.useNavigate>

function RetailView({
	search,
	navigate,
}: { search: SearchParams; navigate: NavigateFn }) {
	const { data: emeralds } = useSuspenseQuery(retailEmeraldsQueryOptions())

	const priceRange = useMemo(() => {
		if (emeralds.length === 0) return { min: 0, max: 10000 }
		const prices = emeralds.map((p) => p.price)
		return { min: Math.min(...prices), max: Math.max(...prices) }
	}, [emeralds])

	const caratRange = useMemo(() => {
		if (emeralds.length === 0) return { min: 0, max: 10 }
		const carats = emeralds.map((p) => p.carats)
		return {
			min: Math.floor(Math.min(...carats) * 10) / 10,
			max: Math.ceil(Math.max(...carats) * 10) / 10,
		}
	}, [emeralds])

	const filters: ProductFilters.FilterState = useMemo(
		() => ({
			priceMin: search.priceMin ?? priceRange.min,
			priceMax: search.priceMax ?? priceRange.max,
			caratMin: search.caratMin ?? caratRange.min,
			caratMax: search.caratMax ?? caratRange.max,
			origins: search.origin ? (search.origin.split(",") as Origin[]) : [],
			clarities: search.clarity
				? (search.clarity.split(",") as Clarity[])
				: [],
			cuts: search.cut ? (search.cut.split(",") as Cut[]) : [],
		}),
		[search, priceRange, caratRange],
	)

	const handleFiltersChange = (newFilters: ProductFilters.FilterState) => {
		navigate({
			search: (prev) => ({
				...prev,
				view: "retail",
				priceMin:
					newFilters.priceMin > priceRange.min
						? newFilters.priceMin
						: undefined,
				priceMax:
					newFilters.priceMax < priceRange.max
						? newFilters.priceMax
						: undefined,
				caratMin:
					newFilters.caratMin > caratRange.min
						? newFilters.caratMin
						: undefined,
				caratMax:
					newFilters.caratMax < caratRange.max
						? newFilters.caratMax
						: undefined,
				origin:
					newFilters.origins.length > 0
						? newFilters.origins.join(",")
						: undefined,
				clarity:
					newFilters.clarities.length > 0
						? newFilters.clarities.join(",")
						: undefined,
				cut: newFilters.cuts.length > 0 ? newFilters.cuts.join(",") : undefined,
			}),
			replace: true,
		})
	}

	const filteredProducts = useMemo(() => {
		return emeralds.filter((product) => {
			if (product.price < filters.priceMin || product.price > filters.priceMax)
				return false
			if (
				product.carats < filters.caratMin ||
				product.carats > filters.caratMax
			)
				return false
			if (
				filters.origins.length > 0 &&
				!filters.origins.includes(product.origin as Origin)
			)
				return false
			if (
				filters.clarities.length > 0 &&
				!filters.clarities.includes(product.clarity as Clarity)
			)
				return false
			if (
				filters.cuts.length > 0 &&
				!filters.cuts.includes(product.cut as Cut)
			)
				return false
			return true
		})
	}, [emeralds, filters])

	return (
		<>
			<ProductFilters.ProductFilters
				filters={filters}
				onFiltersChange={handleFiltersChange}
				priceRange={priceRange}
				caratRange={caratRange}
			/>
			<div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
				<p className="mb-6 text-sm text-brand-primary-dark/60">
					{filteredProducts.length} producto
					{filteredProducts.length !== 1 ? "s" : ""} encontrado
					{filteredProducts.length !== 1 ? "s" : ""}
				</p>
				<ProductGrid products={filteredProducts} />
			</div>
			<CompareTray />
		</>
	)
}

// ── Wholesale view ────────────────────────────────────────────────────────────

function WholesaleView({
	search,
	navigate,
}: { search: SearchParams; navigate: NavigateFn }) {
	const { data: lots } = useSuspenseQuery(wholesaleEmeraldsQueryOptions())

	const priceRange = useMemo(() => {
		if (lots.length === 0) return { min: 0, max: 100000 }
		const prices = lots.map((l) => l.price)
		return { min: Math.min(...prices), max: Math.max(...prices) }
	}, [lots])

	const caratRange = useMemo(() => {
		if (lots.length === 0) return { min: 0, max: 100 }
		const carats = lots.map((l) => l.carats)
		return {
			min: Math.floor(Math.min(...carats) * 10) / 10,
			max: Math.ceil(Math.max(...carats) * 10) / 10,
		}
	}, [lots])

	const stoneCountRange = useMemo(() => {
		if (lots.length === 0) return { min: 0, max: 100 }
		const counts = lots.map((l) => l.stone_count)
		return { min: Math.min(...counts), max: Math.max(...counts) }
	}, [lots])

	const filters: WholesaleFilterState = useMemo(
		() => ({
			priceMin: search.priceMin ?? priceRange.min,
			priceMax: search.priceMax ?? priceRange.max,
			caratMin: search.caratMin ?? caratRange.min,
			caratMax: search.caratMax ?? caratRange.max,
			stoneCountMin: search.stoneCountMin ?? stoneCountRange.min,
			stoneCountMax: search.stoneCountMax ?? stoneCountRange.max,
			origins: search.origin ? (search.origin.split(",") as Origin[]) : [],
			clarities: search.clarity
				? (search.clarity.split(",") as Clarity[])
				: [],
			cuts: search.cut ? (search.cut.split(",") as Cut[]) : [],
		}),
		[search, priceRange, caratRange, stoneCountRange],
	)

	const handleFiltersChange = (newFilters: WholesaleFilterState) => {
		navigate({
			search: (prev) => ({
				...prev,
				view: "wholesale",
				priceMin:
					newFilters.priceMin > priceRange.min
						? newFilters.priceMin
						: undefined,
				priceMax:
					newFilters.priceMax < priceRange.max
						? newFilters.priceMax
						: undefined,
				caratMin:
					newFilters.caratMin > caratRange.min
						? newFilters.caratMin
						: undefined,
				caratMax:
					newFilters.caratMax < caratRange.max
						? newFilters.caratMax
						: undefined,
				stoneCountMin:
					newFilters.stoneCountMin > stoneCountRange.min
						? newFilters.stoneCountMin
						: undefined,
				stoneCountMax:
					newFilters.stoneCountMax < stoneCountRange.max
						? newFilters.stoneCountMax
						: undefined,
				origin:
					newFilters.origins.length > 0
						? newFilters.origins.join(",")
						: undefined,
				clarity:
					newFilters.clarities.length > 0
						? newFilters.clarities.join(",")
						: undefined,
				cut: newFilters.cuts.length > 0 ? newFilters.cuts.join(",") : undefined,
			}),
			replace: true,
		})
	}

	const filteredLots = useMemo(() => {
		return lots.filter((lot) => {
			if (lot.price < filters.priceMin || lot.price > filters.priceMax)
				return false
			if (lot.carats < filters.caratMin || lot.carats > filters.caratMax)
				return false
			if (
				lot.stone_count < filters.stoneCountMin ||
				lot.stone_count > filters.stoneCountMax
			)
				return false
			if (
				filters.origins.length > 0 &&
				!filters.origins.includes(lot.origin as Origin)
			)
				return false
			if (
				filters.clarities.length > 0 &&
				!filters.clarities.includes(lot.clarity as Clarity)
			)
				return false
			if (filters.cuts.length > 0 && !filters.cuts.includes(lot.cut as Cut))
				return false
			return true
		})
	}, [lots, filters])

	return (
		<>
			<WholesaleLotFilters
				filters={filters}
				onFiltersChange={handleFiltersChange}
				priceRange={priceRange}
				caratRange={caratRange}
				stoneCountRange={stoneCountRange}
			/>
			<div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
				<p className="mb-6 text-sm text-brand-primary-dark/60">
					{filteredLots.length} lote
					{filteredLots.length !== 1 ? "s" : ""} encontrado
					{filteredLots.length !== 1 ? "s" : ""}
				</p>
				<WholesaleLotGrid lots={filteredLots} />
			</div>
		</>
	)
}

// ── Collection view ───────────────────────────────────────────────────────────

function CollectionView() {
	const { data: emeralds } = useSuspenseQuery(retailEmeraldsQueryOptions())

	const statsByGrade = useMemo(() => {
		const map = new Map<
			string,
			{ count: number; minPrice: number; maxPrice: number }
		>()
		for (const product of emeralds) {
			const entry = map.get(product.clarity)
			if (entry) {
				entry.count++
				entry.minPrice = Math.min(entry.minPrice, product.price)
				entry.maxPrice = Math.max(entry.maxPrice, product.price)
			} else {
				map.set(product.clarity, {
					count: 1,
					minPrice: product.price,
					maxPrice: product.price,
				})
			}
		}
		return map
	}, [emeralds])

	const clarityTable = useReactTable({
		data: clarityComparison,
		columns: clarityColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
			{/* Clarity grade cards */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{collections.map((collection) => {
					const stats = statsByGrade.get(collection.grade)
					return (
						<Link
							key={collection.grade}
							to="/emeralds/shop"
							search={{ view: "retail", clarity: collection.grade }}
							className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
						>
							<OptimizedImage
								src={collection.image}
								alt={`Colección ${collection.title}`}
								width={600}
								height={800}
								className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
							<div className="absolute bottom-0 left-0 right-0 p-6">
								<span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
									Claridad {collection.grade}
								</span>
								<h2 className="font-heading text-2xl text-white md:text-3xl">
									{collection.title}
								</h2>
								<p className="mt-1 text-sm text-white/70">
									{collection.description}
								</p>
								{stats && (
									<p className="mt-3 text-xs text-white/60">
										{stats.count} piedra
										{stats.count !== 1 ? "s" : ""} · Desde $
										{stats.minPrice.toLocaleString()}
									</p>
								)}
							</div>
						</Link>
					)
				})}
			</div>

			{/* Clarity comparison table */}
			<div className="mt-16">
				<div className="mb-8 text-center">
					<h2 className="font-heading text-2xl text-brand-primary-dark md:text-3xl">
						Comparativa de Claridades
					</h2>
					<p className="mt-2 text-sm text-brand-primary-dark/60">
						Referencia tecnica para elegir la piedra adecuada a tu proposito
					</p>
				</div>
				<div className="overflow-x-auto rounded-2xl border border-brand-primary-dark/10 bg-white shadow-sm">
					<table className="w-full text-sm">
						<thead>
							{clarityTable.getHeaderGroups().map((headerGroup) => (
								<tr
									key={headerGroup.id}
									className="border-b border-brand-primary-dark/10 bg-brand-primary-dark"
								>
									{headerGroup.headers.map((header, i) => (
										<th
											key={header.id}
											className={
												i === 0
													? "px-4 py-4 text-left font-body font-medium text-brand-primary-lighter/80"
													: "px-4 py-4 text-center font-heading text-lg text-brand-secondary-golden"
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
							{clarityTable.getRowModel().rows.map((row) => (
								<tr
									key={row.id}
									className={
										row.index % 2 === 0
											? "bg-white"
											: "bg-brand-primary-lighter/40"
									}
								>
									{row.getVisibleCells().map((cell, j) => (
										<td
											key={cell.id}
											className={
												j === 0
													? "px-4 py-3 font-medium text-brand-primary-dark"
													: "px-4 py-3 text-center text-brand-primary-dark/70"
											}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
