export default function getData({ oldData }) {
  const skiyeeUIConfig = {
    id: 'skiyee',
    importer: `import presetSkiyeeUI from '@skiyee/ui-preset'`,
    initializer: 'presetSkiyeeUI()',
  }

  return {
    ...oldData,
    config: oldData.config.flatMap(config =>
      config.id === 'unocss' ? [config, skiyeeUIConfig] : config,
    ),
  }
}
