import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FilterDropdown } from "./FilterDropdown";
import { RangeFilter } from "./RangeFilter";
import {
	origins,
	clarities,
	cuts,
	type Origin,
	type Clarity,
	type Cut,
} from "@/data/demo-products";

export interface FilterState {
	priceMin: number;
	priceMax: number;
	caratMin: number;
	caratMax: number;
	origins: Origin[];
	clarities: Clarity[];
	cuts: Cut[];
}

interface ProductFiltersProps {
	filters: FilterState;
	onFiltersChange: (filters: FilterState) => void;
	priceRange: { min: number; max: number };
	caratRange: { min: number; max: number };
}

export function ProductFilters({
	filters,
	onFiltersChange,
	priceRange,
	caratRange,
}: ProductFiltersProps) {
	const hasActiveFilters =
		filters.priceMin > priceRange.min ||
		filters.priceMax < priceRange.max ||
		filters.caratMin > caratRange.min ||
		filters.caratMax < caratRange.max ||
		filters.origins.length > 0 ||
		filters.clarities.length > 0 ||
		filters.cuts.length > 0;

	const clearAllFilters = () => {
		onFiltersChange({
			priceMin: priceRange.min,
			priceMax: priceRange.max,
			caratMin: caratRange.min,
			caratMax: caratRange.max,
			origins: [],
			clarities: [],
			cuts: [],
		});
	};

	const toggleOrigin = (origin: Origin) => {
		const newOrigins = filters.origins.includes(origin)
			? filters.origins.filter((o) => o !== origin)
			: [...filters.origins, origin];
		onFiltersChange({ ...filters, origins: newOrigins });
	};

	const toggleClarity = (clarity: Clarity) => {
		const newClarities = filters.clarities.includes(clarity)
			? filters.clarities.filter((c) => c !== clarity)
			: [...filters.clarities, clarity];
		onFiltersChange({ ...filters, clarities: newClarities });
	};

	const toggleCut = (cut: Cut) => {
		const newCuts = filters.cuts.includes(cut)
			? filters.cuts.filter((c) => c !== cut)
			: [...filters.cuts, cut];
		onFiltersChange({ ...filters, cuts: newCuts });
	};

	const priceActive =
		filters.priceMin > priceRange.min || filters.priceMax < priceRange.max
			? 1
			: 0;
	const caratActive =
		filters.caratMin > caratRange.min || filters.caratMax < caratRange.max
			? 1
			: 0;

	return (
		<div className="flex flex-wrap items-center gap-2 border-b border-brand-primary-dark/10 bg-white px-4 py-4 md:px-6 lg:px-8">
			<FilterDropdown label="Precio" activeCount={priceActive}>
				<RangeFilter
					label="Rango de precio"
					min={priceRange.min}
					max={priceRange.max}
					step={100}
					value={[filters.priceMin, filters.priceMax]}
					onChange={([min, max]) =>
						onFiltersChange({ ...filters, priceMin: min, priceMax: max })
					}
					formatValue={(v) => `$${v.toLocaleString()}`}
				/>
			</FilterDropdown>

			<FilterDropdown label="Quilates" activeCount={caratActive}>
				<RangeFilter
					label="Rango de quilates"
					min={caratRange.min}
					max={caratRange.max}
					step={0.1}
					value={[filters.caratMin, filters.caratMax]}
					onChange={([min, max]) =>
						onFiltersChange({ ...filters, caratMin: min, caratMax: max })
					}
					formatValue={(v) => `${v.toFixed(1)} ct`}
				/>
			</FilterDropdown>

			<FilterDropdown label="Origen" activeCount={filters.origins.length}>
				<div className="space-y-3">
					<span className="text-sm font-medium text-brand-primary-dark">
						Origen de la mina
					</span>
					{origins.map((origin) => (
						<div key={origin} className="flex items-center gap-2">
							<Checkbox
								id={`origin-${origin}`}
								checked={filters.origins.includes(origin)}
								onCheckedChange={() => toggleOrigin(origin)}
							/>
							<Label
								htmlFor={`origin-${origin}`}
								className="text-sm text-brand-primary-dark/80"
							>
								{origin}
							</Label>
						</div>
					))}
				</div>
			</FilterDropdown>

			<FilterDropdown label="Claridad" activeCount={filters.clarities.length}>
				<div className="space-y-3">
					<span className="text-sm font-medium text-brand-primary-dark">
						Nivel de claridad
					</span>
					{clarities.map((clarity) => (
						<div key={clarity} className="flex items-center gap-2">
							<Checkbox
								id={`clarity-${clarity}`}
								checked={filters.clarities.includes(clarity)}
								onCheckedChange={() => toggleClarity(clarity)}
							/>
							<Label
								htmlFor={`clarity-${clarity}`}
								className="text-sm text-brand-primary-dark/80"
							>
								{clarity}
							</Label>
						</div>
					))}
				</div>
			</FilterDropdown>

			<FilterDropdown label="Corte" activeCount={filters.cuts.length}>
				<div className="space-y-3">
					<span className="text-sm font-medium text-brand-primary-dark">
						Tipo de corte
					</span>
					{cuts.map((cut) => (
						<div key={cut} className="flex items-center gap-2">
							<Checkbox
								id={`cut-${cut}`}
								checked={filters.cuts.includes(cut)}
								onCheckedChange={() => toggleCut(cut)}
							/>
							<Label
								htmlFor={`cut-${cut}`}
								className="text-sm text-brand-primary-dark/80"
							>
								{cut}
							</Label>
						</div>
					))}
				</div>
			</FilterDropdown>

			{hasActiveFilters && (
				<Button
					variant="ghost"
					size="sm"
					onClick={clearAllFilters}
					className="ml-2 h-9 gap-1.5 text-brand-primary-dark/70 hover:text-brand-primary-dark"
				>
					<X className="h-4 w-4" />
					Limpiar
				</Button>
			)}
		</div>
	);
}
