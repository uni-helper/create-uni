export default function getData({ oldData, utils }) {
  const uniUseExtraConfig = {
    build: {
      target: 'es6',
      cssTarget: 'chrome61', // https://cn.vitejs.dev/config/build-options.html#build-csstarget
    },
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
  }

  return {
    ...oldData,
    extraConfig: utils.mergeExtraConfig(oldData.extraConfig, uniUseExtraConfig),
  }
}
