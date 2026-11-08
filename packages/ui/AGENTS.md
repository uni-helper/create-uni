# @create-uni/ui

`@create-uni/gui` 的界面。preact + Vite + Tailwind，用 `vite-plugin-singlefile` 把 JS/CSS 全部内联进一个 `index.html`，产物写到 `packages/gui/src/ui/`，由 Rust 侧 `include_str!` 内嵌。私有包，不发布。

## 命令

```bash
pnpm -C packages/ui dev      # vite dev server，端口 4006，gui 的 debug 构建直接加载它
pnpm -C packages/ui build    # 产出 packages/gui/src/ui/index.html（emptyOutDir: false）
pnpm build:ui                # 根目录的等价写法
```

没有测试，验证方式是 `pnpm build:ui && pnpm dev:gui`，或构建后跑 `pnpm build:core && pnpm play --gui`。

## 结构

| 路径 | 职责 |
| --- | --- |
| `src/index.tsx` | 应用入口 `App`：Header + CLIInterface + Footer，外面包一层右键菜单（Github / Sponsor / Reload） |
| `src/page/` | 主界面，CLI 表单与配置选择 |
| `src/components/` | UI 组件，`components/ui/*` 是 shadcn 风格的基础件（Radix 原语） |
| `src/constants/USER_EVENT.ts` | 与 Rust 侧约定的事件名，必须和 `packages/gui/src/lib.rs` 的 `match req.next()` 分支一致 |
| `src/types/gloabal.d.ts` | 全局 `window` 声明：`window.ipc.postMessage`、`window.create_uni_data`、`window.create_uni_current_dir`、`pathEvent` |

## 注意

- **和 Rust 的协议是字符串拼的**：`window.ipc.postMessage('install|<json>')`，`|` 之后的内容由 `packages/gui/src/lib.rs` 的 `body.split(['|'])` 拆开。加事件要同时改 `USER_EVENT` 和 Rust 的 `match`，漏一边就是静默无反应。
- **端口 4006 是硬约定**：`vite.config.ts` 的 `server.port` 与 `lib.rs` 里 debug 分支的 `http://localhost:4006/` 必须一致，改端口要两边一起改。
- **`window.create_uni_data` 由 Rust 注入**，是 `packages/config` 里全部选项的序列化结果；前端不重新请求数据，类型定义在 `src/types/gloabal.d.ts` 里对 `@create-uni/config` 复用。
- 构建产物目录是 `../gui/src/ui`，`emptyOutDir: false` 是为了不误删 `packages/gui/src` 下别的东西——别改成 `true`。
- 本包会被 ESLint 检查：根配置的 `ignores` 只排除了 `packages/gui`，不包含 `packages/ui`，`no-console` 在这里是 warning 级别。
