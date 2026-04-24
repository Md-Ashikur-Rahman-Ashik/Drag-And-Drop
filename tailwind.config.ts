import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts, tsx}", "./components/**/*.{ts, tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          surface: "#f9fafb",
          border: "#e5e7eb",
          "border-light": "#f0f0f0",
          muted: "#9ca3af",
          subtle: "#6b7280",
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
