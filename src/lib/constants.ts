import type { AddOn, Plan } from "./types";

export const STEPS = ["info", "plan", "addOns", "summary"] as const;

export const LAST_STEP = STEPS.length - 1;

export const YEARLY_MONTHS_CHARGED = 10;

export const PLANS: Plan[] = [
  { id: "arcade", monthlyPrice: 9, icon: "/images/icon-arcade.svg" },
  { id: "advanced", monthlyPrice: 12, icon: "/images/icon-advanced.svg" },
  { id: "pro", monthlyPrice: 15, icon: "/images/icon-pro.svg" },
];

export const ADD_ONS: AddOn[] = [
  { id: "online-service", monthlyPrice: 1 },
  { id: "larger-storage", monthlyPrice: 2 },
  { id: "customizable-profile", monthlyPrice: 2 },
];

export const PROMO_CODES: Record<string, number> = {
  SAVE10: 0.1,
};

export const AVATAR_MAX_SIZE_MB = 2;

export const AVATAR_ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
