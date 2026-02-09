export default function getData({ oldData, utils }) {
  const autoImportTDesignUniPlugin = {
    id: 'tdesign-uni',
    importer: `import { TDesignUniappResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'autoImport'
        ? [utils.addResolver(plugin, 'TDesignUniappResolver()'), autoImportTDesignUniPlugin]
        : plugin,
    ),
  }
}
