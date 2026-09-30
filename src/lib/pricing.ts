import { ADD_ONS, PLANS, YEARLY_MONTHS_CHARGED } from "./constants";
import type { AddOnId, Billing, PlanId } from "./types";

const PERIOD_SUFFIX: Record<Billing, string> = {
  monthly: "mo",
  yearly: "yr",
};

export function getPrice(monthlyPrice: number, billing: Billing): number {
  return billing === "yearly" ? monthlyPrice * YEARLY_MONTHS_CHARGED : monthlyPrice;
}

export function formatPrice(
  amount: number,
  billing: Billing,
  { signed = false }: { signed?: boolean } = {},
): string {
  return `${signed ? "+" : ""}$${amount}/${PERIOD_SUFFIX[billing]}`;
}

export function findPlan(id: PlanId | null) {
  return PLANS.find((plan) => plan.id === id);
}

export function getSelectedAddOns(ids: readonly AddOnId[]) {
  return ADD_ONS.filter((addOn) => ids.includes(addOn.id));
}

export function calculateTotal(
  planId: PlanId | null,
  addOnIds: readonly AddOnId[],
  billing: Billing,
): number {
  const planPrice = findPlan(planId)?.monthlyPrice ?? 0;
  const addOnsPrice = getSelectedAddOns(addOnIds).reduce(
    (sum, addOn) => sum + addOn.monthlyPrice,
    0,
  );

  return getPrice(planPrice + addOnsPrice, billing);
}
