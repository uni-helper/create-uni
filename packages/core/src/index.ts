#!/usr/bin/env node

import process from 'node:process'
import { intro, spinner } from '@clack/prompts'
import minimist from 'minimist'
import { installAndInvokeCLI } from './installAndInvokeCLI'
import { generateBanner } from './utils'

async function init() {
  intro(generateBanner())
  const s = spinner()

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

  installAndInvokeCLI(argv, s)

  const projectName = argv._[0]

  // const result: {
  //   projectName?: string
  //   shouldOverwrite?: boolean
  //   templateType?: BaseTemplateList['value']
  //   needsTypeScript?: boolean
  //   pluginList?: string[]
  //   moduleList?: string[]
  //   UIName?: string | null
  //   needsEslint?: boolean
  // } = {}

  if (!projectName) {
    try {
      // result = await question()
    }
    catch (cancelled) {
    // eslint-disable-next-line no-console
      console.log((<{ message: string }>cancelled).message)
      process.exit(1)
    }
  }
  else {
    // const templateType = validateTemplateType(argv.templateType)
    // const UIName = validateUIName(argv.UIName)
    // const pluginList = validatePlugins(argv.pluginList)
    // const moduleList = validateModules(argv.moduleList)

    // const shouldOverwrite = canSkipEmptying(projectName)
    //   ? true
    //   : (await prompts(filePrompt(projectName), { onCancel })).shouldOverwrite

    // result = {
    //   projectName,
    //   shouldOverwrite,
    //   templateType,
    //   needsTypeScript: argv['needsTypeScript'!],
    //   pluginList,
    //   moduleList,
    //   UIName,
    //   needsEslint: argv['needsEslint'!],
    // }

  }
}

init()
