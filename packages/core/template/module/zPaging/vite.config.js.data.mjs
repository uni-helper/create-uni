export default function getData({ oldData, utils }) {
  const autoImportZPagingPlugin = {
    id: 'z-paging-auto-import',
    importer: `import { ZPagingResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'autoImport'
        ? [utils.addResolver(plugin, 'ZPagingResolver()'), autoImportZPagingPlugin]
        : plugin,
    ),
  }
}
