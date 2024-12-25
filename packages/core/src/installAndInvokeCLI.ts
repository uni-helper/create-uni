import { spawn } from 'node:child_process'
import process from 'node:process'
import { outro, type spinner } from '@clack/prompts'
import { getPkgManager } from './utils'
// Do installation here
async function runCli(cli: string, _s: ReturnType<typeof spinner>) {
  const pm = getPkgManager()
  let shellCommand

  if (process.env.NODE_ENV === 'dev') {
    shellCommand = 'node ./../info/dist/outfile.cjs'
  }
  else {
    shellCommand = `${pm === 'npm' ? 'npx' : `${pm} dlx`} ${cli}`
  }
  // exec(shellCommand, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`)
  //     return
  //   }
  //   console.log(stdout)
  // })
  spawn(shellCommand, [], { shell: true }).stdout.on('data', (data) => {
    // s.message(data.toString())
    console.log(data.toString())
  })
}

export function installAndInvokeCLI(argv: any, s: ReturnType<typeof spinner>) {
  const cliMap = {
    ui: '@create-uni/gui',
    info: '@create-uni/info',
  }

  if (argv.gui) {
    s.start('Installing via npm')
    runCli(cliMap.ui, s)
    s.stop('Installed via npm')
  }

  if (argv.info) {
    outro('正在获取环境信息')
    runCli(cliMap.info, s)
  }
  // s.stop('Installed via npm')
}
