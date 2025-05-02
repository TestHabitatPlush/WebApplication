/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#6B7280",
        success: "#10B981",
        danger: "#EF4444",
        // custom
        darkTeal: "#032F3C",
        lime: "#92D050",
        turquoise: "#078BA5",
        turquoise_lite: "#73c8d9",
        // component wise
        dashhead: "#1e40af",
        black: "#020617",
        // white: "#f8fafc",
        // gray: "#d1d5db",
        lightpink: "#ff1a8c",
        lightpurple: "#003d99",
        lightyellow: "#ffbf00",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
      },

      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};
