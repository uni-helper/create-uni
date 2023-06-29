type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

interface BaseTemplateList {
  title: string
  value: string
  description?: string
}

interface GithubGitee {
  github: string
  gitee: string
}

export type TemplateList = BaseTemplateList & AtLeastOne<GithubGitee>
