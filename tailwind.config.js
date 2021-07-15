module.exports = {
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  darkMode: 'media',
  theme: {
    minHeight: {
      '60vh': '60vh',
    },
    extend: {
      backgroundImage: (theme) => ({
        'main-img':
          "url('https://images.unsplash.com/photo-1625153674020-a5234b66c39d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
      }),
    },
  },
  variants: {},
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
};
