export default function getData({ oldData }) {
  const unpluginAutoImportPlugin = {
    id: 'unpluginAutoImport',
    importer: `import AutoImport from 'unplugin-auto-import/vite'`,
    initializer: `// https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'uni-app'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores', 'src/utils'],
      vueTemplate: true
    })`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [unpluginAutoImportPlugin, plugin] : plugin,
    ),
  }
}
