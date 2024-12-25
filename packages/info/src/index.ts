import { execSync } from 'node:child_process'
import process from 'node:process'
import { log, spinner } from '@clack/prompts'
import envinfo from 'envinfo'
import JSON5 from 'json5'
import { gray, italic, link, magenta, yellow } from 'kolorist'
// import { question } from './question'
import { whichPm } from './utils/whichPm'

const uniDependenciesMap = {
  '@uni-helper/uni-use': ['@vueuse/core'],
  '@uni-helper/axios-adapter': ['axios'],
  '@uni-helper/unocss-preset-uni': ['unocss'],
  '@uni-helper/eslint-config': ['eslint'],
  '@uni-helper/vite-plugin-uni-tailwind': ['tailwindcss'],
} as Record<string, string[]>

function getBaseDependencies(packageInfo: UniPresetEnvInfo['npmPackages']) {
  const baseDependenciesName = ['vue', 'vite', '@dcloudio/uni-app']
  const baseDependencies: Record<string, string> = {}
  for (const name of baseDependenciesName) {
    const version = packageInfo[name]?.installed
    if (version)
      baseDependencies[name] = version
  }
  return baseDependencies
}

function getUniHelperDependencies(packageInfo: UniPresetEnvInfo['npmPackages']) {
  const uniHelperDependencies: Record<string, string> = {}
  for (const name in packageInfo) {
    if (name.includes('@uni-helper'))
      uniHelperDependencies[name] = packageInfo[name].installed
  }
  return uniHelperDependencies
}

async function getErrorDependencies(
  argv: string,
  uniHelperDependencies: Record<string, string>,
) {
  if (!uniHelperDependencies)
    return {}
  let errorDependencies: Record<string, string> = {}

  if (argv === 'all') {
    errorDependencies = uniHelperDependencies
  }
  else {
    const uniHelperDependenciesName = Object.keys(uniHelperDependencies)
    // const { errorIndexList } = await question(uniHelperDependenciesName, '请选择需要反馈的依赖')
    const errorIndexList = {}
    for (const index of errorIndexList) {
      const name = uniHelperDependenciesName[index]
      errorDependencies[name] = uniHelperDependencies[name]
    }
  }
  return errorDependencies
}

function getVSCodeExtensions() {
  try {
    const list = execSync(
      `code --list-extensions --show-versions`,
      {
        encoding: 'utf-8',
        stdio: [0, 'pipe', 'ignore'],
      },
    )
    return list.split(/\r?\n/).filter(line => line.trim() !== '')
  }
  catch {
    return null
  }
}

function getUniHelperExtensions(extensions: string[]) {
  return extensions.filter(item => item.toLocaleLowerCase().includes('uni-helper.') || item.toLocaleLowerCase().includes('mrmaoddxxaa.create-uniapp-view'))
}

function getVolarExtensions(extensions: string[]) {
  return extensions.filter(item => item.toLocaleLowerCase().includes('vue.volar'))
}

function paserExtensionList(list: string[]) {
  return list.map((item) => {
    const [name_, version] = item.split('@')
    const [_, name] = name_.split('.')
    const bugs = `https://github.com/uni-helper/${name}/issues`
    return { name, version, bugs }
  })
}

async function getErrorExtensions(
  argv: string,
  uniHelperExtensions: ReturnType<typeof paserExtensionList>,
) {
  if (!uniHelperExtensions)
    return []

  // const choices = uniHelperExtensions.map(item => item.name)

  let errorExtensions: typeof uniHelperExtensions = []
  if (argv === 'all') {
    errorExtensions = uniHelperExtensions
  }
  else {
    // const { errorIndexList } = await question(choices, '请选择需要反馈的vscode插件')
    const errorIndexList = []
    errorIndexList.forEach((index: number) => {
      errorExtensions.push({
        name: uniHelperExtensions[index].name,
        version: uniHelperExtensions[index].version,
        bugs: uniHelperExtensions[index].bugs,
      })
    })
  }
  return errorExtensions
}

interface UniPresetEnvInfo {
  System: {
    OS: string
  }
  Binaries: {
    Node: {
      version: string
      path: string
    }
  }
  IDEs: {
    VSCode: {
      version: string
      path: string
    }
    WebStorm: {
      version: string
      path: string
    }
  }
  npmPackages: {
    [key: string]: {
      installed: string
      wanted: string
    }
  }
}
export async function getBaseEnvInfo() {
  // const loading = ora('正在获取环境信息...').start()
  const s = spinner()
  s.start('正在获取环境信息...')
  const warmList = ['']

  const _envInfo = JSON5.parse<UniPresetEnvInfo>(await envinfo.run(
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
  ))
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
    log.error(magenta('当前目录未安装uni-app，请在uni-app项目根目录下执行, 以获取依赖信息！！！'))
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

  // loading.succeed('获取环境信息成功')
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
