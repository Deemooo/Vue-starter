// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'generator-star-spacing': 'off',
    'spaced-comment': 0,
    'no-unneeded-ternary': 0,
    'no-unused-vars': 0,
    'padded-blocks': 0,
    'no-multi-spaces': 0,
    'no-trailing-spaces': 0,
    'indent': 0,
    'semi': 0,
    'valid-typeof': 0,
    'no-mixed-operators': 0,
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]  }
}
