import type { PromptObject } from 'prompts'
import { red } from 'kolorist'
import { canSkipEmptying } from '../utils'

export default (): PromptObject<string>[] => {
  let targetDir = 'uni-app'
  return [
    {
      name: 'ProjectName',
      type: 'text',
      message: 'Project name:',
      initial: targetDir,
      onState: state => (targetDir = String(state.value).trim() || targetDir),
    },
    {
      name: 'shouldOverwrite',
      type: () => (canSkipEmptying(targetDir) ? null : 'confirm'),
      message: () => {
        const dirForPrompt
          = targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`

        return `${dirForPrompt} is not empty. Remove existing files and continue?`
      },
    },
    {
      name: 'overwriteChecker',
      type: (prev, values) => {
        if (values.shouldOverwrite === false)
          throw new Error(`${red('✖')} Operation cancelled`)

        return null
      },
    },
  ]
}
