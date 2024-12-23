import { trueColor as rgb } from 'kolorist'
import type { ModelType } from '../type'

export default [
  {
    title: rgb(236, 112, 99)('vite-plugin-uni-components'),
    value: 'import',
    description: '按需自动引入组件',
  },
  {
    title: rgb(243, 156, 18)('vite-plugin-uni-pages'),
    value: 'pages',
    description: '提供基于文件系统的路由',
  },
  {
    title: rgb(241, 196, 15)('vite-plugin-uni-layouts'),
    value: 'layouts',
    description: '提供类 nuxt 的 layouts 系统',
  },
  {
    title: rgb(46, 204, 113)('vite-plugin-uni-manifest'),
    value: 'manifest',
    description: '自动生成 manifest.json 文件',
  },
  {
    title: rgb(52, 152, 219)('vite-plugin-uni-platform'),
    value: 'filePlatform',
    description: '基于文件名 (*.<h5|mp-weixin|app>.*) 的按平台编译插件',
  },
  {
    title: rgb(155, 89, 182)('vite-plugin-uni-platform-modifier'),
    value: 'platformModifier',
    description: '为属性、指令提供平台修饰符并按需编译',
  },
  {
    title: rgb(149, 165, 166)('vite-plugin-uni-middleware'),
    value: 'middleware',
    description: '使用路由中间件',
  },
  {
    title: rgb(146, 220, 210)('uni-ku-root'),
    value: 'root',
    description: '模拟虚拟根组件(支持SFC的App.vue)',
  },
] as ModelType[]
