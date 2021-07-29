module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      colors: {
        isesuma:{
          purple: '#918EF4',
          lightblue:'#6F9CEB',
          darkblue:'#306BAC',
          darkpurple:'#4E466B',
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
