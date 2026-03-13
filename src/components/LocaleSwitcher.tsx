import { getLocale, locales, setLocale } from "@/paraglide/runtime";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const currentLocale = getLocale();

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Selector de idioma">
      <Globe className="w-4 h-4 text-brand-primary-lighter/70" aria-hidden="true" />
      <div className="flex">
        {locales.map((locale, index) => (
          <span key={locale} className="flex items-center">
            {index > 0 && (
              <span className="text-brand-primary-lighter/40 mx-1" aria-hidden="true">
                /
              </span>
            )}
            <button
              onClick={() => setLocale(locale)}
              aria-pressed={locale === currentLocale}
              aria-label={locale === "es" ? "Español" : "English"}
              className={`text-sm font-medium uppercase transition-colors ${
                locale === currentLocale
                  ? "text-brand-secondary-golden"
                  : "text-brand-primary-lighter/70 hover:text-brand-primary-lighter"
              }`}
            >
              {locale}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
