# @create-uni/config

模板、插件、模块、UI 库、原子化 CSS 的选项数据。私有包，不发布，也没有构建步骤：`main` 直接指向 `src/index.ts`，`exports` 是 `"./*": "./*"`，所以其他包会出现 `@create-uni/config/src/template.data` 这类深路径 import。这是故意的。

命令、测试、提交规范见根 [AGENTS.md](../../AGENTS.md)，本包没有自己的命令。

## 结构

| 文件 | 内容 |
| --- | --- |
| `src/index.ts` | 汇总导出，其他包只从这里取 `TEMPLATES` / `PLUGINS` / `MODULES` / `UI` / `CSS` |
| `src/template.data.ts` | 模板列表，`value` 是 CLI 参数名，`url` 是远程仓库，带 `list` 的是分组（wot、uview-pro） |
| `src/plugin.data.ts` | 插件列表，`value` 对应 `packages/core/template/plugin/<value>` 目录名 |
| `src/module.data.ts` | 模块列表，同上对应 `template/module/<value>` |
| `src/ui.data.ts` | UI 库列表，对应 `template/UI/<value>`；`hy-app` 这类也在这里 |
| `src/css.data.ts` | 只有 `unocss` 和 `tailwindcss`，两者互斥 |
| `src/type.d.ts` | `Options`、`TemplateList`、`UnCustomTempValue` 等共享类型 |

## 改一个选项要动的地方

`value` 是这条数据的主键，三处都读它，改名字会同时影响这三处：

- `packages/core`：`validateArgv.ts` 用它校验参数，模板目录名也用它（`plugin/<value>`、`module/<value>`、`UI/<value>`）
- `packages/gui`：`command/actions/gui.ts` 把整个列表序列化成 JSON 传给 Rust 侧的 WebView
- `packages/mcp`：`schemas.ts` 用 `getConfigValuesAsEnum` 生成 Zod enum，把它暴露给 AI

新增一条选项时，除了加数据，还要加对应的模板目录（`packages/core/template/plugin|module|UI/<value>`），并把它加进 `.github/workflows/core_test.yml` 的参数矩阵，否则不会被 CI 覆盖。

`description` 会被 MCP 拼进提示词，`packages/mcp/test/promptBuilder.test.ts` 的 inline snapshot 会跟着变。
