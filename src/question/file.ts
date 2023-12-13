import type { PromptObject } from 'prompts'
import { bold, red } from 'kolorist'
import figures from 'prompts/lib/util/figures.js'
import { canSkipEmptying } from '../utils'

export default (targetDir?: string): PromptObject<string>[] => {
  return [
    {
      name: 'shouldOverwrite',
      type: prevValue => (canSkipEmptying(targetDir ?? prevValue) ? null : 'toggle'),
      message: (prevValue) => {
        const _targetDir = targetDir ?? prevValue
        const dirForPrompt = _targetDir === '.' ? '当前文件' : `目标文件"${_targetDir}"`

        return `${dirForPrompt}不是空的。要删除现有文件并继续吗？`
      },
      initial: false,
      active: '是',
      inactive: '否',
    },
    {
      name: 'overwriteChecker',
      type: (prevValues) => {
        if (prevValues === false)
          throw new Error(`${red(figures.cross)} ${bold('操作已取消')}`)

        return null
      },
    },
  ]
}
