"use client";

import clsx from "clsx";
import { useFormatter, useTranslations } from "next-intl";
import { useState, type KeyboardEvent } from "react";
import { getPromoDiscountRate } from "@/lib/pricing";
import type { ErrorCode } from "@/lib/types";
import styles from "./PromoCode.module.scss";

interface PromoCodeProps {
  appliedCode: string | null;
  error?: ErrorCode;
  onApply: (code: string) => void;
  onRemove: () => void;
}

const INPUT_ID = "promoCode";
const ERROR_ID = "promoCode-error";

export function PromoCode({ appliedCode, error, onApply, onRemove }: PromoCodeProps) {
  const t = useTranslations("Promo");
  const tErrors = useTranslations("Errors");
  const format = useFormatter();
  const [code, setCode] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onApply(code);
    }
  };

  if (appliedCode) {
    const percent = format.number(getPromoDiscountRate(appliedCode), {
      style: "percent",
      numberingSystem: "latn",
    });

    return (
      <div className={styles.applied} role="status">
        <span>{t("applied", { code: appliedCode, percent })}</span>
        <button type="button" className={styles.remove} onClick={onRemove}>
          {t("remove")}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label htmlFor={INPUT_ID} className={styles.label}>
          {t("label")}
        </label>
        {error && (
          <span id={ERROR_ID} className={styles.error} role="alert">
            {tErrors(error)}
          </span>
        )}
      </div>
      <div className={styles.controls}>
        <input
          id={INPUT_ID}
          className={clsx(styles.input, error && styles.invalid)}
          placeholder={t("placeholder")}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          value={code}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? ERROR_ID : undefined}
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className={styles.apply} onClick={() => onApply(code)}>
          {t("apply")}
        </button>
      </div>
    </div>
  );
}
