/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    // themes: ["coffee", "winter"],
    themes: [
      {
        mytheme: {
          primary: "#DC944C",

          secondary: "#263F40",

          accent: "#ffe4e6",

          neutral: "#120C12",

          "base-100": "#211720",

          info: "#8CCAC1",

          success: "#9CB686",

          warning: "#FFD261",

          error: "#FC9783",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
  fontFamily: {
    poppins: "Poppins",
  },
};
