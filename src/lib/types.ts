export type Billing = "monthly" | "yearly";

export type PlanId = "arcade" | "advanced" | "pro";

export type AddOnId = "online-service" | "larger-storage" | "customizable-profile";

export type PersonalInfoField = "name" | "email" | "phone";

export type PersonalInfo = Record<PersonalInfoField, string>;

export type FormField = PersonalInfoField | "plan" | "avatar" | "promoCode" | "startDate";

export type ErrorCode =
  | "required"
  | "nameTooShort"
  | "invalidEmail"
  | "invalidPhone"
  | "planRequired"
  | "invalidFileType"
  | "fileTooLarge"
  | "dateInPast"
  | "invalidPromo";

export type FormErrors = Partial<Record<FormField, ErrorCode>>;

export interface Avatar {
  name: string;
  dataUrl: string;
}

export interface Plan {
  id: PlanId;
  monthlyPrice: number;
  icon: string;
}

export interface AddOn {
  id: AddOnId;
  monthlyPrice: number;
}

export interface FormState {
  step: number;
  isConfirmed: boolean;
  personalInfo: PersonalInfo;
  avatar: Avatar | null;
  plan: PlanId | null;
  billing: Billing;
  addOns: AddOnId[];
  promoCode: string | null;
  startDate: string;
  errors: FormErrors;
}
