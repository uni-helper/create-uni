export default function getData({ oldData }) {
  const uniUIConfig = {
    id: 'uniUIConfig',
    types: ['@uni-helper/uni-ui-types'],
  }
  return {
    ...oldData,
    config: oldData.config.flatMap(config =>
      config.id === 'baseConfig' ? [uniUIConfig, config] : config,
    ),
  }
}
