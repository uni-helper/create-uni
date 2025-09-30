export default function getData({ oldData, utils }) {
  const autoImportUviewProPlugin = {
    id: 'uview-pro',
    importer: `import { uViewProResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
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
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'autoImport'
        ? [utils.addResolver(plugin, 'uViewProResolver()'), autoImportUviewProPlugin]
        : plugin,
    ),
    extraConfig: utils.mergeExtraConfig(oldData.extraConfig, uviewProExtraConfig),
  }
}
