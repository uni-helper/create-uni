export default function getData({ oldData, utils }) {
  const autoImportAnoUiPlugin = {
    id: 'ano-ui',
    importer: `import { AnoResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'autoImport'
        ? [utils.addResolver(plugin, 'AnoResolver()'), autoImportAnoUiPlugin]
        : plugin,
    ),
  }
}
