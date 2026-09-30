import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090a",
        surface: "#0e1014",
        "surface-raised": "#14171d",
        border: "#1c2027",
        "border-subtle": "#14171d",
        muted: "#3f444e",
        "muted-text": "#788190",
        text: "#f1f5f9",
        "text-secondary": "#94a3b8",
        accent: "#10b981",
        "accent-dim": "#059669",
        "accent-subtle": "rgba(16, 185, 129, 0.08)",
        blade: "#e2e8f0",
        crimson: "#e11d48",
        "crimson-subtle": "rgba(225, 29, 72, 0.1)",
        steel: "#1e232b",
        sumi: "#08090a",
        obsidian: "#0e1014",
      },
      fontFamily: {
        serif: ["Cinzel", "Shippori Mincho", "Georgia", "serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
      },
    },
  },
  plugins: [],
};
export default config;
