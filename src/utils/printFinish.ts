/* eslint-disable no-console */
import { relative } from 'node:path'
import { bold, green } from 'kolorist'
import { getCommand } from './getCommand'

export function printFinish(
  root: string,
  cwd: string,
  packageManager: 'pnpm' | 'npm' | 'yarn',
  type: 'repo' | 'local' = 'local',
) {
  type === 'local' && console.log(bold('✔ 模板创建成功！'))
  console.log()
  if (root !== cwd) {
    const cdProjectName = relative(cwd, root)
    console.log(
    `  ${bold(green(`cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`))}`,
    )
  }
  console.log(`  ${bold(green(getCommand(packageManager, 'install')))}`)
  console.log(`  ${bold(green(getCommand(packageManager, 'dev')))}`)
}
