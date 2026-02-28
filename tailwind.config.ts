import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A5F",
          50: "#E8EEF4",
          100: "#D1DDE9",
          200: "#A3BBD3",
          300: "#7599BD",
          400: "#4777A7",
          500: "#1E3A5F",
          600: "#182E4C",
          700: "#122339",
          800: "#0C1726",
          900: "#060C13",
        },
        secondary: {
          DEFAULT: "#0E7490",
          50: "#E6F7FB",
          100: "#CDEFR7",
          200: "#9BDFEF",
          300: "#69CFE7",
          400: "#37BFDF",
          500: "#0E7490",
          600: "#0B5D73",
          700: "#084656",
          800: "#062F3A",
          900: "#03181D",
        },
        accent: {
          DEFAULT: "#10B981",
          50: "#E6FAF3",
          100: "#CDF5E7",
          200: "#9BEBCF",
          300: "#69E1B7",
          400: "#37D79F",
          500: "#10B981",
          600: "#0D9467",
          700: "#0A6F4D",
          800: "#064A34",
          900: "#03251A",
        },
        background: "#F8FAFC",
        foreground: "#0F172A",
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        border: "#E2E8F0",
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontFeatureSettings: {
        tnum: '"tnum"',
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "score-fill": "scoreFill 1.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scoreFill: {
          "0%": { strokeDashoffset: "283" },
          "100%": { strokeDashoffset: "var(--score-offset)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
