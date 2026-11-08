# create-uni（packages/core）

CLI 本体，发布成 `create-uni`。入口 `src/index.ts`，tsup 打成单文件 `dist/outfile.cjs`（CJS，`target: node14`，生产 terser 压缩）。`template/` 一起发布，运行时通过 `resolve(__dirname, './../template')` 读取。

## 命令

```bash
pnpm -C packages/core build   # tsup → dist/outfile.cjs
pnpm -C packages/core dev     # CREATE_UNI_DEV=true tsup --watch，产出不压缩
pnpm -C packages/core up      # taze 升级 template 依赖 + uvm 升级 uni-app 版本
pnpm build:core               # 根目录的等价写法
pnpm play                     # node ./packages/core/dist/outfile.cjs
```

本地验证改动：`pnpm build:core` 后 `node packages/core/dist/outfile.cjs /tmp/demo --ts -m pinia`，或 `pnpm dev:core` 开 watch 再另开一个终端跑 `pnpm play`。这个包没有单元测试，CI 靠参数矩阵真的生成项目再装依赖。

## 主流程

1. `src/index.ts` 用 minimist 解析参数（alias 表就在文件顶部），`commandAction()` 先拦 `--help` / `--info` / `--gui`。
2. 没有项目名 → `src/question/` 交互提问；有项目名 → `src/utils/validateArgv.ts` 校验，非法值直接退出并列出可选值。
3. 目标是远程模板（`templateType.type !== 'custom'`）→ `dowloadTemplate` 走 `cloneRepo`，`template/` 目录完全不参与。
4. 目标是自定义模板 → 依次 `renderTemplate` 渲染 `template/base` → `config/{typescript,lint}` → `plugin/<name>` → `module/<name>` → `UI/<name>` 或 `UI/atomicCSS`。后渲染的 `package.json` 通过 `deepMerge` 覆盖前面的。

`src/constants/index.ts` 里的 `helpMessage` 是 `--help` 的文案，和 `src/index.ts` 的 alias 表分开维护，加参数时两边都要改。

## 模板约定

- 文件名的 `_` 前缀会被换成 `.`：`template/base/_gitignore` → 项目里的 `.gitignore`，`_npmrc` 同理。
- `.ejs` 后缀的文件用 EJS 渲染，渲染数据来自 `renderTemplate` 收集的回调。
- `template/**` 在 `.gitattributes` 里标了 `linguist-vendored`，GitHub 语言统计会忽略它。
- `UI/atomicCSS` 是 unocss 与 tailwindcss 共用的一份片段，`src/index.ts` 用 `needUnocss || needTailwindcss` 决定是否渲染。

## 两个容易踩的点

- `// #if CREATE_UNI_DEV` / `// #if !CREATE_UNI_DEV` 由 `unplugin-preprocessor-directives` 在构建期裁剪，`command/actions/gui.ts` 和 `info.ts` 各有两份 `const fullCustomCommand` 声明。dev 用本地 `pnpm create-uni-gui` / `pnpm create-uni-info`，发布版用 `composeCommand()` 拼的远程命令。改这两个文件必须同时改两个分支，并保留 `// #ts-expect-error`。
- `ano` 组件库依赖 UnoCSS：选中 `ano` 时会覆盖用户传入的 `--css` 并打印警告；`-m unocss` 是旧写法，会被迁移成 `cssType: 'unocss'`。这两段兼容逻辑在 `src/index.ts` 里，删掉会让旧用法直接失效。
