type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

interface GithubGitee {
  github: string
  gitee: string
}

interface BaseTemplateList {
  title: string
  value: {
    type: string
    url: AtLeastOne<GithubGitee>
  }
  description?: string
}


export type TemplateList = BaseTemplateList
