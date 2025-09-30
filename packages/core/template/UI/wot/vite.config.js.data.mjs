export default function getData({ oldData, utils }) {
  const autoImportWotDesignUiPlugin = {
    id: 'wot-design-ui',
    importer: `import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'autoImport'
        ? [utils.addResolver(plugin, 'WotResolver()'), autoImportWotDesignUiPlugin]
        : plugin,
    ),
  }
}
