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
      name: 'needsPinia',
      type: 'toggle',
      message: '使用Pinia作为数据管理?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
    // {
    //   name: 'needComponent',
    //   type: 'toggle',
    //   message: '使用扩展组件库？',
    //   initial: false,
    //   active: 'Yss',
    //   inactive: 'No',
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
