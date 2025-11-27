export default function getData({ oldData }) {
  const uniUseEntry = {
    id: 'uniUse',
  }
  return {
    ...oldData,
    entries: oldData.entries.some(item => item.id === 'uniPromises')
      ? oldData.entries
      : oldData.entries.flatMap(entry =>
          entry.id === 'vue' ? [entry, uniUseEntry] : entry,
        ),
  }
}
