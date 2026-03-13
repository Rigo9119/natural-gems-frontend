import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import type { FeaturedProductsSection } from "@/lib/sanity/sanity-types";
import { localizeContent } from "@/hooks/sanity-helper";

const variants = {
  emeralds: {
    bg: "bg-white",
    subtitle: "text-brand-primary-dark/60",
    title: "text-brand-primary-dark",
    btnBorder: "border-brand-primary-dark",
    btnText: "text-brand-primary-dark",
    btnHoverBg: "hover:bg-brand-primary-dark",
    btnHoverText: "hover:text-brand-primary-lighter",
  },
  jewelry: {
    bg: "bg-brand-primary-lighter",
    subtitle: "text-brand-secondary-terra",
    title: "text-brand-secondary-terra",
    btnBorder: "border-brand-secondary-terra",
    btnText: "text-brand-secondary-terra",
    btnHoverBg: "hover:bg-brand-secondary-terra",
    btnHoverText: "hover:text-white",
  },
};

export interface FeaturedProductsProps {
  sectionContent?: FeaturedProductsSection | null;
  variant?: keyof typeof variants;
  children: React.ReactNode;
}

export default function FeaturedProductsCMP({
  sectionContent,
  variant = "emeralds",
  children,
}: FeaturedProductsProps) {
  const v = variants[variant];
  const subtitle = localizeContent(sectionContent?.header?.subtitle ?? {});
  const title = localizeContent(sectionContent?.header?.title ?? {});
  const ctaText = localizeContent(sectionContent?.header?.cta?.text ?? {});
  const ctaLink = sectionContent?.header?.cta?.link ?? "/";

  const btnClasses = `rounded-full ${v.btnBorder} ${v.btnText} ${v.btnHoverBg} ${v.btnHoverText}`;

  return (
    <section className={`${v.bg} py-16 sm:py-24`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div>
            {subtitle && (
              <p
                className={`mb-3 font-body text-xs tracking-[0.2em] uppercase sm:text-sm ${v.subtitle}`}
              >
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className={`font-heading text-3xl sm:text-4xl ${v.title}`}>
                {title}
              </h2>
            )}
          </div>
          {ctaText && (
            <Button
              asChild
              variant="outline"
              className={`hidden sm:flex ${btnClasses}`}
            >
              <Link to={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
        {children}
        {ctaText && (
          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline" className={btnClasses}>
              <Link to={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
