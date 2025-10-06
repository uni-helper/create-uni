import process from 'node:process'
import { green, red } from 'kolorist'

class Ora {
  private message: string
  private interval: NodeJS.Timeout | null
  private frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  private cross = '✖'
  private tick = '✔'

  constructor(message: string) {
    this.message = message
    this.interval = null
  }

  private setFinishMessage(newMessage: string): string {
    return newMessage + ' '.repeat(this.message.length - newMessage.length)
  }

  start(): Ora {
    let i = 0
    process.stdout.write('\r' + `${green(this.frames[i % 9])} ${this.message}`)
    this.interval = setInterval(() => {
      process.stdout.write('\r' + `${green(this.frames[i % 9])} ${this.message}`)
      i++
    }, 100)
    return this
  }

  fail(message: string): void {
    if (!this.interval)
      return
    clearInterval(this.interval)
    process.stdout.write('\r' + `${red(this.cross)} ${this.setFinishMessage(message)}\n`)
  }

  succeed(message: string): void {
    if (!this.interval)
      return
    clearInterval(this.interval)
    process.stdout.write('\r' + `${green(this.tick)} ${this.setFinishMessage(message)}\n`)
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
