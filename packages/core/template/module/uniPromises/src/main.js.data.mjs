export default function getData({ oldData }) {
  const uniPromisesEntry = {
    id: 'uniPromises',
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
