import process from 'node:process'
import moduleData from '@/question/module/module.data'
import pluginData from '@/question/plugin/plugin.data'
import { templateList } from '@/question/template/template.data'
import { sync } from 'cross-spawn'
import { composeCommand } from '../composeCommand'

export function actionGuiCLI() {
  // #if CREATE_UNI_DEV
  // @ts-expect-error compile
  const fullCustomCommand = 'pnpm create-uni-gui'
  // #endif

  // #if !CREATE_UNI_DEV
  // @ts-expect-error compile
  // eslint-disable-next-line ts/no-redeclare
  const fullCustomCommand = composeCommand('@create-uni/gui')
  // #endif

  const input = JSON.stringify({
    templateList,
    plugin: pluginData,
    module: moduleData,
  })

  const [command, ..._args] = fullCustomCommand.split(' ')
  const { error, stdout } = sync(command, [..._args], {
    input,
    stdio: 'pipe',
  })

  if (error)
    throw new Error(`Error executing command: ${error.message}`)

  if (stdout.length > 0)
    console.log(stdout.toString())

  process.exit(0)
}
