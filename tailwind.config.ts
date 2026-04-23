import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts, tsx}", "./components/**/*.{ts, tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#000000",
          surface: "#0a0a0a",
          elevated: "#111111",
          border: "#1a1a1a",
          "border-strong": "#333333",
          muted: "#444444",
          subtle: "#666666",
          secondary: "#888888",
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a",
        },
        canvas: "#f0f2f5",
        sidebar: "#0f1117",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
