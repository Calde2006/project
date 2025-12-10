/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f7f8f3',
          100: '#edeee1',
          200: '#dbddc3',
          300: '#c2c59b',
          400: '#a9ad73',
          500: '#949857',
          600: '#7a7d45',
          700: '#5f6238',
          800: '#4d4f2f',
          900: '#41422a',
        },
      },
    },
  },
  plugins: [],
};
