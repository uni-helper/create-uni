# @create-uni/gui

`create-uni --gui` 打开的桌面窗口。Rust（`tao` 事件循环 + `wry` WebView + `rfd` 文件选择框）用 napi-rs 编成 Node 原生模块，界面是 `packages/ui` 打出来的单个 HTML。

## 命令

```bash
pnpm build:ui                    # 前置：必须先跑，否则 Rust 侧编译失败
pnpm -C packages/gui build       # napi build --platform --release
pnpm -C packages/gui build:debug # 不带 --release，nodemon 用的就是这个
pnpm -C packages/gui dev         # nodemon：watch src/*.rs，改动后重跑 build:debug
pnpm -C packages/gui artifacts   # 把各平台 .node 收进 npm/ 子包（发布流程用）
```

`pnpm dev:gui` 是根目录的等价写法。ESLint 忽略整个 `packages/gui`，TypeScript 检查不覆盖它。

端到端验证：`pnpm build:core && pnpm play --gui`。

## 关键约束

- **`src/ui/index.html` 必须有**。`src/lib.rs` 里有一行无条件的 `const HTML_CONTENT: &str = include_str!("ui/index.html");`，即使 debug 构建根本不用它，文件缺失也会让 `cargo build` 立刻失败，报错指向 `lib.rs` 而不是界面代码。该文件由 `pnpm build:ui` 生成（`packages/ui/vite.config.ts` 的 `outDir`），被 `packages/gui/.gitignore` 排除。
- **debug 和 release 加载的界面来源不同**：`#[cfg(debug_assertions)]` 走 `http://localhost:4006/`（`packages/ui` 的 vite dev server，改界面时两个一起开），`#[cfg(not(debug_assertions))]` 才用内嵌的 `HTML_CONTENT`。所以 `pnpm dev:gui` 之前要先 `pnpm build:ui` 一次，之后界面热更新不用重编 Rust。
- **跨进程通信靠环境变量和 stdout**：`packages/core` 把选项列表 JSON 塞进 `CREATE_UNI_GUI_INPUT` 再 spawn 本包，Rust 侧拼成 `window.create_uni_data=<json>` 初始化脚本注入页面。用户确认后，Rust 在 `"install"` 分支打印 JSON 并关闭窗口，`packages/core` 的 `command/actions/gui.ts` 读 stdout 解析。stdout 上只能有这一条 JSON，其他调试输出一律用 `eprintln!`。
- `window.create_uni_current_dir` 是启动时的工作目录，前端用它拼默认路径；Windows 反斜杠要转义，处理在 `final_string` 的 `format!` 和 `pathEvent` 的 `evaluate_script` 里。
- **`Cargo.lock` 不入库**，每次构建重新解析依赖，因此没有可引用的 MSRV：CI 用 `dtolnay/rust-toolchain@stable`，按当前依赖图最低需要 1.89。

## 发布

`gui_release.yml` 在 push 到 main 且动了 `packages/gui` 或 `packages/ui` 时触发，按 5 个 triple 构建（macOS x64/arm64、Windows x64/ia32/arm64），上传 artifact 后由 `napi artifacts` 收进 `npm/` 下的平台子包再 `npm publish`。平台子包名单在 `package.json` 的 `napi.triples.additional`，加平台要同时改这里和 workflow 的矩阵。
