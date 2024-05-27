import { defineConfig } from 'tsup'

export default ({ watch }) => (
  defineConfig({
    entry: {
      outfile: 'src/index.ts',
    },
    format: 'cjs',
    platform: 'node',
    target: 'node14',
    noExternal: [
      'ejs',
      'minimist',
      'kolorist',
      'envinfo',
      'execa',
      'local-pkg',
      'prompts',
      'json5',
    ],
    minify: watch ? false : 'terser',
  })
)
