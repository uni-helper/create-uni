import { defineConfig } from 'tsup'

export default ({ watch }: { watch: boolean }) => (
  defineConfig({
    entry: {
      outfile: 'src/index.ts',
    },
    format: 'esm',
    platform: 'node',
    target: 'node18',
    minify: watch ? false : 'terser',
    clean: true,
  })
)
