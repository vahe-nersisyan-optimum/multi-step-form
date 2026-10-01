# Multi-step Subscription Form

A responsive, accessible, mobile-first multi-step subscription form built with **Next.js (App Router)**, **TypeScript**, **SCSS Modules** and **next-intl**.

## Getting started

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000 (redirects to `/en`; also available at `/hy` and `/ar`).

| Script              | Description                   |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the development server  |
| `npm run build`     | Create a production build     |
| `npm start`         | Serve the production build    |
| `npm run lint`      | Lint with ESLint              |
| `npm run typecheck` | Type-check with TypeScript    |

## Features

- Four-step flow: personal info, plan, add-ons, summary, followed by a confirmation screen
- English, Armenian and Arabic (right-to-left) with locale-prefixed URLs, statically generated per locale
- Light and dark themes that follow the system setting, with a manual toggle remembered across visits
- Optional profile picture upload with drag and drop, preview and type/size validation (PNG, JPG, WebP up to 2 MB)
- Promo code on the summary step (`SAVE10` gives 10% off) and a required subscription start date
- Form progress is kept in memory across language switches and starts fresh on page reload
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
├── app/[locale]/         # Locale layout (lang/dir, providers, metadata) and page
├── components/
│   ├── MultiStepForm/    # Form shell and useSubscriptionForm hook
│   ├── steps/            # One component per step
│   └── ...               # Reusable UI: TextField, BillingToggle, StepIndicator, ...
├── hooks/                # Locale-aware price formatting
├── i18n/                 # next-intl routing, navigation and request config
├── lib/                  # Pure logic: types, data, pricing, validation, reducer, state cache
├── proxy.ts              # Locale detection and redirects
└── styles/
    ├── abstracts/        # Variables, functions, mixins (no CSS output)
    ├── base/             # Design tokens (light/dark), reset, typography
    └── globals.scss
```

## Architecture notes

- **State** lives in a single pure reducer (`lib/formReducer.ts`) exposed through the `useSubscriptionForm` hook, which keeps business logic framework-agnostic.
- **Pricing and validation** are pure functions, so step components stay purely presentational.
- **Styling** uses SCSS Modules with a shared `abstracts` layer (`rem()` function, `mq()` breakpoint mixin, reusable `selectable-card` mixin) and CSS custom properties for design tokens. Styles are written mobile-first and enhanced with `min-width` media queries.
- **Translations** live in `messages/*.json`; English is the source of truth and is used to type-check message keys. Validation returns error codes, which components translate.
- **Theming** uses semantic CSS custom properties (`--color-surface`, `--color-text`, ...) redefined under `[data-theme="dark"]`; `next-themes` sets the attribute before paint to avoid a flash.
- **RTL** relies on logical CSS properties (`inset-inline-start`, `margin-inline-start`) so layouts mirror automatically.
- **Fonts**: Ubuntu is self-hosted with `next/font/local`; Noto Sans Armenian and Noto Sans Arabic come from `next/font/google` as fallbacks for scripts Ubuntu does not cover.
