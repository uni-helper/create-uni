import type { PromptObject } from 'prompts'

export default (): PromptObject<string>[] => {
  return [
    {
      name: 'needsTypeScript',
      type: 'toggle',
      message: 'Add TypeScript?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'needsJsx',
      type: 'toggle',
      message: 'Add JSX Support?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'needsPinia',
      type: 'toggle',
      message: 'Add Pinia for state management?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'needsVitest',
      type: 'toggle',
      message: 'Add Vitest for Unit Testing?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'needsEslint',
      type: 'toggle',
      message: 'Add ESLint for code quality?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
  ]
}
