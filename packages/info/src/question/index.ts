import process from 'node:process'
import { isCancel, multiselect } from '@clack/prompts'

export default async function question(choices: string[], message: string) {
  const result = await multiselect({
    message,
    options: choices.map(item => ({
      value: item,
      label: item,
    })),
    required: false,
  })
  if (isCancel(result)) {
    process.exit(0)
  }
  return result
}
