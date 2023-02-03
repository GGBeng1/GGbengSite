---
layout: '../../../layouts/Post.astro'
title: 为什么我把博客迁移到了Netlify, 同时采用Astro重构
description: 为什么我把博客迁移到了Netlify, 同时采用Astro重构
publishDate: 2022/08/15
featuredImage: '/assets/images/blog/astro.jpg'
tags: ['Netlify', 'Astro']
---
### 背景
- 一直以来我都是采用租赁一台服务器, 通过一些ssr框架来搭建博客以及一些成熟的CMS管理内容, 但是这样的方式有很多不足
1. 服务器成本高, 一年要花费几百块钱

2. 存储方式为JSON, 无法直接展示内容

3. 需要经常更新模板

4. 无法直接使用git管理内容

### Astro 和 Netlify
- 1.island在19年出现的时候, 我就觉得这是最符合博客或者一些企业官网的模式, 因为这些场景交互是有限的同时注重SEO!
- 2.Netlify是Astro的赞助商, 所以生态支持非常棒, 同时Netlify也是免费的,支持的功能很多, 比如CDN, 域名解析, 以及一些其他的功能
- 3.同时Astro也支持SSR, 但是我并没有采用, 因为我觉得这个场景不需要SSR, 但是如果你有这个需求, 可以参考[文档](https://docs.astro.build/en/guides/server-side-rendering/)

- 4.我的博客是支持邮件订阅的, Netlify是免费支持云函数的也就是ServerLess, 所以我就采用了Netlify的云函数来实现邮件订阅的功能(又省了一笔)
- 5.我将我的博客代码开源在了GitHub, 同时Netlify也支持绑定GitHub仓库, 这样就可以用MarkDown的形式存储我的博客啦
<img src='/assets/images/blog/netlify-ggbeng.jpg' />

### 结尾
- 由于过去的博客都是Json形式存储的, 所以大部分博客都没有同步过来, 后续我会写个脚本同步过来