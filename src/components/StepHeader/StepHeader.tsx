import styles from "./StepHeader.module.scss";

interface StepHeaderProps {
  title: string;
  description: string;
}

export function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        {title}
      </h1>
      <p className={styles.description}>{description}</p>
    </header>
  );
}
