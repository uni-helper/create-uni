export default function getData({ oldData }) {
  const autoImportUvUiPlugin = {
    id: 'uv-ui',
    importer: `import { UvResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
    initializer: `Components({
      dts: true,
      resolvers: [UvResolver()]
    })`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.some(plugin => plugin.id === 'autoImport')
      ? oldData.plugins.flatMap(plugin =>
        plugin.id === 'autoImport' ? [{ id: plugin.id, importer: plugin.importer }, autoImportUvUiPlugin] : plugin,
      )
      : oldData.plugins.flatMap(plugin =>
        plugin.id === 'uni' ? [autoImportUvUiPlugin, plugin] : plugin,
      ),
  }
}
