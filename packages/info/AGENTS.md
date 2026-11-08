# @create-uni/info

检测一个 uni-app 项目的环境：OS、Node、包管理器、VSCode 与 Volar 版本、`@dcloudio/*` 基础依赖版本、uni-helper 系列依赖与插件的版本，最后输出一段可以贴进 issue 的报告。

## 命令

```bash
pnpm -C packages/info build      # tsup → dist/outfile.cjs
pnpm -C packages/info dev        # tsup --watch
pnpm build:info                  # 根目录的等价写法
node packages/info/dist/outfile.cjs   # 在目标 uni-app 项目根目录下执行
```

没有单元测试，CI 只做「构建 + 执行一次」冒烟（`.github/workflows/info_test.yml`，命令是 `node ./packages/info/dist/outfile.cjs all`；实际入口不解析 argv，多传的参数会被忽略）。

## 结构

| 文件 | 职责 |
| --- | --- |
| `src/index.ts` | 全部逻辑：`getBaseEnvInfo()` 收集数据，`getUniAppInfo()` 排版输出，文件末尾直接调用 `getUniAppInfo()` |
| `src/constants/index.ts` | `uniDependenciesMap`：uni-helper 包 → 它依赖的第三方包（如 `@uni-helper/uni-use` → `@vueuse/core`），用来在报告里补出实际版本 |
| `src/utils/dependencies.ts` | 从 `@dcloudio/uni-app` 的存在与否判断是否在 uni-app 项目里，分组依赖 |
| `src/utils/extensions.ts` | 读 VSCode 扩展目录，筛出 uni-helper 与 Volar |
| `src/utils/whichPm.ts` | 通过 lock 文件/环境判断包管理器 |
| `src/question/index.ts` | 缺信息时用 clack 的 multiselect 让用户手动补插件 |

## 注意

- 入口不解析 `process.argv`，加参数不会生效。
- 不是 uni-app 项目时，`loadingStopInfo.code` 会置 1 并给出提示，但进程仍会打印其余部分并 `process.exit(0)`，所以退出码不能用来判断成功。
- 依赖 uni-helper 包清单时要改 `src/constants/index.ts` 的 `uniDependenciesMap`，报告的分组来自这里。
- 和 `packages/core` 的联动：`create-uni --info` 会通过 `composeCommand('@create-uni/info')` spawn 本包的 bin，dev 构建时改用本地 `pnpm create-uni-info`。
