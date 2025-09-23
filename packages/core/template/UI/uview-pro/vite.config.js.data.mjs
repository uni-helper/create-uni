export default function getData({ oldData }) {
  const autoImportUviewProPlugin = {
    id: 'uview-pro',
    importer: `import { uViewProResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
    initializer: `Components({
      dts: true,
      resolvers: [uViewProResolver()]
    })`,
  }

  const uviewProExtraConfig = {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "uview-pro/theme.scss";',
        },
      },
    },
  }

  return {
    ...oldData,
    plugins: oldData.plugins.some(plugin => plugin.id === 'autoImport')
      ? oldData.plugins.flatMap(plugin =>
          plugin.id === 'autoImport' ? [{ id: plugin.id, importer: plugin.importer }, autoImportUviewProPlugin] : plugin,
        )
      : oldData.plugins.flatMap(plugin =>
          plugin.id === 'uni' ? [autoImportUviewProPlugin, plugin] : plugin,
        ),
    extraConfig: oldData?.extraConfig ? { ...oldData.extraConfig, ...uviewProExtraConfig } : uviewProExtraConfig,
  }
}
