import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  rules: {
    /**
     * 全等
     */
    'eqeqeq': 'warn',
    'vue/eqeqeq': 'warn',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-alert': 'off',
    /**
     * <el-form ref="form"/>
     */
    'vue/no-unused-refs': 'warn',
  },
}, {
  ignores: ['/public/**'],
})
