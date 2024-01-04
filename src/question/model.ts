import type { PromptObject } from 'prompts'
import { UIList } from './UI/choices'
import { modelList } from './tool/choices'
import { configList } from './config/choices'

export default (): PromptObject<string>[] => {
  const instructions = '使用↑↓选择，空格或←→选中，a全选，回车确认'

  return [
    {
      name: 'configList',
      type: 'multiselect',
      message: '选择需要的配置？',
      instructions,
      choices: configList,
    },
    {
      name: 'modelList',
      type: 'multiselect',
      message: '选择需要的库？',
      instructions,
      choices: modelList,
    },
    {
      name: 'UIName',
      type: 'select',
      message: '选择需要的组件库？',
      hint: '使用↑↓选择，回车确认',
      choices: UIList,
    },
  ]
}
