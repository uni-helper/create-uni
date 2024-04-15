import process from 'node:process'
import { execSync } from 'node:child_process'
import { getPackageInfo, isPackageExists } from 'local-pkg'
import envinfo from 'envinfo'
import { gray, italic, link, yellow } from 'kolorist'
import { ora } from '../../utils'
import { question } from './question'

const uniDependenciesMap = {
  '@uni-helper/uni-use': ['@vueuse/core'],
  '@uni-helper/axios-adapter': ['axios'],
  '@uni-helper/unocss-preset-uni': ['unocss'],
  '@uni-helper/eslint-config': ['eslint'],
  '@uni-helper/vite-plugin-uni-tailwind': ['tailwindcss'],
} as Record<string, string[]>

async function getuniHelperDependencies() {
  const isUniPkg = isPackageExists('@dcloudio/uni-app')
  if (!isUniPkg) {
    console.log(yellow('当前目录未安装uni-app，无法获取依赖信息'))
    console.log('')
    return []
  }

  const { packageJson } = (await getPackageInfo('.'))!
  const dependencies = Object.keys({ ...packageJson.dependencies, ...packageJson.devDependencies })
  const uniHelperDependencies = dependencies.filter(item => item.includes('@uni-helper'))
  return uniHelperDependencies
}

async function getDependenciesVersionAndBugs(name: string) {
  const { version, packageJson } = (await getPackageInfo(name))!
  const bugs = typeof packageJson?.bugs === 'string' ? packageJson.bugs : packageJson.bugs?.url
  return { version, bugs }
}

async function getBaseDependencies() {
  const baseDependenciesName = ['vue', 'vite', '@dcloudio/uni-app']
  const baseDependencies = []
  for (const name of baseDependenciesName) {
    const packageInfo = await getPackageInfo(name)
    if (packageInfo?.version) {
      baseDependencies.push({
        name,
        version: packageInfo.version,
      })
    }
  }

  return baseDependencies
}

async function getErrorDependencies(argv: string) {
  const uniHelperDependencies = await getuniHelperDependencies()
  if (uniHelperDependencies.length === 0)
    return []
  const errorDependencies = []

  if (argv === 'all') {
    uniHelperDependencies.forEach(async (name) => {
      const { version, bugs } = await getDependenciesVersionAndBugs(name)
      errorDependencies.push({ name, version, bugs })
    })
  }
  else {
    const { errorIndexList } = await question(uniHelperDependencies, '请选择需要反馈的依赖')
    for (const index of errorIndexList) {
      const name = uniHelperDependencies[index]
      const { version, bugs } = await getDependenciesVersionAndBugs(name)
      errorDependencies.push({ name, version, bugs })
    }
  }
  return errorDependencies
}

async function getVSCodeInfo() {
  const vscode = await envinfo.helpers.getVSCodeInfo()
  if (vscode.length !== 3)
    return null
  return {
    name: vscode[0],
    version: vscode[1],
    path: vscode[2],
  }
}

function getVSCodeExtensions(path: string) {
  let list
  try {
    list = execSync(`code --list-extensions --show-versions`)
  }
  catch (error) {
    list = execSync(`${path} --list-extensions --show-versions`)
  }
  return list.toString().split(/\r?\n/).filter(line => line.trim() !== '')
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

async function getErrorExtensions(argv: string) {
  const loading = ora('正在获取插件信息...').start()
  const vscodeInfo = await getVSCodeInfo()
  if (!vscodeInfo) {
    loading.fail('未找到vscode, 无法获取插件信息')
    console.log('')
    return { errorExtensions: [], volarExtensions: [] }
  }

  const extensions = getVSCodeExtensions(vscodeInfo!.path)
  const uniHelperExtensions = paserExtensionList(getUniHelperExtensions(extensions))
  const volarExtensions = paserExtensionList(getVolarExtensions(extensions))
  const choices = uniHelperExtensions.map(item => item.name)
  argv === 'all' ? loading.succeed('获取插件信息成功') : loading.finish()
  if (uniHelperExtensions.length === 0)
    return { errorExtensions: [], volarExtensions }

  let errorExtensions: typeof uniHelperExtensions = []
  if (argv === 'all') {
    errorExtensions = uniHelperExtensions
  }
  else {
    const { errorIndexList } = await question(choices, '请选择需要反馈的vscode插件')
    errorIndexList.forEach((index: number) => {
      errorExtensions.push({
        name: uniHelperExtensions[index].name,
        version: uniHelperExtensions[index].version,
        bugs: uniHelperExtensions[index].bugs,
      })
    })
  }
  return {
    errorExtensions,
    volarExtensions,
  }
}

export async function getBaseEnvInfo() {
  const os = (await envinfo.helpers.getOSInfo())?.[1]
  const vscode = (await getVSCodeInfo())?.version
  const node = (await envinfo.helpers.getNodeInfo())?.[1]
  return {
    os,
    node,
    vscode,
  }
}

export async function getUniAppInfo(argv: string) {
  const errorDependencies = await getErrorDependencies(argv)
  const { errorExtensions, volarExtensions } = await getErrorExtensions(argv)
  const baseEnvInfo = await getBaseEnvInfo()
  const baseDependencies = await getBaseDependencies()
  const splitter = '----------------------------------------------'
  let baseEnvInfoStr = ''
  for (const [key, value] of Object.entries(baseEnvInfo))
    baseEnvInfoStr += `  - ${key}: \`${value}\`\n`
  for (const { name, version } of volarExtensions)
    baseEnvInfoStr += `  - ${name}: \`${version}\`\n`

  let baseDependenciesStr = ''
  for (const { name, version } of baseDependencies)
    baseDependenciesStr += `  - ${name}: \`${version}\`\n`

  let errorDependenciesStr = ''
  for (const { name, version, bugs } of errorDependencies) {
    errorDependenciesStr += `  - ${link(name, bugs!)}: \`${version}\`\n`
    if (uniDependenciesMap[name]) {
      for (const uniDependency of uniDependenciesMap[name]) {
        const { version } = await getDependenciesVersionAndBugs(uniDependency)
        errorDependenciesStr += `    - ${uniDependency}: \`${version}\`\n`
      }
    }
  }

  let errorExtensionsStr = ''
  for (const { name, version, bugs } of errorExtensions)
    errorExtensionsStr += `  - ${link(name, bugs)}: \`${version}\`\n`

  console.log()
  console.log(splitter)
  console.log()
  console.log(italic('基础环境信息:'))
  console.table(baseEnvInfoStr)

  if (baseDependencies.length > 0) {
    console.log(italic('基础依赖信息:'))
    console.log(baseDependenciesStr)
  }

  if (errorDependencies.length > 0) {
    console.log(italic('uni-helper依赖信息:'))
    console.log(errorDependenciesStr)
  }

  if (errorExtensions.length > 0) {
    console.log(italic('uni-helper插件信息:'))
    console.log(errorExtensionsStr)
  }

  console.log(splitter)

  console.log(
    `${[
      gray(italic('感谢使用uni-helper，请提供以上信息以便我们排查问题。')),
      '',
      '👉 uni-helper 官网: https://uni-helper.js.org/',
      '👉 改进建议: https://github.com/uni-helper/create-uni/issues/new/choose',
    ].join('\n')}\n`,
  )

  process.exit(0)
}
