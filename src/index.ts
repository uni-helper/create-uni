#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import { join, resolve } from 'node:path'
import process from 'node:process'
import ejs from 'ejs'
import { bold, green } from 'kolorist'
import minimist from 'minimist'
import prompts from 'prompts'
import JSON5 from 'json5'
import { question } from './question'
import filePrompt from './question/file'
import type { BaseTemplateList } from './question/template/type'
import type { Ora } from './utils'
import {
  canSkipEmptying,
  dowloadTemplate,
  ora,
  preOrderDirectoryTraverse,
  printBanner,
  printFinish,
  renderTemplate,
  replaceProjectName,
} from './utils'

import {
  validateModules,
  validatePlugins,
  validateTemplateType,
  validateUIName,
} from './utils/validateArgv'
import { postOrderDirectoryTraverse } from './utils/directoryTraverse'
import { cancelMesssage, onCancel } from './question/onCancel'
import { getUniAppInfo } from './commands/info'

let loading: Ora
async function init() {
  const argv = minimist(process.argv.slice(2), {
    alias: {
      templateType: ['t'],
      needsTypeScript: ['ts'],
      pluginList: ['p'],
      moduleList: ['m'],
      UIName: ['ui', 'u'],
      needsEslint: ['eslint', 'e'],
    },
    string: ['_'],
  })

  if (argv.info)
    await getUniAppInfo(argv.info)

  printBanner()

  const projectName = argv._[0]

  let result: {
    projectName?: string
    shouldOverwrite?: boolean
    templateType?: BaseTemplateList['value']
    needsTypeScript?: boolean
    pluginList?: string[]
    moduleList?: string[]
    UIName?: string | null
    needsEslint?: boolean
  } = {}

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
  else {
    const templateType = validateTemplateType(argv.templateType)
    const UIName = validateUIName(argv.UIName)
    const pluginList = validatePlugins(argv.pluginList)
    const moduleList = validateModules(argv.moduleList)

    const shouldOverwrite = canSkipEmptying(projectName)
      ? true
      : (await prompts(filePrompt(projectName), { onCancel })).shouldOverwrite

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

  loading = ora(`${bold('正在创建模板...')}`).start()
  const cwd = process.cwd()
  const root = join(cwd, result.projectName!)
  const userAgent = process.env.npm_config_user_agent ?? ''
  const packageManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm'

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
    await dowloadTemplate(templateType!, projectName!, root, loading)
    printFinish(root, cwd, packageManager, loading)
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

  const needUnocss = result.moduleList?.includes('unocss') || result.UIName === 'ano'
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

  printFinish(root, cwd, packageManager, loading)
}

init()
  .catch((error) => {
    console.log(cancelMesssage)
    console.log(error.message.includes('操作已取消') ? '' : error)
    console.log(`🚀 遇到问题? 快速反馈：${green('https://github.com/uni-helper/create-uni/issues/new/choose')}`)
    process.exit(0)
  })
