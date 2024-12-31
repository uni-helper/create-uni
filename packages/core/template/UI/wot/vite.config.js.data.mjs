export default function getData({ oldData }) {
  const autoImportWotDesignUiPlugin = {
    id: 'wot-design-ui',
    importer: `import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'`,
    initializer: `Components({
      dts: true,
      resolvers: [WotResolver()]
    })`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.some(plugin => plugin.id === 'autoImport')
      ? oldData.plugins.flatMap(plugin =>
          plugin.id === 'autoImport' ? [{ id: plugin.id, importer: plugin.importer }, autoImportWotDesignUiPlugin] : plugin,
        )
      : oldData.plugins.flatMap(plugin =>
          plugin.id === 'uni' ? [autoImportWotDesignUiPlugin, plugin] : plugin,
        ),
  }
}
