export default function getData({ oldData }) {
  const piniaEntries = {
    id: 'pinia',
    importer: 'import * as Pinia from \'pinia\'',
    use: 'app.use(Pinia.createPinia())',
    returner: 'Pinia,',
  }
  return {
    ...oldData,
    entries: oldData.entries.flatMap(entry =>
      entry.id === 'vue' ? [entry, piniaEntries] : entry,
    ),
  }
}
