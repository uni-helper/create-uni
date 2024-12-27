import uni from '@uni-helper/eslint-config'

export default uni({
  rules: {
    'no-console': 'warn',
    'eslint-disable': 'off',
  },
  ignores: [
    'dist/outfile.cjs',
  ],
})
