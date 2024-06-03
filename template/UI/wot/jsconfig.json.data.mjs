export default function getData({ oldData }) {
  const wotUIConfig = {
    id: 'wotUIConfig',
    types: ['wot-design-uni/global.d.ts'],
  }
  return {
    ...oldData,
    config: oldData.config.flatMap(config =>
      config.id === 'baseConfig' ? [wotUIConfig, config] : config,
    ),
  }
}
