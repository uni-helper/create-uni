import type { PromptObject } from 'prompts'
import prompts from 'prompts'
import { bold, gray, red } from 'kolorist'
import figures from 'prompts/lib/util/figures.js'

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

  const onCancel = () => {
    throw new Error(`${red(figures.cross)} ${bold('操作已取消')}`)
  }

  const answers = await prompts(questions, { onCancel })

  return answers
}
