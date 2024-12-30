import process from 'node:process'
import { sync } from 'cross-spawn'
import { pkgFromUserAgent } from './utils'
// Do installation here
// async function runCli(cli: string, argv?: string) {
//   // const pm = getPkgManager()
//   // let fullCustomCommand
//   // // #if DEV
//   // fullCustomCommand = 'pnpm create-uni-info'
//   // // #endif
//   // // #if !DEV
//   // fullCustomCommand = `${pm === 'npm' ? 'npx' : `${pm} dlx`} ${cli}`
//   // // #endif
//   // const [command, ..._args] = fullCustomCommand.split(' ')
//   // console.log(command, [..._args, argv ?? ''])
//   // const { status, error } = sync(command, [..._args, argv ?? ''], {
//   //   stdio: 'inherit',
//   // })
//   // if (error) {
//   //   throw new Error(`Error executing command: ${error.message}`)
//   // }
//   // process.exit(status ?? 0)
// }

export function installAndInvokeCLI(argv?: any) {
  console.log('argv', argv)
  // const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  // const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
  // const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.')
  // #if CREATE_UNI_DEV
  // // @ts-expect-error compile
  // const cliMap = {
  //   ui: '@create-uni/gui',
  //   info: '@create-uni/info',
  // }
  // // #endif

  // // #else
  // // @ts-expect-error compile
  // // eslint-disable-next-line ts/no-redeclare
  // const cliMap = {
  //   ui: '@create-uni/gui',
  //   info: '@create-uni/info',
  // }
  // // #endif

  // if (argv.gui) {
  //   runCli(cliMap.ui)
  // }

  // if (argv.info) {
  //   runCli(cliMap.info, argv.info)
  // }
}
