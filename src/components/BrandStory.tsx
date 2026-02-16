import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { localizeContent } from "@/hooks/sanity-helper";
import { brandStorySectionQueryOptions } from "@/lib/sanity-queries";
import { Button } from "./ui/button";
import { OptimizedImage } from "./ui/optimized-image";

export default function BrandStory() {
	const { data: content } = useSuspenseQuery(
		brandStorySectionQueryOptions("brand-story"),
	);

	const title =
		localizeContent(content?.title ?? {}) ??
		"Desde las Minas de Muzo al Mundo";
	const description =
		localizeContent(content?.description ?? {}) ??
		"Tres generaciones dedicadas al arte de las esmeraldas colombianas. Nuestra pasión nació en las minas de Muzo, donde aprendimos a reconocer la verdadera belleza de cada piedra. Hoy, llevamos esa tradición al mundo.";
	const ctaText =
		localizeContent(content?.cta?.text ?? {}) ?? "Conoce Nuestra Historia";
	const ctaLink = content?.cta?.link ?? "/about";

	return (
		<section className="bg-brand-primary-dark py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-6 sm:px-8">
				<div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
					<div className="flex-1 text-center md:text-left">
						<Sparkles className="mx-auto mb-4 h-10 w-10 text-brand-secondary-golden md:mx-0" />
						<h2 className="mb-4 font-heading text-3xl text-brand-primary-lighter sm:text-4xl md:text-5xl">
							{title}
						</h2>
						<p className="mb-8 max-w-lg font-body leading-relaxed text-brand-primary-lighter/80">
							{description}
						</p>
						{content?.stats && content.stats.length > 0 && (
							<dl className="mb-8 flex flex-wrap justify-center gap-8 md:justify-start">
								{content.stats.map((stat) => (
									<div key={stat._key}>
										<dd className="font-heading text-2xl text-brand-secondary-golden sm:text-3xl">
											{localizeContent(stat.value ?? {})}
										</dd>
										<dt className="text-xs text-brand-primary-lighter/60 sm:text-sm">
											{localizeContent(stat.label ?? {})}
										</dt>
									</div>
								))}
							</dl>
						)}
						<Button
							asChild
							className="rounded-full bg-brand-secondary-golden px-8 text-brand-primary-dark hover:bg-brand-secondary-golden/90"
						>
							<Link to={ctaLink}>
								{ctaText}
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
					<div className="hidden flex-1 md:block">
						<OptimizedImage
							src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&h=800&fit=crop"
							alt="Esmeraldas colombianas de Muzo"
							width={600}
							height={800}
							className="h-500px w-full rounded-2xl object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
