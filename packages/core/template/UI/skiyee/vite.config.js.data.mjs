export default function getData({ oldData }) {
  const autoImportSkiyeeUiPlugin = {
    id: 'skiyee-ui',
    importer: `import SkResolver from '@skiyee/ui-resolver'`,
    initializer: `Components({
      dts: true,
      resolvers: [SkResolver()]
    })`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.some(plugin => plugin.id === 'autoImport')
      ? oldData.plugins.flatMap(plugin =>
          plugin.id === 'autoImport' ? [{ id: plugin.id, importer: plugin.importer }, autoImportSkiyeeUiPlugin] : plugin,
        )
      : oldData.plugins.flatMap(plugin =>
          plugin.id === 'uni' ? [autoImportSkiyeeUiPlugin, plugin] : plugin,
        ),
  }
}
