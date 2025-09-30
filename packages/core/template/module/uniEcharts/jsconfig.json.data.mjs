export default function getData({ oldData }) {
  const uniEchartsConfig = {
    id: 'uniEchartsConfig',
    types: ['uni-echarts/global'],
  }

  return {
    ...oldData,
    config: oldData.config.flatMap(config =>
      config.id === 'baseConfig' ? [uniEchartsConfig, config] : config,
    ),
  }
}
