export default function getData({ oldData }) {
  const uniUseextraConfig = {
    id: 'uniUse',
    extraConfig: `build: {
      target: 'es6',
      cssTarget: 'chrome61', // https://cn.vitejs.dev/config/build-options.html#build-csstarget
    },
    optimizeDeps: {
      exclude: ['vue-demi'],
    }`,
  }
  return {
    ...oldData,
    extraConfig: oldData.extraConfig.flatMap(config =>
      config.id === 'uniPromises' ? [...config, ...uniUseextraConfig] : config,
    ),
  }
}
