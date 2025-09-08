import { z } from 'zod'

/**
 * 基于core包中的数据定义Zod schema
 * 为AI提供更好的理解和描述
 */

// 模板类型schema
export const templateTypeSchema = z.enum([
  'vitesse',
  'wot-starter',
  'wot-starter-retail',
  'unisave',
  'tmui32',
]).describe(`
预设模板类型，每个模板都有不同的特点：
- vitesse: 由Uni Helper维护的快速启动模板，适合现代开发
- wot-starter: 由Wot UI提供的基于vitesse的快速启动模板，包含高颜值组件
- wot-starter-retail: 基于Wot UI的零售行业模板，适合电商应用
- unisave: 拥抱web开发，适配所有平台的通用模板
- tmui32: 优质Vue3 TS Pinia Vite跨端组件库模板
`)

// 插件类型schema
export const pluginListSchema = z.array(z.enum([
  'import',
  'pages',
  'layouts',
  'manifest',
  'filePlatform',
  'platformModifier',
  'middleware',
  'root',
])).optional().default([]).describe(`
需要安装的插件列表，每个插件提供特定功能：
- import: vite-plugin-uni-components - 按需自动引入组件，减少手动导入
- pages: vite-plugin-uni-pages - 提供基于文件系统的路由，自动生成页面路由
- layouts: vite-plugin-uni-layouts - 提供类nuxt的layouts系统，统一管理页面布局
- manifest: vite-plugin-uni-manifest - 自动生成manifest.json文件，简化配置
- filePlatform: vite-plugin-uni-platform - 基于文件名的按平台编译插件
- platformModifier: vite-plugin-uni-platform-modifier - 为属性、指令提供平台修饰符
- middleware: vite-plugin-uni-middleware - 使用路由中间件，实现权限控制等功能
- root: uni-ku-root - 模拟虚拟根组件，支持SFC的App.vue
`)

// 模块类型schema
export const moduleListSchema = z.array(z.enum([
  'pinia',
  'unocss',
  'uniNetwork',
  'uniUse',
  'uniPromises',
])).optional().default([]).describe(`
需要安装的模块列表，增强应用功能：
- pinia: 符合直觉的Vue.js状态管理库，替代Vuex
- unocss: 即时按需的原子级CSS引擎，提供高效的样式开发
- uniNetwork: 为uni-app打造的基于Promise的网络请求库，简化HTTP请求
- uniUse: uni-app组合式工具集，提供常用工具函数
- uniPromises: uni-app promise化的API，统一异步操作接口
`)

// UI组件库类型schema
export const uiNameSchema = z.enum([
  '',
  'uni',
  'wot',
  'nut',
  'skiyee',
  'uv',
  'ano',
]).optional().default('').describe(`
UI组件库名称，选择合适的组件库加速开发：
- "": 不需要组件库，手动实现所有UI
- uni: uni-ui - UniApp官方组件库，稳定可靠
- wot: wot-design-uni - 高颜值、轻量化的uni-app组件库
- nut: nutui-uniapp - 京东风格的轻量级移动端组件库
- skiyee: skiyee-ui - 随心创造差异化的组件库
- uv: uv-ui - 多平台快速开发的UI框架
- ano: Ano UI - 轻量级、漂亮、快速的UnoCSS组件库
`)

// 基础创建参数schema
export const baseCreateSchema = {
  name: z.string().describe('项目路径名称（将作为文件夹名称）').default('.'),
  force: z.boolean().optional().describe('是否强制覆盖已存在的目录，默认为false').default(false),
}

// 预设模板创建schema
export const createWithTemplateSchema = z.object({
  ...baseCreateSchema,
  templateType: templateTypeSchema,
})

// 自定义模板创建schema
export const createCustomSchema = z.object({
  ...baseCreateSchema,
  needsTypeScript: z.boolean().optional().describe('是否需要TypeScript支持，提供类型安全和更好的开发体验').default(false),
  pluginList: pluginListSchema,
  moduleList: moduleListSchema,
  UIName: uiNameSchema,
  needsEslint: z.boolean().optional().describe('是否需要ESLint配置，统一代码风格和质量').default(false),
})
