import type { TemplateValue } from './../question/template/type'

import process from 'node:process'
import { outro } from '@clack/prompts'

import { MODULES, PLUGINS, UI } from '@create-uni/config'
import { bold, gray } from 'kolorist'
import { templateList } from '../question/template/template.data'

type ArgvBase = string | null
type ArgvList = ArgvBase | string[]

function validateTemplateType(argvTemplate: ArgvBase): TemplateValue {
  if (!argvTemplate)
    return { type: 'custom' }
  const templateType = templateList.find(item => item.value === argvTemplate)
  if (templateType) {
    return {
      type: templateType.value,
      url: templateType.url!,
    }
  }
  else {
    for (const item of templateList) {
      if (item.list) {
        const templateType = item.list.find(subItem => subItem.value === argvTemplate)
        if (templateType) {
          return {
            type: templateType.value,
            url: templateType.url!,
          }
        }
      }
    }
  }

  outro(`${bold(`暂不支持 ${gray(argvTemplate)} 模板`)}`)
  process.exit(1)
}

function validateUIName(argvUIName: ArgvBase) {
  if (!argvUIName)
    return null
  const UIName = UI.find(item => item.value === argvUIName)?.value
  if (!UIName) {
    outro(`${bold(`暂不支持 ${gray(argvUIName)} UI库`)}`)
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
    outro(`${bold(`暂不支持 ${gray(missedPluginList.join(', '))} 插件`)}`)
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
    outro(`${bold(`暂不支持 ${gray(missedModuleList.join(', '))} 模块`)}`)
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
