import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "hy", "ar"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  hy: "Հայերեն",
  ar: "العربية",
};

const RTL_LOCALES: readonly Locale[] = ["ar"];

export function getDirection(locale: Locale) {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}
