import process from 'node:process'

import { bold, gray, red } from 'kolorist'
import figures from 'prompts/lib/util/figures.js'

import MODULES from './../question/module/choices'
import PLUGINS from './../question/plugin/choices'
import { templateList } from './../question/template/templateDate'
import { UIList } from './../question/UI/choices'
import type { BaseTemplateList } from './../question/template/type'

type ArgvBase = string | null
type ArgvList = ArgvBase | string[]

function validateTemplateType(argvTemplate: ArgvBase): BaseTemplateList['value'] {
  if (!argvTemplate)
    return { type: 'custom' } as BaseTemplateList['value']
  const templateType = templateList.find(item => item.value.type === argvTemplate)?.value
  if (!templateType) {
    console.error(`${red(figures.cross)} ${bold(`暂不支持 ${gray(argvTemplate)} 模板`)}`)
    process.exit(1)
  }
  return templateType
}

function validateUIName(argvUIName: ArgvBase) {
  if (!argvUIName)
    return null
  const UIName = UIList.find(item => item.value === argvUIName)?.value
  if (!UIName) {
    console.error(`${red(figures.cross)} ${bold(`暂不支持 ${gray(argvUIName)} UI库`)}`)
    process.exit(1)
  }
  return UIName
}

function validatePlugins(argvPlugins: ArgvList): [] {
  if (!argvPlugins)
    return []
  const pluginList = [argvPlugins].flat()
  const missedPluginList = pluginList.filter(item => !PLUGINS.some(plugin => plugin.value === item))
  if (missedPluginList.length) {
    console.error(`${red(figures.cross)} ${bold(`暂不支持 ${gray(missedPluginList.join(', '))} 插件`)}`)
    process.exit(1)
  }
  return pluginList as []
}

function validateModules(argvModules: ArgvList): [] {
  if (!argvModules)
    return []
  const moduleList = [argvModules].flat()
  const missedModuleList = moduleList.filter(item => !MODULES.some(module => module.value === item))
  if (missedModuleList.length) {
    console.error(`${red(figures.cross)} ${bold(`暂不支持 ${gray(missedModuleList.join(', '))} 模块`)}`)
    process.exit(1)
  }
  return moduleList as []
}

export {
  validateModules,
  validatePlugins,
  validateTemplateType,
  validateUIName,
}
