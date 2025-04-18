/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#121212",
        card: "#1e1e1e",
        primary: "#6366f1",
        "primary-hover": "#4f46e5",
        text: "#f3f4f6",
        "text-secondary": "#9ca3af",
        border: "#2e2e2e",
        success: "#10b981",
        error: "#ef4444",
        info: "#3b82f6",
      },
    },
  },
  plugins: [],
};
