import { exec } from 'node:child_process'
import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import type { BaseTemplateList } from '../question/template/type'

async function removeGitFolder(localPath: string): Promise<void> {
  const gitFolderPath = join(localPath, '.git')
  await fs.rm(gitFolderPath, { recursive: true, force: true })
}

export function cloneRepo(gitUrl: string, localPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`git clone ${gitUrl} ${localPath}`, async (error) => {
      if (error) {
        console.error(`exec error: ${error}`)
        reject(error)
        return
      }

      try {
        await removeGitFolder(localPath)
        resolve()
      }
      catch (error) {
        console.error('Failed to remove .git folder: ', error)
        reject(error)
      }
    })
  })
}

export function getRepoUrl(url: BaseTemplateList['value']['url']): string {
  const { github, gitee } = url
  // 优先使用 gitee，没有则使用 github的镜像地址githubfast.com
  return gitee! ?? github?.replace('github.com', 'githubfast.com')
}
