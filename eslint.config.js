import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  rules: {
    'eqeqeq': 'warn',
    'no-console': 'off',
    'no-alert': 'off',
  },
})
