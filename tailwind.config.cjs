const config = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        meshblue: {
          100: "#CEDAE1",
          200: "#9EB6C3",
          300: "#6D91A6",
          400: "#3D6D88",
          500: "#0C486A",
          600: "#0A3A55",
          700: "#072B40",
          800: "#051D2A",
          900: "#020E15"
        },
        mesh:{
          100: "#CCD1D2",
          200: "#99A3A5",
          300: "#667478",
          400: "#33464B",
          500: "#00181E",
          600: "#001318",
          700: "#000E12",
          800: "#000A0C",
          900: "#000506"
        },
        facebook: "#1877f2",
        instagram: "#bc2a8d"
      },
      fontFamily: {
        spartan: ["Spartan", "sans-serif"]
      },
      lineHeight: {
        "12" : "3rem",
        "14": "3.5rem",
        "16" : "4rem"
      }
    }
  },

  plugins: [require("@tailwindcss/forms")],
  safelist:[
    "border-red-5OO", "border-gray-600"
  ]
};

module.exports = config;