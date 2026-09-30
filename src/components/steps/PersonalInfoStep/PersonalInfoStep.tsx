import { StepHeader } from "@/components/StepHeader/StepHeader";
import { TextField } from "@/components/TextField/TextField";
import type { FormErrors, PersonalInfo, PersonalInfoField } from "@/lib/types";
import styles from "./PersonalInfoStep.module.scss";

interface PersonalInfoStepProps {
  values: PersonalInfo;
  errors: FormErrors;
  onChange: (field: PersonalInfoField, value: string) => void;
}

export function PersonalInfoStep({ values, errors, onChange }: PersonalInfoStepProps) {
  return (
    <>
      <StepHeader
        title="Personal info"
        description="Please provide your name, email address, and phone number."
      />
      <div className={styles.fields}>
        <TextField
          id="name"
          label="Name"
          placeholder="e.g. Stephen King"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(event) => onChange("name", event.target.value)}
        />
        <TextField
          id="email"
          type="email"
          label="Email Address"
          placeholder="e.g. stephenking@lorem.com"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={errors.email}
          onChange={(event) => onChange("email", event.target.value)}
        />
        <TextField
          id="phone"
          type="tel"
          label="Phone Number"
          placeholder="e.g. +1 234 567 890"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(event) => onChange("phone", event.target.value)}
        />
      </div>
    </>
  );
}
