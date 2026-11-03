import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#C62828", // Deep Blood Red
          dark: "#8E0000",
          light: "#E53935",
          hover: "#B71C1C",
          foreground: "#FFFFFF",
        },
        blood: {
          50: "#FFF5F5",
          100: "#FCE4E4", // Soft Red Accent
          200: "#F9B4B4",
          300: "#F08282",
          400: "#E54E4E",
          500: "#C62828", // Primary Brand
          600: "#B71C1C",
          700: "#991B1B",
          800: "#7F1D1D",
          900: "#450A0A",
        },
        bdgreen: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          500: "#16A34A",
          600: "#006A4E", // Bangladesh Flag Green
          700: "#047857",
          800: "#065F46",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        bengali: ["var(--font-bengali)", "system-ui", "sans-serif"],
      },
      keyframes: {
        pulseBlood: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
      },
      animation: {
        "pulse-blood": "pulseBlood 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

