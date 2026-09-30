# Multi-step Subscription Form

A responsive, accessible, mobile-first multi-step subscription form built with **Next.js (App Router)**, **TypeScript** and **SCSS Modules**.

## Getting started

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script              | Description                   |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the development server  |
| `npm run build`     | Create a production build     |
| `npm start`         | Serve the production build    |
| `npm run lint`      | Lint with ESLint              |
| `npm run typecheck` | Type-check with TypeScript    |

## Features

- Four-step flow: personal info, plan, add-ons, summary, followed by a confirmation screen
- Navigate back to any previous step, or jump to plan selection from the summary
- Monthly / yearly billing with live price updates
- Validation: required fields, email and phone format, required plan selection
- Errors are shown inline, re-validated as the user types, and the first invalid field is focused
- Keyboard and screen-reader friendly: native radios and checkboxes, `role="switch"` billing toggle, `aria-invalid` / `aria-describedby`, `aria-current="step"`, focus moved to the step heading on navigation
- Visible hover and `:focus-visible` states, `prefers-reduced-motion` support
- Muted text colors darkened slightly from the style guide to meet WCAG AA contrast

## Project structure

```
src/
├── app/                  # Root layout, page, local font setup
├── components/
│   ├── MultiStepForm/    # Form shell and useSubscriptionForm hook
│   ├── steps/            # One component per step
│   └── ...               # Reusable UI: TextField, BillingToggle, StepIndicator, ...
├── lib/                  # Pure logic: types, data, pricing, validation, reducer
└── styles/
    ├── abstracts/        # Variables, functions, mixins (no CSS output)
    ├── base/             # Design tokens, reset, typography
    └── globals.scss
```

## Architecture notes

- **State** lives in a single pure reducer (`lib/formReducer.ts`) exposed through the `useSubscriptionForm` hook, which keeps business logic framework-agnostic.
- **Pricing and validation** are pure functions, so step components stay purely presentational.
- **Styling** uses SCSS Modules with a shared `abstracts` layer (`rem()` function, `mq()` breakpoint mixin, reusable `selectable-card` mixin) and CSS custom properties for design tokens. Styles are written mobile-first and enhanced with `min-width` media queries.
- **Fonts** are self-hosted with `next/font/local` to avoid layout shift.
