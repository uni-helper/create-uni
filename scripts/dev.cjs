const { spawn } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

// 启动开发命令
const devProcess = spawn('pnpm', ['dev:mp-weixin'], {
  stdio: 'inherit',
  shell: true,
})

// 检查文件是否存在
function checkFileExists(filePath) {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (error) => {
      resolve(!error)
    })
  })
}

// 等待文件出现
async function waitForFile(filePath) {
  let fileExists = await checkFileExists(filePath)
  while (!fileExists) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    fileExists = await checkFileExists(filePath)
  }
}

// 主逻辑
async function main() {
  const expectedFile = path.join(__dirname, 'dist/dev/mp-weixin/app.js')
  await waitForFile(expectedFile)
  devProcess.kill() // 结束进程
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
