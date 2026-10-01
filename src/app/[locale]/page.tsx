import { MultiStepForm } from "@/components/MultiStepForm/MultiStepForm";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Toolbar />
      <MultiStepForm />
    </main>
  );
}
