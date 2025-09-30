export default function getData({ oldData, utils }) {
  const autoImportSkiyeeUiPlugin = {
    id: 'skiyee-ui',
    importer: `import SkResolver from '@skiyee/ui-resolver'`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'autoImport'
        ? [utils.addResolver(plugin, 'SkResolver()'), autoImportSkiyeeUiPlugin]
        : plugin,
    ),
  }
}
