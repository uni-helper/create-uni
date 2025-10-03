export default function getData({ oldData, utils }) {
  const excludes = []

  if (oldData.plugins.some(plugin => plugin.id === 'root')) {
    excludes.push('UniKuAppRoot')
  }
  if (oldData.plugins.some(plugin => plugin.id === 'uni-echarts')) {
    excludes.push('UniEcharts')
  }

  const resolverOptions = excludes.length > 0 ? `{ exclude: /${excludes.join('|')}/ }` : ''

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
