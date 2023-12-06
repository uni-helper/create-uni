import type { PromptObject } from 'prompts'
import filePrompt from './file'

export default (): PromptObject<string>[] => {
  let targetDir = 'uni-app'
  return [
    {
      name: 'projectName',
      type: 'text',
      message: '请输入项目名称:',
      initial: targetDir,
      onState: state => (targetDir = String(state.value).trim() || targetDir),
    },
    ...filePrompt(targetDir),
  ]
}
