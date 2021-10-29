const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled', 'active_page'],
    cursor: ['disabled'],
  },
  plugins: [
    plugin(function({ addVariant, e }) {
      addVariant('active_page', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`active_page${separator}${className}`)}:active_page`
        })
      })
    })
  ],
}
