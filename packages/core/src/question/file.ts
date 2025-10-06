import { confirm, isCancel } from '@clack/prompts'
import { canSkipEmptying } from '@create-uni/shared'
import { printCancel } from './onCancel'

export default async (targetDir: string): Promise<boolean | undefined> => {
  if (canSkipEmptying(targetDir))
    return true
  const message = `${targetDir === '.' ? '当前文件' : `目标文件"${targetDir}"`}非空，是否覆盖？`
  const shouldOverwrite = await confirm({
    message,
    active: '是',
    inactive: '否',
  })
  if (shouldOverwrite === false || isCancel(shouldOverwrite)) {
    printCancel()
  }
  else {
    return shouldOverwrite
  }
}
