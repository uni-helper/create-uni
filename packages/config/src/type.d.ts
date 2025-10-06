export interface Options {
  label: string
  hint: string
  value: string | null
  name: string
  github?: string
  website?: string
}

interface GithubGitee {
  github: string
  gitee: string
}

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

interface BaseTemplateListCommon {
  /**
   * 模板名称
   */
  label: string
  /**
   * 模板类型 不能为custom
   * @property {string} type - 模板类型
   */
  value: string
  /**
   * 模板描述
   */
  description?: string
  /**
   * 官方网站
   */
  website?: string
  /**
   * 演练场
   */
  playground?: string
  /**
   * 模板下载完成后的回调函数
   * @param {string} root - 模板下载的根目录
   */
  callBack?: (root: string) => void
}

interface BaseTemplateListWithUrl extends BaseTemplateListCommon {
  /**
   * 模板地址 github和gitee地址至少存在一个
   * @property {string} github - github地址
   * @property {string} gitee - gitee地址
   */
  url: AtLeastOne<GithubGitee>
  list?: never // 确保list不会出现在这个类型中
}

export interface BaseTemplateListWithList extends BaseTemplateListCommon {
  url?: never // 确保url不会出现在这个类型中
  /**
   * 模板列表
   * @type {BaseTemplateListWithUrl[]} - 模板列表
   */
  list: BaseTemplateListWithUrl[]
}

type BaseTemplateList = BaseTemplateListWithUrl | BaseTemplateListWithList

export type TemplateList = BaseTemplateList

interface CustomTempValue {
  type: 'custom'
}

interface UnCustomTempValue {
  type: string
  url: AtLeastOne<GithubGitee>
  callBack?: (root: string) => void
}

export type TemplateValue = UnCustomTempValue | CustomTempValue
