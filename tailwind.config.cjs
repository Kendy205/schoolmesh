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
        }
      },
      fontFamily: {
        spartan: ["Spartan", "sans-serif"]
      },
      lineHeight: {
        "16" : "4rem"
      }
    }
  },

  plugins: []
};

module.exports = config;