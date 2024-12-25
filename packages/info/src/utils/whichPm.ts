import { join } from 'node:path'
import process from 'node:process'
import { pathExists } from 'path-exists'

export async function whichPm() {
  const pkgPath = process.cwd()
  const modulesPath = join(pkgPath, 'node_modules')

  const existsYarnFlagFile = await pathExists(join(modulesPath, '.yarn-integrity'))
  if (existsYarnFlagFile)
    return { name: 'yarn' }

  const existsPnpmFlagFile = await pathExists(join(modulesPath, '.modules.yaml'))
  if (existsPnpmFlagFile)
    return { name: 'pnpm' }

  if (await pathExists(join(pkgPath, 'bun.lockb')))
    return { name: 'bun' }

  const modulesExists = await pathExists(modulesPath)
  return modulesExists ? { name: 'npm' } : null
}
