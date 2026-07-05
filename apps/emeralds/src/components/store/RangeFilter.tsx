import { Slider } from "@/components/ui/slider";

interface RangeFilterProps {
	label: string;
	min: number;
	max: number;
	step?: number;
	value: [number, number];
	onChange: (value: [number, number]) => void;
	formatValue?: (value: number) => string;
}

export function RangeFilter({
	label,
	min,
	max,
	step = 1,
	value,
	onChange,
	formatValue = (v) => v.toString(),
}: RangeFilterProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium text-brand-primary-dark">
					{label}
				</span>
			</div>
			<Slider
				min={min}
				max={max}
				step={step}
				value={value}
				onValueChange={(v) => onChange(v as [number, number])}
				className="[&_[data-slot=slider-range]]:bg-brand-primary [&_[data-slot=slider-thumb]]:border-brand-primary"
			/>
			<div className="flex items-center justify-between text-sm text-brand-primary-dark/70">
				<span>{formatValue(value[0])}</span>
				<span>{formatValue(value[1])}</span>
			</div>
		</div>
	);
}
