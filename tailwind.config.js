const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  purge: [
    './dist/**/*.html',
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue,html}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // screens : {
    //   'ssm' : '320px',
    // },
    extend: {},
  },
  variants: {
    extend: {
      // opacity:['disabled'],
      // backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
      // cursor: ['disabled']
    },
  
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
