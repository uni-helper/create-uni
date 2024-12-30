import { defineConfig } from 'tsup'
import PreprocessorDirectives from 'unplugin-preprocessor-directives/esbuild'

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
    esbuildPlugins: [
      PreprocessorDirectives(),
    ],
  })
)
