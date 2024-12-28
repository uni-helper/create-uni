import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: true,
  declaration: true,
  externals: [
    'kolorist',
  ],
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})
