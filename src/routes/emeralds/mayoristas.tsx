import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";
import {
	type WholesaleFilterState,
	WholesaleLotFilters,
} from "@/components/store/WholesaleLotFilters";
import { WholesaleLotGrid } from "@/components/store/WholesaleLotGrid";
import {
	type Clarity,
	type Cut,
	demoWholesaleLots,
	type Origin,
} from "@/data/demo-wholesale-lots";

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
});

export const Route = createFileRoute("/emeralds/mayoristas")({
	head: () => buildMeta({
		title: "Mayoristas",
		description: "Precios especiales en esmeraldas colombianas para joyeros y mayoristas. Lotes certificados con trazabilidad completa desde las minas de Colombia.",
		path: "/emeralds/mayoristas",
		jsonLd: [breadcrumbJsonLd([
			{ name: "Inicio", path: "/" },
			{ name: "Esmeraldas", path: "/emeralds" },
			{ name: "Mayoristas", path: "/emeralds/mayoristas" },
		])],
	}),
	validateSearch: searchSchema,
	component: MayoristasPage,
});

function MayoristasPage() {
	const navigate = Route.useNavigate();
	const search = Route.useSearch();

	const priceRange = useMemo(() => {
		const prices = demoWholesaleLots.map((l) => l.totalPrice);
		return { min: Math.min(...prices), max: Math.max(...prices) };
	}, []);

	const caratRange = useMemo(() => {
		const carats = demoWholesaleLots.map((l) => l.totalCarats);
		return {
			min: Math.floor(Math.min(...carats) * 10) / 10,
			max: Math.ceil(Math.max(...carats) * 10) / 10,
		}
	}, []);

	const stoneCountRange = useMemo(() => {
		const counts = demoWholesaleLots.map((l) => l.stoneCount);
		return { min: Math.min(...counts), max: Math.max(...counts) };
	}, []);

	const filters: WholesaleFilterState = useMemo(
		() => ({
			priceMin: search.priceMin ?? priceRange.min,
			priceMax: search.priceMax ?? priceRange.max,
			caratMin: search.caratMin ?? caratRange.min,
			caratMax: search.caratMax ?? caratRange.max,
			stoneCountMin: search.stoneCountMin ?? stoneCountRange.min,
			stoneCountMax: search.stoneCountMax ?? stoneCountRange.max,
			origins: search.origin ? (search.origin.split(",") as Origin[]) : [],
			clarities: search.clarity ? (search.clarity.split(",") as Clarity[]) : [],
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
				cut: newFilters.cuts.length > 0 ? newFilters.cuts.join(",") : undefined,
			},
			replace: true,
		})
	}

	const filteredLots = useMemo(() => {
		return demoWholesaleLots.filter((lot) => {
			if (
				lot.totalPrice < filters.priceMin ||
				lot.totalPrice > filters.priceMax
			)
				return false;
			if (
				lot.totalCarats < filters.caratMin ||
				lot.totalCarats > filters.caratMax
			)
				return false;
			if (
				lot.stoneCount < filters.stoneCountMin ||
				lot.stoneCount > filters.stoneCountMax
			)
				return false;
			if (filters.origins.length > 0 && !filters.origins.includes(lot.origin))
				return false;
			if (
				filters.clarities.length > 0 &&
				!filters.clarities.includes(lot.clarity)
			)
				return false;
			if (filters.cuts.length > 0 && !filters.cuts.includes(lot.cut))
				return false;
			return true;
		})
	}, [filters]);

	return (
		<div className="min-h-screen bg-brand-surface pb-24">
			<div className="border-b border-brand-primary-dark/10 bg-white py-8">
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
