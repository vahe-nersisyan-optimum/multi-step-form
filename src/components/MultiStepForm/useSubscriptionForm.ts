"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer } from "react";
import { LAST_STEP } from "@/lib/constants";
import { FormActionType, formReducer, initialFormState } from "@/lib/formReducer";
import { loadFormState, saveFormState } from "@/lib/storage";
import type { AddOnId, Avatar, ErrorCode, FormErrors, PersonalInfoField, PlanId } from "@/lib/types";
import { hasErrors, validateStep } from "@/lib/validation";

export function useSubscriptionForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  useLayoutEffect(() => {
    const saved = loadFormState();

    if (saved) {
      dispatch({ type: FormActionType.Restore, state: saved });
    }
  }, []);

  useEffect(() => {
    saveFormState(state);
  }, [state]);

  const submitStep = useCallback((): FormErrors => {
    const errors = validateStep(state);
    const isComplete = state.step === LAST_STEP && !hasErrors(errors);

    dispatch({ type: isComplete ? FormActionType.Confirm : FormActionType.NextStep });
    return errors;
  }, [state]);

  const actions = useMemo(
    () => ({
      updatePersonalInfo: (field: PersonalInfoField, value: string) =>
        dispatch({ type: FormActionType.UpdatePersonalInfo, field, value }),
      updateAvatar: (avatar: Avatar | null, error?: ErrorCode) =>
        dispatch({ type: FormActionType.UpdateAvatar, avatar, error }),
      selectPlan: (plan: PlanId) => dispatch({ type: FormActionType.SelectPlan, plan }),
      toggleBilling: () => dispatch({ type: FormActionType.ToggleBilling }),
      toggleAddOn: (addOn: AddOnId) => dispatch({ type: FormActionType.ToggleAddOn, addOn }),
      applyPromoCode: (code: string) =>
        dispatch({ type: FormActionType.ApplyPromoCode, value: code }),
      removePromoCode: () => dispatch({ type: FormActionType.RemovePromoCode }),
      updateStartDate: (value: string) =>
        dispatch({ type: FormActionType.UpdateStartDate, value }),
      previousStep: () => dispatch({ type: FormActionType.PreviousStep }),
      goToStep: (step: number) => dispatch({ type: FormActionType.GoToStep, step }),
    }),
    [],
  );

  return { state, submitStep, ...actions };
}
