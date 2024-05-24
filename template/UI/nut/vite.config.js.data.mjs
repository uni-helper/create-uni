export default function getData({ oldData }) {
  const autoImportNutUiPlugin = {
    id: 'nutui-uniapp',
    importer: `import { NutResolver } from 'nutui-uniapp'`,
    initializer: `Components({
      dts: true,
      resolvers: [NutResolver()]
    })`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.some(plugin => plugin.id === 'autoImport')
      ? oldData.plugins.flatMap(plugin =>
        plugin.id === 'autoImport' ? [{ id: plugin.id, importer: plugin.importer }, autoImportNutUiPlugin] : plugin,
      )
      : oldData.plugins.flatMap(plugin =>
        plugin.id === 'uni' ? [autoImportNutDesignUiPlugin, plugin] : plugin,
      ),
  }
}
