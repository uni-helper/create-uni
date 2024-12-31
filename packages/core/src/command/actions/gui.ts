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

  const [command, ..._args] = fullCustomCommand.split(' ')
  const { error, stdout } = sync(command, [..._args], {
    stdio: 'pipe',
  })

  if (error)
    throw new Error(`Error executing command: ${error.message}`)

  if (stdout.length > 0)
    console.log(stdout.toString())
}
