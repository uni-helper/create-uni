export default function getData({ oldData }) {
  const uniUIConfig = {
    id: 'tsConfig',
    extensions: `"extends": "@vue/tsconfig/tsconfig.json"`,
    options: `"ignoreDeprecations": "5.0",
    "lib": ["esnext", "dom"],
    "sourceMap": true,`,
    includes: ['src/**/*.ts', 'src/**/*.tsx'],
  }
  return {
    ...oldData,
    config: oldData.config.flatMap(config =>
      config.id === 'baseConfig' ? [uniUIConfig, config] : config,
    ),
  }
}
