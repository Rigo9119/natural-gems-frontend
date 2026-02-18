import { Button } from "./ui/button";
import { localizeContent } from "@/hooks/sanity-helper";
import { type NewsletterSection } from "@/lib/sanity/sanity-types";

export interface NewsletterProps {
  sectionContent: NewsletterSection;
}

export default function Newsletter({ sectionContent }: NewsletterProps) {
  const title =
    localizeContent(sectionContent?.header?.title ?? {}) ?? "Únete a Nuestra Comunidad";
  const description =
    localizeContent(sectionContent?.header?.description ?? {}) ??
    "Suscríbete para recibir novedades, ofertas exclusivas y ser la primera en conocer nuestras nuevas colecciones.";
  const placeholder =
    localizeContent(sectionContent?.placeholder ?? {}) ??
    "Tu correo electrónico";
  const ctaText =
    localizeContent(sectionContent?.header?.cta?.text ?? {}) ?? "Suscribirse";

  return (
    <section className="bg-brand-secondary-terra py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <h2 className="mb-4 font-heading text-3xl text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mb-8 text-white/80">{description}</p>
        <form
          className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder={placeholder}
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/50 focus:border-brand-secondary-golden focus:outline-none"
          />
          <Button
            type="submit"
            className="rounded-full bg-brand-secondary-golden px-8 text-brand-secondary-terra hover:bg-brand-secondary-golden/90"
          >
            {ctaText}
          </Button>
        </form>
      </div>
    </section>
  );
}
