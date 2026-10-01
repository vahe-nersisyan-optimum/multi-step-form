"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const scriptProps = typeof window === "undefined" ? undefined : { type: "application/json" };

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}
