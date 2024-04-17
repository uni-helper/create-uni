import { bold, red } from 'kolorist'
import figures from 'prompts/lib/util/figures.js'

export function onCancel() {
  throw new Error(`${red(figures.cross)} ${bold('操作已取消')}`)
}
