/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Source Sans 3", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "monospace"],
      },
      colors: {
        bg: {
          primary: "#0D0D0D",
          secondary: "#1A1614",
          card: "#1E1B18",
          "card-hover": "#2A2520",
        },
        text: {
          primary: "#F5F0E8",
          secondary: "#A89F94",
          muted: "#6B6560",
        },
        accent: {
          gold: "#C8A96E",
          burgundy: "#8B2E3B",
          blue: "#4A90B8",
          amber: "#D4A053",
        },
      },
    },
  },
  plugins: [],
};
