---
title: Astro使用本地搜索🔍代替Algolia
pubDate: 2024/12/24
description: Astro使用本地搜索🔍代替Algolia
featuredImage: /assets/images/blog/12.png
tags:
  - Algolia
layout: ../../../layouts/Post.astro
---
## 背景

* 某一天点击博客的搜索🔍突然发现查不到最新的blog内容，很是疑惑。遂去algolia管理平台查看
* ![](/assets/images/blog/222.png)
* 最开始以为是爬虫的sitemap地址错误导致的，更正后依然爬取后没有任何记录入库
* 询问algolia开发者却被告知免费用户无法支持(大概率是docs搜索免费仅支持一年的原因)

## 寻找替代方案

* 最先想到的就是pageFind，去npm.org搜索了一下确实有支持Astro包

```javascript
import pagefind from "astro-pagefind";
integrations: [pagefind()]
```

* 简单引入即可使用

## 查看效果

 简单修改一下样式，感觉还行

![](/assets/images/blog/search.png)
