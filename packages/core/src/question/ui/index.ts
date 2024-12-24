import { select } from '@clack/prompts'
import { UIList } from './ui.data'

export default () => (
  select({
    message: '选择需要的库:',
    options: UIList,
  })
)
