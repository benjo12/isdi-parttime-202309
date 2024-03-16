/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
    './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        darkslategrey: '#2f4f4f',
        black: '#000',
      },
      backgroundColor: {
        b0aec8: '#b0aec8',
      },
      spacing: {
        '1.25': '1.25rem',
        '37.5': '37.5rem',
        '43.75': '43.75rem',
      },
    },
  },
  plugins: [],
}

