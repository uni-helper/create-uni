import process from 'node:process'
import { green, red } from 'kolorist'
import figures from 'prompts/lib/util/figures.js'

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
export class Ora {
  private message: string
  private interval: NodeJS.Timeout | null

  constructor(message: string) {
    this.message = message
    this.interval = null
  }

  private setFinishMessage(newMessage: string): string {
    return newMessage + ' '.repeat(this.message.length - newMessage.length)
  }

  start(): Ora {
    let i = 0
    process.stdout.write('\r' + `${green(frames[i % 9])} ${this.message}`)
    this.interval = setInterval(() => {
      process.stdout.write('\r' + `${green(frames[i % 9])} ${this.message}`)
      i++
    }, 100)
    return this
  }

  fail(message: string): void {
    if (!this.interval)
      return
    clearInterval(this.interval)
    process.stdout.write('\r' + `${red(figures.cross)} ${this.setFinishMessage(message)}\n`)
  }

  succeed(message: string): void {
    if (!this.interval)
      return
    clearInterval(this.interval)
    process.stdout.write('\r' + `${green(figures.tick)} ${this.setFinishMessage(message)}\n`)
  }

  finish(): void {
    if (!this.interval)
      return
    clearInterval(this.interval)
    process.stdout.write('')
  }
}

export function ora(message: string) {
  return new Ora(message)
}
