import { instructions } from '@/constants'
import { onCancel } from '@/question/onCancel'
import prompts from 'prompts'
import type { PromptObject } from 'prompts'

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
