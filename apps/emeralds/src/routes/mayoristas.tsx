import { createFileRoute } from "@tanstack/react-router"
import { Breadcrumb } from "@natura-gems/ui"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { z } from "zod"
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo"
import {
	type WholesaleFilterState,
	WholesaleLotFilters,
} from "@/components/store/WholesaleLotFilters"
import { WholesaleLotGrid } from "@/components/store/WholesaleLotGrid"
import {
	type Clarity,
	type Cut,
	type Origin,
	wholesaleEmeraldsQueryOptions,
} from "@/lib/supabase-queries"

const searchSchema = z.object({
	priceMin: z.number().optional(),
	priceMax: z.number().optional(),
	caratMin: z.number().optional(),
	caratMax: z.number().optional(),
	stoneCountMin: z.number().optional(),
	stoneCountMax: z.number().optional(),
	origin: z.string().optional(),
	clarity: z.string().optional(),
	cut: z.string().optional(),
})

export const Route = createFileRoute("/mayoristas")({
	head: () =>
		buildMeta({
			title: "Mayoristas",
			description:
				"Precios especiales en esmeraldas colombianas para joyeros y mayoristas. Lotes certificados con trazabilidad completa desde las minas de Colombia.",
			path: "/mayoristas",
			jsonLd: [
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Mayoristas", path: "/mayoristas" },
				]),
			],
		}),
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(wholesaleEmeraldsQueryOptions())
	},
	validateSearch: searchSchema,
	component: MayoristasPage,
})

function MayoristasPage() {
	const navigate = Route.useNavigate()
	const search = Route.useSearch()
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
			search: {
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
				cut:
					newFilters.cuts.length > 0 ? newFilters.cuts.join(",") : undefined,
			},
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
		<div className="min-h-screen bg-brand-surface pb-24">
			<Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Mayoristas" }]} />
			<div className="bg-white py-8">
				<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
					<h1 className="font-heading text-3xl text-brand-primary-dark md:text-4xl">
						Mayoristas
					</h1>
					<p className="mt-2 text-brand-primary-dark/70">
						Lotes de esmeraldas colombianas para compra al por mayor
					</p>
				</div>
			</div>

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
		</div>
	)
}
