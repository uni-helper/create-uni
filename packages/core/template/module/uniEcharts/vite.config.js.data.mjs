export default function getData({ oldData, utils }) {
  const uniEchartsPlugin = {
    id: 'uni-echarts',
    importer: `import { UniEcharts } from 'uni-echarts/vite'`,
    initializer: `// https://uni-echarts.xiaohe.ink
    UniEcharts()`,
  }

  const autoImportUniEchartsPlugin = {
    id: 'uni-echarts-auto-import',
    importer: `import { UniEchartsResolver } from 'uni-echarts/resolver'`,
  }

  const uniEchartsExtraConfig = {
    optimizeDeps: {
      exclude: ['uni-echarts'],
    },
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap((plugin) => {
      if (plugin.id === 'uni') {
        return [uniEchartsPlugin, plugin]
      }

      if (plugin.id === 'autoImport') {
        return [utils.addResolver(plugin, 'UniEchartsResolver()'), autoImportUniEchartsPlugin]
      }

      return plugin
    }),
    extraConfig: utils.mergeExtraConfig(oldData.extraConfig, uniEchartsExtraConfig),
  }
}
