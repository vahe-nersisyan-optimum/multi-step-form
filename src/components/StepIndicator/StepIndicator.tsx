import clsx from "clsx";
import { useTranslations } from "next-intl";
import { STEPS } from "@/lib/constants";
import styles from "./StepIndicator.module.scss";

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const t = useTranslations("Steps");

  return (
    <aside className={styles.sidebar} aria-label={t("progress")}>
      <ol className={styles.list}>
        {STEPS.map((step, index) => {
          const isCurrent = index === currentStep;

          return (
            <li
              key={step}
              className={clsx(styles.item, isCurrent && styles.current)}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className={styles.number} aria-hidden="true">
                {index + 1}
              </span>
              <span className={styles.text}>
                <span className={styles.label}>{t("step", { number: index + 1 })}</span>
                <span className={styles.title}>{t(step)}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
