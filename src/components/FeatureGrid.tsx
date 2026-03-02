import { ReactNode } from "react";

interface FeatureGridProps {
	subTitle: string;
	title: string;
	description?: string;
	backgroundColor?: string;
	children: ReactNode;
}

export default function FeatureGrid({
	subTitle,
	title,
	description,
	backgroundColor,
	children,
}: FeatureGridProps) {
	return (
		<section className={`${backgroundColor ?? "bg-brand-primary-lighter"} py-16 sm:py-24`}>
			<div className="mx-auto max-w-7xl px-6 sm:px-8">
				<div className="mb-12 text-center">
					<p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-primary-dark/60 sm:text-sm">
						{subTitle}
					</p>
					<h2 className="font-heading text-3xl text-brand-primary-dark sm:text-4xl md:text-5xl">
						{title}
					</h2>
					{description && (
						<p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-brand-primary-dark/70 sm:text-base">
							{description}
						</p>
					)}
				</div>
				{children}
			</div>
		</section>
	);
}
