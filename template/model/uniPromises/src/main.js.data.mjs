export default function getData({ oldData }) {
  const uniPromisesPlugin = {
    id: 'uniPromises',
    importer: `import 'core-js/actual/array/iterator';
import 'core-js/actual/promise';
import 'core-js/actual/object/assign';
import 'core-js/actual/promise/finally';`,
  }
  return {
    ...oldData,
    plugins: oldData.plugins.some(item => item.id === 'uniUse')
      ? oldData.plugins
      : oldData.plugins.flatMap(plugin =>
        plugin.id === 'vue' ? [plugin, uniPromisesPlugin] : plugin,
      ),
  }
}
