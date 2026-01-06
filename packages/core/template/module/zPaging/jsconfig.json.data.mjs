export default function getData({ oldData }) {
  const zPagingConfig = {
    id: 'zPagingConfig',
    types: ['z-paging/types'],
  }

  return {
    ...oldData,
    config: oldData.config.flatMap(config =>
      config.id === 'baseConfig' ? [zPagingConfig, config] : config,
    ),
  }
}
