module.exports = {
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  darkMode: false,
  theme: {
    minHeight: {
      '60vh': '60vh',
    },
  },
  variants: {},
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
};
