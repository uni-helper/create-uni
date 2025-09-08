#!/usr/bin/env node

import type { Answers } from './question'
import type { UnCustomTempValue } from './question/template/type'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { intro, outro, spinner } from '@clack/prompts'
import { generateBanner } from '@create-uni/shared'
import ejs from 'ejs'
import JSON5 from 'json5'
import { green } from 'kolorist'

import minimist from 'minimist'
import { commandAction } from './command'
import { question } from './question'
import askForceOverwrite from './question/file'
import { cancelMesssage } from './question/onCancel'
import {
  dowloadTemplate,
  getPkgManager,
  preOrderDirectoryTraverse,
  printFinish,
  renderTemplate,
  replaceProjectName,
} from './utils'
import { postOrderDirectoryTraverse } from './utils/directoryTraverse'
import {
  validateModules,
  validatePlugins,
  validateTemplateType,
  validateUIName,
} from './utils/validateArgv'

async function init() {
  const argv = minimist(process.argv.slice(2), {
    alias: {
      templateType: ['t'],
      needsTypeScript: ['ts'],
      pluginList: ['p'],
      moduleList: ['m'],
      UIName: ['ui', 'u'],
      needsEslint: ['eslint', 'e'],
      help: ['h', 'help'],
      info: ['info', 'i'],
      gui: ['gui', 'g'],
      force: ['force', 'f'],
    },
    string: ['_'],
  })

  let result: Answers = {}

  const guiData = commandAction(argv)

  const projectName = argv._[0] || guiData?.projectName

  intro(generateBanner('Uni-creator - 快速创建 uni-app 项目'))
  const s = spinner()

  if (!projectName) {
    try {
      result = await question()
    }
    catch (cancelled) {
    // eslint-disable-next-line no-console
      console.log((<{ message: string }>cancelled).message)
      process.exit(1)
    }
  }
  else if (argv._[0]) {
    const templateType = validateTemplateType(argv.templateType)
    const UIName = validateUIName(argv.UIName)
    const pluginList = validatePlugins(argv.pluginList)
    const moduleList = validateModules(argv.moduleList)

    const shouldOverwrite = argv.force ? true : await askForceOverwrite(projectName)

    result = {
      projectName,
      shouldOverwrite,
      templateType,
      needsTypeScript: argv['needsTypeScript'!],
      pluginList,
      moduleList,
      UIName,
      needsEslint: argv['needsEslint'!],
    }
  }
  else if (guiData.projectName) {
    const templateType = validateTemplateType(guiData.useTemplate)
    const UIName = validateUIName(guiData.requireUI)
    const pluginList = validatePlugins(guiData.requiredPlugins)
    const moduleList = validateModules(guiData.requiredModules)
    result = {
      projectName: guiData.projectName,
      shouldOverwrite: true,
      templateType,
      needsTypeScript: guiData.requireTypeScript,
      pluginList,
      moduleList,
      UIName,
      needsEslint: guiData.requireESLint,
    }
  }

  s.start('正在创建模板...')
  const cwd = process.cwd()
  const root = resolve(guiData?.installationPath ?? cwd, result.projectName!)
  const packageManager = getPkgManager()

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
    await dowloadTemplate(templateType as UnCustomTempValue, projectName!, root, s)
    printFinish(root, cwd, packageManager, s)
    return
  }

  const templateRoot = resolve(__dirname, './../template')

  type Callback = (dataStore: Record<string, any>) => void
  const callbacks: Callback[] = []
  function render(templateName: string) {
    const templateDir = resolve(templateRoot, templateName)
    renderTemplate(templateDir, root, callbacks)
  }

  // Render templates
  render('base')

  const needUnocss = result.moduleList?.includes('unocss') || ['ano', 'skiyee'].includes(result.UIName!)
  const needUI = Boolean(result.UIName)

  // Render Config
  const config = {
    typescript: result.needsTypeScript,
    lint: result.needsEslint,
  }

  for (const [key, needs] of Object.entries(config)) {
    if (needs)
      render(`config/${key}`)
  }

  // Render Plugins
  result.pluginList?.forEach(plugin => render(`plugin/${plugin}`))
  if (needUI && !result.pluginList?.includes('import'))
    render('plugin/import')

  // Render modules
  result.moduleList?.forEach(module => render(`module/${module}`))
  if (needUnocss && !result.moduleList?.includes('unocss'))
    render('module/unocss')

  // Render UI
  const UI = {
    unocss: needUnocss,
    [result.UIName!]: needUI,
  }

  for (const [key, needs] of Object.entries(UI)) {
    if (needs)
      render(`UI/${key}`)
  }

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

        if (dest.includes('vite.config') && dataStore[dest].extraConfig)
          dataStore[dest].extraConfig = JSON5.stringify(dataStore[dest].extraConfig, null, 2).slice(1, -1).trim()

        const content = ejs.render(template, dataStore[dest])

        writeFileSync(dest, content)
        unlinkSync(filepath)
      }
    },
  )

  if (result.needsTypeScript) {
    preOrderDirectoryTraverse(
      root,
      () => {},
      (filepath) => {
        // Rename `.js` to `.ts`
        if (filepath.endsWith('.js') && !filepath.endsWith('eslint.config.js')) {
          const tsFilePath = filepath.replace(/\.js$/, '.ts')
          if (existsSync(tsFilePath))
            unlinkSync(filepath)

          else
            renameSync(filepath, tsFilePath)
        }
        // Rename 'jsconfig.json' to 'tsconfig.json
        else if (filepath.endsWith('jsconfig.json')) {
          const tsFilePath = filepath.replace('jsconfig.json', 'tsconfig.json')
          if (existsSync(tsFilePath))
            unlinkSync(filepath)

          else
            renameSync(filepath, tsFilePath)
        }
      },
    )

    // Rename entry in `index.html`
    const indexHtmlPath = resolve(root, 'index.html')
    const indexHtmlContent = readFileSync(indexHtmlPath, 'utf8')
    writeFileSync(indexHtmlPath, indexHtmlContent.replace('src/main.js', 'src/main.ts'))

    // Rename <script setup> To <script setup lang="ts">
    preOrderDirectoryTraverse(
      resolve(root, 'src'),
      () => {},
      (filepath) => {
        if (filepath.endsWith('.vue')) {
          const vueContent = readFileSync(filepath, 'utf8')
          const vueContentWithTs = vueContent.replace('<script setup>', '<script setup lang="ts">')
          writeFileSync(filepath, vueContentWithTs)
        }
      },
    )
  }
  replaceProjectName(root, result.projectName!)

  printFinish(root, cwd, packageManager, s)
}

init()
  .catch((error) => {
    outro(cancelMesssage)
    console.log(error.message.includes('操作已取消') ? '' : error)
    console.log(`🚀 遇到问题? 快速反馈：${green('https://github.com/uni-helper/create-uni/issues/new/choose')}`)
    process.exit(0)
  })
