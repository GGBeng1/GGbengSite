---
layout: '../../../layouts/Post.astro'
title: 基于 x2t.wasm + OnlyOffice WebJDK 的纯 Web Excel/Word 访问实践
description: 利用 OnlyOffice WebJDK 搭配 x2t.wasm，把原本依赖后端的 Office 文档转换与预览流程，尽量前移到前端，做到接近纯 Web 的 Excel、Word 在线预览与编辑。
pubDate: 2026/01/14
featuredImage: '/assets/images/blog/onlyoffice.jpg'
tags: ['OnlyOffice', 'x2t.wasm', 'Web']
---

## 背景

- 之前在《探索OnlyOffice, 看看能否符合产品需求(一)》里主要是基于 DocumentServer + 后端服务来做 Word/Excel 在线编辑。
- 但在很多 B 端/内部工具场景里，**后端资源紧张、部署复杂**，甚至只想放在静态托管（比如 Netlify、Vercel）上，就会非常想要一个“尽量纯前端”的方案。
- 恰好 OnlyOffice 提供了 WebJDK（下文统一叫 WebSDK），而官方的 x2t 转换引擎也有 wasm 版本，于是就有了这次尝试：**用 x2t.wasm 做文档格式转换 + WebSDK 做前端编辑与预览**。

## 方案整体思路

> 目标：在“不自建复杂后端”的前提下，尽量实现接近纯 Web 的 Excel/Word 访问能力。

- **文档上传**：用户在浏览器直接选择本地的 `docx/xlsx` 等文件。
- **前端转换**：通过 `x2t.wasm` 在浏览器内将文档转换为 WebSDK 更容易消费的格式（如 OOXML / 内部 JSON 结构等，视你的封装而定）。
- **前端加载 OnlyOffice WebSDK**：在页面中初始化编辑器实例，载入转换后的文档。
- **保存策略**：
  - 纯前端 Demo：可以直接导出为 Blob，然后让用户下载；
  - 半前端半后端：有后端时再把 Blob 传回去存储，后端只负责“存”，不再负责“转”和“渲染”。

这样一来，**重 CPU 的转换逻辑前移到了浏览器**，后端只剩下“文件存储”和“校验鉴权”，大大降低了服务端压力，对一些小项目/内部工具非常友好。

## x2t.wasm 简单说明

- x2t 本质上是 OnlyOffice 用来做文档格式转换的核心模块，官方在 DocumentServer 里也大量使用它。
- wasm 版本的 x2t（下文统称 `x2t.wasm`）则是把这套能力搬到了浏览器里：
  - 支持在前端完成 `docx <-> ooxml`、`xlsx <-> ooxml` 等多种格式转换；
  - 由于运行在浏览器沙箱里，**安全边界更清晰**，也更利于前后端职责划分；
  - 但也会受到 wasm 运行时大小、初始化时间和内存上限的影响。

一个典型的使用流程大概是：

1. 在页面加载时初始化 wasm 模块（通常是 `initX2T()` 这类封装函数）。
2. 用户选择本地文件，在 `FileReader` 里读成 `ArrayBuffer`。
3. 把 `ArrayBuffer` 交给 x2t 的转换函数，得到中间格式（或目标格式）。
4. 中间格式再交给 WebSDK 打开，或者转换后下载/上传。

## OnlyOffice WebJDK（WebSDK）接入要点

OnlyOffice 的 WebSDK 本质就是你在浏览器里看到的那套在线文档编辑 UI，它通过一个 `config` JSON 来驱动。

典型的初始化步骤：

1. 在页面里引入 WebSDK 的脚本，比如：
   - `http(s)://your-docserver/web-apps/apps/api/documents/api.js`
2. 在 JS 里调用：
   - `new DocsAPI.DocEditor('placeholder-id', config)`

`config` 里比较关键的字段大概有：

- **document**：文档的元信息（标题、类型、权限等）。
- **editorConfig**：编辑器 UI 相关配置，比如语言、是否只读等。
- **events**：一些回调，比如 `onDocumentReady`、`onRequestSave` 等。

在传统架构里，`config.document.fileType` 和 `config.document.url` 一般都指向后端某个可访问的文件地址；而在我们这次“尽量前端化”的思路里，会做一些改造：

- 通过前端把本地文件转换成 WebSDK 能识别的格式后，再结合自定义的 `onRequestSave` 回调，把内容导出为 Blob 或上传。

## 纯 Web 访问流程设计

