import { useTranslations } from "next-intl";
import { PromoCode } from "@/components/PromoCode/PromoCode";
import { StepHeader } from "@/components/StepHeader/StepHeader";
import { TextField } from "@/components/TextField/TextField";
import { usePriceFormatter } from "@/hooks/usePriceFormatter";
import { getTodayIsoDate } from "@/lib/date";
import { calculateSummary, findPlan, getPrice, getSelectedAddOns } from "@/lib/pricing";
import type { AddOnId, Billing, FormErrors, PlanId } from "@/lib/types";
import styles from "./SummaryStep.module.scss";

interface SummaryStepProps {
  planId: PlanId | null;
  billing: Billing;
  addOnIds: readonly AddOnId[];
  promoCode: string | null;
  startDate: string;
  errors: FormErrors;
  onChangePlan: () => void;
  onApplyPromoCode: (code: string) => void;
  onRemovePromoCode: () => void;
  onStartDateChange: (value: string) => void;
}

export function SummaryStep({
  planId,
  billing,
  addOnIds,
  promoCode,
  startDate,
  errors,
  onChangePlan,
  onApplyPromoCode,
  onRemovePromoCode,
  onStartDateChange,
}: SummaryStepProps) {
  const t = useTranslations("Summary");
  const tPlans = useTranslations("Plan.names");
  const tAddOns = useTranslations("AddOns.items");
  const tBilling = useTranslations("Billing");
  const tErrors = useTranslations("Errors");
  const tStartDate = useTranslations("StartDate");
  const formatPrice = usePriceFormatter();

  const plan = findPlan(planId);
  const addOns = getSelectedAddOns(addOnIds);
  const { discount, total } = calculateSummary(planId, addOnIds, billing, promoCode);

  return (
    <>
      <StepHeader title={t("title")} description={t("description")} />
      <div className={styles.summary}>
        <div className={styles.plan}>
          <div>
            <p className={styles.planName}>
              {t("planWithBilling", {
                plan: plan ? tPlans(plan.id) : "—",
                billing: tBilling(billing),
              })}
            </p>
            <button
              type="button"
              className={styles.change}
              aria-label={t("changePlan")}
              onClick={onChangePlan}
            >
              {t("change")}
            </button>
          </div>
          {plan && (
            <p className={styles.planPrice}>
              {formatPrice(getPrice(plan.monthlyPrice, billing), billing)}
            </p>
          )}
        </div>
        {(addOns.length > 0 || discount > 0) && (
          <ul className={styles.addOns}>
            {addOns.map((addOn) => (
              <li key={addOn.id} className={styles.addOn}>
                <span className={styles.addOnName}>{tAddOns(`${addOn.id}.name`)}</span>
                <span>
                  {formatPrice(getPrice(addOn.monthlyPrice, billing), billing, { signed: true })}
                </span>
              </li>
            ))}
            {discount > 0 && promoCode && (
              <li className={styles.discount}>
                <span>{t("discount", { code: promoCode })}</span>
                <span>{formatPrice(-discount, billing, { signed: true })}</span>
              </li>
            )}
          </ul>
        )}
      </div>
      <p className={styles.total}>
        <span className={styles.totalLabel}>{t(`total.${billing}`)}</span>
        <span className={styles.totalPrice}>{formatPrice(total, billing)}</span>
      </p>
      <div className={styles.extras}>
        <PromoCode
          appliedCode={promoCode}
          error={errors.promoCode}
          onApply={onApplyPromoCode}
          onRemove={onRemovePromoCode}
        />
        <TextField
          id="startDate"
          type="date"
          label={tStartDate("label")}
          min={getTodayIsoDate()}
          value={startDate}
          error={errors.startDate && tErrors(errors.startDate)}
          onChange={(event) => onStartDateChange(event.target.value)}
        />
      </div>
    </>
  );
}
