import type { FormErrors, FormState, PersonalInfo, PersonalInfoField } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;
const MIN_PHONE_DIGITS = 7;
const MAX_PHONE_DIGITS = 15;

export const REQUIRED_MESSAGE = "This field is required";

export function validatePersonalInfoField(
  field: PersonalInfoField,
  rawValue: string,
): string | undefined {
  const value = rawValue.trim();

  if (!value) {
    return REQUIRED_MESSAGE;
  }

  switch (field) {
    case "name":
      return value.length < 2 ? "Name is too short" : undefined;
    case "email":
      return EMAIL_PATTERN.test(value) ? undefined : "Enter a valid email address";
    case "phone": {
      const digits = value.replace(/\D/g, "").length;
      const isValid =
        PHONE_PATTERN.test(value) && digits >= MIN_PHONE_DIGITS && digits <= MAX_PHONE_DIGITS;
      return isValid ? undefined : "Enter a valid phone number";
    }
  }
}

export function validatePersonalInfo(info: PersonalInfo): FormErrors {
  const errors: FormErrors = {};

  for (const field of Object.keys(info) as PersonalInfoField[]) {
    const error = validatePersonalInfoField(field, info[field]);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

export function validateStep(state: FormState): FormErrors {
  switch (state.step) {
    case 0:
      return validatePersonalInfo(state.personalInfo);
    case 1:
      return state.plan ? {} : { plan: "Please select a plan" };
    default:
      return {};
  }
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some(Boolean);
}
