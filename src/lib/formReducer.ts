import { LAST_STEP } from "./constants";
import { normalizePromoCode } from "./pricing";
import type {
  AddOnId,
  Avatar,
  ErrorCode,
  FormState,
  PersonalInfoField,
  PlanId,
} from "./types";
import {
  hasErrors,
  validatePersonalInfoField,
  validatePromoCode,
  validateStartDate,
  validateStep,
} from "./validation";

export enum FormActionType {
  UpdatePersonalInfo = "updatePersonalInfo",
  UpdateAvatar = "updateAvatar",
  SelectPlan = "selectPlan",
  ToggleBilling = "toggleBilling",
  ToggleAddOn = "toggleAddOn",
  ApplyPromoCode = "applyPromoCode",
  RemovePromoCode = "removePromoCode",
  UpdateStartDate = "updateStartDate",
  NextStep = "nextStep",
  PreviousStep = "previousStep",
  GoToStep = "goToStep",
  Confirm = "confirm",
  Restore = "restore",
}

export interface FormAction {
  type: FormActionType;
  field?: PersonalInfoField;
  value?: string;
  avatar?: Avatar | null;
  error?: ErrorCode;
  plan?: PlanId;
  addOn?: AddOnId;
  step?: number;
  state?: FormState;
}

export const initialFormState: FormState = {
  step: 0,
  isRestored: false,
  isConfirmed: false,
  personalInfo: { name: "", email: "", phone: "" },
  avatar: null,
  plan: null,
  billing: "monthly",
  addOns: [],
  promoCode: null,
  startDate: "",
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
    case FormActionType.UpdateAvatar:
      return {
        ...state,
        avatar: action.avatar!,
        errors: { ...state.errors, avatar: action.error },
      };
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
    case FormActionType.ApplyPromoCode: {
      const code = action.value!;
      const error = validatePromoCode(code);

      return {
        ...state,
        promoCode: error ? state.promoCode : normalizePromoCode(code),
        errors: { ...state.errors, promoCode: error },
      };
    }
    case FormActionType.RemovePromoCode:
      return { ...state, promoCode: null, errors: { ...state.errors, promoCode: undefined } };
    case FormActionType.UpdateStartDate: {
      const value = action.value!;
      const errors = state.errors.startDate
        ? { ...state.errors, startDate: validateStartDate(value) }
        : state.errors;

      return { ...state, startDate: value, errors };
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
    case FormActionType.Restore:
      return { ...state, ...action.state, isRestored: true };
    default:
      return state;
  }
}
