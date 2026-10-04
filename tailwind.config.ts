import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/client/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#086E85",
          2: "#0E7E91",
          3: "#0F8C99",
          DEFAULT: "#086E85",
          dark: "#065364",
          light: "#E7F4F7",
        },
        brand: {
          teal1: "#086E85",
          teal2: "#0E7E91",
          teal3: "#0F8C99",
          darkBlue: "#091945",
          lightBlue: "#46CDFB",
          green: "#29D697",
          darkGreen: "#66D252",
          yellow: "#FDC400",
          orange: "#F59762",
          red: "#F0635A",
          pink: "#FF0099",
          pastel: "#F9B091",
        },
        dark: {
          bg: "#121212",
          surface: "#1E1E1E",
          card: "#242424",
          border: "#2E2E2E",
          textPrimary: "#F0F0F0",
          textMuted: "#A0A0A0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Plus Jakarta Sans", "sans-serif"],
        arabic: ["var(--font-arabic)", "Noto Naskh Arabic", "Amiri", "serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #086E85 0%, #0E7E91 50%, #0F8C99 100%)",
        "brand-gradient-hover": "linear-gradient(135deg, #065364 0%, #086E85 50%, #0E7E91 100%)",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(8, 110, 133, 0.08)",
        "soft-lg": "0 10px 30px -4px rgba(8, 110, 133, 0.12)",
        glow: "0 0 25px rgba(14, 126, 145, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
