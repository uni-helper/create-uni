import type { PromptObject } from 'prompts'
import prompts from 'prompts'
import { gray } from 'kolorist'
import { onCancel } from './../../../question/onCancel'

export async function question(choices: string[], message: string) {
  const instructions = gray('使用↑↓选择，空格或←→选中，a全选，回车确认')

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
