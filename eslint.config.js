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
    'vue/custom-event-name-casing': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
  },
}, {
  ignores: [
    'public',
    'src/components/scFilterBar/pinyin.js',
    'src/utils/template.js',
    'types',
  ],
})
