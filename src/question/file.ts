import type { PromptObject } from 'prompts'
import { bold, red } from 'kolorist'
import figures from 'prompts/lib/util/figures.js'
import { canSkipEmptying } from '../utils'

export default (targetDir: string): PromptObject<string>[] => {
  return [
    {
      name: 'shouldOverwrite',
      type: () => (canSkipEmptying(targetDir) ? null : 'toggle'),
      message: () => {
        const dirForPrompt
          = targetDir === '.' ? '当前文件' : `目标文件"${targetDir}"`

        return `${dirForPrompt}不是空的。要删除现有文件并继续吗？`
      },
      initial: false,
      active: '是',
      inactive: '否',
    },
    {
      name: 'overwriteChecker',
      type: (_prev, values) => {
        if (values.shouldOverwrite === false)
          throw new Error(`${red(figures.cross)} ${bold('操作已取消')}`)

        return null
      },
    },
  ]
}
