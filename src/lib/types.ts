export type Billing = "monthly" | "yearly";

export type PlanId = "arcade" | "advanced" | "pro";

export type AddOnId = "online-service" | "larger-storage" | "customizable-profile";

export type PersonalInfoField = "name" | "email" | "phone";

export type PersonalInfo = Record<PersonalInfoField, string>;

export type FormErrors = Partial<Record<PersonalInfoField | "plan", string>>;

export interface Plan {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  icon: string;
}

export interface AddOn {
  id: AddOnId;
  name: string;
  description: string;
  monthlyPrice: number;
}

export interface FormState {
  step: number;
  isConfirmed: boolean;
  personalInfo: PersonalInfo;
  plan: PlanId | null;
  billing: Billing;
  addOns: AddOnId[];
  errors: FormErrors;
}
