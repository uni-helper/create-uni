import prompts from 'prompts'
import { bold, red } from 'kolorist'

import projectName from './name'
import model from './model'
import template from './template'

import figures from 'prompts/lib/util/figures.js'


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
    const modelList = await prompts(model(), { onCancel })
    answers = {
      ...answers,
      ...modelList,
    }
  }

  return answers
}
