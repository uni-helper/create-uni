import { dim, italic, link, reset } from 'kolorist'
import type { PromptObject } from 'prompts'

export default (): PromptObject<string>[] => {
  return [
    {
      name: 'needsTypeScript',
      type: 'toggle',
      message: '添加TypeScript?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'needsJsx',
      type: 'toggle',
      message: `添加JSX?${link(reset(italic(dim('(不支持小程序平台)'))), 'https://uniapp.dcloud.net.cn/tutorial/syntax-jsx.html#jsx-tsx-%E6%94%AF%E6%8C%81')}`,
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'needsPinia',
      type: 'toggle',
      message: '使用Pinia作为数据管理?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'needsUnocss',
      type: 'toggle',
      message: '使用Unocss作为样式解决方案?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'needsEslint',
      type: 'toggle',
      message: '使用ESlint作代码检测?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
  ]
}
