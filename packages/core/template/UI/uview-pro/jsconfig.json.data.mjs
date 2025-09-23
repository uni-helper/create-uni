export default function getData({ oldData }) {
  const uviewProConfig = {
    id: 'uviewProConfig',
    types: ['uview-pro/types'],
  }
  return {
    ...oldData,
    config: oldData.config.flatMap(config =>
      config.id === 'baseConfig' ? [uviewProConfig, config] : config,
    ),
  }
}
