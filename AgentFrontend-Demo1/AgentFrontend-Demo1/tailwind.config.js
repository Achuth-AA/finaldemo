/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          750: "#374151",
          850: "#1f2937",
          950: "#0a0f1b",
        },
        navy: {
          900: "#0f172a",
        },
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "custom-gradient": "linear-gradient(180deg, #09326d 0%, #1161d3 100%)",
        "reverse-gradient": "linear-gradient(180deg, #1161d3 0%, #09326d 100%)",
        "landing-gradient": "linear-gradient(to bottom, white, #d7e5fe, white)",
      },
      boxShadow: {
        elevated: "0 4px 6px rgba(0,0,0,0.1)", // optional custom shadow
      },
      translate: {
        tiny: "0.075rem", // 👈 add this to support that custom value
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".hover-popout": {
          "@apply shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-tiny hover:shadow-md":
            {},
        },
      });
    },
  ],
};
