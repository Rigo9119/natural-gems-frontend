import { Link } from "@tanstack/react-router";
import { ArrowRight, Gem } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import type { Clarity } from "@/lib/supabase-queries";

export interface ClarityItemCardProps {
	grade: Clarity;
	title: string;
	description: string;
	image: string;
	reverse?: boolean;
}

export default function ClarityItemCard({
	grade,
	title,
	description,
	image,
	reverse = false,
}: ClarityItemCardProps) {
	return (
		<Link
			to="/emeralds/shop"
			search={{ view: "retail", clarity: grade }}
			className={`group flex flex-col overflow-hidden rounded-2xl bg-brand-primary-lighter/50 transition-shadow hover:shadow-lg sm:h-56 sm:flex-row ${
				reverse ? "sm:flex-row-reverse" : ""
			}`}
		>
			<div className="relative h-48 shrink-0 overflow-hidden sm:h-auto sm:w-2/5">
				<OptimizedImage
					src={image}
					alt={`Claridad ${grade}`}
					className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
					width={600}
					height={800}
				/>
			</div>
			<div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
				<span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary-dark/10 px-3 py-1 text-xs font-medium text-brand-primary-dark">
					<Gem className="h-3 w-3" />
					Claridad {grade}
				</span>
				<h3 className="font-heading text-2xl text-brand-primary-dark sm:text-3xl">
					{title}
				</h3>
				<p className="mt-2 max-w-md text-sm leading-relaxed text-brand-primary-dark/70 sm:text-base">
					{description}
				</p>
				<span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary-dark transition-colors group-hover:text-brand-secondary-golden">
					Ver Piedras
					<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
				</span>
			</div>
		</Link>
	);
}
