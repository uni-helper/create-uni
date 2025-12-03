export default function getData({ oldData }) {
  const uViewProEntries = {
    id: 'uview-pro',
    importer: 'import uViewPro from \'uview-pro\'',
    use: 'app.use(uViewPro)',
  }
  return {
    ...oldData,
    entries: oldData.entries.flatMap(entry =>
      entry.id === 'vue' ? [entry, uViewProEntries] : entry,
    ),
  }
}
