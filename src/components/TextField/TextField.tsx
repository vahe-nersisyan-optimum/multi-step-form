import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./TextField.module.scss";

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  error?: string;
  type?: "text" | "email" | "tel";
}

export function TextField({ id, label, error, type, className, ...inputProps }: TextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={clsx(styles.field, className)}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {error && (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
      <input
        id={id}
        type={type || "text"}
        className={clsx(styles.input, error && styles.invalid)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
    </div>
  );
}
