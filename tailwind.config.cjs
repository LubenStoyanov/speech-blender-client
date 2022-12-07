/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: true,
    darkTheme: "business",
    lightTheme: "business",
    // themes: [
    //   {
    //     mytheme: {
    //       primary: "#393e46",

    //       secondary: "#222831",

    //       accent: "#ff5722",

    //       neutral: "#eeeeee",

    //       // "base-100": "#171212",

    //       // info: "#3ABFF8",

    //       // success: "#36D399",

    //       // warning: "#FBBD23",

    //       // error: "#F87272",
    //     },
    //   },
    // ],
  },
  plugins: [require("daisyui")],
};
