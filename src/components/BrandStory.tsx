import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { localizeContent } from "@/hooks/sanity-helper";
import { type BrandStorySection } from "@/lib/sanity/sanity-types";
import { Button } from "./ui/button";
import { OptimizedImage } from "./ui/optimized-image";

export interface BrandStoryProps {
  sectionContent: BrandStorySection;
  variant?: "side" | "background";
}

const FALLBACK_STATS = [
  { _key: "1", value: { es: "70%" }, label: { es: "Producción Mundial" } },
  { _key: "2", value: { es: "4" }, label: { es: "Minas de Origen" } },
  { _key: "3", value: { es: "GIA" }, label: { es: "Certificadas" } },
] as const;

export default function BrandStory({
  sectionContent,
  variant = "side",
}: BrandStoryProps) {
  const title =
    localizeContent(sectionContent?.header?.title ?? {}) ??
    "Desde las Minas de Muzo al Mundo";
  const description =
    localizeContent(sectionContent?.header?.description ?? {}) ??
    "Tres generaciones dedicadas al arte de las esmeraldas colombianas. Nuestra pasión nació en las minas de Muzo, donde aprendimos a reconocer la verdadera belleza de cada piedra. Hoy, llevamos esa tradición al mundo.";
  const ctaText =
    localizeContent(sectionContent?.header?.cta?.text ?? {}) ??
    "Conoce Nuestra Historia";
  const ctaLink = sectionContent?.header?.cta?.link ?? "/about";

  const imageUrl =
    sectionContent?.image?.asset?.url ??
    "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1600&h=900&fit=crop";

  const stats =
    sectionContent?.stats && sectionContent.stats.length > 0
      ? sectionContent.stats
      : FALLBACK_STATS;

  if (variant === "background") {
    return (
      <section className="relative overflow-hidden py-20 sm:py-32">
        <OptimizedImage
          src={imageUrl}
          alt="Esmeraldas colombianas de Muzo"
          className="absolute inset-0 h-full w-full object-cover"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 bg-brand-primary-dark/85" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Sparkles className="mx-auto mb-6 h-10 w-10 text-brand-secondary-golden" />
            <h2 className="mb-6 font-heading text-3xl text-brand-primary-lighter sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl font-body text-base leading-relaxed text-brand-primary-lighter/80 sm:text-lg">
              {description}
            </p>
          </div>
          <dl className="mx-auto mb-12 grid max-w-2xl grid-cols-3 divide-x divide-brand-primary-lighter/20">
            {stats.map((stat) => (
              <div key={stat._key} className="px-4 text-center sm:px-8">
                <dd className="font-heading text-3xl text-brand-secondary-golden sm:text-4xl">
                  {localizeContent(stat.value ?? {})}
                </dd>
                <dt className="mt-1 text-xs text-brand-primary-lighter/60 sm:text-sm">
                  {localizeContent(stat.label ?? {})}
                </dt>
              </div>
            ))}
          </dl>
          <div className="text-center">
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
        </div>
      </section>
    );
  }

  // Default: side variant — content left, image right
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
            {sectionContent?.stats && sectionContent.stats.length > 0 && (
              <dl className="mb-8 flex flex-wrap justify-center gap-8 md:justify-start">
                {sectionContent.stats.map((stat) => (
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
