---
layout: '../../../layouts/Post.astro'
title: VUE v2.7.0 "Naruto" 版本发布！
description: vue2.7的到来, 可以在vue2中使用vue3的语法!
pubDate: 2022/07/01
featuredImage: '/assets/images/blog/vue.png'
tags: ['Vue']
---

## 升级带来的新功能

- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- SFC [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html)
- SFC [CSS v-bind](https://vuejs.org/api/sfc-css-features.html#v-bind-in-css)
- 这也意味着 v3 的一些 api 也支持使用 `defineComponent`,`h()`, `useSlot()`, `useAttrs()`, `useCssModules()`以及`esmodule`的支持

### 注意 📢:

顶级 await 是不支持的

```
// true in 2.7, false in 3.x
reactive(foo) === foo
```

## vue2.6.14 需要升级的依赖

- 我目前采用的是vue@2.6.14 + webpack@5.73.0 + vite@2.9.13的自建脚手架, 需要升级以下依赖

```
   - vue@2.6.14
   + vue@2.7.0

   - vue-template-compiler@2.6.14
   + @vue/compiler-sfc@2.7.0

   - vue-loader@15.9.7
   + vue-loader@15.10.0

   + vue-demi@0.13.1
```

- 升级@vue/compiler-sfc 发现`:v-deep`无法使用 改成`:deep()`

```
   // 正则替换
   ::v-deep\s*([^{]+)
   :deep($1)
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73cdd5798fc844ffb350a2a402e66ffa~tplv-k3u1fbpfcp-watermark.image?)

注意 📢: `vite` 对于新版本 2.7.0 的 plugin: [@vitejs/plugin-vue2](https://github.com/vitejs/vite-plugin-vue2), 但是不支持 sfc 的`jsx/tsx`(后续会放出另一个插件辅助),所以升级后开发环境只能暂时采用`webpack`

## 结尾

[完整详情地址](https://github.com/vuejs/vue/blob/main/CHANGELOG.md#270-2022-07-01)
