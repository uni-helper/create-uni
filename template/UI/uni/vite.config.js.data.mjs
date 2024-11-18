export default function getData({ oldData }) {
  const autoImportUniUiPlugin = (hasRoot) => {
    return {
      id: 'uni-ui',
      importer: `import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
      initializer: `Components({
      dts: true,
      resolvers: [UniUIResolver(${hasRoot ? '{exclude: \'UniKuAppRoot\'}' : ''})]
    })`,
    }
  }

  const hasRootPlugin = oldData.plugins.some(plugin => plugin.id === 'root')

  return {
    ...oldData,
    plugins: oldData.plugins.some(plugin => plugin.id === 'autoImport')
      ? oldData.plugins.flatMap(plugin =>
        plugin.id === 'autoImport'
          ? [
              { id: plugin.id, importer: plugin.importer },
              autoImportUniUiPlugin(hasRootPlugin),
            ]
          : plugin,
      )
      : oldData.plugins.flatMap(plugin =>
        plugin.id === 'uni' ? [autoImportUniUiPlugin(hasRootPlugin), plugin] : plugin,
      ),
  }
}
