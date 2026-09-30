import type { AddOn, Plan } from "./types";

export const STEPS = [
  { id: "info", title: "Your info" },
  { id: "plan", title: "Select plan" },
  { id: "add-ons", title: "Add-ons" },
  { id: "summary", title: "Summary" },
];

export const LAST_STEP = STEPS.length - 1;

export const YEARLY_MONTHS_CHARGED = 10;

export const PLANS: Plan[] = [
  { id: "arcade", name: "Arcade", monthlyPrice: 9, icon: "/images/icon-arcade.svg" },
  { id: "advanced", name: "Advanced", monthlyPrice: 12, icon: "/images/icon-advanced.svg" },
  { id: "pro", name: "Pro", monthlyPrice: 15, icon: "/images/icon-pro.svg" },
];

export const ADD_ONS: AddOn[] = [
  {
    id: "online-service",
    name: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
  },
  {
    id: "larger-storage",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
  },
  {
    id: "customizable-profile",
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
  },
];
