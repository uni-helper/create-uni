export default function getData({ oldData }) {
  const autoImportNutUiPlugin = {
    id: 'nutui-uniapp',
    importer: `import { NutResolver } from 'nutui-uniapp'`,
    initializer: `Components({
      dts: true,
      resolvers: [NutResolver()]
    })`,
  }

  const nutuiExtraConfig = {
    id: 'nutui-uniapp',
    data: `css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "nutui-uniapp/styles/variables.scss";',
      },
    },
  }`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.some(plugin => plugin.id === 'autoImport')
      ? oldData.plugins.flatMap(plugin =>
        plugin.id === 'autoImport' ? [{ id: plugin.id, importer: plugin.importer }, autoImportNutUiPlugin] : plugin,
      )
      : oldData.plugins.flatMap(plugin =>
        plugin.id === 'uni' ? [autoImportNutUiPlugin, plugin] : plugin,
      ),
    extraConfig: {
      data: oldData?.extraConfig ? `${oldData.extraConfig.data},\n  ${nutuiExtraConfig.data}` : nutuiExtraConfig.data,
    },
  }
}
