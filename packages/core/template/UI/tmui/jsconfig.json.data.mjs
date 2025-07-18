export default function getData({ oldData }) {
  const tmuiConfig = {
    id: 'tmuiConfig',
    types: ['tmui-uni/global.d.ts'],
  }
  return {
    ...oldData,
    config: oldData.config.flatMap(config =>
      config.id === 'baseConfig' ? [tmuiConfig, config] : config,
    ),
  }
}
