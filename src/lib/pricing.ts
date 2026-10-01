import { ADD_ONS, PLANS, PROMO_CODES, YEARLY_MONTHS_CHARGED } from "./constants";
import type { AddOnId, Billing, PlanId } from "./types";

export function getPrice(monthlyPrice: number, billing: Billing): number {
  return billing === "yearly" ? monthlyPrice * YEARLY_MONTHS_CHARGED : monthlyPrice;
}

export function findPlan(id: PlanId | null) {
  return PLANS.find((plan) => plan.id === id);
}

export function getSelectedAddOns(ids: readonly AddOnId[]) {
  return ADD_ONS.filter((addOn) => ids.includes(addOn.id));
}

export function normalizePromoCode(code: string): string {
  return code.trim().toUpperCase();
}

export function getPromoDiscountRate(code: string | null): number {
  return code ? (PROMO_CODES[normalizePromoCode(code)] ?? 0) : 0;
}

const roundToCents = (amount: number) => Math.round(amount * 100) / 100;

export function calculateSummary(
  planId: PlanId | null,
  addOnIds: readonly AddOnId[],
  billing: Billing,
  promoCode: string | null,
) {
  const planPrice = findPlan(planId)?.monthlyPrice ?? 0;
  const addOnsPrice = getSelectedAddOns(addOnIds).reduce(
    (sum, addOn) => sum + addOn.monthlyPrice,
    0,
  );
  const subtotal = getPrice(planPrice + addOnsPrice, billing);
  const discount = roundToCents(subtotal * getPromoDiscountRate(promoCode));

  return { subtotal, discount, total: roundToCents(subtotal - discount) };
}