下面用一个相对贴近实战的流程，串一下 x2t.wasm + WebSDK 是怎么协同工作的。

### 1. 前端上传 & 预检查

- 使用 `<input type="file" />` 或拖拽组件，让用户选择 `docx/xlsx`。
- 在前端做一些基础检测：
  - 文件大小（比如控制在 10–20 MB 内，避免 wasm 内存爆炸）；
  - 文件后缀及 MIME；
  - 简单的多文件队列管理。

### 2. 调用 x2t.wasm 做格式转换

- 初始化 wasm 后，将上传的二进制内容传给转换函数：
  - 对 Word：`docx -> internalFormatForWebSDK`；
  - 对 Excel：`xlsx -> internalFormatForWebSDK`。
- 转换过程中注意：
  - **阻塞问题**：大文档可能会让主线程卡顿，建议在 Web Worker 里跑 wasm；
  - **内存释放**：转换完要及时释放 wasm 分配的内存，避免多次上传后内存“越用越多”。

### 3. 用 WebSDK 打开转换后的内容

- 把转换后的结果封装在 `config.document` 里：

  - 设置好 `fileType`（`docx` / `xlsx`）和 `title`；
  - `permissions` 里根据场景动态控制是否允许编辑/下载/打印；
  - 如果是纯前端 Demo，可以把保存逻辑都挂在 `events.onRequestSave` 上。

- 前端典型写法类似：
  - 文档准备好 -> `new DocsAPI.DocEditor(...)`；
  - 在 `onDocumentReady` 里做埋点或 UI 状态更新。

### 4. 保存与导出

根据你是否有后端，可以有两套策略：

- **无后端 / 静态部署**：

  - 在 `onRequestSave` 里拿到 WebSDK 的文档数据，前端转成 Blob，触发浏览器下载；
  - 这种方式更偏“本地 Web 工具”，适合内部使用或个人站点 Demo。

- **轻后端方案**：
  - 后端只做“文件落地 + 鉴权”，不参与格式转换；
  - 用户每次保存，前端把 Blob 传给后端，后端只负责存储与版本管理；
  - 这样 CPU 压力绝大部分都在浏览器，后端可以非常轻量。

## 实践中的一些坑

### 1. wasm 体积与首次加载时间

- x2t.wasm 本身不小，首次加载+初始化会有一个明显的时间开销，特别是在移动端或网络一般的环境。
- 建议：
  - **分页面懒加载**：只有在需要打开文档的页面才去加载 wasm；
  - 做一个“预热”逻辑，比如提前在空闲时间初始化 wasm；
  - 给用户一个明确的 Loading UI，而不是白屏。

### 2. 浏览器兼容性

- 大多数现代浏览器对 wasm 的支持还可以，但在一些老版本/特殊内嵌 WebView 里可能会有问题。
- 如果你的业务必须兼容老环境：
  - 可以保留一条后备方案：检测不支持 wasm 时，退回到“传统后端转换+WebSDK”的模式；
  - 或者直接提示用户更换浏览器，这要看业务体量和容错要求。

### 3. 内存与大文档

- x2t 本身就偏重，配合浏览器的内存限制，大文档（几十上百 MB、上百页图文混排）很容易触到边界。
- 实践下来更建议：
  - 在 UI 上明确给出“建议文件大小 / 页数”提示；
  - 必要时做多段加载或拆分（尤其是 Excel 多 Sheet 的场景）。

### 4. 与 OnlyOffice DocumentServer 的取舍

- 如果你的项目已经稳定部署了 DocumentServer，且后端资源相对充裕，其实不一定要强行把转换做在前端。
- x2t.wasm + WebSDK 更适合：
  - 初创项目、轻量级内部工具；
  - 希望尽量按“静态站 + 轻后端”方式部署；
  - 对服务器侧扩展性、安全隔离有更高要求的场景。

## 小结

- 借助 **x2t.wasm + OnlyOffice WebSDK**，可以在浏览器端完成绝大部分文档转换与渲染工作，让“纯 Web 访问 Excel/Word”变得真正可落地。
- 这个方案的核心收益是：**减少对重后端的依赖，把复杂度尽量收敛在前端与浏览器沙箱内**。
- 当然，wasm 体积、首次加载、内存和兼容性问题都是现实存在的，需要结合自己的业务体量做权衡。
- 如果你已经在用 OnlyOffice 做在线编辑，不妨找个周末开一个小分支，尝试一下 x2t.wasm，把“后端负担”再轻一点 😉
