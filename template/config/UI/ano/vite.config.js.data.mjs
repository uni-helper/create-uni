export default function getData({ oldData }) {
  const autoImportUniUiPlugin = {
    name: 'ano-ui',
    importer: `import { AnoResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
    initializer: `Components({
      dts: true,
      resolvers: [AnoResolver()]
    })`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [autoImportUniUiPlugin, plugin] : plugin,
    ),
  }
}
