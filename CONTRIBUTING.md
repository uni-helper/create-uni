# 参与贡献

感谢你愿意花时间改进 `create-uni`。这份文档说明项目结构、本地开发流程、测试方式和提交规范，读完就能跑起来提第一个 PR。

## 前置条件

| 工具 | 版本 | 出处 |
| :---: | :---: | :--- |
| Node.js | 24.x | CI 矩阵（`.github/workflows/*_test.yml`、`lint.yml`）。仓库没有 `.node-version`，根 `package.json` 也没有 `engines`，本地用其他版本一般不报错，但 CI 只验证 24 |
| pnpm | 12.3.4 | 根 `package.json` 的 `packageManager` 字段（`packages/config`、`packages/core`、`packages/info`、`packages/mcp`、`packages/shared` 也各自声明了同一版本） |
| Rust | stable | 只有 `packages/gui` 需要。`.github/workflows/gui_release.yml` 用 `dtolnay/rust-toolchain@stable`，仓库没有 `rust-toolchain` 文件、`Cargo.lock` 也不入库，因此没有锁死的版本；按当前依赖解析结果最低需要 1.89 |
| Cargo | 随 Rust 一起安装 | 同上 |

`packages/core`、`packages/info`、`packages/mcp` 是纯 TypeScript + tsup，不需要 Rust。只改 CLI 时可以不装 Rust 工具链。

## 仓库结构

```text
create-uni/
├── packages/
│   ├── config/     模板、插件、模块、UI 库、原子化 CSS 的选项数据（私有包，直接以源码被引用）
│   ├── core/       脚手架本体 create-uni：解析参数、交互提问、下载/渲染模板
│   │   └── template/  本地模板片段，EJS 渲染后拼到项目里
│   ├── gui/        --gui 打开的桌面窗口，Rust + wry/tao/napi，另有 bin/index.cjs 作为入口
│   ├── info/       @create-uni/info：检测 uni-app 项目的依赖、环境和 VSCode 插件
│   ├── mcp/        @create-uni/mcp：MCP 服务，把创建项目的能力暴露给 AI 助手
│   ├── shared/     公用方法：banner、spinner、目录非空判断（私有包）
│   └── ui/         gui 的界面，preact + vite，构建产物内嵌进 Rust 二进制（私有包）
├── scripts/        postinstall 的 link 脚本、dev 健康检查、uni-app 升级检测
└── .github/        CI、发布 workflow 和截图
```

## 本地开发

```shell
pnpm i            # 安装依赖。postinstall 会执行 scripts/link.cjs，把 create-uni、@create-uni/info、@create-uni/gui link 到根目录
pnpm dev          # turbo 并行跑所有包的 dev：core/info/mcp 的 tsup watch、gui 的 nodemon、ui 的 vite dev server
```

按包单独启动：

```shell
pnpm dev:core     # 只 watch packages/core，产物 packages/core/dist/outfile.cjs
pnpm dev:info     # 只 watch packages/info
pnpm dev:mcp      # 只 watch packages/mcp
pnpm dev:gui      # 只跑 packages/gui 的 nodemon（改 .rs 触发 napi 重编译）
```

`packages/config` 和 `packages/shared` 没有构建步骤，它们的 `main` 直接指向 `src/index.ts`，改完立刻生效。

`pnpm dev` 会连带启动 gui，因此本机需要 Rust；只改 CLI 时用 `pnpm dev:core` 更快。

### 构建与本地试用

```shell
pnpm build:ui     # 先把界面构建到 packages/gui/src/ui/index.html，gui 编译时用 include_str! 内嵌
pnpm build:core   # 构建 create-uni CLI
pnpm build        # turbo 全量构建（gui 会先等 packages/ui 构建完）
pnpm play         # node ./packages/core/dist/outfile.cjs，用刚构建的产物跑一次
```

`pnpm build:core` 之后，根目录的 `create-uni` 命令也可用（`pnpm create-uni`），参数与线上版本一致；建议在临时目录里跑，避免在仓库里生成项目。

改动 gui 的界面时：先 `pnpm build:ui`，否则 `packages/gui/src/ui/index.html` 不存在，Rust 侧 `include_str!` 会编译失败。这个文件在 `.gitignore` 里，不入库。

模板相关的改动通常在 `packages/core/template/` 和 `packages/config/src/*.data.ts` 两处，前者是文件内容，后者是交互选项，两边要同时加。

## 测试与检查

```shell
pnpm lint         # eslint .（根配置 @uni-helper/eslint-config）
pnpm lint:fix     # eslint . --fix，并顺带对 packages/gui 执行 cargo fmt
pnpm typecheck    # tsc --noEmit
pnpm -C packages/mcp test # vitest，packages/mcp 的单元测试（含 inline snapshot）
```

`pnpm typecheck` 目前会报 `TS5101`/`TS5107`：根 `tsconfig.json` 用了 `baseUrl` 和 `moduleResolution: node10`，TypeScript 6 把它们标记为废弃。CI 不跑这条命令，检查实际靠 `pnpm lint`。

`packages/core` 和 `packages/info` 没有单元测试，正确性靠真的生成一个项目来验证，CI 也是这么做的：

- `core_test.yml`：构建 `packages/core`，然后用参数矩阵跑 `node packages/core/dist/outfile.cjs sample-project <flags>`，接着在生成出来的项目里分别用 npm 和 pnpm 安装依赖。矩阵覆盖 `--ts`、`-e`、三种 CSS 取值、全部插件和模块、以及全部 UI 库。
- `core_test_template.yml`：用 `-t vitesse` 生成模板项目，再打 H5 和小程序包。
- `info_test.yml`：构建 `packages/info` 后执行 `node packages/info/dist/outfile.cjs all`。

