import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Button } from "./ui/button";
import { localizeContent } from "@/hooks/sanity-helper";
import { WHATSAPP_URL } from "@/lib/constants";
import { WhatsAppSection } from "@/lib/sanity/sanity-types";

export interface WhatsAppSectionProps {
  sectionContent: WhatsAppSection;
}

export default function WhatsAppSectionCMP({
  sectionContent,
}: WhatsAppSectionProps) {
  const title =
    localizeContent(sectionContent?.header?.title ?? {}) ?? "Atención Personalizada";
  const description =
    localizeContent(sectionContent?.header?.description ?? {}) ??
    "Cada esmeralda es única, como tú. Nuestros expertos gemólogos están listos para ayudarte a encontrar la piedra perfecta con una atención exclusiva y personalizada.";
  const ctaText =
    localizeContent(sectionContent?.header?.cta?.text ?? {}) ??
    "Escríbenos por WhatsApp";
  const ctaLink = sectionContent?.header?.cta?.link ?? WHATSAPP_URL;
  const location =
    localizeContent(sectionContent?.location ?? {}) ??
    "Bogotá, Colombia · Envíos a todo el mundo";

  return (
    <section className="bg-brand-primary-dark py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <SiWhatsapp className="mx-auto mb-6 h-10 w-10 text-brand-secondary-golden" />
        <h2 className="mb-4 font-heading text-3xl text-brand-primary-lighter sm:text-4xl">
          {title}
        </h2>
        <p className="mb-8 font-body leading-relaxed text-brand-primary-lighter/80">
          {description}
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-full bg-brand-secondary-golden px-8 text-brand-primary-dark hover:bg-brand-secondary-golden/90"
        >
          <a href={ctaLink} target="_blank" rel="noopener noreferrer">
            <SiWhatsapp className="mr-2 h-5 w-5" />
            {ctaText}
          </a>
        </Button>
        <p className="mt-6 text-sm text-brand-primary-lighter/50">{location}</p>
      </div>
    </section>
  );
}
