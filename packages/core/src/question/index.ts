import type { TemplateValue } from './template/type'
import { group, log } from '@clack/prompts'
import { needsEslint, needsTypeScript } from './choices'
import cssType from './css'
import askForceOverwrite from './file'
import moduleList from './module'
import projectName from './name'
import { printCancel } from './onCancel'
import pluginList from './plugin'
import templateType from './template'
import UIName from './ui'

export interface Answers {
  projectName?: string
  shouldOverwrite?: boolean
  templateType?: TemplateValue
  needsTypeScript?: boolean
  pluginList?: string[]
  moduleList?: string[]
  UIName?: string | null
  cssType?: string | null
  needsEslint?: boolean
}

export async function question(): Promise<Answers> {
  const answersName = await group(
    {
      projectName,
      shouldOverwrite: ({ results }) => {
        return askForceOverwrite(results.projectName!)
      },
    },
    {
      onCancel() {
        printCancel()
      },
    },
  ) as Answers

  const template = await templateType()
  if (template.type !== 'custom') {
    return {
      ...answersName,
      templateType: template,
    }
  }

  const answerOptions = await group(
    {

      needsTypeScript,
      pluginList,
      moduleList,
      UIName,
      cssType: ({ results }) => {
        // ano-ui 是基于 UnoCSS 的组件库，必须搭配 UnoCSS 使用
        if (results.UIName === 'ano') {
          log.info('ano-ui 组件库依赖 UnoCSS，已自动选择 UnoCSS')
          return Promise.resolve('unocss')
        }
        return cssType()
      },
      needsEslint,
    },
    {
      onCancel() {
        printCancel()
      },
    },
  ) as Answers

  return {
    ...answersName,
    ...answerOptions,
    templateType: template,
  }
}
