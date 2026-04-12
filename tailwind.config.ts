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
        "soil-cream": "#F3EADF",
        "soil-sand": "#E9DAC9",
        "soil-brown": "#8B5E3C",
        "soil-dark": "#4A2F20",
        "soil-text": "#3D2A1F",
        sunset: "#B8794F",
      },
      boxShadow: {
        soft: "0 16px 36px rgba(74, 47, 32, 0.12)",
      },
      borderRadius: {
        "3xl": "1.5rem",
      },
      fontFamily: {
        body: "var(--font-body)",
        heading: "var(--font-heading)",
      },
    },
  },
  plugins: [],
};

export default config;
