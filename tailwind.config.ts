import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "trata",
      addCommonColors: true,
      layout: {
        radius: {
          small: "0.125rem", // rounded-small
          medium: "0.25rem", // rounded-medium
          large: "2rem", // rounded-large
        },
        fontSize: {
          tiny: "0.625rem", // text-tiny
          small: "0.75rem", // text-small
          medium: "0.875rem", // text-medium
          large: "1rem", // text-large
        },
      },
    }),
  ],
};
export default config;
