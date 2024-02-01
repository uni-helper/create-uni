export default function getData({ oldData }) {
  const uniUsePlugin = {
    id: 'uniUse',
    importer: `import 'core-js/actual/array/iterator';
import 'core-js/actual/promise';
import 'core-js/actual/object/assign';
import 'core-js/actual/promise/finally';`,
  }
  return {
    ...oldData,
    plugins: oldData.plugins.some(item => item.id === 'uniPromises')
      ? oldData.plugins
      : oldData.plugins.flatMap(plugin =>
        plugin.id === 'vue' ? [plugin, uniUsePlugin] : plugin,
      ),
  }
}
