import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],

  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "transform-to-zero": "transform-to-zero 1s ease-out forwards", // Add this
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "transform-to-zero": { // Add this keyframe
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      colors: {
        "primary-custom": "#2c336a"
      },
    },
  },
  plugins: [],
};

// Export using CommonJS syntax
module.exports = config;
