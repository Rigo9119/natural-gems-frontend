import { OptimizedImage } from "@/components/ui/optimized-image";

export interface LargeSpotlightCardProps {
	image: string;
	alt: string;
	name: string;
	meta: string;
	price: string;
	badge?: string;
}

export default function LargeSpotlightCard({
	image,
	alt,
	name,
	meta,
	price,
	badge,
}: LargeSpotlightCardProps) {
	return (
		<div className="group cursor-pointer">
			<div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-primary-lighter">
				<OptimizedImage
					src={image}
					alt={alt}
					className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					width={400}
					height={500}
				/>
				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 sm:p-8">
					{badge && (
						<span className="mb-2 inline-block rounded-full bg-brand-secondary-golden px-3 py-1 text-xs font-medium text-brand-primary-dark">
							{badge}
						</span>
					)}
					<h3 className="font-heading text-2xl text-white sm:text-3xl">
						{name}
					</h3>
					<p className="mt-1 text-sm text-white/70">{meta}</p>
					<p className="mt-2 font-body text-xl font-semibold text-white">
						{price}
					</p>
				</div>
			</div>
		</div>
	);
}
