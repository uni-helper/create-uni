import { spawnSync } from 'node:child_process'
import process from 'node:process'
import { getPkgManager } from './utils'
// Do installation here
async function runCli(cli: string, argv?: string) {
  const pm = getPkgManager()
  let fullCustomCommand
  // #if DEV
  fullCustomCommand = 'pnpm create-uni-info'
  // #endif
  // #if !DEV
  fullCustomCommand = `${pm === 'npm' ? 'npx' : `${pm} dlx`} ${cli}`
  // #endif
  const [command, ..._args] = fullCustomCommand.split(' ')
  const { status, error } = spawnSync(command, [..._args, argv ?? ''], {
    stdio: 'inherit',
  })
  if (error) {
    throw new Error(`Error executing command: ${error.message}`)
  }
  process.exit(status ?? 0)
}

export function installAndInvokeCLI(argv: any) {
  const cliMap = {
    ui: '@create-uni/gui',
    info: '@create-uni/info',
  }

  if (argv.gui) {
    runCli(cliMap.ui)
  }

  if (argv.info) {
    runCli(cliMap.info, argv.info)
  }
}
