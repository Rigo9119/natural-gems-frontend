import { ArrowRight } from "lucide-react";

export interface PanelProps {
  chipText: string;
  title: string;
  description: string;
  href: string;
  linkText: string;
  secondary?: boolean;
  disableld?: boolean;
}

export default function Panel({
  chipText,
  title,
  description,
  href,
  linkText,
  secondary = false,
  disableld,
}: PanelProps) {
  const cmpBgClass = secondary
    ? "bg-brand-secondary-terra"
    : "bg-brand-primary-dark";

  const baseClass = `group relative flex flex-1 flex-col items-center justify-center overflow-hidden ${cmpBgClass} px-6 pt-24 pb-12 transition-all duration-500 md:min-h-screen md:px-8 md:py-0`;

  if (disableld) {
    return (
      <div className={`${baseClass} cursor-default`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-left,rgba(247,209,126,0.08)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand-primary-light/10 transition-transform duration-700 group-hover:scale-110 md:-bottom-32 md:-left-32 md:h-96 md:w-96" />

      <div className="relative text-center">
        <span className="mb-4 inline-block rounded-full border border-brand-secondary-golden/40 bg-brand-secondary-golden/10 px-4 py-1 text-xs font-medium tracking-widest text-brand-secondary-golden uppercase md:mb-6">
          {chipText}
        </span>

        <h1 className="mb-4 font-heading text-5xl leading-none text-brand-primary-lighter sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mx-auto mb-8 max-w-xs font-body text-sm leading-relaxed text-brand-primary-lighter/60 sm:text-base md:mb-10 md:text-lg">
          {description}
        </p>
      </div>
    </div>
    );
  }

  return (
    <a
      href={href}
      className={`${baseClass} md:hover:flex-[1.15]`}
      aria-label="Ir a Esmeraldas"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-left,rgba(247,209,126,0.08)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand-primary-light/10 transition-transform duration-700 group-hover:scale-110 md:-bottom-32 md:-left-32 md:h-96 md:w-96" />

      <div className="relative text-center">
        <span className="mb-4 inline-block rounded-full border border-brand-secondary-golden/40 bg-brand-secondary-golden/10 px-4 py-1 text-xs font-medium tracking-widest text-brand-secondary-golden uppercase md:mb-6">
          {chipText}
        </span>

        <h1 className="mb-4 font-heading text-5xl leading-none text-brand-primary-lighter sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mx-auto mb-8 max-w-xs font-body text-sm leading-relaxed text-brand-primary-lighter/60 sm:text-base md:mb-10 md:text-lg">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-secondary-golden px-6 py-3.5 font-body text-sm font-medium tracking-wide text-brand-primary-dark transition-all duration-300 group-hover:gap-4 group-hover:bg-brand-secondary-golden/90 md:gap-3 md:px-8 md:py-4">
          {linkText}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
