import os from 'node:os'
import process from 'node:process'
import { resolve } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname } from 'pathe'
import destr from 'destr'
import type { PackageJson } from 'pkg-types'

function getPkg(name: string, rootDir: string) {
  // Assume it is in {rootDir}/node_modules/${name}/package.json
  let pkgPath = resolve(rootDir, 'node_modules', name, 'package.json')

  // Try to resolve for more accuracy
  const _require = createRequire(rootDir)
  try {
    pkgPath = _require.resolve(`${name}/package.json`)
  }
  catch (_err) {
    console.log('not found:', name)
  }

  return readJSONSync(pkgPath) as PackageJson
}

export function findup<T>(
  rootDir: string,
  fn: (dir: string) => T | undefined,
): T | null {
  let dir = rootDir
  while (dir !== dirname(dir)) {
    const res = fn(dir)
    if (res)
      return res

    dir = dirname(dir)
  }
  return null
}

function readJSONSync(filePath: string) {
  try {
    return destr(readFileSync(filePath, 'utf-8'))
  }
  catch (err) {
    return null
  }
}

function findPackage(rootDir: string) {
  return (
    findup(rootDir, (dir) => {
      const p = resolve(dir, 'package.json')
      if (existsSync(p))
        return readJSONSync(p) as PackageJson
    }) || {}
  )
}

const uniPkg = findPackage(resolve('.'))
const { dependencies, devDependencies } = uniPkg
const dependencies_ = { ...dependencies, ...devDependencies }
function getDepVersion(name: string) {
  return getPkg(name, resolve('.'))?.version || dependencies_?.[name] || ''
}

const uniSupportPackage = ['vue', '@dcloudio/uni-app', 'unocss', 'pinia', 'vite']

function filterDependencies(dependencies: any) {
  const list = Object.keys(dependencies)
    .filter(name => name.startsWith('@uni-helper/'))
  return [...list, ...uniSupportPackage].map(name => ({
    [name]: getDepVersion(name),
  }))
}

const userAgent = process.env.npm_config_user_agent ?? ''

const info = {
  OperatingSystem: os.type(),
  NodeVersion: process.version,
  PackageManager: /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm',
  packages: filterDependencies(dependencies_),
}

export function getUniAppInfo() {
  console.log(info)
  process.exit(0)
}
