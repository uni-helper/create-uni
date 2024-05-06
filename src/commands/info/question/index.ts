import type { PromptObject } from 'prompts'
import prompts from 'prompts'
import { onCancel } from '@/question/onCancel'
import { instructions } from '@/constants'

export async function question(choices: string[], message: string) {
  const questions = [
    {
      name: 'errorIndexList',
      type: 'multiselect',
      message,
      instructions,
      choices,
    },
  ] as unknown as PromptObject<string>[]

  const answers = await prompts(questions, { onCancel })

  return answers
}
