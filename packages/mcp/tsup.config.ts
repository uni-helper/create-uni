import { defineConfig } from 'tsup'

export default ({ watch }: { watch: boolean }) => (
  defineConfig({
    entry: {
      outfile: 'src/index.ts',
    },
    format: 'cjs',
    platform: 'node',
    target: 'node14',
    minify: watch ? false : 'terser',
    clean: true,
  })
)
