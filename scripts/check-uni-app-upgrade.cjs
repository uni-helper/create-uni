/**
 * 检测 packages/core/template/base/package.json 中的 @dcloudio/uni-app
 * 相比 HEAD（main）是否发生了版本变化。
 *
 * 背景：`pnpm run up` 会先跑 taze（顺带把 vue / vite / sass 等无关依赖一起升级），
 * 再跑 uvm 升级 @dcloudio/*。所以 diff 里几乎总有噪音，只有 uni-app 本身
 * 升级时才应该创建 PR。供 .github/workflows/uni-app_update.yml 调用。
 *
 * 结果写入 $GITHUB_OUTPUT 的 changed=true / changed=false。
 * 只依赖 Node 内置模块，CI 中无需 pnpm install 即可运行。
 */
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const REPO_ROOT = path.join(__dirname, '..')
const FILE = 'packages/core/template/base/package.json'
const DEP = '@dcloudio/uni-app'

/** 从 package.json 文本中取出目标依赖的版本号，不存在时返回 null */
function readVersion(source) {
  const pkg = JSON.parse(source)
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }
  return DEP in deps ? deps[DEP] : null
}

/** 读取 HEAD 中的版本号，即本次更新前的版本 */
function versionAtHead() {
  try {
    const source = execFileSync('git', ['show', `HEAD:${FILE}`], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    })
    return readVersion(source)
  }
  catch {
    return null
  }
}

/** 读取工作区中的版本号，即 pnpm run up 之后的版本 */
function versionInWorktree() {
  return readVersion(fs.readFileSync(path.join(REPO_ROOT, FILE), 'utf8'))
}

const before = versionAtHead()
const after = versionInWorktree()
const changed = before !== after

console.log(`${DEP}: ${before ?? '(无)'} -> ${after ?? '(无)'}`)
console.log(changed ? '检测到升级，继续创建 PR' : '未检测到升级，跳过 PR')

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`)
}

// 在 Actions 的任务摘要里留一份记录，方便回看每次定时任务的结果
if (process.env.GITHUB_STEP_SUMMARY) {
  const summary = [
    `### ${DEP} 版本检测`,
    '',
    `\`${FILE}\``,
    '',
    '| | 版本 |',
    '| --- | --- |',
    `| main | \`${before ?? '(无)'}\` |`,
    `| 更新后 | \`${after ?? '(无)'}\` |`,
    '',
    changed ? '检测到升级，继续创建 PR。' : '未检测到升级，跳过 PR。',
    '',
  ].join('\n')
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary)
}
