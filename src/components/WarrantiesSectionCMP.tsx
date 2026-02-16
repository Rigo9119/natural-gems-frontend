import type { WarrantySection } from "@/lib/sanity-queries";
import { localizeContent } from "@/hooks/sanity-helper";
import { iconMap } from "@/lib/icon-map";

export interface WarrantiesSectionProps {
  sectionContent?: WarrantySection | null;
}

export default function WarrantiesSectionCMP({
  sectionContent,
}: WarrantiesSectionProps) {
  const subtitle = localizeContent(sectionContent?.subtitle ?? {});
  const title = localizeContent(sectionContent?.title ?? {});

  return (
    <section className="bg-brand-secondary-terra py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-12 text-center sm:mb-16">
          {subtitle && (
            <p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-secondary-golden sm:text-sm">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="font-heading text-3xl text-brand-primary-lighter sm:text-4xl">
              {title}
            </h2>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectionContent?.cards?.map((card) => {
            const Icon = card.icon ? iconMap[card.icon] : null;
            const cardTitle = localizeContent(card.title ?? {});
            const cardDescription = localizeContent(card.description ?? {});

            return (
              <div
                key={card._key}
                className="rounded-xl border border-white/20 p-6 sm:p-8"
              >
                {Icon && (
                  <Icon className="mb-4 h-8 w-8 text-brand-secondary-golden" />
                )}
                {cardTitle && (
                  <h3 className="mb-2 font-heading text-lg text-brand-primary-lighter">
                    {cardTitle}
                  </h3>
                )}
                {cardDescription && (
                  <p className="font-body text-sm leading-relaxed text-brand-primary-lighter/70">
                    {cardDescription}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
