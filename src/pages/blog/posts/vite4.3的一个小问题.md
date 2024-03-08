---
layout: '../../../layouts/Post.astro'
title: 关于vite@4.3.0开始到vite@4.4.3都没有修复的一个问题
description: 关于vite@4.3.0开始到vite@4.4.3都没有修复的一个问题
pubDate: 2023/07/12
featuredImage: '/assets/images/blog/element-ui.jpg'
tags: ['Vite', 'Esm', 'Commonjs']
---

## 问题展现

- 在一个早期的项目中技术架构为 `vue@2.7.14 + vite@4.2.3 + element-ui@2.5.13` , 在一次迭代中我将vite升级到了当时的最新版本 4.3.9 , 开发环境没有任何问题, 但是在生产环境中, 会出现如 `el-table` 表头消失, `el-tooltip` 失效的问题

## 开始痛苦的寻找问题的原因

- 经过长时间的痛苦debugger, 终于找到了原因
- 原因的根本在于 `element-ui` 是一个早期项目, 代码里的充斥 `commonjs` 和 `esm` 两种写法, 在vite@4.2.3中, 会将 `commonjs` 的代码全部转换为 `esm` , 并且会对引入进行过滤。直接体现为, 只会引入一个`vue.esm.js`。
- 但是由于需求迭代问题vite@4.3开始不会对引入进行过滤。直接体现为, 会引入两个版本的 VUE: `vue.esm.js` 和 `vue.common.js`。
- 就会发生上述的问题, 两个组件挂载不同类型的实例, 导致组件消失

## 临时解决方案

- 目前可以通过`resolve.alias`强制设置生产环境变量vue指向单一版本解决

```js
	alias: [
		{ find: '@', replacement: path.join(process.cwd(), 'src') },
		{ find: 'vue', replacement: 'vue/dist/vue.runtime.common.prod.js' },
	],
```
