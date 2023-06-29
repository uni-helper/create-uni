import type { PromptObject } from 'prompts'
import { templateList } from './templateDate'

export default (): PromptObject<string> => {
  return {
    name: 'templateType',
    type: 'select',
    message: '请选择 uni-app 模板',
    choices: [
      {
        title: '自定义模板',
        value: 'custom',
      },
      ...templateList,
    ],
    initial: 0,
  }
}
