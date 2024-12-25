import { multiselect } from '@clack/prompts'
import PLUGINS from './plugin.data'

export default () => (
  multiselect({
    message: '选择需要的vite插件:',
    options: PLUGINS,
    required: false,
  })
)
