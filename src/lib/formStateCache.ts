import type { FormState } from "./types";

let cachedState: FormState | null = null;

export function loadFormState(): FormState | null {
  return cachedState;
}

export function saveFormState(state: FormState) {
  cachedState = state;
}
