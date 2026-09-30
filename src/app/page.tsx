import { MultiStepForm } from "@/components/MultiStepForm/MultiStepForm";
import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <MultiStepForm />
    </main>
  );
}
