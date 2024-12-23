export default function getData({ oldData }) {
  const unocssEntry = {
    id: 'unocss',
    importer: 'import \'uno.css\'',
  }
  return {
    ...oldData,
    entries: oldData.entries.flatMap(entry =>
      entry.id === 'vue' ? [entry, unocssEntry] : entry,
    ),
  }
}
