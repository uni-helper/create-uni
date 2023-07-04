import { readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

function getPackageInfo(name: string) {
  return {
    name: name.toLocaleLowerCase().replace(/\s/g, '-'),
    version: '0.0.0',
  }
}

export function setPackageName(name: string, root: string) {
  if (!name)
    return
  writeFileSync(
    resolve(root, 'package.json'),
    JSON.stringify(getPackageInfo(name), null, 2),
  )
}

export function replacePackageName(root: string, name: string) {
  const pkgPath = join(root, 'package.json')

  const packageJson = JSON.parse(readFileSync(pkgPath, 'utf8'))

  Object.assign(packageJson, getPackageInfo(name))

  writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2))
}
