import prompts from 'prompts'
import projectName from './name'
import choices from './choices'
import template from './template'
import { onCancel } from './onCancel'

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
