import type { StdioOptions } from 'node:child_process'
import { sync } from 'cross-spawn'

export function runCommand(
  fullCustomCommand: string,
  stdio: StdioOptions,
  argv?: any,
) {
  const [command, ..._args] = fullCustomCommand.split(' ')
  const { error, stdout } = sync(command, [..._args, argv ?? ''], {
    stdio,
  })
  if (error) {
    throw new Error(`Error executing command: ${error.message}`)
  }
  if (stdout.length > 0) {
    console.log(stdout.toString())
  }
}
