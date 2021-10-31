const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['disabled'],
  },
  plugins: [],
}
