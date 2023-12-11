export default function getData({ oldData }) {
  const unocssPlugin = {
    id: 'unocss',
    importer: 'import \'uno.css\'',
  }
  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'vue' ? [plugin, unocssPlugin] : plugin,
    ),
  }
}
