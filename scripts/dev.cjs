const { spawn } = require('node:child_process')
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

const workingDirectory = path.join(__dirname, '../../sample-project')
const expectedFile = path.join(workingDirectory, 'dist/dev/mp-weixin/app.js')

log('脚本启动')
log('__dirname:', __dirname)
log('workingDirectory:', workingDirectory)
log('expectedFile:', expectedFile)

// 检查工作目录是否存在
if (!fs.existsSync(workingDirectory)) {
  logError('工作目录不存在，请检查路径:', workingDirectory)
  process.exit(1)
}

// 启动开发命令，改为使用 pipe 来捕获错误输出
log('准备启动命令: pnpm dev mp-weixin')
log('  cwd:', workingDirectory)

const devProcess = spawn('pnpm', ['dev', 'mp-weixin'], {
  stdio: ['inherit', 'inherit', 'pipe'],
  shell: true,
  cwd: workingDirectory,
})

log('spawn 调用完成，子进程 PID:', devProcess.pid)

devProcess.on('spawn', () => {
  log('子进程已成功 spawn, PID:', devProcess.pid)
})

devProcess.on('error', (err) => {
  logError('子进程启动失败:', err)
  process.exit(1)
})

devProcess.on('exit', (code, signal) => {
  log(`子进程退出, code=${code}, signal=${signal}`)
})

devProcess.on('close', (code, signal) => {
  log(`子进程 close 事件, code=${code}, signal=${signal}`)
})

// 捕获错误输出
devProcess.stderr.on('data', (data) => {
  const text = data.toString()
  logError(`stderr 收到数据:\n${text}`)

  const isEsmWarning = text.includes('Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.')
  const isUnhWarning = text.includes('unh')
  const isLegacyWarning = text.includes('legacy-js-api')

  log('stderr 判断 -> isEsmWarning:', isEsmWarning, ', isUnhWarning:', isUnhWarning, ', isLegacyWarning:', isLegacyWarning)

  if (!isEsmWarning && !isUnhWarning && !isLegacyWarning) {
    logError('stderr 命中 kill 条件，准备杀掉子进程并退出')
    devProcess.kill()
    process.exit(1)
  }
  else {
    log('stderr 为可忽略的告警，继续等待')
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

// 等待文件出现
async function waitForFile(filePath) {
  log('开始等待文件出现:', filePath)
  let fileExists = await checkFileExists(filePath)
  let retry = 0
  while (!fileExists) {
    retry += 1
    log(`第 ${retry} 次重试，文件仍未出现，3 秒后再检查...`)
    await new Promise(resolve => setTimeout(resolve, 3000))
    fileExists = await checkFileExists(filePath)
  }
  log('目标文件已出现，等待结束:', filePath)
}

// 主逻辑
async function main() {
  log('main() 开始执行')
  await waitForFile(expectedFile)
  log('准备杀掉 dev 子进程, PID:', devProcess.pid)
  devProcess.kill() // 结束进程
  log('子进程已发送 kill 信号，脚本正常退出')
  process.exit(0)
}

main().catch((err) => {
  logError('main() 执行出错:', err)
  process.exit(1)
})
