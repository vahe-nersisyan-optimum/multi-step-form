import clsx from "clsx";
import { useTranslations } from "next-intl";
import styles from "./FormNavigation.module.scss";

interface FormNavigationProps {
  canGoBack: boolean;
  isLastStep: boolean;
  onBack: () => void;
}

export function FormNavigation({ canGoBack, isLastStep, onBack }: FormNavigationProps) {
  const t = useTranslations("Navigation");

  return (
    <div className={styles.navigation}>
      {canGoBack && (
        <button type="button" className={styles.back} onClick={onBack}>
          {t("back")}
        </button>
      )}
      <button type="submit" className={clsx(styles.next, isLastStep && styles.confirm)}>
        {isLastStep ? t("confirm") : t("next")}
      </button>
    </div>
  );
}
