#!/usr/bin/env node

import { basename, join, resolve } from 'node:path'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import ejs from 'ejs'
import {
  FILES_TO_FILTER,
  dowloadTemplate,
  preOrderDirectoryTraverse,
  printBanner,
  printFinish,
  renderTemplate,
  setPackageName,
} from './utils'
import { question } from './question'
import type { BaseTemplateList } from './question/template/type'
import { postOrderDirectoryTraverse } from './utils/directoryTraverse'

async function init() {
  printBanner()

  let result: {
    projectName?: string
    shouldOverwrite?: boolean
    templateType?: BaseTemplateList['value']
    needsTypeScript?: boolean
    needsJsx?: boolean
    needsPinia?: boolean
    needsVitest?: boolean
    needsEslint?: boolean
    needsPrettier?: boolean
  } = {}

  try {
    result = await question()
  }
  catch {
    process.exit(1)
  }

  const cwd = process.cwd()
  const root = join(cwd, result.projectName!)

  function emptyDir(dir: string) {
    if (!existsSync(dir))
      return

    postOrderDirectoryTraverse(
      dir,
      dir => rmdirSync(dir),
      file => unlinkSync(file),
    )
  }

  if (existsSync(root) && result.shouldOverwrite)
    emptyDir(root)

  else if (!existsSync(root))
    mkdirSync(root)

  if (result.templateType!.type !== 'custom') {
    const { templateType, projectName } = result
    await dowloadTemplate(templateType!, projectName!, root)
    printFinish(root, cwd)
    return
  }

  setPackageName(result.projectName!, root)

  const templateRoot = resolve(__dirname, 'template')

  const callbacks: Function[] = []
  function render(templateName: string) {
    const templateDir = resolve(templateRoot, templateName)
    renderTemplate(templateDir, root, callbacks)
  }

  render('base')

  if (result.needsJsx)
    render('config/jsx')

  if (result.needsPinia) {
    render('config/pinia')
    render('entry/pinia')
  }
  else {
    render('entry/default')
  }

  if (result.needsVitest)
    render('config/vitest')

  if (result.needsTypeScript) {
    render('config/typescript')
    render('tsconfig/base')

    if (result.needsVitest)
      render('tsconfig/vitest')
  }

  const codeTemplate = (result.needsTypeScript ? 'typescript-default' : 'default')
  render(`code/${codeTemplate}`)

  const dataStore: Record<string, any> = {}
  // Process callbacks
  for (const cb of callbacks)
    await cb(dataStore)

  preOrderDirectoryTraverse(
    root,
    () => {},
    (filepath) => {
      if (filepath.endsWith('.ejs')) {
        const template = readFileSync(filepath, 'utf-8')
        const dest = filepath.replace(/\.ejs$/, '')
        const content = ejs.render(template, dataStore[dest])

        writeFileSync(dest, content)
        unlinkSync(filepath)
      }
    },
  )

  if (result.needsTypeScript) {
  // Convert the JavaScript template to the TypeScript
  // Check all the remaining `.js` files:
  //   - If the corresponding TypeScript version already exists, remove the `.js` version.
  //   - Otherwise, rename the `.js` file to `.ts`
  // Remove `jsconfig.json`, because we already have tsconfig.json
  // `jsconfig.json` is not reused, because we use solution-style `tsconfig`s, which are much more complicated.
    preOrderDirectoryTraverse(
      root,
      () => {},
      (filepath) => {
        if (filepath.endsWith('.js') && !FILES_TO_FILTER.includes(basename(filepath))) {
          const tsFilePath = filepath.replace(/\.js$/, '.ts')
          if (existsSync(tsFilePath))
            unlinkSync(filepath)

          else
            renameSync(filepath, tsFilePath)
        }
        else if (basename(filepath) === 'jsconfig.json') {
          unlinkSync(filepath)
        }
      },
    )

    // Rename entry in `index.html`
    const indexHtmlPath = resolve(root, 'index.html')
    const indexHtmlContent = readFileSync(indexHtmlPath, 'utf8')
    writeFileSync(indexHtmlPath, indexHtmlContent.replace('src/main.js', 'src/main.ts'))
  }
  else {
  // Remove all the remaining `.ts` files
    preOrderDirectoryTraverse(
      root,
      () => {},
      (filepath) => {
        if (filepath.endsWith('.ts'))
          unlinkSync(filepath)
      },
    )
  }

  printFinish(root, cwd)
}

init().catch((e) => {
  console.error(e)
})
