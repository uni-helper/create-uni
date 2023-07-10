import { resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import createESLintConfig from '@vue/create-eslint-config'
import { deepMerge } from './deepMerge'
import { sortDependencies } from './sortDependencies'

interface LintConfig {
  eslint: boolean
  prettier: boolean
  ts: boolean
}

export function renderLint(root: string, lint: LintConfig) {
  if (!lint.eslint)
    return

  const { pkg, files } = createESLintConfig({
    vueVersion: '3.x',
    styleGuide: 'default',
    hasTypeScript: lint.ts || false,
    needsPrettier: lint.prettier || false,
  })

  const scripts: Record<string, string> = {
    lint: lint.ts
      ? 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore'
      : 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore',
  }

  if (lint.prettier)
    scripts.format = 'prettier --write src/'

  const pkgPath = resolve(root, 'package.json')
  const existingPkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  const updatedPkg = sortDependencies(deepMerge(deepMerge(existingPkg, pkg), { scripts }))
  writeFileSync(pkgPath, `${JSON.stringify(updatedPkg, null, 2)}\n`, 'utf-8')

  for (const [fileName, content] of Object.entries(files)) {
    const fullPath = resolve(root, fileName)
    writeFileSync(fullPath, content, 'utf-8')
  }
}
