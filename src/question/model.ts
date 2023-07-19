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
    {
      name: 'styleGuide',
      type: (_prev, values) => {
        if (!values.needsEslint)
          return null

        return 'select'
      },
      message: '选择ESlint风格?',
      hint: '使用方向键选择，回车确认',
      choices: [
        {
          title: 'Default',
          value: 'default',
        },
        {
          title: 'Airbnb',
          value: 'airbnb',
        },
        {
          title: 'Standard',
          value: 'standard',
        },
      ],
    },
    {
      name: 'needsPrettier',
      type: (_prev, values) => {
        if (!values.needsEslint)
          return null

        return 'toggle'
      },
      message: '使用Prettier作代码格式化?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
  ]
}
