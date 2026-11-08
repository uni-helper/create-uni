# @create-uni/mcp

给 AI 助手用的 MCP 服务，把 `create-uni` 的创建能力包成两个工具：`create-with-template`（走预设模板）和 `create-custom`（自由选插件/模块/UI/CSS）。基于 `@modelcontextprotocol/sdk`，stdio 传输。

## 命令

```bash
pnpm -C packages/mcp build   # tsup → dist/outfile.cjs
pnpm -C packages/mcp dev     # tsup --watch
pnpm -C packages/mcp test    # vitest，与 npm test 一致
pnpm -C packages/mcp inspect # mcp-inspector，手动点工具用
pnpm build:mcp               # 根目录的等价构建写法
```

## 结构

| 文件 | 职责 |
| --- | --- |
| `src/index.ts` | `McpServer` 装配 + `registerTool` 两个工具 + `StdioServerTransport`；文件末尾直接 connect |
| `src/schemas.ts` | Zod schema。枚举值全部由 `getConfigValuesAsEnum` / `getTemplateValuesAsEnum` 从 `@create-uni/config` 现算，`.describe()` 里塞的是拼好的提示词 |
| `src/handlers.ts` | 把入参拼成 CLI 参数数组，`sync('npx', ['create-uni@latest', ...args])` 真的去跑命令 |
| `src/utils.ts` | `promptBuilder` / `templatePromptBuilder` 把选项数据拼成给模型看的枚举说明，`flattenTemplateList` 展开分组模板 |

## 注意

- **不自己实现创建逻辑**：所有创建都转成 `npx create-uni@latest ...` 子进程，所以参数拼错就是 CLI 报错，`handlers.ts` 只负责拼参数和包装错误。加参数时对照 `packages/core/src/index.ts` 的 alias 表。
- **schema 跟着 `@create-uni/config` 走**，不要在 `schemas.ts` 里硬编码选项名。新增选项只需改 config，schema 会自动带上；但 `test/promptBuilder.test.ts` 的 inline snapshot 会失败，那是预期内的，确认输出了新选项再 `-u`。
- `checkDirectory()` 在 `force` 为假时用 `@create-uni/shared` 的 `canSkipEmptying` 判断目标目录，非空就返回提示而不是抛错——工具结果是文本消息，不是异常。
- 产物是 CJS（`target: node14`），和另外两个 CLI 包一致。

## 发布

tag `mcp-v*` 触发 `mcp_release.yml`：`changelogithub` 生成 Release 后 `pnpm publish`，版本由 `bumpp` 提升（`pnpm release:mcp`）。
