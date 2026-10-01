import type { FormState } from "./types";

const STORAGE_KEY = "subscription-form";

export function loadFormState(): FormState | null {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as FormState) : null;
  } catch {
    return null;
  }
}

export function saveFormState(state: FormState): boolean {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
