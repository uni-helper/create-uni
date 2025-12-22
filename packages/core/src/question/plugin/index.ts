import type { MultiSelectOptions } from '@clack/prompts'
import { multiselect } from '@clack/prompts'
import { PLUGINS } from '@create-uni/config'

export default () => (
  multiselect({
    message: '选择需要的vite插件:',
    options: PLUGINS as unknown as MultiSelectOptions<string>['options'],
    required: false,
  })
)
