<a href="https://github.com/uni-helper/create-uni"><img src="https://cdn.jsdelivr.net/gh/uni-helper/create-uni@main/blink.svg" alt="banner" width="100%"/></a>

# create-uni

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/uni-helper/create-uni@main/logo.svg" alt="logo" width="256" height="256"/>
</p>

<p align="center">
  <a href="https://github.com/uni-helper/create-uni/blob/main/LICENSE"><img src="https://img.shields.io/github/license/uni-helper/create-uni?style=for-the-badge&labelColor=005947&color=eee" alt="License"></a>
  <a href="https://github.com/uni-helper/create-uni/stargazers"><img src="https://img.shields.io/github/stars/uni-helper/create-uni?style=for-the-badge&labelColor=005947&color=eee" alt="Stars"></a>
  <a href="https://npmx.dev/package/create-uni"><img src="https://img.shields.io/npm/v/create-uni?style=for-the-badge&labelColor=005947&color=eee" alt="NPM Version"></a>
  <a href="https://npmx.dev/package/create-uni"><img src="https://img.shields.io/npm/dm/create-uni?style=for-the-badge&labelColor=005947&color=eee" alt="NPM Downloads"></a>
</p>

<p align="center">
  <a href="https://github.com/FliPPeDround"><img src="https://img.shields.io/badge/Author%20%26%20Maintainer-FliPPeDround-blue?style=for-the-badge" alt="Author & Maintainer"></a>
</p>

一条命令拉起基于 Vite + Vue 3 的 uni-app 项目，模板、插件、模块、组件库和原子化 CSS 都可以在创建时选好。

不想看文档？直接问 AI 🤖 <a href="https://deepwiki.com/uni-helper/create-uni"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>

