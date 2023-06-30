export function showLoading(message: string) {
  let i = 0
  const interval = setInterval(() => {
    process.stdout.write('\r' + `${message} ${'|/-\\'[i % 4]}`)
    i++
  }, 100)
  return interval
}
