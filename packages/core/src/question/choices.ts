import { confirm } from '@clack/prompts'

export function needsTypeScript() {
  return confirm({
    message: '是否使用 TypeScript 语法?',
    active: '是',
    inactive: '否',
    initialValue: false,
  })
}

export function needsEslint() {
  return confirm({
    message: '是否使用 ESLint?',
    active: '是',
    inactive: '否',
    initialValue: true,
  })
}
