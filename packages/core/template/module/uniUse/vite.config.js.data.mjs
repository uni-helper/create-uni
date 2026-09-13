export default function getData({ oldData, utils }) {
  const uniUseExtraConfig = {
    build: {
      target: 'es6',
      cssTarget: 'chrome61', // https://cn.vitejs.dev/config/build-options.html#build-csstarget
    },
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
  }

  const uniUseAutoImportPlugin = {
    id: 'uni-use-auto-import',
    importer: `import { uniuseAutoImports } from '@uni-helper/uni-use'`,
  }

  return {
    ...oldData,
    extraConfig: utils.mergeExtraConfig(oldData.extraConfig, uniUseExtraConfig),
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'unpluginAutoImport'
        ? [
            utils.addImport(utils.addImport(plugin, `'@vueuse/core'`), 'uniuseAutoImports()'),
            uniUseAutoImportPlugin,
          ]
        : plugin,
    ),
  }
}
