import { LAST_STEP } from "./constants";
import type { AddOnId, FormState, PersonalInfoField, PlanId } from "./types";
import { hasErrors, validatePersonalInfoField, validateStep } from "./validation";

export enum FormActionType {
  UpdatePersonalInfo = "updatePersonalInfo",
  SelectPlan = "selectPlan",
  ToggleBilling = "toggleBilling",
  ToggleAddOn = "toggleAddOn",
  NextStep = "nextStep",
  PreviousStep = "previousStep",
  GoToStep = "goToStep",
  Confirm = "confirm",
}

export interface FormAction {
  type: FormActionType;
  field?: PersonalInfoField;
  value?: string;
  plan?: PlanId;
  addOn?: AddOnId;
  step?: number;
}

export const initialFormState: FormState = {
  step: 0,
  isConfirmed: false,
  personalInfo: { name: "", email: "", phone: "" },
  plan: null,
  billing: "monthly",
  addOns: [],
  errors: {},
};

const clampStep = (step: number) => Math.min(Math.max(step, 0), LAST_STEP);

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case FormActionType.UpdatePersonalInfo: {
      const field = action.field!;
      const value = action.value!;
      const errors = state.errors[field]
        ? { ...state.errors, [field]: validatePersonalInfoField(field, value) }
        : state.errors;

      return {
        ...state,
        personalInfo: { ...state.personalInfo, [field]: value },
        errors,
      };
    }
    case FormActionType.SelectPlan:
      return { ...state, plan: action.plan!, errors: { ...state.errors, plan: undefined } };
    case FormActionType.ToggleBilling:
      return { ...state, billing: state.billing === "monthly" ? "yearly" : "monthly" };
    case FormActionType.ToggleAddOn: {
      const addOn = action.addOn!;
      const addOns = state.addOns.includes(addOn)
        ? state.addOns.filter((id) => id !== addOn)
        : [...state.addOns, addOn];

      return { ...state, addOns };
    }
    case FormActionType.NextStep: {
      const errors = validateStep(state);

      if (hasErrors(errors)) {
        return { ...state, errors };
      }

      return { ...state, step: clampStep(state.step + 1), errors: {} };
    }
    case FormActionType.PreviousStep:
      return { ...state, step: clampStep(state.step - 1), errors: {} };
    case FormActionType.GoToStep: {
      const step = action.step!;

      return step < state.step ? { ...state, step: clampStep(step), errors: {} } : state;
    }
    case FormActionType.Confirm:
      return state.step === LAST_STEP ? { ...state, isConfirmed: true } : state;
    default:
      return state;
  }
}
