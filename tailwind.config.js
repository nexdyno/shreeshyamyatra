/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/componets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/container/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "serif"],
        source: ["Source Code Pro", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2276E3",
        secondary: "#434343",
      },
      backgroundImage: {
        primaryGradient:
          "linear-gradient(to left, rgba(6,90,243,1), rgba(32,160,235,1))",
      },
    },
  },
  plugins: [],
};