本地等价做法：

```shell
pnpm build:core
cd /tmp && node ~/path/to/create-uni/packages/core/dist/outfile.cjs demo --ts -m pinia -u ano -c unocss -e
```

`packages/mcp` 的测试比对 inline snapshot。选项文案在 `packages/config/src/*.data.ts` 里，改了文案就要同步快照：先跑测试看差异，确认新输出正确后运行 `pnpm -C packages/mcp test -- -u`。

`packages/gui` 的 Rust 部分只有 `cargo fmt` 参与 CI 检查（`lint.yml`），没有单元测试。

### 提交前

`simple-git-hooks` 已在 `pnpm i` 时装好，`pre-commit` 会执行 `pnpm lint-staged`，即对暂存文件跑 `eslint --fix`。它只管 ESLint，不跑 typecheck 和测试，这两项要自己跑（typecheck 的现状见上一节）。

## 代码架构

`packages/core` 的主流程：

1. `src/index.ts` 用 minimist 解析参数，交给 `src/command/index.ts` 判断是 `--help`、`--info`、`--gui` 还是正常创建。
2. `--gui` 走 `src/command/actions/gui.ts`：把 `packages/config` 里的选项序列化成 JSON 通过环境变量传给 `@create-uni/gui`，子进程 stdout 回传用户选择的配置。`--info` 同理，转调 `@create-uni/info`。
3. 没有项目名时进入 `src/question/`，逐个询问模板、插件、模块等；有项目名时用 `src/utils/validateArgv.ts` 校验参数，非法值直接退出并提示可选值。
4. `src/utils/renderTemplate.ts` 用 EJS 渲染 `template/` 下的文件，`cloneRepo.ts` 下载远程模板，`sortDependencies.ts` 排好 `package.json` 字段顺序后落盘。

构建期有两条代码路径靠 `unplugin-preprocessor-directives` 切换：`// #if CREATE_UNI_DEV` 分支只在 `pnpm dev`（`CREATE_UNI_DEV=true`）时生效，用 `pnpm create-uni-gui` 这类本地命令；发布版走 `// #if !CREATE_UNI_DEV` 分支，用 `npx @create-uni/gui@latest` 这类远程命令。改这块时两个分支都要考虑，tsup 会按当前构建丢掉另一个分支。

## 提交规范

提交信息使用 [Conventional Commits](https://www.conventionalcommits.org/)，类型取自 `git log` 里现有用法：`feat`、`fix`、`refactor`、`docs`、`ci`、`build`、`test`、`style`、`chore`。常用格式：

```text
feat: 新增 hy-app 组件库选项
fix(core): 修复同名目录覆盖判断
ci: 将 node 版本更新至 24.x
```

范围（括号里的部分）可选，通常写包名或文件名，如 `feat(plugin):`、`fix(scripts/dev.cjs):`。

一个 PR 只解决一个问题。改到下面这些内容时，请在同一个 PR 里同步更新：

- 新增或调整模板、插件、模块、UI 库：`packages/config/src/*.data.ts` 与 README 里的对应表格
- 改动 CLI 参数：`packages/core/src/index.ts` 的 alias、`packages/core/src/constants/index.ts` 的帮助文案、README 的参数说明表
- 改动构建或脚本：`package.json` 的 `scripts` 与本文档的命令

## Pull Request 指南

- 说明改了什么、为什么改，涉及交互或参数设计时先开 issue 讨论方案。
- 本地至少跑通 `pnpm lint`；动了 `packages/core` 再按上文手动生成一次项目。`pnpm typecheck` 目前会报错，见「测试与检查」一节。
- CI 会在 Windows 和 macOS 两个平台、Node 24 上跑，`core_test.yml` 的矩阵较宽，跑得慢是正常的。
- 新增的 UI 库、模块要同时加进 CI 矩阵（`core_test.yml` 的 `flag-for-ui`、`flag-for-plugin`），否则后续版本不会被自动验证。

## 发布

只有维护者需要执行。版本号用 [bumpp](https://github.com/antfu/bumpp) 提升：

```shell
pnpm release:core   # 等价于 cd packages/core && bumpp
pnpm release:info
pnpm release:mcp
pnpm release:gui
```

`bumpp` 提交并打 tag 后，对应的 release workflow 负责发布：

| 包 | 触发方式 | workflow |
| :---: | :--- | :---: |
| `create-uni` | tag `core-v*` | `core_release.yml` |
| `@create-uni/info` | tag `info-v*` | `info_release.yml` |
| `@create-uni/mcp` | tag `mcp-v*` | `mcp_release.yml` |
| `@create-uni/gui` | push 到 `main` 且改动落在 `packages/gui` 或 `packages/ui` | `gui_release.yml` |

gui 走 napi-rs 的多平台构建（macOS x64/arm64、Windows x64/ia32/arm64），构建完成后根据提交信息里是否带形如 `0.0.7` 的版本号决定发布正式版还是 `next` 标签。

`pnpm up` 会跑 `taze` 批量升级 `packages/core/template` 下的依赖，再用 `@dcloudio/uvm` 更新 uni-app 版本；`.github/workflows/uni-app_update.yml` 每周一自动执行，只在 `@dcloudio/uni-app` 版本变化时提 PR。

## 行为准则

本项目遵循 uni-helper 组织的行为准则：[CODE_OF_CONDUCT.md](https://github.com/uni-helper/.github/blob/main/CODE_OF_CONDUCT.md)。

## 问题与讨论

有疑问、想提需求，或者不确定某个改动该怎么设计，直接开 [issue](https://github.com/uni-helper/create-uni/issues) 说清楚场景即可。
