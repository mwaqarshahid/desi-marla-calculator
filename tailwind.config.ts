import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        soil: {
          50: "#f7f5f0",
          100: "#ebe6da",
          200: "#d9cfb8",
          300: "#c4b392",
          400: "#b39a72",
          500: "#a68a64",
          600: "#9a7d59",
          700: "#80664b",
          800: "#695442",
          900: "#574639",
          950: "#2e241c",
        },
        accent: {
          DEFAULT: "#0d9488",
          light: "#14b8a6",
          dark: "#0f766e",
        },
        heritage: {
          gold: "#c9a227",
          copper: "#b87333",
          terracotta: "#c85a3a",
          earth: "#8b6914",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(46, 36, 28, 0.12), 0 8px 48px -8px rgba(46, 36, 28, 0.08)",
        "card-hover":
          "0 12px 40px -8px rgba(46, 36, 28, 0.16), 0 24px 64px -16px rgba(46, 36, 28, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
