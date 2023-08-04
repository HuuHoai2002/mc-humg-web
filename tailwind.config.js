/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './presentation/components/**/*.{js,vue,ts}',
    './presentation/layouts/**/*.vue',
    './presentation/pages/**/*.vue',
    './presentation/plugins/**/*.{js,ts}',
    './presentation/nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {},
    screens: {
      mobile: {
        max: '768px',
      },
      tablet: {
        min: '769px',
        max: '1024px',
      },
      ...defaultTheme.screens,
    },
  },
  prefix: 'tw-',
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
}
