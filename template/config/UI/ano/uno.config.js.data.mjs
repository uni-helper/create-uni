export default function getData({ oldData }) {
  const anoUIConfig = {
    id: 'ano',
    importer: `import { presetAno } from 'ano-ui'`,
    initializer: 'presetAno()',
  }

  return {
    ...oldData,
    config: oldData.config.flatMap(config =>
      config.id === 'unocss' ? [config, anoUIConfig] : config,
    ),
  }
}
