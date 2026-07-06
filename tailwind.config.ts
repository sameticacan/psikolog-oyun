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
        ink: "#07111f",
        panel: "#101e2f",
        line: "#26374a",
        cream: "#f4f1e8",
        mint: "#87d7bd",
        sky: "#86bde8",
      },
      boxShadow: {
        card: "0 24px 70px rgba(0, 0, 0, 0.24)",
      },
    },
  },
  plugins: [],
};

export default config;
