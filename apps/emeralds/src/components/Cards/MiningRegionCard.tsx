import { MapPin } from "lucide-react";

export interface MiningRegionCardProps {
	name: string;
	region: string;
	colorProfile: string;
	knownFor: string;
	priceNote: string;
}

export default function MiningRegionCard({
	name,
	region,
	colorProfile,
	knownFor,
	priceNote,
}: MiningRegionCardProps) {
	return (
		<div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary-dark/10">
					<MapPin className="h-5 w-5 text-brand-primary-dark" />
				</span>
				<div>
					<h3 className="font-heading text-xl text-brand-primary-dark">
						{name}
					</h3>
					<p className="text-xs text-brand-primary-dark/50">{region}</p>
				</div>
			</div>
			<p className="mb-3 text-xs font-medium uppercase tracking-wider text-brand-secondary-golden">
				{colorProfile}
			</p>
			<p className="flex-1 text-sm leading-relaxed text-brand-primary-dark/70">
				{knownFor}
			</p>
			<p className="mt-4 rounded-lg bg-brand-primary-lighter px-3 py-2 text-xs text-brand-primary-dark/60">
				{priceNote}
			</p>
		</div>
	);
}
