const { spawn, spawnSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

// 统一日志函数，带时间戳
function log(...args) {
  console.log(`[${new Date().toISOString()}]`, ...args)
}
function logError(...args) {
  console.error(`[${new Date().toISOString()}]`, ...args)
}

// ---- 可调参数（均可通过环境变量覆盖，便于在 CI 中调整） ----
const POLL_INTERVAL_MS = Number(process.env.DEV_POLL_INTERVAL_MS ?? 3000)
// 整体超时：dev 是 watch 模式，构建失败后进程不会退出，
// 因此必须有上限，否则会一直等到 GitHub Actions 的 6 小时上限。
const TIMEOUT_MS = Number(process.env.DEV_WAIT_TIMEOUT_MS ?? 5 * 60 * 1000)
const MAX_RETRIES = Math.max(1, Math.ceil(TIMEOUT_MS / POLL_INTERVAL_MS))
// 每隔多少次重试打印一条进度日志，避免日志被刷爆
const LOG_EVERY = 10

// dev 构建失败的致命特征（unh 会吞掉子进程退出码，只能靠输出判断）
const FATAL_PATTERNS = [
  /Build failed with errors/i,
  /\[vite\]:\s*Rollup failed to resolve import/i,
  /Could not resolve ["']/i,
  /ERROR:\s*Build failed/i,
  /ERR_PNPM_/i,
  /ELIFECYCLE/,
]

const isWindows = process.platform === 'win32'

const workingDirectory = path.join(__dirname, '../../sample-project')
const expectedFile = path.join(workingDirectory, 'dist/dev/mp-weixin/app.js')

log('脚本启动')
log('__dirname:', __dirname)
log('workingDirectory:', workingDirectory)
log('expectedFile:', expectedFile)
log('超时时间(ms):', TIMEOUT_MS, '轮询间隔(ms):', POLL_INTERVAL_MS, '最大重试次数:', MAX_RETRIES)

// 检查工作目录是否存在
if (!fs.existsSync(workingDirectory)) {
  logError('工作目录不存在，请检查路径:', workingDirectory)
  process.exit(1)
}

// ---- 子进程管理 ----
let childExited = false
let childExitInfo = null
let fatalError = null
let settled = false

log('准备启动命令: pnpm dev mp-weixin')
log('  cwd:', workingDirectory)

// 使用 shell 以便在 Windows 上解析 pnpm 包装脚本；
// 命令整体作为字符串传入，避免 DEP0190（参数未转义）告警。
// detached + 进程组，方便在结束时连带杀掉 vite 等子孙进程。
const devProcess = spawn('pnpm dev mp-weixin', {
  stdio: ['inherit', 'inherit', 'pipe'],
  shell: true,
  cwd: workingDirectory,
  detached: !isWindows,
  env: { ...process.env, FORCE_COLOR: '1' },
})

log('spawn 调用完成，子进程 PID:', devProcess.pid)

/** 结束整棵进程树，避免残留 vite/watch 进程导致 step 不返回 */
function killTree(reason) {
  if (childExited) {
    log('子进程已退出，无需 kill:', reason)
    return
  }
  log('准备杀掉 dev 子进程树, PID:', devProcess.pid, '原因:', reason)
  if (isWindows) {
    spawnSync('taskkill', ['/pid', String(devProcess.pid), '/T', '/F'], { stdio: 'ignore' })
  }
  else {
    try {
      process.kill(-devProcess.pid, 'SIGTERM')
    }
    catch {
      devProcess.kill('SIGTERM')
    }
  }
}

/** 统一收尾：保证进程以确定的状态码退出一次 */
function finish(code, reason) {
  if (settled)
    return
  settled = true
  log(`脚本结束: code=${code}, 原因: ${reason}`)
  killTree(reason)
  // 留一点时间让子进程真正退出
  setTimeout(() => process.exit(code), 500)
}

devProcess.on('spawn', () => {
  log('子进程已成功 spawn, PID:', devProcess.pid)
})

devProcess.on('error', (err) => {
  logError('子进程启动失败:', err)
  settled = true
  process.exit(1)
})

devProcess.on('exit', (code, signal) => {
  childExited = true
  childExitInfo = { code, signal }
  log(`子进程退出, code=${code}, signal=${signal}`)
})

devProcess.on('close', (code, signal) => {
  childExited = true
  childExitInfo = { code, signal }
  log(`子进程 close 事件, code=${code}, signal=${signal}`)
})

// 捕获错误输出：记录，并识别致命构建错误
devProcess.stderr.on('data', (data) => {
  const text = data.toString()
  logError(`stderr 收到数据:\n${text}`)

  // 去掉 ANSI 转义，避免颜色码干扰匹配。
  // 用 String.fromCharCode(27) 构造，避免在源码里出现控制字符字面量。
  const ansiPattern = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g')
  const plain = text.replace(ansiPattern, '')
  const matched = FATAL_PATTERNS.find(re => re.test(plain))
  if (matched && !fatalError) {
    fatalError = plain.trim()
    logError('stderr 命中致命错误规则:', matched, '-> 记录并在下一轮检查后退出')
  }
})

// 检查文件是否存在
function checkFileExists(filePath) {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (error) => {
      const exists = !error
      log(`检查文件是否存在: ${filePath} -> ${exists}${error ? ` (${error.code})` : ''}`)
      resolve(exists)
    })
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 等待文件出现；超时 / 子进程退出 / 致命错误 都会终止等待
async function waitForFile(filePath) {
  log('开始等待文件出现:', filePath)
  const startedAt = Date.now()

  for (let retry = 0; retry <= MAX_RETRIES; retry += 1) {
    if (await checkFileExists(filePath)) {
      log('目标文件已出现，等待结束:', filePath)
      return
    }

    // 文件还没出现，先判断是否已经确定失败
    if (fatalError) {
      throw new Error(`dev 构建出现致命错误，不再继续等待:\n${fatalError}`)
    }
    if (childExited) {
      throw new Error(
        `dev 子进程在目标文件生成前退出 (code=${childExitInfo?.code}, signal=${childExitInfo?.signal})`,
      )
    }
    if (Date.now() - startedAt >= TIMEOUT_MS) {
      throw new Error(
        `等待 ${filePath} 超时（已等待 ${Math.round((Date.now() - startedAt) / 1000)}s，上限 ${TIMEOUT_MS / 1000}s）`,
      )
    }
    if (retry === MAX_RETRIES) {
      throw new Error(`达到最大重试次数 ${MAX_RETRIES}，目标文件仍未出现: ${filePath}`)
    }

    if (retry < 3 || retry % LOG_EVERY === 0) {
      log(`第 ${retry + 1} 次重试，文件仍未出现，${POLL_INTERVAL_MS / 1000} 秒后再检查...`)
    }
    await sleep(POLL_INTERVAL_MS)
  }
}

// 主逻辑
async function main() {
  log('main() 开始执行')
  try {
    await waitForFile(expectedFile)
  }
  catch (err) {
    logError('等待目标文件失败:', err.message)
    finish(1, 'dev 构建失败或超时')
    return
  }
  finish(0, '目标文件已生成')
}

main().catch((err) => {
  logError('main() 执行出错:', err)
  finish(1, 'main() 抛出未捕获异常')
})
