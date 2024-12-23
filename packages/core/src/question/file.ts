import process from 'node:process'
import { canSkipEmptying } from '@/utils'
import type { PromptObject } from 'prompts'
import { cancelMesssage } from './onCancel'

export default (targetDir?: string): PromptObject<string>[] => {
  return [
    {
      name: 'shouldOverwrite',
      type: prevValue => (canSkipEmptying(targetDir ?? prevValue) ? null : 'toggle'),
      message: (prevValue) => {
        const _targetDir = targetDir ?? prevValue
        const dirForPrompt = _targetDir === '.' ? '当前文件' : `目标文件"${_targetDir}"`

        return `${dirForPrompt}非空，是否覆盖？`
      },
      initial: false,
      active: '是',
      inactive: '否',
    },
    {
      name: 'overwriteChecker',
      type: (prevValues) => {
        if (prevValues === false) {
          console.log(cancelMesssage)
          process.exit(1)
        }

        return null
      },
    },
  ]
}
