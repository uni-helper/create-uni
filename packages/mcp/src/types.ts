/**
 * MCP服务器的类型定义
 */

// 模板类型
export type TemplateType =
  | 'vitesse'
  | 'wot-starter'
  | 'wot-starter-retail'
  | 'unisave'
  | 'tmui32'

// 插件类型
export type PluginType =
  | 'import'
  | 'pages'
  | 'layouts'
  | 'manifest'
  | 'filePlatform'
  | 'platformModifier'
  | 'middleware'
  | 'root'

// 模块类型
export type ModuleType =
  | 'pinia'
  | 'unocss'
  | 'uniNetwork'
  | 'uniUse'
  | 'uniPromises'

// UI类型
export type UIType =
  | ''
  | 'uni'
  | 'wot'
  | 'nut'
  | 'skiyee'
  | 'uv'
  | 'ano'

// 创建项目的基础选项
export interface BaseCreateOptions {
  name: string
  force?: boolean
}

// 使用模板创建选项
export interface CreateWithTemplateOptions extends BaseCreateOptions {
  templateType: TemplateType
}

// 自定义创建选项
export interface CreateCustomOptions extends BaseCreateOptions {
  needsTypeScript?: boolean
  pluginList?: PluginType[]
  moduleList?: ModuleType[]
  UIName?: UIType
  needsEslint?: boolean
}
