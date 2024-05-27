export default function getData({ oldData }) {
  const promisesExtraConfig = {
    build: {
      target: 'es6',
      cssTarget: 'chrome61',
    },
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
  }
  return {
    ...oldData,
    extraConfig: oldData?.extraConfig ? { ...oldData.extraConfig, ...promisesExtraConfig } : promisesExtraConfig,
  }
}
