export default function getData({ oldData }) {
  const uniPromisesEntry = {
    id: 'uniPromises',
    importer: `import 'core-js/actual/array/iterator';
import 'core-js/actual/promise';
import 'core-js/actual/object/assign';
import 'core-js/actual/promise/finally';`,
  }
  return {
    ...oldData,
    entries: oldData.entries.some(item => item.id === 'uniUse')
      ? oldData.entries
      : oldData.entries.flatMap(entry =>
        entry.id === 'vue' ? [entry, uniPromisesEntry] : entry,
      ),
  }
}
