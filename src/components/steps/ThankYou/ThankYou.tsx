import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./ThankYou.module.scss";

export function ThankYou() {
  const t = useTranslations("ThankYou");

  return (
    <section className={styles.thankYou} aria-live="polite">
      <Image
        src="/images/icon-thank-you.svg"
        alt="thank-you"
        width={80}
        height={80}
        className={styles.icon}
      />
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.text}>
        {t.rich("text", {
          link: (chunks) => (
            <a href="mailto:support@loremgaming.com" className={styles.link} dir="ltr">
              {chunks}
            </a>
          ),
        })}
      </p>
    </section>
  );
}
