import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Toolbar.module.scss";

export function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
}
