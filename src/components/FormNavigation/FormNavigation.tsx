import clsx from "clsx";
import styles from "./FormNavigation.module.scss";

interface FormNavigationProps {
  canGoBack: boolean;
  isLastStep: boolean;
  onBack: () => void;
}

export function FormNavigation({ canGoBack, isLastStep, onBack }: FormNavigationProps) {
  return (
    <div className={styles.navigation}>
      {canGoBack && (
        <button type="button" className={styles.back} onClick={onBack}>
          Go Back
        </button>
      )}
      <button type="submit" className={clsx(styles.next, isLastStep && styles.confirm)}>
        {isLastStep ? "Confirm" : "Next Step"}
      </button>
    </div>
  );
}
