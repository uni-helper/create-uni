import { exec } from 'node:child_process'
import { promises as fs } from 'node:fs'
import { join } from 'node:path'

async function removeGitFolder(localPath: string): Promise<void> {
  const gitFolderPath = join(localPath, '.git')
  await fs.rm(gitFolderPath, { recursive: true, force: true })
}

export function cloneRepo(gitUrl: string, localPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`git clone ${gitUrl} ${localPath}`, async (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        reject(error)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.error(`stderr: ${stderr}`)

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
