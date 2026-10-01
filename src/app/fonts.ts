import localFont from "next/font/local";
import { Noto_Sans_Arabic, Noto_Sans_Armenian } from "next/font/google";

export const ubuntu = localFont({
  src: [
    { path: "../assets/fonts/Ubuntu-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/Ubuntu-Medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/Ubuntu-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-ubuntu",
  display: "swap",
});

export const notoArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  weight: ["400", "500", "700"],
  variable: "--font-armenian",
  display: "swap",
  preload: false,
});

export const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});
