import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useLocalizedContent } from "@/hooks/sanity-helper";
import type { HeroSection } from "@/lib/sanity-queries";
import { OptimizedImage } from "./ui/optimized-image";

export interface HeroProps {
  hero: HeroSection;
}

export default function Hero({ hero }: HeroProps) {
  const heroSubTitle = useLocalizedContent(hero?.subTitle ?? {});
  const heroTitle = useLocalizedContent(hero?.title ?? {});
  const heroDescription = useLocalizedContent(hero?.description ?? {});
  const heroCtaLeft = useLocalizedContent(hero?.ctaLeft?.text ?? {});
  const heroCtaRight = useLocalizedContent(hero?.ctaRight?.text ?? {});

  return (
    <section
      aria-label="Presentación"
      className="relative flex min-h-screen flex-col items-center justify-center bg-brand-primary-dark px-6 text-center sm:px-8"
    >
      <OptimizedImage
        src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1600&h=900&fit=crop"
        alt="Esmeraldas colombianas"
        className="absolute inset-0 h-full w-full object-cover"
        width={1600}
        height={900}
        priority
      />
      <div className="absolute inset-0 bg-brand-primary-dark/80" />
      <div className="relative z-10 px-6 text-center sm:px-8">
        <p className="mb-4 font-body text-xs tracking-[0.3em] uppercase text-brand-secondary-golden sm:mb-6 sm:text-sm">
          {heroSubTitle}
        </p>
        <h1 className="mb-4 font-heading text-5xl text-brand-primary-lighter sm:mb-6 sm:text-6xl md:text-8xl">
          {heroTitle}
        </h1>
        <p className="mx-auto mb-8 max-w-xl font-body text-base leading-relaxed text-brand-primary-lighter/80 sm:mb-12 sm:text-lg">
          {heroDescription}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to={hero?.ctaLeft?.link || "/emeralds"}
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary-lighter px-6 py-3 font-body font-medium text-brand-primary-lighter transition-all duration-300 hover:bg-brand-primary-lighter hover:text-brand-primary-dark sm:px-8 sm:py-4 sm:text-lg"
          >
            {heroCtaLeft}
          </Link>
          <Link
            to={hero?.ctaRight?.link || "/jewelry"}
            className="inline-flex items-center gap-2 rounded-full bg-brand-secondary-golden px-6 py-3 font-body font-medium text-brand-primary-dark transition-all duration-300 hover:scale-105 hover:bg-brand-secondary-golden/90 sm:px-8 sm:py-4 sm:text-lg"
          >
            {heroCtaRight}
          </Link>
        </div>
      </div>
      <a
        href="#featured"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Desplazarse hacia abajo"
      >
        <ChevronDown
          className="h-6 w-6 text-brand-primary-lighter/60"
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
