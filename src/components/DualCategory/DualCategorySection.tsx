import { localizeContent } from "@/hooks/sanity-helper";
import DualCategoryCard from "./DualCategoryCard";
import { DualCategorySection } from "@/lib/sanity-queries";

export interface DualCategorySectionProps {
  dualCategory: DualCategorySection;
}

export default function DualCategorySectionCMP({
  dualCategory,
}: DualCategorySectionProps) {
  return (
    <section id="discover" className="bg-brand-primary-lighter py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-10 text-center sm:mb-14">
          <p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-primary-dark/60 sm:text-sm">
            {localizeContent(dualCategory.subtitle ?? {})}
          </p>
          <h2 className="font-heading text-3xl text-brand-primary-dark sm:text-4xl md:text-5xl">
            {localizeContent(dualCategory.title ?? {})}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
          {dualCategory.cards?.map((card) => (
            <DualCategoryCard
              key={card._key}
              title={localizeContent(card.title ?? {}) ?? ""}
              subtitle={localizeContent(card.subtitle ?? {}) ?? ""}
              description={localizeContent(card.description ?? {}) ?? ""}
              imageSrc={card.image ?? ""}
              imageAlt={localizeContent(card.title ?? {}) ?? ""}
              linkTo={card.cta?.link ?? "/"}
              linkText={localizeContent(card.cta?.text ?? {}) ?? ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
