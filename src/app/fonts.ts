import localFont from "next/font/local";

export const ubuntu = localFont({
  src: [
    { path: "../assets/fonts/Ubuntu-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/Ubuntu-Medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/Ubuntu-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-ubuntu",
  display: "swap",
});
