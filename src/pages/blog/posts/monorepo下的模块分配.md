---
title: Monorepo下的模块分配
pubDate: 2024/10/09
description: Monorepo下的模块分配
featuredImage: /assets/images/blog/turbo.jpg
tags:
  - monorepo
  - turborepo
layout: ../../../layouts/Post.astro
---

# 背景

随着项目的模块的增多，我们的项目也变得越来越庞大，这时候我们就需要考虑如何将项目进行拆分，以便于维护和开发。在这里我们就来讨论一下monorepo下的模块分配。

## 什么是Monorepo

monorepo是目前很多开源项目的选择，它的优点是可以将多个项目放在一个仓库中，方便管理和维护。在monorepo中，我们可以将多个项目放在一个仓库中，这样可以方便我们进行代码的复用和维护。

## Monorepo的优点

1. 代码复用
2. 统一管理
3. 便于维护

## 什么是turborepo

turborepo是一个monorepo的工具，它可以帮助我们更好的管理monorepo项目。turborepo创建时可以选择npm管理工具，这里选择pnpm，pnpm是一个快速的npm管理工具，它可以帮助我们更好的管理依赖。

## 目前项目的模块分配

![](/assets/images/blog/monorepo.png)

这样所有的项目的相关引用都会变的极其简单，同时还可以直接分包节省cdn等等。

```js
// 这里以eslint为例
import configEslint from '@repo/eslint-config/index.js';
import eslintrcJson from './.eslintrc-auto-import.js';

export default [
	...configEslint,
	{
		languageOptions: {
			...eslintrcJson,
		},
	},
];
```
