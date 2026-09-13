import type { SelectOptions } from '@clack/prompts'
import { select } from '@clack/prompts'
import { CSS } from '@create-uni/config'

export default () => (
  select({
    message: '选择原子化 CSS 方案:',
    options: CSS as unknown as SelectOptions<string>['options'],
  })
)
