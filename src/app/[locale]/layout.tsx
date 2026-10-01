import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import clsx from "clsx";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { getDirection, routing } from "@/i18n/routing";
import { notoArabic, notoArmenian, ubuntu } from "../fonts";
import "@/styles/globals.scss";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#483eff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1220" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: hasLocale(routing.locales, locale) ? locale : routing.defaultLocale,
    namespace: "Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    icons: { icon: "/favicon-32x32.png" },
    keywords: ["multi-step form", "subscription", "plan", "add-ons"],
    alternates: {
      languages: Object.fromEntries(routing.locales.map((code) => [code, `/${code}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={clsx(ubuntu.variable, notoArmenian.variable, notoArabic.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
