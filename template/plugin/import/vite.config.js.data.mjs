export default function getData({ oldData }) {
  const autoImportPlugin = {
    name: 'autoImport',
    importer: `import Components from '@uni-helper/vite-plugin-uni-components'`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [plugin, autoImportPlugin] : plugin,
    ),
  }
}
