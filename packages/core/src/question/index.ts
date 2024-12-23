import prompts from 'prompts'
import choices from './choices'
import projectName from './name'
import { onCancel } from './onCancel'
import template from './template'

export async function question() {
  const questions = [
    ...projectName(),
    template(),
  ]

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
