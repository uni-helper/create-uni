# create-uni

一个 uni-app 项目脚手架 monorepo。`packages/core` 是 `create-uni` CLI（`npm create uni`），它把 `packages/config` 里的选项渲染成本地模板拼出一个新项目，或者直接 clone 远程模板仓库；`--gui` 交给 Rust 桌面窗口选配置，`--info` 交给 `@create-uni/info` 检测环境。

## Project

- 语言与运行时：TypeScript（`strict: true`，目标 `es2018`），构建产物是 CJS（tsup，`target: node14`，生产 `terser` 压缩）。Rust 只在 `packages/gui` 里。
- Node.js：CI 全部用 24.x；`packages/gui` 的 release workflow 用 Node 20。仓库没有 `.node-version`，也没有 `engines`。
- pnpm：`12.3.4`，由根 `package.json` 的 `packageManager` 固定；`pnpm-workspace.yaml` 里 `packages: packages/*`，另有 `overrides` 把 `create-uni`、`@create-uni/gui`、`@create-uni/info` 指向本地目录。
- Rust：只有 `packages/gui` 需要。CI 用 `dtolnay/rust-toolchain@stable`，仓库没有 `rust-toolchain` 文件，`packages/gui/Cargo.lock` 被 `.gitignore` 排除，每次构建重新解析，因此没有 MSRV 声明；按当前依赖图最低需要 1.89（`uuid` 决定）。
- 发布物：`create-uni`（`packages/core`）、`@create-uni/info`、`@create-uni/mcp` → npm；`@create-uni/gui` → npm + 5 个平台子包（napi-rs prebuild）。`packages/config`、`packages/shared`、`packages/ui` 是 `private` 内部包，不发布。
- 入口：`packages/core`、`packages/info`、`packages/mcp` 都打包成单个 `dist/outfile.cjs`；`packages/gui` 的 bin 是 `bin/index.cjs`，真正加载的是 napi 生成的 `.node`。

## Commands

```bash
pnpm i                # 装依赖；postinstall 执行 scripts/link.cjs，把三个包 link 到根目录
pnpm dev              # turbo 并行 dev：core/info/mcp 的 tsup watch、gui 的 nodemon、ui 的 vite
pnpm dev:core         # 只 watch packages/core（CREATE_UNI_DEV=true，产物 packages/core/dist/outfile.cjs）
pnpm dev:info         # 只 watch packages/info
pnpm dev:mcp          # 只 watch packages/mcp
pnpm dev:gui          # 只对 packages/gui 跑 nodemon（watch src/*.rs → napi build --platform）
pnpm build            # turbo 全量构建；gui 会先等 @create-uni/ui#build
pnpm build:core       # 构建 CLI（tsup），产出 packages/core/dist/outfile.cjs
pnpm build:info       # 构建 @create-uni/info
pnpm build:mcp        # 构建 @create-uni/mcp
pnpm build:ui         # 构建 gui 界面到 packages/gui/src/ui/index.html（gui 编译前必须先跑）
pnpm play             # node packages/core/dist/outfile.cjs，用刚构建的产物跑一次
pnpm lint             # eslint .（根配置 @uni-helper/eslint-config）
pnpm lint:fix         # eslint . --fix && cd packages/gui && cargo fmt
pnpm typecheck        # tsc --noEmit（当前因 TypeScript 6 废弃选项报 TS5101/TS5107，CI 不跑）
pnpm -C packages/mcp test   # vitest，唯一的单元测试（inline snapshot）
pnpm release:core     # cd packages/core && bumpp（info/mcp/gui 同理）
pnpm up               # 升级 packages/core/template 依赖（taze）+ uni-app 版本（uvm）
```

## Architecture

