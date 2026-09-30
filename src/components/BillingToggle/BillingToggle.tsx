import clsx from "clsx";
import type { Billing } from "@/lib/types";
import styles from "./BillingToggle.module.scss";

interface BillingToggleProps {
  billing: Billing;
  onToggle: () => void;
}

export function BillingToggle({ billing, onToggle }: BillingToggleProps) {
  const isYearly = billing === "yearly";

  return (
    <div className={styles.toggle}>
      <span className={clsx(styles.option, !isYearly && styles.active)} aria-hidden="true">
        Monthly
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isYearly}
        aria-label="Yearly billing"
        className={styles.switch}
        onClick={onToggle}
      >
        <span className={styles.thumb} />
      </button>
      <span className={clsx(styles.option, isYearly && styles.active)} aria-hidden="true">
        Yearly
      </span>
    </div>
  );
}
