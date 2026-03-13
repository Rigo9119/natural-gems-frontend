import { OptimizedImage } from "@/components/ui/optimized-image";

export interface SpotlightCardProps {
	image: string;
	alt: string;
	name: string;
	meta: string;
	price: string;
}

export default function SpotlightCard({
	image,
	alt,
	name,
	meta,
	price,
}: SpotlightCardProps) {
	return (
		<div className="group flex cursor-pointer gap-4">
			<div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-brand-primary-lighter sm:h-32 sm:w-32">
				<OptimizedImage
					src={image}
					alt={alt}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					width={160}
					height={160}
				/>
			</div>
			<div className="flex flex-col justify-center">
				<h3 className="font-heading text-lg text-brand-primary-dark transition-colors group-hover:text-brand-primary-dark/70">
					{name}
				</h3>
				<p className="mt-1 text-sm text-brand-primary-dark/60">{meta}</p>
				<p className="mt-1 font-body font-semibold text-brand-primary-dark">
					{price}
				</p>
			</div>
		</div>
	);
}
