import { useTranslations } from "next-intl";
import { StepHeader } from "@/components/StepHeader/StepHeader";
import { usePriceFormatter } from "@/hooks/usePriceFormatter";
import { ADD_ONS } from "@/lib/constants";
import { getPrice } from "@/lib/pricing";
import type { AddOnId, Billing } from "@/lib/types";
import styles from "./AddOnsStep.module.scss";

interface AddOnsStepProps {
  selected: readonly AddOnId[];
  billing: Billing;
  onToggle: (addOn: AddOnId) => void;
}

export function AddOnsStep({ selected, billing, onToggle }: AddOnsStepProps) {
  const t = useTranslations("AddOns");
  const formatPrice = usePriceFormatter();

  return (
    <>
      <StepHeader title={t("title")} description={t("description")} />
      <fieldset>
        <legend className={styles.legend}>{t("legend")}</legend>
        <div className={styles.list}>
          {ADD_ONS.map((addOn) => (
            <label key={addOn.id} className={styles.addOn}>
              <input
                type="checkbox"
                name="addOns"
                value={addOn.id}
                className={styles.checkbox}
                checked={selected.includes(addOn.id)}
                onChange={() => onToggle(addOn.id)}
              />
              <span className={styles.details}>
                <span className={styles.name}>{t(`items.${addOn.id}.name`)}</span>
                <span className={styles.description}>{t(`items.${addOn.id}.description`)}</span>
              </span>
              <span className={styles.price}>
                {formatPrice(getPrice(addOn.monthlyPrice, billing), billing, { signed: true })}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </>
  );
}
