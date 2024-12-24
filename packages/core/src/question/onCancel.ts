import process from 'node:process'
import { cancel } from '@clack/prompts'

export const cancelMesssage = '操作已取消'

export function printCancel() {
  cancel(cancelMesssage)
  process.exit(0)
}
