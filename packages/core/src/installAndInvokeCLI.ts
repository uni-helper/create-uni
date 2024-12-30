import process from 'node:process'
import { sync } from 'cross-spawn'
import type { StdioOptions } from 'node:child_process'
import { pkgFromUserAgent } from './utils'
// Do installation here
async function runCli(fullCustomCommand: string, stdio: StdioOptions, argv?: string) {
  const [command, ..._args] = fullCustomCommand.split(' ')
  const { status, error, stdout } = sync(command, [..._args, argv ?? ''], {
    stdio,
  })
  if (error) {
    throw new Error(`Error executing command: ${error.message}`)
  }
  if (stdout.length > 0) {
    console.log(stdout.toString())
  }

  process.exit(status ?? 0)
}

export function installAndInvokeCLI(argv?: any) {
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
  const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.')
  // #if CREATE_UNI_DEV
  // @ts-expect-error compile
  const cliMap = {
    ui: 'pnpm create-uni-gui',
    info: 'pnpm create-uni-info',
  }
  // #endif

  // #if !CREATE_UNI_DEV
  let command = 'npx'
  if (pkgManager === 'pnpm')
    command = 'pnpm dlx'
  if (pkgManager === 'yarn')
    command = 'yarn dlx'
  if (pkgManager === 'bun')
    command = 'bun x'

  // @ts-expect-error compile
  // eslint-disable-next-line ts/no-redeclare
  const cliMap = {
    ui: `${command} @create-uni/gui@latest`.replace('@latest', () => (isYarn1 ? '' : '@latest')),
    info: `${command} @create-uni/info@latest`.replace('@latest', () => (isYarn1 ? '' : '@latest')),
  }
  // #endif

  if (argv.gui) {
    runCli(cliMap.ui, 'pipe')
  }

  if (argv.info) {
    runCli(cliMap.info, 'inherit', argv.info)
  }
}
