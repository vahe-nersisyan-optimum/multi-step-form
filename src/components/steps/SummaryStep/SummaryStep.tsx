import { StepHeader } from "@/components/StepHeader/StepHeader";
import { calculateTotal, findPlan, formatPrice, getPrice, getSelectedAddOns } from "@/lib/pricing";
import type { AddOnId, Billing, PlanId } from "@/lib/types";
import styles from "./SummaryStep.module.scss";

interface SummaryStepProps {
  planId: PlanId | null;
  billing: Billing;
  addOnIds: readonly AddOnId[];
  onChangePlan: () => void;
}

const BILLING_LABEL: Record<Billing, { name: string; period: string }> = {
  monthly: { name: "Monthly", period: "month" },
  yearly: { name: "Yearly", period: "year" },
};

export function SummaryStep({
  planId,
  billing,
  addOnIds,
  onChangePlan,
}: SummaryStepProps) {
  const plan = findPlan(planId);
  const addOns = getSelectedAddOns(addOnIds);
  const total = calculateTotal(planId, addOnIds, billing);
  const { name: billingName, period } = BILLING_LABEL[billing];

  return (
    <>
      <StepHeader
        title="Finishing up"
        description="Double-check everything looks OK before confirming."
      />
      <div className={styles.summary}>
        <div className={styles.plan}>
          <div>
            <p className={styles.planName}>
              {plan?.name ?? "No plan"} ({billingName})
            </p>
            <button
              type="button"
              className={styles.change}
              aria-label="Change plan"
              onClick={onChangePlan}
            >
              Change
            </button>
          </div>
          {plan && (
            <p className={styles.planPrice}>
              {formatPrice(getPrice(plan.monthlyPrice, billing), billing)}
            </p>
          )}
        </div>
        {addOns.length > 0 && (
          <ul className={styles.addOns}>
            {addOns.map((addOn) => (
              <li key={addOn.id} className={styles.addOn}>
                <span className={styles.addOnName}>{addOn.name}</span>
                <span className={styles.addOnPrice}>
                  {formatPrice(getPrice(addOn.monthlyPrice, billing), billing, { signed: true })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className={styles.total}>
        <span className={styles.totalLabel}>Total (per {period})</span>
        <span className={styles.totalPrice}>{formatPrice(total, billing)}</span>
      </p>
    </>
  );
}
