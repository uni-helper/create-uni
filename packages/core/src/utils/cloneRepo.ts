import { exec } from 'node:child_process'
import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { bold } from 'kolorist'
import type { spinner } from '@clack/prompts'
import { replaceProjectName } from './setPackageName'
import type { UnCustomTempValue } from '../question/template/type'

async function removeGitFolder(localPath: string): Promise<void> {
  const gitFolderPath = join(localPath, '.git')
  await fs.rm(gitFolderPath, { recursive: true, force: true })
}

async function cloneRepo(gitUrls: string[], localPath: string): Promise<void> {
  let lastError = null

  for (const gitUrl of gitUrls) {
    try {
      await new Promise<void>((resolve, reject) => {
        exec(`git clone ${gitUrl} ${localPath}`, async (error) => {
          if (error) {
            reject(error)
            return
          }

          try {
            await removeGitFolder(localPath)
            resolve()
          }
          catch (error) {
            reject(error)
          }
        })
      })
      return
    }
    catch (error) {
      lastError = error
    }
  }

  if (lastError) {
    // @ts-expect-error 类型断言
    throw new Error(lastError)
  }
}

function getRepoUrlList(url: UnCustomTempValue['url']) {
  const { github, gitee } = url
  // 返回一个数组优先使用 gitee，没有则使用 github的镜像地址githubfast.com，最后使用 github
  return [gitee, github?.replace('github.com', 'githubfast.com'), github].filter(Boolean) as string[]
}

export async function dowloadTemplate(data: UnCustomTempValue, name: string, root: string, loading: ReturnType<typeof spinner>) {
  const repoUrlList = getRepoUrlList(data.url)
  try {
    await cloneRepo(repoUrlList, root)
  }
  catch (error) {
    loading.stop(`${bold('模板创建失败！')}`, 2)
    console.log(error)
    process.exit(1)
  }

  replaceProjectName(root, name)
  data.callBack?.(root)
}