> **请考虑持续[赞助](https://afdian.com/a/flippedround)以维持该项目的持续健康发展，非常感谢！🙏**

## 📖 简介

`create-uni` 是一个用于快速创建 uni-app 项目的轻量脚手架工具，可以直接拉起基于 `vite` 和 `vue3` 的项目，并提供一些模板供选择。

<p align="center"><img src="https://cdn.jsdelivr.net/gh/uni-helper/create-uni@main/.github/image/demo.png"></p>

## 🚤 快速开始

### 交互式创建

不带项目名执行时，脚手架会依次询问项目名、模板和各项配置。

```shell
# npm
    npm create uni@latest

# yarn
    yarn create uni

# pnpm
    pnpm create uni
```

> [!IMPORTANT]
> 建议添加上标记名（@latest），否则 npm 可能会解析到缓存的过时软件包版本。

### 命令行创建

配置项全部通过参数传入时，不再进入交互提问。

```shell
pnpm create uni <项目名称> --ts -m pinia -m uniUse -u ano -c unocss -e
```

### 图形界面

用桌面窗口代替终端提问，适合不想记参数的时候。

```shell
pnpm create uni --gui
```

### 检查项目环境

```shell
npx @create-uni/info@latest
```

需要在 uni-app 项目根目录下执行；其他目录下会提示未检测到 `@dcloudio/uni-app`，无法收集依赖信息。也可以直接用 `create-uni --info` 调用同一份逻辑。

### 参数说明

| 配置项 | 参数 | 别名 | 可选值 |
| :---: | :---: | :---: | :---: |
| 模板 | `--templateType` | `-t` | 见[模板列表](#模板列表) |
| TypeScript | `--needsTypeScript` | `--ts` | —— |
| 插件 | `--pluginList` | `-p` | 见[插件列表](#插件列表) |
| 模块 | `--moduleList` | `-m` | 见[模块列表](#模块列表) |
| UI | `--UIName` | `--ui`, `-u` | 见[组件列表](#组件列表) |
| 原子化CSS | `--cssType` | `--css`, `-c` | 见[原子化CSS列表](#原子化css列表) |
| Eslint | `--needsEslint` | `--eslint`, `-e` | —— |
| 图形界面 | `--gui` | `-g` | —— |
| 项目环境信息 | `--info` | `-i` | —— |
| 覆盖同名目录 | `--force` | `-f` | —— |
| 帮助 | `--help` | `-h` | —— |

`-p`、`-m`、`-u` 可以重复传多个参数。`--force` 遇到同名目录时直接覆盖，不再询问。

#### 📦模板列表

| 模板名 | 描述 | 参数名 |
| :---: | :---: | :---: |
| [vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) | 由 Vite & uni-app 驱动的跨端快速启动模板 | vitesse |
| [wot-starter](https://github.com/wot-ui/wot-starter) | 基于 vitesse-uni-app 的 wot-ui 快速起手模板 (集成 wot-ui v1) | wot-starter |
| [wot-starter-v2](https://github.com/wot-ui/wot-starter/tree/v2) | 基于 vitesse-uni-app 的 wot-ui 快速起手模板 (集成 @wot-ui/ui@2) | wot-starter-v2 |
| [wot-starter-retail](https://github.com/wot-ui/wot-starter-retail) | 基于 wot-ui 的 uni-app 零售行业模板 | wot-starter-retail |
| [uview-pro-starter](https://github.com/anyup/uView-Pro-Starter) | 基于 vitesse-uni-app 的 uView Pro 快速启动模板 | uview-pro-starter |
| [uview-pro-demo](https://github.com/anyup/uView-Pro) | 基于 uView Pro 的完整组件演示模板 | uview-pro-demo |
| [unisave](https://github.com/sunpm/unisave) | 拥抱 web 开发，拯救 uniapp。适配所有 (app、mp、web) 平台 | unisave |
| [tmui 3.2](https://tmui.design) | 优质 Vue3 TS Pinia Vite 跨端组件库 | tmui32 |
| [hy-starter](https://github.com/MrGao-hy/init-uniapp) | 基于 hy-app & vite & uniapp 快速启动模板 | hy-starter |

#### 📦插件列表

| 插件名 | 描述 | 参数名 |
| :---: | :---: | :---: |
| [vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components) | 按需自动引入组件 | import |
| [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) | 按需自动引入 API | autoImport |
| [vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages) | 提供基于文件系统的路由 | pages |
| [vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts) | 提供类 nuxt 的 layouts 系统 | layouts |
| [vite-plugin-uni-manifest](https://github.com/uni-helper/vite-plugin-uni-manifest) | 自动生成 manifest.json 文件 | manifest |
| [vite-plugin-uni-platform](https://github.com/uni-helper/vite-plugin-uni-platform) | 基于文件名 (*.<h5\|mp-weixin\|app>.*) 的按平台编译插件 | filePlatform |
| [uni-ku-root](https://github.com/uni-ku/root) | 模拟虚拟根组件 (支持 SFC 的 App.vue) | root |
| [vite-plugin-component-placeholder](https://github.com/chouchouji/vite-plugin-component-placeholder) | 占位组件的原生实现 | componentPlaceholder |

#### 📦模块列表

| 模块名 | 描述 | 参数名 |
| :---: | :---: | :---: |
| [pinia](https://github.com/vuejs/pinia) | 符合直觉的 Vue.js 状态管理库 | pinia |
| [vitest](https://github.com/uni-helper/vitest-environment-uniapp) | 基于 Vite 的测试框架 | vitest |
| [uni-network](https://github.com/uni-helper/uni-network) | 为 uni-app 打造的基于 Promise 的网络请求库 | uniNetwork |
| [uni-use](https://github.com/uni-helper/uni-use) | uni-app 组合式工具集 | uniUse |
| [uni-promises](https://github.com/uni-helper/uni-promises) | 为 uni-app 提供的 Promise 包装器 | uniPromises |
| [uni-echarts](https://uni-echarts.xiaohe.ink) | 适用于 uni-app 的 Apache ECharts 组件 | uniEcharts |
| [z-paging](https://github.com/SmileZXLee/uni-z-paging) | 高性能、全平台兼容的 uni-app 分页组件 | zPaging |
| [uni-highlight](https://github.com/uni-helper/highlight) | 基于 sugar-high 的 uni-app 轻量级代码高亮组件 | uniHighlight |

#### 📦组件列表

| 组件名 | 描述 | 参数名 |
| :---: | :---: | :---: |
| [uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html) | UniApp 官方组件库 | uni |
| [wot-ui](https://v1.wot-ui.cn/) | 高颜值、轻量化的 uni-app 组件库(v1) | wot |
| [wot-ui v2](https://wot-ui.cn/) | 轻量、美观、AI友好的 uni-app 组件库 | wot2 |
| [TDesign](https://tdesign.tencent.com/uniapp/) | TDesign 组件库 uni-app 版 | tdesign |
| [uView-Pro](https://uviewpro.cn/) | 全面支持 Vue3.0、TypeScript 的 uni-app 生态框架 | uview-pro |
| [nutui-uniapp](https://uniapp-nutui.tech/) | 京东风格的轻量级移动端组件库 | nut |
| [uv-ui](https://www.uvui.cn/components/intro.html) | 多平台快速开发的 UI 框架 | uv |
| [ano-ui](https://ano-ui.netlify.app/) | 轻量级、漂亮、快速的 UnoCSS 组件库 | ano |
| [hy-app](https://www.hy-design-uni.top/) | 极简美观、原生轻量、AI 开发友好的 UniApp 组件库 | hy-app |

#### 📦原子化CSS列表

`unocss` 与 `tailwindcss` 互斥，只能选择其中一个，也可以选择都不使用。

| 名称 | 描述 | 参数名 |
| :---: | :---: | :---: |
| [unocss](https://unocss.dev/) | 即时按需的原子级 CSS 引擎 | unocss |
| [tailwindcss](https://tw.weapp.dev/) | 通过 weapp-tailwindcss 适配小程序的原子化 CSS 框架 | tailwindcss |

## 📦 包

| 包 | 说明 |
| :---: | :---: |
| [create-uni](./packages/core) | 脚手架本体，`npm create uni` 跑的就是它 |
| [@create-uni/info](./packages/info) | 检测 uni-app 项目的依赖、环境与 VSCode 插件情况 |
| [@create-uni/gui](./packages/gui) | `--gui` 打开的桌面窗口，Rust + WebView 实现 |
| [@create-uni/mcp](./packages/mcp) | 给 AI 助手用的 MCP 服务，暴露两个创建项目的工具 |

`packages/config`、`packages/shared`、`packages/ui` 是上面几个包共用的内部包，不单独发布。

## 🎨 默认背景

- 图案来源：[Backdrop](https://github.com/FliPPeDround/backdrop) —— 为小程序打造的开箱即用背景图案库
- 官方预览与更多图案：<https://mpbackdrop.netlify.app/>

## 🛠️ 开发

- Node.js 24+（CI 矩阵，仓库未 pin 具体版本）
- pnpm 12.3.4（根 `package.json` 的 `packageManager`）
- Rust stable，仅 `packages/gui` 需要；没有 pin 版本，按当前依赖解析结果需要 1.89+

```shell
pnpm i            # 安装依赖，postinstall 会把 create-uni、@create-uni/info、@create-uni/gui link 到根目录
pnpm build:core   # 构建 CLI 到 packages/core/dist/outfile.cjs
pnpm play         # 用刚构建的产物跑一次，等价于 pnpm create-uni
```

完整的开发流程、测试方式和提交规范见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 🤝 参与贡献

- 提交新功能
- 反馈/解决 [`issues`](https://github.com/uni-helper/create-uni/issues)
- 提交新[`模板`](./packages/config/src/template.data.ts)/[`插件`](./packages/config/src/plugin.data.ts)/[`模块`](./packages/config/src/module.data.ts)/[`组件库`](./packages/config/src/ui.data.ts)

动手之前请读一遍 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 🌸 感谢

项目灵感及部分代码来自 [create-vue](https://github.com/vuejs/create-vue)

## 📄 License

[MIT LICENSE](./LICENSE)

## 🙇🏻‍♂️[赞助](https://afdian.com/a/flippedround)

<p align="center">
  <a href="https://afdian.com/a/flippedround">
    <img alt="sponsors" src="https://cdn.jsdelivr.net/gh/FliPPeDround/sponsors/sponsorkit/sponsors.svg"/>
  </a>
</p>
