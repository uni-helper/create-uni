export default function getData({ oldData }) {
  const uniHighlightEntry = {
    id: 'uniHighlight',
    importer: `import Code from '@uni-helper/highlight'`,
    use: `app.component('Code', Code)`,
  }

  return {
    ...oldData,
    entries: oldData.entries.flatMap(entry =>
      entry.id === 'vue' ? [entry, uniHighlightEntry] : entry,
    ),
  }
}
