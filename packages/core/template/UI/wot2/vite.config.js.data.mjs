export default function getData({ oldData, utils }) {
  const autoImportWotUiPlugin = {
    id: 'wot-ui',
    importer: `import { WotV2Resolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'autoImport'
        ? [utils.addResolver(plugin, 'WotV2Resolver()'), autoImportWotUiPlugin]
        : plugin,
    ),
  }
}
