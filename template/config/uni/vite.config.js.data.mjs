export default function getData({ oldData }) {
  const autoImportUniUiPlugin = {
    name: 'uni-ui',
    importer: `import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
    initializer: `Components({
      dts: true,
      resolvers: [UniUIResolver()]
    }),`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [autoImportUniUiPlugin, plugin] : plugin,
    ),
  }
}
