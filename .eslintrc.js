module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: ['jest'],
  // add your custom rules here
  rules: {
    'import/named': 0,
    'vue/multi-word-component-names': 0,
    'no-console': 'off',
    'no-new': 0,
    'vue/no-lone-template': [
      'error',
      {
        ignoreAccessible: true,
      },
    ],
    'import/order': 'off',
  },
}
