/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F22A2',
        secondary: '#8BB5FF',
        Gray: '#F5F5F5',
        Pink: '#BE0075',
        accent: '#f472b6',
        neutral: '#374151',
      },
      fontFamily: {
        Montserrat: ['Montserrat'],
        Roboto: ['Roboto'],
      },
    },
  },
  plugins: [],
}
