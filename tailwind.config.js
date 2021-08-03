module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'electric-violet': '#FE00FF',
        'bright-turquoise': '#03DADD',
        'electric-purple': '#BF1FE1',
      },
      spacing: {
        '76': '19rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '196': '48rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
