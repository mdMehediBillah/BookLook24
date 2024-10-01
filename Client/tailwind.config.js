export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        bounceIn: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "50%": { transform: "scale(1.1)", opacity: 0.5 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in-out",
        bounceIn: "bounceIn 1s ease-in-out",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // You can customize themes or add more as needed
  },
};
