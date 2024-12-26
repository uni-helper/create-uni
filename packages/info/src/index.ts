import process from 'node:process'
import { intro, log, spinner } from '@clack/prompts'
import { generateBanner } from '@create-uni/shared'
import envinfo from 'envinfo'
import { gray, italic, link, red, yellow } from 'kolorist'
import { uniDependenciesMap } from './constants'
import { getBaseDependencies, getErrorDependencies, getUniHelperDependencies } from './utils/dependencies'
import { getErrorExtensions, getUniHelperExtensions, getVolarExtensions, getVSCodeExtensions, paserExtensionList } from './utils/extensions'
import { whichPm } from './utils/whichPm'
import type { UniPresetEnvInfo } from './types'

export async function getBaseEnvInfo() {
  const s = spinner()
  s.start('正在获取环境信息...')
  const warmList = ['']

  const _envInfo = JSON.parse(await envinfo.run(
    {
      npmPackages: '**',
      System: ['OS'],
      Binaries: ['Node'],
      IDEs: ['VSCode'],
    },
    {
      json: true,
      showNotFound: true,
    },
  )) as UniPresetEnvInfo
  const os = _envInfo.System.OS
  const node = _envInfo.Binaries.Node.version
  const vscode = _envInfo.IDEs.VSCode?.version || null
  const packageInfo = _envInfo.npmPackages

  // 获取npm包信息
  let uniHelperDependencies
  let baseDependencies
  if (packageInfo && Object.keys(packageInfo).includes('@dcloudio/uni-app')) {
    uniHelperDependencies = getUniHelperDependencies(packageInfo)
    baseDependencies = getBaseDependencies(packageInfo)
  }
  else {
    s.stop(red('当前目录未安装uni-app，请在uni-app项目根目录下执行, 以获取依赖信息！！！'), 1)
  }

  // 获取vscode扩展信息
  let uniHelperExtensions
  let volarExtensions
  const extensions = getVSCodeExtensions()
  if (vscode && extensions) {
    uniHelperExtensions = paserExtensionList(getUniHelperExtensions(extensions))
    volarExtensions = paserExtensionList(getVolarExtensions(extensions))[0] || null
  }
  else {
    log.warn(yellow('未找到vscode, 无法获取插件信息, 请自行补充vscode插件信息'))
  }

  const pm = await whichPm()

  // s.stop('获取环境信息成功', 2)
  console.log(warmList.join('\n'))
  return {
    os,
    node,
    vscode,
    uniHelperExtensions,
    baseDependencies,
    volarExtensions,
    packageInfo,
    uniHelperDependencies,
    packageManager: pm?.name,
  }
}

export async function getUniAppInfo(argv: string) {
  intro(generateBanner('@uni-create/info - 快速检测 uni-app 环境信息'))
  // 获取环境信息
  const baseEnvInfo = await getBaseEnvInfo()
  const errorDependencies = await getErrorDependencies(argv, baseEnvInfo.uniHelperDependencies!)
  const errorExtensions = await getErrorExtensions(argv, baseEnvInfo.uniHelperExtensions!)

  const splitter = '----------------------------------------------'
  console.log()
  console.log(splitter)
  console.log()

  // 输出系统环境信息
  const systemEnvInfo = {
    os: baseEnvInfo.os,
    node: baseEnvInfo.node,
    packageManager: baseEnvInfo.packageManager,
    vscode: baseEnvInfo?.vscode,
    volar: baseEnvInfo?.volarExtensions?.version,
  }
  let baseEnvInfoStr = ''
  for (const [key, value] of Object.entries(systemEnvInfo)) {
    if (value)
      baseEnvInfoStr += `  - ${key}: \`${value}\`\n`
  }
  console.log(italic('基础环境信息:'))
  console.log(baseEnvInfoStr)

  // 输出基础依赖信息
  const baseDependenciesLength = Object.keys(baseEnvInfo?.baseDependencies || {}).length
  if (baseDependenciesLength > 0) {
    let baseDependenciesStr = ''
    for (const [name, version] of Object.entries(baseEnvInfo.baseDependencies!))
      baseDependenciesStr += `  - ${name}: \`${version}\`\n`

    console.log(italic('基础依赖信息:'))
    console.log(baseDependenciesStr)
  }

  // 输出uni-helper依赖信息
  const uniHelperDependenciesLength = Object.keys(baseEnvInfo?.uniHelperDependencies || {}).length
  if (uniHelperDependenciesLength > 0) {
    let errorDependenciesStr = ''
    for (const [key, value] of Object.entries(errorDependencies)) {
      errorDependenciesStr += `  - ${key}: \`${value}\`\n`
      if (uniDependenciesMap[key]) {
        for (const uniDependency of uniDependenciesMap[key])
          errorDependenciesStr += `    - ${uniDependency}: \`${baseEnvInfo.packageInfo![uniDependency].installed}\`\n`
      }
    }

    console.log(italic('uni-helper依赖信息:'))
    console.log(errorDependenciesStr)
  }

  // 输出uni-helper插件信息
  if (errorExtensions.length > 0) {
    let errorExtensionsStr = ''
    for (const { name, version, bugs } of errorExtensions)
      errorExtensionsStr += `  - ${link(name, bugs)}: \`${version}\`\n`

    console.log(italic('uni-helper插件信息:'))
    console.log(errorExtensionsStr)
  }

  console.log(splitter)
  console.log()
  console.log(
    `${[
      gray(italic('🎯 感谢使用uni-helper，请提供虚线内的信息以便我们排查问题')),
      gray(italic('   若还需提供其他信息，请自行修改补充')),
      '',
      '👉 uni-helper 官网: https://uni-helper.js.org/',
      '👉 改进建议: https://github.com/uni-helper/create-uni/issues/new/choose',
    ].join('\n')}\n`,
  )

  process.exit(0)
}

getUniAppInfo('xx')
