"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { useState, type FocusEvent, type KeyboardEvent } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALE_NAMES, routing } from "@/i18n/routing";
import styles from "./LanguageSwitcher.module.scss";

const MENU_ID = "language-menu";

export function LanguageSwitcher() {
  const t = useTranslations("Toolbar");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
      event.currentTarget.querySelector("button")?.focus();
    }
  };

  return (
    <div className={styles.switcher} onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={styles.trigger}
        aria-label={`${t("language")}: ${LOCALE_NAMES[locale]}`}
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span lang={locale}>{LOCALE_NAMES[locale]}</span>
        <svg className={styles.chevron} viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1.5 6 6.5l5-5" />
        </svg>
      </button>
      {isOpen && (
        <ul id={MENU_ID} className={styles.menu}>
          {routing.locales.map((option) => (
            <li key={option}>
              <Link
                href={pathname}
                locale={option}
                lang={option}
                hrefLang={option}
                className={clsx(styles.option, option === locale && styles.current)}
                aria-current={option === locale ? "true" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {LOCALE_NAMES[option]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
