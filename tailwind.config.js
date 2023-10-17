/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{tsx,ts,js,jsx}','./components/**/*.{tsx,ts,js,jsx}','./pages/**/*.{tsx,ts,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}

