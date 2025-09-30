export default function getData({ oldData, utils }) {
  const hasRootPlugin = oldData.plugins.some(plugin => plugin.id === 'root')
  const resolverOptions = hasRootPlugin ? '{ exclude: \'UniKuAppRoot\' }' : ''

  const autoImportUniUiPlugin = {
    id: 'uni-ui',
    importer: `import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'autoImport'
        ? [utils.addResolver(plugin, `UniUIResolver(${resolverOptions})`), autoImportUniUiPlugin]
        : plugin,
    ),
  }
}
