import type { TemplateValue } from './../question/template/type'

import process from 'node:process'
import { outro } from '@clack/prompts'

import { CSS, MODULES, PLUGINS, TEMPLATES, UI } from '@create-uni/config'
import { bold, gray } from 'kolorist'

type ArgvBase = string | null
type ArgvList = ArgvBase | string[]

/**
 * 旧版本中 unocss 作为模块存在，这里做兼容处理
 */
const LEGACY_MODULES = ['unocss']

function validateTemplateType(argvTemplate: ArgvBase): TemplateValue {
  if (!argvTemplate)
    return { type: 'custom' }
  const templateType = TEMPLATES.find(item => item.value === argvTemplate)
  if (templateType) {
    return {
      type: templateType.value,
      url: templateType.url!,
    }
  }
  else {
    for (const item of TEMPLATES) {
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

function validateCssType(argvCss: ArgvBase | boolean): string | null {
  if (!argvCss)
    return null
  const cssType = [argvCss].flat()[0]
  const cssValues = CSS.filter(item => item.value).map(item => item.value).join('、')
  if (typeof cssType !== 'string') {
    outro(`${bold(`请通过 ${gray('--css')} 指定原子化CSS`)}，可选值: ${gray(cssValues)}`)
    process.exit(1)
  }
  const value = CSS.find(item => item.value === cssType)?.value
  if (!value) {
    outro(`${bold(`暂不支持 ${gray(cssType)} 原子化CSS`)}，可选值: ${gray(cssValues)}`)
    process.exit(1)
  }
  return value
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
  const missedModuleList = moduleList.filter(item => !MODULES.some(module => module.value === item) && !LEGACY_MODULES.includes(item))
  if (missedModuleList.length) {
    outro(`${bold(`暂不支持 ${gray(missedModuleList.join(', '))} 模块`)}`)
    process.exit(1)
  }
  return moduleList as []
}

export {
  validateCssType,
  validateModules,
  validatePlugins,
  validateTemplateType,
  validateUIName,
}
