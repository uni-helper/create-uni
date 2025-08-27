export default function getData({ oldData }) {
  const layoutsPlugin = {
    id: 'layouts',
    importer: `import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'`,
    initializer: `// https://uni-helper.js.org/vite-plugin-uni-layouts
    UniLayouts()`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [layoutsPlugin, plugin] : plugin,
    ),
  }
}
