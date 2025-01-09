import { select } from '@clack/prompts'
import { UIList } from './ui.data'

export default () => (
  select({
    message: '选择需要的组件库:',
    options: UIList,
  })
)
