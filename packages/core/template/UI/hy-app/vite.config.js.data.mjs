export default function getData({ oldData, utils }) {
  const autoImportHyAppPlugin = {
    id: 'hy-app',
    importer: `import { HyAppResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'autoImport'
        ? [utils.addResolver(plugin, 'HyAppResolver()'), autoImportHyAppPlugin]
        : plugin,
    ),
  }
}
