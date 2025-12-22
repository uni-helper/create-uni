import type { SelectOptions } from '@clack/prompts'
import { select } from '@clack/prompts'
import { UI } from '@create-uni/config'

export default () => (
  select({
    message: '选择需要的组件库:',
    options: UI as unknown as SelectOptions<string>['options'],
  })
)
