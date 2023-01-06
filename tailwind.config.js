/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          xs: "375px",
          sd: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1140px",
          "2xl": "1170px"
        },
      },
      backgroundImage: {
        'hero-bg-image': "url('/images/hero-bg.jpg')",
      },
      colors: {
        primary: "#ffbe33",
        secondary: "#222831",
        danger: "#ff0000",
        success: "#4BB543",
      },
      fontFamily: {
        dancing: ['Dancing Script', 'cursive'],
        sans: ['Open Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
