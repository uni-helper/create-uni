#!/usr/bin/env node

import type { UnCustomTempValue } from '@create-uni/config/src/type'
import type { Answers } from './question'
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
import { intro, log, outro, spinner } from '@clack/prompts'
import { generateBanner } from '@create-uni/shared'
import ejs from 'ejs'
import { green } from 'kolorist'
import minimist from 'minimist'
import { commandAction } from './command'
import { question } from './question'
import askForceOverwrite from './question/file'
import { cancelMesssage } from './question/onCancel'
import {
  dowloadTemplate,
  getPkgManager,
  jsonStringifyWithoutKeysQuotes,
  preOrderDirectoryTraverse,
  printFinish,
  renderTemplate,
  replaceProjectName,
} from './utils'
import { postOrderDirectoryTraverse } from './utils/directoryTraverse'
import {
  validateCssType,
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
      cssType: ['css', 'c'],
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
    const cssType = validateCssType(argv.cssType)
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
      cssType,
      needsEslint: argv['needsEslint'!],
    }
  }
  else if (guiData.projectName) {
    const templateType = validateTemplateType(guiData.useTemplate)
    const UIName = validateUIName(guiData.requireUI)
    const cssType = validateCssType(guiData.requireCss)
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
      cssType,
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

  // 兼容旧版本中通过 `-m unocss` 选择原子化 CSS 的方式
  const legacyUnocss = result.moduleList?.includes('unocss')
  if (legacyUnocss)
    result.moduleList = result.moduleList!.filter(module => module !== 'unocss')

  let cssType = result.cssType ?? (legacyUnocss ? 'unocss' : null)
  // ano-ui 是基于 UnoCSS 的组件库，只能搭配 UnoCSS 使用
  if (result.UIName === 'ano') {
    if (cssType && cssType !== 'unocss')
      log.warn(`ano-ui 组件库依赖 UnoCSS，已忽略 ${cssType} 并使用 UnoCSS`)
    cssType = 'unocss'
  }

  const needUnocss = cssType === 'unocss'
  const needTailwindcss = cssType === 'tailwindcss'
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
  if (needUnocss)
    render('module/unocss')
  if (needTailwindcss)
    render('module/tailwindcss')

  // Render UI
  const UI = {
    atomicCSS: needUnocss || needTailwindcss, // unocss / tailwindcss 共用同一份原子化 CSS 模板（Tailwind 类名方案）
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
          dataStore[dest].extraConfig = jsonStringifyWithoutKeysQuotes(dataStore[dest].extraConfig)

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
