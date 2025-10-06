import type { Options } from './type'
import { trueColor as rgb } from 'kolorist'

export default [
  {
    label: rgb(236, 112, 99)('vite-plugin-uni-components'),
    value: 'import',
    name: 'vite-plugin-uni-components',
    hint: '按需自动引入组件',
    github: 'https://github.com/uni-helper/vite-plugin-uni-components',
  },
  {
    label: rgb(243, 156, 18)('vite-plugin-uni-pages'),
    value: 'pages',
    name: 'vite-plugin-uni-pages',
    hint: '提供基于文件系统的路由',
    github: 'https://github.com/uni-helper/vite-plugin-uni-pages',
  },
  {
    label: rgb(241, 196, 15)('vite-plugin-uni-layouts'),
    value: 'layouts',
    name: 'vite-plugin-uni-layouts',
    hint: '提供类 nuxt 的 layouts 系统',
    github: 'https://github.com/uni-helper/vite-plugin-uni-layouts',
  },
  {
    label: rgb(46, 204, 113)('vite-plugin-uni-manifest'),
    value: 'manifest',
    name: 'vite-plugin-uni-manifest',
    hint: '自动生成 manifest.json 文件',
    github: 'https://github.com/uni-helper/vite-plugin-uni-manifest',
  },
  {
    label: rgb(52, 152, 219)('vite-plugin-uni-platform'),
    value: 'filePlatform',
    name: 'vite-plugin-uni-platform',
    hint: '基于文件名 (*.<h5|mp-weixin|app>.*) 的按平台编译插件',
    github: 'https://github.com/uni-helper/vite-plugin-uni-platform',
  },
  {
    label: rgb(155, 89, 182)('vite-plugin-uni-platform-modifier'),
    value: 'platformModifier',
    name: 'vite-plugin-uni-platform-modifier',
    hint: '为属性、指令提供平台修饰符并按需编译',
    github: 'https://github.com/uni-helper/vite-plugin-uni-platform-modifier',
  },
  {
    label: rgb(149, 165, 166)('vite-plugin-uni-middleware'),
    value: 'middleware',
    name: 'vite-plugin-uni-middleware',
    hint: '使用路由中间件',
    github: 'https://github.com/uni-helper/vite-plugin-uni-middleware',
  },
  {
    label: rgb(146, 220, 210)('uni-ku-root'),
    value: 'root',
    name: 'uni-ku-root',
    hint: '模拟虚拟根组件(支持SFC的App.vue)',
    github: 'https://github.com/uni-ku/root',
  },
  {
    label: rgb(102, 153, 51)('vite-plugin-component-placeholder'),
    value: 'componentPlaceholder',
    name: 'vite-plugin-component-placeholder',
    hint: '占位组件的原生实现',
    github: 'https://github.com/chouchouji/vite-plugin-component-placeholder',
  },
] as const satisfies readonly Options[]
