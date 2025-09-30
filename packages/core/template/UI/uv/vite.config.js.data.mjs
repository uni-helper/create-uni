export default function getData({ oldData, utils }) {
  const autoImportUvUiPlugin = {
    id: 'uv-ui',
    importer: `import { UvResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'autoImport'
        ? [utils.addResolver(plugin, 'UvResolver()'), autoImportUvUiPlugin]
        : plugin,
    ),
  }
}
