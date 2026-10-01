import { useTranslations } from "next-intl";
import { AvatarUpload } from "@/components/AvatarUpload/AvatarUpload";
import { StepHeader } from "@/components/StepHeader/StepHeader";
import { TextField } from "@/components/TextField/TextField";
import type { Avatar, ErrorCode, FormErrors, PersonalInfo, PersonalInfoField } from "@/lib/types";
import styles from "./PersonalInfoStep.module.scss";

interface PersonalInfoStepProps {
  values: PersonalInfo;
  avatar: Avatar | null;
  errors: FormErrors;
  onChange: (field: PersonalInfoField, value: string) => void;
  onAvatarChange: (avatar: Avatar | null, error?: ErrorCode) => void;
}

export function PersonalInfoStep({
  values,
  avatar,
  errors,
  onChange,
  onAvatarChange,
}: PersonalInfoStepProps) {
  const t = useTranslations("PersonalInfo");
  const tErrors = useTranslations("Errors");
  const errorMessage = (field: PersonalInfoField) => {
    const error = errors[field];
    return error && tErrors(error);
  };

  return (
    <>
      <StepHeader title={t("title")} description={t("description")} />
      <div className={styles.fields}>
        <AvatarUpload avatar={avatar} error={errors.avatar} onChange={onAvatarChange} />
        <TextField
          id="name"
          label={t("name")}
          placeholder={t("namePlaceholder")}
          autoComplete="name"
          value={values.name}
          error={errorMessage("name")}
          onChange={(event) => onChange("name", event.target.value)}
        />
        <TextField
          id="email"
          type="email"
          dir="ltr"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={errorMessage("email")}
          onChange={(event) => onChange("email", event.target.value)}
        />
        <TextField
          id="phone"
          type="tel"
          dir="ltr"
          label={t("phone")}
          placeholder={t("phonePlaceholder")}
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          error={errorMessage("phone")}
          onChange={(event) => onChange("phone", event.target.value)}
        />
      </div>
    </>
  );
}
