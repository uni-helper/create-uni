import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import JSON5 from 'json5'

function replaceNameContent(filePath: string, projectName: string) {
  if (!existsSync(filePath))
    return
  const fileContent = JSON5.parse(readFileSync(filePath, 'utf8'))
  fileContent.name = projectName
  writeFileSync(filePath, JSON.stringify(fileContent, null, 2))
}

export function replaceProjectName(root: string, name: string) {
  const projectName = name.toLocaleLowerCase().replace(/\s/g, '-')
  const pkgPath = join(root, 'package.json')
  const manifestPath = join(root, 'src', 'manifest.json')

  replaceNameContent(manifestPath, projectName)
  replaceNameContent(pkgPath, projectName)
}
