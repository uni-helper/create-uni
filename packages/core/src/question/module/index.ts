import { multiselect } from '@clack/prompts'
import MODULES from './module.data'

export default () => (
  multiselect({
    message: '选择需要的库:',
    options: MODULES,
    required: false,
  })
)
