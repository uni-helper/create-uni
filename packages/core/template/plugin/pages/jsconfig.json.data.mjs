export default function getData({ oldData }) {
  const pageConfig = {
    id: 'pageConfig',
    types: ['@uni-helper/vite-plugin-uni-pages'],
  }
  return {
    ...oldData,
    config: oldData.config.flatMap(config =>
      config.id === 'baseConfig' ? [pageConfig, config] : config,
    ),
  }
}
