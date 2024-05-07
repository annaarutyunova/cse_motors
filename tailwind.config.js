/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/js/**/*.{html,js}", "./models/**/*.{html,js}", "./database/**/*.{html,js}", "./controllers/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
      },
  ],
}

