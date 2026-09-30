import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ubuntu } from "./fonts";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Multi-step form",
  description: "Choose a gaming subscription plan and add-ons in a few simple steps.",
  icons: { icon: "/favicon-32x32.png" },
  keywords: ["multi-step form", "subscription", "plan", "add-ons"],
};

export const viewport: Viewport = {
  themeColor: "#483eff",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={ubuntu.variable}>
      <body>{children}</body>
    </html>
  );
}
