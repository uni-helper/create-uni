import uni from '@uni-helper/eslint-config'

export default uni({
  rules: {
    'no-console': 'warn',
  },
  pnpm: false,
  markdown: false,
  ignores: [
    'dist/outfile.cjs',
    'packages/gui',
    'packages/core/template/**/*.test.js',
  ],
})
