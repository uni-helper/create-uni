import type { PromptObject } from 'prompts'
import { gray } from 'kolorist'
import { UIList } from './UI/choices'
import MODULES from './module/choices'
import PLUGINS from './plugin/choices'

export default (): PromptObject<string>[] => {
  const instructions = gray('使用↑↓选择，空格或←→选中，a全选，回车确认')

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
      hint: '使用↑↓选择，回车确认',
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