| 路径 | 职责 |
| --- | --- |
| `packages/core/src/index.ts` | CLI 唯一入口：minimist 解析参数、分发、决定渲染哪些模板片段、落盘 |
| `packages/core/src/command/` | `--help` / `--info` / `--gui` 三个旁路；`composeCommand.ts` 按当前包管理器拼出 `npx`/`pnpm dlx`/`yarn dlx`/`bun x` + `@latest` |
| `packages/core/src/question/` | 交互提问（clack），模板/插件/模块/UI/CSS 各一个子目录，`file.ts` 处理同名目录覆盖 |
| `packages/core/src/utils/` | `renderTemplate`（EJS + 目录递归 + `_filename` → `.filename` + package.json 深合并）、`cloneRepo`（远程模板，失败按 URL 列表重试）、`validateArgv`（参数白名单校验）、`sortDependencies`（package.json 字段排序） |
| `packages/core/template/` | 本地模板片段：`base`、`config/{typescript,lint}`、`plugin/*`、`module/*`、`UI/*`、`UI/atomicCSS` |
| `packages/config/src/*.data.ts` | 模板/插件/模块/UI/CSS 的选项数据。CLI、GUI、MCP 三处都读这里 |
| `packages/info/src/` | 读 `@dcloudio/uni-app` 依赖与环境、VSCode/Volar 插件，输出项目体检报告 |
| `packages/mcp/src/` | MCP 服务，暴露 `create-with-template`、`create-custom` 两个工具 |
| `packages/gui/src/lib.rs` | Rust：`tao` 窗口 + `wry` WebView + `rfd` 文件选择框，用环境变量 `CREATE_UNI_GUI_INPUT` 接收选项、stdout 回传 JSON |
| `packages/ui/src/` | gui 界面的 preact 应用，`vite-plugin-singlefile` 打成单个 `index.html` |
| `packages/shared/src/` | banner 打印、spinner、目录非空判断 |

### 关键约束

- **gui 界面必须先构建**：`packages/gui/src/lib.rs` 里写的是 `include_str!("ui/index.html")`，该文件由 `pnpm build:ui` 生成且被 `.gitignore` 排除。没构建 ui 就编 Rust 会直接编译失败。
- **构建期有两条代码路径**：`// #if CREATE_UNI_DEV` / `// #if !CREATE_UNI_DEV` 由 `unplugin-preprocessor-directives`（esbuild 插件）在构建时裁剪。dev 分支用本地 `pnpm create-uni-gui`，发布分支用 `composeCommand()` 拼出的远程命令。改 `command/actions/{gui,info}.ts` 时两个分支都要写，重复声明靠 `// #ts-expect-error` 压住。
- **`@create-uni/config` 和 `@create-uni/shared` 不以构建产物被消费**：它们的 `main` 指向 `src/index.ts`，`exports` 是 `"./*": "./*"`，所以源码里会出现 `@create-uni/config/src/type` 这种深路径 import。这是故意的，不要改成从构建产物导入。
- **`ano` 强制 UnoCSS**：`src/index.ts` 里选中 `ano` 时会覆盖用户传入的 cssType；`-m unocss` 是旧版写法，会被迁移成 `--css unocss`。
- **模板渲染顺序**：`base` → `config/*` → `plugin/*`（选了任何 UI 库时自动补 `import` 插件）→ `module/*` → `UI/*`。后渲染的片段通过 `deepMerge` 覆盖前面的 `package.json`。
- **非 custom 模板不走本地渲染**：`templateType.type !== 'custom'` 时直接 `cloneRepo` 到目标目录，`packages/core/template` 完全不参与。

## Conventions

- ESLint 用 `@uni-helper/eslint-config`，`no-console` 是 warning，忽略 `packages/gui`、`dist/outfile.cjs`、`packages/core/template/**/*.test.js`。代码风格跟随仓库现状：单引号、无分号、2 空格缩进。
- `.vscode/settings.json` 关掉了 Prettier、保存时跑 ESLint 修复；`rust-analyzer.linkedProjects` 指向 `packages/gui/Cargo.toml`。
- 注释和交互文案用中文；给 agent/用户的报告类文本也用中文。
- `packages/mcp/test/promptBuilder.test.ts` 用 inline snapshot 断言提示词文案。改动 `packages/config/src/*.data.ts` 的 `description` 会连带改动快照，先跑测试看差异再 `-u`。
- `packages/core`、`packages/info` 没有单元测试，验证方式是构建后真的生成一个项目（CI 用参数矩阵跑 `node packages/core/dist/outfile.cjs`）。
- 提交信息用 Conventional Commits（`feat:`、`fix:`、`chore:`、`ci:` 等），`pre-commit` 由 `simple-git-hooks` 跑 `lint-staged`（只做 `eslint --fix`）。
- 版本互相独立：四个包各自 `bumpp`，tag 前缀分别是 `core-v*`、`info-v*`、`mcp-v*`；gui 在 push 到 main 时由 `gui_release.yml` 发布，提交信息带裸版本号发正式版，否则发 `next`。
- `pnpm-workspace.yaml` 里设了 `minimumReleaseAgeExclude: ['@types/node@22.20.2']` 和 `trustPolicy: off`；新依赖装不上或版本被卡住时先看这里。
- 只改 TypeScript 时不需要 Rust 工具链；`pnpm dev` 会连带起 gui，所以只想跑 CLI 用 `pnpm dev:core`。
