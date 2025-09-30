export default function getData({ oldData, utils }) {
  const autoImportNutUiPlugin = {
    id: 'nutui-uniapp',
    importer: `import { NutResolver } from 'nutui-uniapp'`,
  }

  const nutuiExtraConfig = {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "nutui-uniapp/styles/variables.scss";',
        },
      },
    },
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'autoImport'
        ? [utils.addResolver(plugin, 'NutResolver()'), autoImportNutUiPlugin]
        : plugin,
    ),
    extraConfig: utils.mergeExtraConfig(oldData.extraConfig, nutuiExtraConfig),
  }
}
