import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    outfile: 'src/index.ts',
  },
  format: 'cjs',
  platform: 'node',
  target: 'node14',
  minify: true,
})
