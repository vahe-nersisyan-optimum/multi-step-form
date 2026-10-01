import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { BillingToggle } from "@/components/BillingToggle/BillingToggle";
import { StepHeader } from "@/components/StepHeader/StepHeader";
import { usePriceFormatter } from "@/hooks/usePriceFormatter";
import { PLANS, YEARLY_MONTHS_CHARGED } from "@/lib/constants";
import { getPrice } from "@/lib/pricing";
import type { Billing, ErrorCode, PlanId } from "@/lib/types";
import styles from "./PlanStep.module.scss";

interface PlanStepProps {
  selectedPlan: PlanId | null;
  billing: Billing;
  error?: ErrorCode;
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
  const t = useTranslations("Plan");
  const tErrors = useTranslations("Errors");
  const formatPrice = usePriceFormatter();

  return (
    <>
      <StepHeader title={t("title")} description={t("description")} />
      <fieldset
        className={clsx(styles.fieldset, error && styles.invalid)}
        aria-describedby={error ? "plan-error" : undefined}
      >
        <legend className={styles.legend}>{t("legend")}</legend>
        <div className={styles.plans}>
          {PLANS.map((plan) => {
            const name = t(`names.${plan.id}`);

            return (
              <label key={plan.id} className={styles.plan}>
                <input
                  type="radio"
                  name="plan"
                  value={plan.id}
                  className={styles.radio}
                  checked={selectedPlan === plan.id}
                  onChange={() => onSelectPlan(plan.id)}
                />
                <Image src={plan.icon} alt={name} width={40} height={40} className={styles.icon} />
                <span className={styles.details}>
                  <span className={styles.name}>{name}</span>
                  <span className={styles.price}>
                    {formatPrice(getPrice(plan.monthlyPrice, billing), billing)}
                  </span>
                  {billing === "yearly" && (
                    <span className={styles.promo}>{t("freeMonths", { count: FREE_MONTHS })}</span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
        {error && (
          <p id="plan-error" className={styles.error} role="alert">
            {tErrors(error)}
          </p>
        )}
      </fieldset>
      <BillingToggle billing={billing} onToggle={onToggleBilling} />
    </>
  );
}
