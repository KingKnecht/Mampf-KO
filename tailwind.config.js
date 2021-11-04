const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      text: ['disabled']
    },
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['disabled'],
  },
  plugins: [],
}
