import type { MultiSelectOptions } from '@clack/prompts'
import { multiselect } from '@clack/prompts'
import { MODULES } from '@create-uni/config'

export default () => (
  multiselect({
    message: '选择需要的库:',
    options: MODULES as unknown as MultiSelectOptions<string>['options'],
    required: false,
  })
)
