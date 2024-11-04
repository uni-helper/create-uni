import type { PromptObject } from 'prompts'
import MODULES from './module/choices'
import PLUGINS from './plugin/choices'
import { UIList } from './UI/choices'
import { hint, instructions } from '@/constants'

export default (): PromptObject<string>[] => {
  return [
    {
      name: 'needsTypeScript',
      type: 'toggle',
      message: '是否使用 TypeScript 语法？',
      initial: false,
      active: '是',
      inactive: '否',
    },
    {
      name: 'pluginList',
      type: 'multiselect',
      message: '选择需要的vite插件？',
      instructions,
      choices: PLUGINS,
    },
    {
      name: 'moduleList',
      type: 'multiselect',
      message: '选择需要的库？',
      instructions,
      choices: MODULES,
    },
    {
      name: 'UIName',
      type: 'select',
      message: '选择需要的组件库？',
      hint,
      choices: UIList,
    },
    {
      name: 'needsEslint',
      type: 'toggle',
      message: '是否引入 ESLint 用于代码质量检测？',
      initial: false,
      active: '是',
      inactive: '否',
    },
  ]
}
