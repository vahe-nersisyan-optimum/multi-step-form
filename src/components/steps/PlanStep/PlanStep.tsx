import Image from "next/image";
import clsx from "clsx";
import { BillingToggle } from "@/components/BillingToggle/BillingToggle";
import { StepHeader } from "@/components/StepHeader/StepHeader";
import { PLANS, YEARLY_MONTHS_CHARGED } from "@/lib/constants";
import { formatPrice, getPrice } from "@/lib/pricing";
import type { Billing, PlanId } from "@/lib/types";
import styles from "./PlanStep.module.scss";

interface PlanStepProps {
  selectedPlan: PlanId | null;
  billing: Billing;
  error?: string;
  onSelectPlan: (plan: PlanId) => void;
  onToggleBilling: () => void;
}

const FREE_MONTHS = 12 - YEARLY_MONTHS_CHARGED;

export function PlanStep({
  selectedPlan,
  billing,
  error,
  onSelectPlan,
  onToggleBilling,
}: PlanStepProps) {
  return (
    <>
      <StepHeader
        title="Select your plan"
        description="You have the option of monthly or yearly billing."
      />
      <fieldset
        className={clsx(styles.fieldset, error && styles.invalid)}
        aria-describedby={error ? "plan-error" : undefined}
      >
        <legend className={styles.legend}>Plan</legend>
        <div className={styles.plans}>
          {PLANS.map((plan) => (
            <label key={plan.id} className={styles.plan}>
              <input
                type="radio"
                name="plan"
                value={plan.id}
                className={styles.radio}
                checked={selectedPlan === plan.id}
                onChange={() => onSelectPlan(plan.id)}
              />
              <Image src={plan.icon} alt={plan.name} width={40} height={40} className={styles.icon} />
              <span className={styles.details}>
                <span className={styles.name}>{plan.name}</span>
                <span className={styles.price}>
                  {formatPrice(getPrice(plan.monthlyPrice, billing), billing)}
                </span>
                {billing === "yearly" && (
                  <span className={styles.promo}>{FREE_MONTHS} months free</span>
                )}
              </span>
            </label>
          ))}
        </div>
        {error && (
          <p id="plan-error" className={styles.error} role="alert">
            {error}
          </p>
        )}
      </fieldset>
      <BillingToggle billing={billing} onToggle={onToggleBilling} />
    </>
  );
}
