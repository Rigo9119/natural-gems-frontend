import { getLocale } from "@/paraglide/runtime";

export function useLocalizedContent<T>(content: Record<string, T>): T {
  const lang = getLocale();
  return content[lang];
}
