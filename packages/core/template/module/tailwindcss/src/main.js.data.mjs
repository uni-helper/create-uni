export default function getData({ oldData }) {
  const tailwindcssEntry = {
    id: 'tailwindcss',
    importer: 'import \'./app.css\'',
  }
  return {
    ...oldData,
    entries: oldData.entries.flatMap(entry =>
      entry.id === 'vue' ? [entry, tailwindcssEntry] : entry,
    ),
  }
}
