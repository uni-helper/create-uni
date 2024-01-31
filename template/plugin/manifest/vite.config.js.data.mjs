export default function getData({ oldData }) {
  const manifestPlugin = {
    name: 'manifest',
    importer: `import UniManifest from '@uni-helper/vite-plugin-uni-manifest'`,
    initializer: `// https://github.com/uni-helper/vite-plugin-uni-manifest
    UniManifest()`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [plugin, manifestPlugin] : plugin,
    ),
  }
}
