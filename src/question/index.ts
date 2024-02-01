import prompts from 'prompts'
import { bold, red } from 'kolorist'

import figures from 'prompts/lib/util/figures.js'
import projectName from './name'
import choices from './choices'
import template from './template'

export async function question() {
  const questions = [
    ...projectName(),
    template(),
  ]

  const onCancel = () => {
    throw new Error(`${red(figures.cross)} ${bold('操作已取消')}`)
  }

  let answers = await prompts(questions, { onCancel })

  if (answers.templateType.type === 'custom') {
    const allList = await prompts(choices(), { onCancel })
    answers = {
      ...answers,
      ...allList,
    }
  }

  return answers
}
