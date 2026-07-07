import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        // Brand palette (Medicio Refined)
        background: "#FFFFFF",
        foreground: "#263238",
        primary: {
          DEFAULT: "#18A3A6",
          foreground: "#FFFFFF",
          hover: "#168A8D",
        },
        secondary: {
          DEFAULT: "#F7F8FA",
          foreground: "#263238",
        },
        accent: {
          DEFAULT: "#18A3A6",
          hover: "#168A8D",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F7F8FA",
          foreground: "#6B7280",
        },
        border: "#E5E7EB",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#263238",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#263238",
        },
        destructive: {
          DEFAULT: "#B91C1C",
          foreground: "#FFFFFF",
        },
        ring: "#18A3A6",
        input: "#E5E7EB",

        // Semantic aliases
        "brand-green": "#18A3A6",
        "brand-green-light": "#F0F9F9",
        "brand-gold": "#18A3A6",
        "brand-cream": "#F7F8FA",
        "brand-cream-light": "#FFFFFF",

        // Sidebar tokens
        sidebar: {
          DEFAULT: "#F7F8FA",
          foreground: "#263238",
          primary: {
            DEFAULT: "#18A3A6",
            foreground: "#FFFFFF",
          },
          accent: {
            DEFAULT: "#F0F9F9",
            foreground: "#18A3A6",
          },
          border: "#E5E7EB",
          ring: "#18A3A6",
        },

        // Chart tokens
        chart: {
          1: "#18A3A6",
          2: "#158F92",
          3: "#127B7E",
          4: "#0F6769",
          5: "#F0F9F9",
        },
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.625rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
