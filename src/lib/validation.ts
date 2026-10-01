import { AVATAR_ACCEPTED_TYPES, AVATAR_MAX_SIZE_MB, LAST_STEP } from "./constants";
import { getTodayIsoDate } from "./date";
import { getPromoDiscountRate } from "./pricing";
import type { ErrorCode, FormErrors, FormState, PersonalInfo, PersonalInfoField } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;
const MIN_PHONE_DIGITS = 7;
const MAX_PHONE_DIGITS = 15;
const BYTES_IN_MB = 1024 * 1024;

export function validatePersonalInfoField(
  field: PersonalInfoField,
  rawValue: string,
): ErrorCode | undefined {
  const value = rawValue.trim();

  if (!value) {
    return "required";
  }

  switch (field) {
    case "name":
      return value.length < 2 ? "nameTooShort" : undefined;
    case "email":
      return EMAIL_PATTERN.test(value) ? undefined : "invalidEmail";
    case "phone": {
      const digits = value.replace(/\D/g, "").length;
      const isValid =
        PHONE_PATTERN.test(value) && digits >= MIN_PHONE_DIGITS && digits <= MAX_PHONE_DIGITS;
      return isValid ? undefined : "invalidPhone";
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

export function validateAvatarFile(file: File): ErrorCode | undefined {
  if (!AVATAR_ACCEPTED_TYPES.includes(file.type)) {
    return "invalidFileType";
  }

  return file.size > AVATAR_MAX_SIZE_MB * BYTES_IN_MB ? "fileTooLarge" : undefined;
}

export function validatePromoCode(code: string): ErrorCode | undefined {
  if (!code.trim()) {
    return "required";
  }

  return getPromoDiscountRate(code) > 0 ? undefined : "invalidPromo";
}

export function validateStartDate(value: string): ErrorCode | undefined {
  if (!value) {
    return "required";
  }

  return value < getTodayIsoDate() ? "dateInPast" : undefined;
}

export function validateStep(state: FormState): FormErrors {
  switch (state.step) {
    case 0:
      return validatePersonalInfo(state.personalInfo);
    case 1:
      return state.plan ? {} : { plan: "planRequired" };
    case LAST_STEP: {
      const startDate = validateStartDate(state.startDate);
      return startDate ? { startDate } : {};
    }
    default:
      return {};
  }
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some(Boolean);
}
