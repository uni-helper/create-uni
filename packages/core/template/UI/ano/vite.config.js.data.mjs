export default function getData({ oldData }) {
  const autoImportAnoUiPlugin = {
    id: 'ano-ui',
    importer: `import { AnoResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
    initializer: `Components({
      dts: true,
      resolvers: [AnoResolver()]
    })`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.some(plugin => plugin.id === 'autoImport')
      ? oldData.plugins.flatMap(plugin =>
          plugin.id === 'autoImport' ? [{ id: plugin.id, importer: plugin.importer }, autoImportAnoUiPlugin] : plugin,
        )
      : oldData.plugins.flatMap(plugin =>
          plugin.id === 'uni' ? [autoImportAnoUiPlugin, plugin] : plugin,
        ),
  }
}
