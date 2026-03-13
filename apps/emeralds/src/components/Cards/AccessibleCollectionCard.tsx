import { OptimizedImage } from "@/components/ui/optimized-image";

export interface AccessibleCollectionCardProps {
	image: string;
	alt: string;
	name: string;
	carat: number;
	origin: string;
	clarity: string;
	price: string;
}

export default function AccessibleCollectionCard({
	image,
	alt,
	name,
	carat,
	origin,
	clarity,
	price,
}: AccessibleCollectionCardProps) {
	return (
		<div className="group flex cursor-pointer gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-lg sm:gap-6 sm:p-5">
			<div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-brand-primary-lighter sm:h-40 sm:w-40">
				<OptimizedImage
					src={image}
					alt={alt}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					width={160}
					height={160}
				/>
			</div>
			<div className="flex flex-col justify-center">
				<h3 className="font-heading text-lg text-brand-primary-dark transition-colors group-hover:text-brand-primary-dark/70 sm:text-xl">
					{name}
				</h3>
				<div className="mt-2 flex flex-wrap gap-2">
					<span className="rounded-full bg-brand-primary-lighter px-2.5 py-0.5 text-xs text-brand-primary-dark/70">
						{carat} ct
					</span>
					<span className="rounded-full bg-brand-primary-lighter px-2.5 py-0.5 text-xs text-brand-primary-dark/70">
						{origin}
					</span>
					<span className="rounded-full bg-brand-primary-lighter px-2.5 py-0.5 text-xs text-brand-primary-dark/70">
						{clarity}
					</span>
				</div>
				<p className="mt-3 font-body text-lg font-semibold text-brand-primary-dark">
					{price}
				</p>
			</div>
		</div>
	);
}
