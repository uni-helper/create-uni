export default function getData({ oldData }) {
  const promisesextraConfig = {
    id: 'uniPromises',
    data: `build: {
    target: 'es6',
    cssTarget: 'chrome61', // https://cn.vitejs.dev/config/build-options.html#build-csstarget
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  }`,
  }
  return {
    ...oldData,
    extraConfig: oldData?.extraConfig?.id === 'uniUse' ? oldData.extraConfig : promisesextraConfig,
  }
}
