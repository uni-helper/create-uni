export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'autoImport',
    importer: `import Components from '@uni-helper/vite-plugin-uni-components'`,
    initializer: `Components({
      dts: true,
    })`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [plugin, autoImportPlugin] : plugin,
    ),
  }
}
