---
title: 为什么我从vscode转到了webstorm?
pubDate: 2023/12/15
description: 为什么我从vscode转到了webstorm?
featuredImage: /assets/images/blog/xnip2024-02-21_17-54-23.jpg
tags:
  - idea
  - Webstorm
  - Vscode
layout: ../../../layouts/Post.astro
---

# 背景

在过往的开发项目中, 大多是中型项目为主, 代码量不大. 即便使用TS开发, 响应速度也可以接受.
但是在年底突然接到了重构一个原有的大型项目的通知.

# 架构设计

- 采用monorepo + 微前端多模块构建
- 技术栈 turbo + vue3 + element-plus + typescript + MicroApp + vite + unocss + axios + eslint + prettier + standard-version + husky + lint-staged + pnpm

# 悲伤结果

- 我的vscode在多模块的架构下TS的类型ERROR提示速度没有比蜗牛🐌快多少, 痛苦如影随形~ 严重影响开发效率

# webstorm的优势

- webstorm在相同内存占用下, 更加流畅当然也会占用更多的内存(峰值吃到了16g+)
- 自建索引, 充分发挥电脑性能; 同时自带代码检查工具, 结合SonarLint代码质量更有保证
- 现在也支持gitHub copilot, 智能编程方便快捷

# 宇宙第一编辑器实至名归！
