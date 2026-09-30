import clsx from "clsx";
import { STEPS } from "@/lib/constants";
import styles from "./StepIndicator.module.scss";

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <aside className={styles.sidebar} aria-label="Form progress">
      <ol className={styles.list}>
        {STEPS.map((step, index) => {
          const isCurrent = index === currentStep;

          return (
            <li
              key={step.id}
              className={clsx(styles.item, isCurrent && styles.current)}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className={styles.number} aria-hidden="true">
                {index + 1}
              </span>
              <span className={styles.text}>
                <span className={styles.label}>Step {index + 1}</span>
                <span className={styles.title}>{step.title}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
