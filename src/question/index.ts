import prompts from 'prompts'
import { red } from 'kolorist'

import projectName from './name'
import model from './model'
import template from './template'

export async function question() {
  const questions = [
    ...projectName(),
    template(),
  ]

  const onCancel = () => {
    throw new Error(`${red('✖')} Operation cancelled`)
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
