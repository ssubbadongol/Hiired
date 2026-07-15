import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    // A deliberate, exam-paper type scale. Overrides Tailwind's defaults so
    // every size on the page is one we chose.
    fontSize: {
      "2xs": ["0.6875rem", { lineHeight: "1.1" }],
      xs: ["0.75rem", { lineHeight: "1.1" }],
      sm: ["0.8125rem", { lineHeight: "1.45" }],
      base: ["0.9375rem", { lineHeight: "1.6" }],
      lg: ["1.0625rem", { lineHeight: "1.55" }],
      xl: ["1.25rem", { lineHeight: "1.4" }],
      "2xl": ["1.5rem", { lineHeight: "1.25" }],
      // Fluid display sizes for headlines only.
      h3: ["clamp(1.2rem, 1rem + 1vw, 1.6rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      h2: ["clamp(1.75rem, 1.2rem + 2.6vw, 2.9rem)", { lineHeight: "1.02", letterSpacing: "-0.022em" }],
      hero: ["clamp(2.5rem, 1.3rem + 5.4vw, 4.6rem)", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
    },
    extend: {
      colors: {
        paper: "#EDEFF3",
        ink: "#171B33",
        mid: "#5B6180",
        signal: "#3D3BF3",
        apply: "#0F8A5F",
        pass: "#D9424C",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        label: "0.14em",
      },
      maxWidth: {
        card: "22rem",
      },
      boxShadow: {
        card: "0 1px 1px rgba(23,27,51,0.05), 0 10px 24px -14px rgba(23,27,51,0.45)",
        lift: "0 1px 1px rgba(23,27,51,0.05), 0 22px 48px -22px rgba(23,27,51,0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22,0.61,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
