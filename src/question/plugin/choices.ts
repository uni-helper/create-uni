import type { ModelType } from '../type'

export const configList: ModelType[] = [
  {
    title: 'vite-plugin-uni-components',
    value: 'improt',
    description: '按需自动引入组件',
  },
  {
    title: 'vite-plugin-uni-pages',
    value: 'pages',
    description: '提供基于文件系统的路由',
  },
  {
    title: 'vite-plugin-uni-layouts',
    value: 'layouts',
    description: '提供类 nuxt 的 layouts 系统',
  },
  {
    title: 'vite-plugin-uni-manifest',
    value: 'manifest',
    description: '自动生成 manifest.json 文件',
  },
  {
    title: 'vite-plugin-uni-platform',
    value: 'filePlatform',
    description: '基于文件名 (*.<h5|mp-weixin|app>.*) 的按平台编译插件',
  },
  {
    title: 'vite-plugin-uni-platform-modifier',
    value: 'platformModifier',
    description: '为属性、指令提供平台修饰符并按需编译',
  },
  {
    title: 'vite-plugin-uni-middleware',
    value: 'middleware',
    description: '使用路由中间件',
  },
]
