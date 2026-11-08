# @create-uni/shared

`create-uni`、`@create-uni/info`、`@create-uni/mcp` 共用的三个小工具。私有包，没有构建步骤，`main` 指向 `src/index.ts`，以源码形式被其他包引用。唯一依赖是 `kolorist`。

## 内容

| 文件 | 职责 |
| --- | --- |
| `src/generateBanner.ts` | 启动 banner：先打一个空行，再把每个字符按 `#3BD191 → #2B4CEE` 插值上色后返回；终端不支持真彩色则返回 `lightCyan` 的整串 |
| `src/ora.ts` | 手写的 spinner 类（`start` / `succeed` / `fail`），只依赖 `process.stdout` 和 `kolorist`，**不是** npm 上 `ora` 包的封装 |
| `src/canSkipEmptying.ts` | 目标目录可以直写时返回 `true`：不存在、完全为空、或只含一个 `.git` |

## 注意

- 本包没有命令、没有测试，改完由依赖方验证：`pnpm build:core`、`pnpm -C packages/mcp test`。
- `ora.ts` 用 `setInterval` 100ms 刷帧，`start()` 之后必须调 `succeed()` 或 `fail()`，否则定时器不会停、进程也不退出——新增调用点时别忘了收尾。
- `generateBanner` 会先 `console.log()` 一个空行再返回文本，调用方用 `intro()` 或 `console.log()` 打印返回值，换用方式时注意别多空一行。
- 对外只暴露 `index.ts` 里 `export *` 的内容，新增函数要同时从这里导出。
