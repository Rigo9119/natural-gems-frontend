import { getLocale } from "@/paraglide/runtime";

export function localizeContent(content: {
  es?: string;
  en?: string;
}): string | undefined {
  const lang = getLocale();
  return content[lang as keyof typeof content];
}

export function useLocalizedContent(content: {
  es?: string;
  en?: string;
}): string | undefined {
  return localizeContent(content);
}
