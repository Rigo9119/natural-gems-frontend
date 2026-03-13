import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "./ui/button";

export type CTA = {
  ctaText: string;
  ctaLink: string;
};

export interface FeatureCalloutProps {
  icon: ReactNode;
  title: string;
  description: string;
  ctas: CTA[];
  backgroundColor?: string;
}

export default function FeatureCallout({
  icon,
  title,
  description,
  ctas,
  backgroundColor,
}: FeatureCalloutProps) {
  return (
    <section
      className={`${backgroundColor ?? "bg-brand-secondary-terra"} py-16 sm:py-24`}
    >
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <div className="mx-auto mb-6 flex justify-center">{icon}</div>
        <h2 className="mb-4 font-heading text-3xl text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mb-8 font-body leading-relaxed text-white/80">
          {description}
        </p>
        {ctas.length > 0 && (
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            {ctas.map((cta, index) =>
              index === 0 ? (
                <Button
                  key={cta.ctaLink}
                  asChild
                  size="lg"
                  className="rounded-full bg-brand-secondary-golden px-8 text-brand-secondary-terra hover:bg-brand-secondary-golden/90"
                >
                  <Link to={cta.ctaLink}>
                    {cta.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button
                  key={cta.ctaLink}
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white bg-transparent px-8 text-white hover:bg-white hover:text-brand-secondary-terra"
                >
                  <Link to={cta.ctaLink}>{cta.ctaText}</Link>
                </Button>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
