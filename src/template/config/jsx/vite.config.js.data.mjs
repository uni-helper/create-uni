export default function getData({ oldData }) {
  const vueJsxPlugin = {
    name: 'vueJsx',
    importer: 'import vueJsx from \'@vitejs/plugin-vue-jsx\'',
    initializer: 'vueJsx()',
  }

  return {
    ...oldData,
    // Append the vueJsx plugin right after the vue plugin
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [plugin, vueJsxPlugin] : plugin,
    ),
  }
}
