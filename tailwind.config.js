/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green37: '#203D37',
        green4a: '#2B514A',
        green94: '#56A394',
        greenb9: '#6CCCB9',
        greence: '#98DBCE',
        greenf1: '#E1F4F1',
        greenf8: '#F0F9F8',
        black0a: '#090D0A',
        whitef2: '#F2F2F2',
      },
    },
  },
  plugins: [],
};
