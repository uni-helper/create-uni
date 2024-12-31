export default function getData({ oldData }) {
  const hasRootPlugin = oldData.plugins.some(plugin => plugin.id === 'root')
  const resolverOptions = hasRootPlugin ? '{ exclude: \'UniKuAppRoot\' }' : ''

  const autoImportUniUiPlugin = {
    id: 'uni-ui',
    importer: `import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
    initializer: `Components({
      dts: true,
      resolvers: [UniUIResolver(${resolverOptions})]
    })`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.some(plugin => plugin.id === 'autoImport')
      ? oldData.plugins.flatMap(plugin =>
          plugin.id === 'autoImport'
            ? [
                { id: plugin.id, importer: plugin.importer },
                autoImportUniUiPlugin,
              ]
            : plugin,
        )
      : oldData.plugins.flatMap(plugin =>
          plugin.id === 'uni' ? [autoImportUniUiPlugin, plugin] : plugin,
        ),
  }
}
