"use client";

import { useCallback, useMemo, useReducer } from "react";
import { LAST_STEP } from "@/lib/constants";
import { FormActionType, formReducer, initialFormState } from "@/lib/formReducer";
import type { AddOnId, FormErrors, PersonalInfoField, PlanId } from "@/lib/types";
import { hasErrors, validateStep } from "@/lib/validation";

export function useSubscriptionForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

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
      selectPlan: (plan: PlanId) => dispatch({ type: FormActionType.SelectPlan, plan }),
      toggleBilling: () => dispatch({ type: FormActionType.ToggleBilling }),
      toggleAddOn: (addOn: AddOnId) => dispatch({ type: FormActionType.ToggleAddOn, addOn }),
      previousStep: () => dispatch({ type: FormActionType.PreviousStep }),
      goToStep: (step: number) => dispatch({ type: FormActionType.GoToStep, step }),
    }),
    [],
  );

  return { state, submitStep, ...actions };
}
