import Image from "next/image";
import styles from "./ThankYou.module.scss";

export function ThankYou() {
  return (
    <section className={styles.thankYou} aria-live="polite">
      <Image
        src="/images/icon-thank-you.svg"
        alt="thank-you"
        width={80}
        height={80}
        className={styles.icon}
      />
      <h1 className={styles.title}>
        Thank you!
      </h1>
      <p className={styles.text}>
        Thanks for confirming your subscription! We hope you have fun using our platform. If you
        ever need support, please feel free to email us at{" "}
        <a href="mailto:support@loremgaming.com" className={styles.link}>
          support@loremgaming.com
        </a>
        .
      </p>
    </section>
  );
}
