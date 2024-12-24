import { group } from '@clack/prompts'
import { needsEslint, needsTypeScript } from './choices'
import askForceOverwrite from './file'
import moduleList from './module'
import projectName from './name'
import { printCancel } from './onCancel'
import pluginList from './plugin'
import templateType from './template'
import UIName from './ui'
import type { TemplateValue } from './template/type'

export interface Answers {
  projectName?: string
  shouldOverwrite?: boolean
  templateType?: TemplateValue
  needsTypeScript?: boolean
  pluginList?: string[]
  moduleList?: string[]
  UIName?: string | null
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
