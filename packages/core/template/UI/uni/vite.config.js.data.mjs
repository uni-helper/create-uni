export default function getData({ oldData, utils }) {
  const excludeMap = {
    'root': 'UniKuAppRoot',
    'uni-echarts': 'UniEcharts',
  }

  const excludes = oldData.plugins
    .map(plugin => excludeMap[plugin.id])
    .filter(Boolean)

  const resolverOptions = excludes.length > 0
    ? `{ exclude: /${excludes.join('|')}/ }`
    : ''

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
