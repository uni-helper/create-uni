export default function getData({ oldData, utils }) {
  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'unpluginAutoImport'
        ? utils.addImport(plugin, `'pinia'`)
        : plugin,
    ),
  }
}
