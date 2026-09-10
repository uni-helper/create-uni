import uni from '@uni-helper/eslint-config'

export default uni({
  rules: {
    'no-console': 'warn',
    'markdown/require-alt-text': 'warn',
  },
  pnpm: false,
  ignores: [
    'dist/outfile.cjs',
    'packages/gui',
    'packages/core/template/**/*.test.js',
  ],
})
