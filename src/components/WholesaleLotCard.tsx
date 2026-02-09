import type { WholesaleLot } from "@/data/demo-wholesale-lots";

interface WholesaleLotCardProps {
	lot: WholesaleLot;
}

export function WholesaleLotCard({ lot }: WholesaleLotCardProps) {
	return (
		<article className="group cursor-pointer">
			<figure className="relative aspect-square overflow-hidden rounded-lg bg-brand-primary-lighter">
				<img
					src={lot.image}
					alt={lot.name}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<div className="absolute left-2 top-2 z-10">
					<span className="inline-flex items-center rounded-full bg-brand-primary-dark px-3 py-1 text-xs font-medium text-white">
						{lot.stoneCount} piedras
					</span>
				</div>
			</figure>
			<dl className="mt-4 space-y-1">
				<dt className="sr-only">Nombre</dt>
				<dd className="font-heading text-xl text-brand-primary-dark">
					{lot.name}
				</dd>
				<dt className="sr-only">Descripción</dt>
				<dd className="line-clamp-2 text-sm text-brand-primary-dark/60">
					{lot.description}
				</dd>
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
					<dt className="sr-only">Quilates totales</dt>
					<dd className="text-sm text-brand-primary-dark/70">
						{lot.totalCarats} ct
					</dd>
					<dt className="sr-only">Origen</dt>
					<dd className="text-sm text-brand-primary-dark/70">{lot.origin}</dd>
					<dt className="sr-only">Claridad</dt>
					<dd className="text-sm text-brand-primary-dark/70">{lot.clarity}</dd>
				</div>
				<dt className="sr-only">Precio total</dt>
				<dd className="font-body font-semibold text-brand-primary-dark">
					<data value={lot.totalPrice}>${lot.totalPrice.toLocaleString()}</data>
				</dd>
			</dl>
		</article>
	);
}
