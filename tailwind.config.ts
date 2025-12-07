import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E8ECF5",
          100: "#D1D9EB",
          200: "#A3B3D7",
          300: "#758DC3",
          400: "#4767AF",
          500: "#2A478B", // Main - Primary/500
          600: "#22396F",
          700: "#192B53",
          800: "#111D37",
          900: "#012C4E",
          DEFAULT: "#2A478B", // Primary/500
          dark: "#1E3566",
          light: "#3D5FA3",
        },
        accent: {
          DEFAULT: "#A6823A", // Golden-brown
          dark: "#8A6B2F",
          light: "#C49D4F",
        },
        neutral: {
          DEFAULT: "#212121",
          light: "#757575",
          lighter: "#BDBDBD",
          dark: "#424242",
        },
        background: {
          DEFAULT: "#FAF7F0", // Light beige
          dark: "#F5F2EB",
        },
        beige: "#F5F2EB", // For service cards - light beige
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

