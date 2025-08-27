export default function getData({ oldData }) {
  const manifestPlugin = {
    id: 'manifest',
    importer: `import UniManifest from '@uni-helper/vite-plugin-uni-manifest'`,
    initializer: `// https://uni-helper.js.org/vite-plugin-uni-manifest
    UniManifest()`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [manifestPlugin, plugin] : plugin,
    ),
  }
}
