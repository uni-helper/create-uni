import process from 'node:process'
import { bold, lightCyan } from 'kolorist'

/* eslint-disable no-console */
export function printBanner() {
  const text = 'Uni-creator - 快速创建 uni-app 项目'
  let colorText = ''

  const startColor = { r: 0x3B, g: 0xD1, b: 0x91 }
  const endColor = { r: 0x2B, g: 0x4C, b: 0xEE }

  for (let i = 0; i < text.length; i++) {
    const ratio = i / (text.length - 1)
    const red = Math.round(startColor.r + (endColor.r - startColor.r) * ratio)
    const green = Math.round(startColor.g + (endColor.g - startColor.g) * ratio)
    const blue = Math.round(startColor.b + (endColor.b - startColor.b) * ratio)
    colorText += bold(`\x1B[38;2;${red};${green};${blue}m${text[i]}\x1B[0m`)
  }

  const output = process.stdout.isTTY && process.stdout.getColorDepth() > 8
    ? colorText
    : lightCyan(bold(text))

  console.log()
  console.log(output)
  console.log()
}
