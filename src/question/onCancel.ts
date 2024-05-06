import { bold, red } from 'kolorist'
import figures from 'prompts/lib/util/figures.js'

export const cancelMesssage = `${red(figures.cross)} ${bold('操作已取消')}`

export function onCancel() {
  throw new Error(cancelMesssage)
}
