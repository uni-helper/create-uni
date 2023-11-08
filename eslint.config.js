import uni from '@uni-helper/eslint-config'

export default uni({
  ignores: ['outfile.cjs'],
  rules: {
    'no-console': 'warn',
  },
})
