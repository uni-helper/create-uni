import { execSync } from 'node:child_process'
import type { spinner } from '@clack/prompts'
import { whichPm } from './utils'

// Do installation here
async function runCli(cli: string) {
  const pm = (await whichPm())!.name
  const shellCommand = `${pm === 'npm' ? 'npx' : `${pm} dlx`} ${cli}`
  console.log(shellCommand)
  execSync(shellCommand)
}

export function installAndInvokeCLI(argv: any, s: ReturnType<typeof spinner>) {
  const cliMap = {
    ui: '@create-uni/gui',
    info: '@create-uni/info',
  }

  if (argv.gui) {
    s.start('Installing via npm')
    runCli(cliMap.ui)
    s.stop('Installed via npm')
  }

  if (argv.info) {
    runCli(cliMap.info)
  }
  // s.stop('Installed via npm')
}
