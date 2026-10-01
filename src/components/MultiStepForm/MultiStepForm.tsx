"use client";

import type { SubmitEvent } from "react";
import { FormNavigation } from "@/components/FormNavigation/FormNavigation";
import { StepIndicator } from "@/components/StepIndicator/StepIndicator";
import { AddOnsStep } from "@/components/steps/AddOnsStep/AddOnsStep";
import { PersonalInfoStep } from "@/components/steps/PersonalInfoStep/PersonalInfoStep";
import { PlanStep } from "@/components/steps/PlanStep/PlanStep";
import { SummaryStep } from "@/components/steps/SummaryStep/SummaryStep";
import { ThankYou } from "@/components/steps/ThankYou/ThankYou";
import { LAST_STEP } from "@/lib/constants";
import { useSubscriptionForm } from "./useSubscriptionForm";
import type { FormErrors } from "@/lib/types";
import styles from "./MultiStepForm.module.scss";

const PLAN_STEP = 1;

function focusFirstInvalidField(form: HTMLFormElement, errors: FormErrors) {
  const [field] = Object.keys(errors);

  if (!field) {
    return;
  }

  form.querySelector<HTMLElement>(`#${field}, [name="${field}"]`)?.focus();
}

export function MultiStepForm() {
  const {
    state,
    submitStep,
    updatePersonalInfo,
    updateAvatar,
    selectPlan,
    toggleBilling,
    toggleAddOn,
    applyPromoCode,
    removePromoCode,
    updateStartDate,
    previousStep,
    goToStep,
  } = useSubscriptionForm();
  const { step, isConfirmed, errors } = state;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const stepErrors = submitStep();
    focusFirstInvalidField(event.currentTarget, stepErrors);
  };

  const renderStep = () => {
    if (isConfirmed) {
      return <ThankYou />;
    }

    switch (step) {
      case 0:
        return (
          <PersonalInfoStep
            values={state.personalInfo}
            avatar={state.avatar}
            errors={errors}
            onChange={updatePersonalInfo}
            onAvatarChange={updateAvatar}
          />
        );
      case 1:
        return (
          <PlanStep
            selectedPlan={state.plan}
            billing={state.billing}
            error={errors.plan}
            onSelectPlan={selectPlan}
            onToggleBilling={toggleBilling}
          />
        );
      case 2:
        return (
          <AddOnsStep
            selected={state.addOns}
            billing={state.billing}
            onToggle={toggleAddOn}
          />
        );
      default:
        return (
          <SummaryStep
            planId={state.plan}
            billing={state.billing}
            addOnIds={state.addOns}
            promoCode={state.promoCode}
            startDate={state.startDate}
            errors={errors}
            onChangePlan={() => goToStep(PLAN_STEP)}
            onApplyPromoCode={applyPromoCode}
            onRemovePromoCode={removePromoCode}
            onStartDateChange={updateStartDate}
          />
        );
    }
  };

  return (
    <div className={styles.layout}>
      <StepIndicator currentStep={step} />
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <div className={styles.content}>{renderStep()}</div>
        {!isConfirmed && (
          <FormNavigation
            canGoBack={step > 0}
            isLastStep={step === LAST_STEP}
            onBack={previousStep}
          />
        )}
      </form>
    </div>
  );
}
