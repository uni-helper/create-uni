const { execSync } = require('node:child_process')
const consola = require('consola')

try {
  execSync('pnpm link ./packages/core')
  execSync('pnpm link ./packages/info')
  execSync('pnpm link ./packages/gui')
  consola.success('Linked packages')
}
catch (error) {
  consola.error(error)
}
