export default function getData({ oldData }) {
  if (!oldData.entries) {
    oldData.entries = []
  }

  const hasPiniaImport = oldData.entries.some(entry =>
    entry.importer && entry.importer.includes('pinia'),
  )

  const hasTmuiImport = oldData.entries.some(entry =>
    entry.importer && (entry.importer.includes('tmui') || entry.importer.includes('tm-ui')),
  )

  if (!hasPiniaImport) {
    oldData.entries.push({
      importer: 'import * as Pinia from "pinia"',
      use: 'app.use(Pinia.createPinia())',
    })
  }

  if (!hasTmuiImport) {
    oldData.entries.push({
      importer: 'import tmUi from "tmui-uni"',
      use: 'app.use(tmUi)',
    })
  }

  return oldData
}
