export default function getData({ oldData }) {
  const uniUIConfig = {
    id: 'uniUIConfig',
    types: ['@uni-helper/uni-ui-type'],
  }
  return {
    ...oldData,
    config: oldData.config.flatMap(config =>
      config.id === 'baseConfig' ? [uniUIConfig, config] : config,
    ),
  }
}
