"use client";

import { useFormatter, useTranslations, type NumberFormatOptions } from "next-intl";
import type { Billing } from "@/lib/types";

const isolateLtr = (text: string) => `\u2066${text}\u2069`;

const CURRENCY_FORMAT: NumberFormatOptions = {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  numberingSystem: "latn",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  trailingZeroDisplay: "stripIfInteger",
};

export function usePriceFormatter() {
  const t = useTranslations("Price");
  const format = useFormatter();

  return (amount: number, billing: Billing, { signed = false }: { signed?: boolean } = {}) =>
    t(billing, {
      price: isolateLtr(
        format.number(amount, {
          ...CURRENCY_FORMAT,
          signDisplay: signed ? "always" : "auto",
        }),
      ),
    });
}
