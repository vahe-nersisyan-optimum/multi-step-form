import { StepHeader } from "@/components/StepHeader/StepHeader";
import { ADD_ONS } from "@/lib/constants";
import { formatPrice, getPrice } from "@/lib/pricing";
import type { AddOnId, Billing } from "@/lib/types";
import styles from "./AddOnsStep.module.scss";

interface AddOnsStepProps {
  selected: readonly AddOnId[];
  billing: Billing;
  onToggle: (addOn: AddOnId) => void;
}

export function AddOnsStep({ selected, billing, onToggle }: AddOnsStepProps) {
  return (
    <>
      <StepHeader
        title="Pick add-ons"
        description="Add-ons help enhance your gaming experience."
      />
      <fieldset>
        <legend className={styles.legend}>Add-ons</legend>
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
                <span className={styles.name}>{addOn.name}</span>
                <span className={styles.description}>{addOn.description}</span>
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
