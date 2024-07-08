/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/client/index.html', './src/client/**/*.{vue,js,cjs,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
