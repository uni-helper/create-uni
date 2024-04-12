import process from 'node:process'
import { execSync } from 'node:child_process'
import { getPackageInfo } from 'local-pkg'
import envinfo from 'envinfo'
import { ora } from '../../utils'
import { question } from './question'

async function getuniHelperDependencies() {
  const { packageJson } = (await getPackageInfo('.')) ?? {}
  if (!packageJson) {
    console.error('package.json not found')
    process.exit(0)
  }
  const dependencies = Object.keys({ ...packageJson.dependencies, ...packageJson.devDependencies })
  const uniHelperDependencies = dependencies.filter(item => item.includes('@uni-helper'))
  return uniHelperDependencies
}

async function findDependenciesVersionAndBugs(name: string) {
  const { version, packageJson } = (await getPackageInfo(name))!
  const bugs = typeof packageJson?.bugs === 'string' ? packageJson.bugs : packageJson.bugs?.url
  return { version, bugs }
}

async function getErrorDependencies() {
  const uniHelperDependencies = await getuniHelperDependencies()
  const { errorIndexList } = await question(uniHelperDependencies)

  const errorDependencies = []
  for (const index of errorIndexList) {
    const name = uniHelperDependencies[index]
    const { version, bugs } = await findDependenciesVersionAndBugs(name)
    errorDependencies.push({ name, version, bugs })
  }
  return errorDependencies
}

async function getVSCodeInfo() {
  const vscode = await envinfo.helpers.getVSCodeInfo()
  if (vscode.length !== 3)
    return
  return {
    name: vscode[0],
    version: vscode[1],
    path: vscode[2],
  }
}

function getVSCodeExtensions() {
  const list = execSync('code --list-extensions --show-versions')
  return list.toString().split(/\r?\n/).filter(line => line.trim() !== '')
}

function getUniHelperExtensions(extensions: string[]) {
  return extensions.filter(item => item.includes('uni-helper.') || item.includes('mrmaoddxxaa.create-uniapp-view'))
}

function paserExtensionList(list: string[]) {
  return list.map((item) => {
    const [name_, version] = item.split('@')
    const [_, name] = name_.split('.')
    const bugs = `https://github.com/uni-helper/${name}/issues`
    return { name, version, bugs }
  })
}

async function getErrorExtensions() {
  console.log(111)
  const loading = ora('正在获取插件信息...').start()
  await getVSCodeInfo()
  const extensions = getVSCodeExtensions()
  const uniHelperExtensions = paserExtensionList(getUniHelperExtensions(extensions))
  const choices = uniHelperExtensions.map(item => item.name)
  loading.succeed('获取插件信息成功')

  const { errorIndexList } = await question(choices)

  return errorIndexList.map((index: number) => {
    return {
      name: uniHelperExtensions[index].name,
      version: uniHelperExtensions[index].version,
      bugs: uniHelperExtensions[index].bugs,
    }
  })
}

export async function getUniAppInfo() {
  const errorDependencies = await getErrorDependencies()
  console.log(errorDependencies)
  const errorExtensions = await getErrorExtensions()
  console.log(errorExtensions)
  process.exit(0)
}
