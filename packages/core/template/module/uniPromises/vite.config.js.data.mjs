export default function getData({ oldData, utils }) {
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
    extraConfig: utils.mergeExtraConfig(oldData.extraConfig, promisesExtraConfig),
  }
}
