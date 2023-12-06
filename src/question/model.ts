import type { PromptObject } from 'prompts'

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
      name: 'needsPinia',
      type: 'toggle',
      message: '是否引入 Pinia 用于状态管理？',
      initial: false,
      active: '是',
      inactive: '否',
    },
    // {
    //   name: 'needComponent',
    //   type: 'toggle',
    //   message: '使用扩展组件库？',
    //   initial: false,
    //   active: 'Yss',
    //   inactive: '否',
    // },
    // {
    //   name: 'componentName',
    //   type: (_prev, values) => {
    //     if (!values.needComponent)
    //       return null

    //     return 'select'
    //   },
    //   message: '选择需要的组件库?',
    //   hint: '使用方向键选择，回车确认',
    //   initial: 0,
    //   choices: [
    //     {
    //       title: 'Uni-UI',
    //       description: `由${link(green('Uni App'), 'https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html')}官方组件库`,
    //       value: 'uni',
    //     },
    //   ],
    // },
    {
      name: 'needsUnocss',
      type: 'toggle',
      message: '是否使用 Unocss 作为样式解决方案?',
      initial: false,
      active: '是',
      inactive: '否',
    },
    {
      name: 'needsEslint',
      type: 'toggle',
      message: '是否引入 ESLint 用于代码质量检测？?',
      initial: false,
      active: '是',
      inactive: '否',
    },
  ]
}
