import type { PromptObject } from 'prompts'
import { red } from 'kolorist'
import { canSkipEmptying } from '../utils'

export default (): PromptObject<string>[] => {
  let targetDir = 'uni-app'
  return [
    {
      name: 'projectName',
      type: 'text',
      message: '项目名称:',
      initial: targetDir,
      onState: state => (targetDir = String(state.value).trim() || targetDir),
    },
    {
      name: 'shouldOverwrite',
      type: () => (canSkipEmptying(targetDir) ? null : 'confirm'),
      message: () => {
        const dirForPrompt
          = targetDir === '.' ? '当前文件' : `目标文件"${targetDir}"`

        return `${dirForPrompt}不是空的。要删除现有文件并继续吗？`
      },
    },
    {
      name: 'overwriteChecker',
      type: (_prev, values) => {
        if (values.shouldOverwrite === false)
          throw new Error(`${red('✖')} Operation cancelled`)

        return null
      },
    },
  ]
}
