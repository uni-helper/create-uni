export default function getData({ oldData }) {
  const UnoCSSPlugin = {
    id: 'UnoCSS',
    importer: 'import UnoCSS from \'unocss/vite\'',
    initializer: 'UnoCSS()',
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [plugin, UnoCSSPlugin] : plugin,
    ),
  }
}
