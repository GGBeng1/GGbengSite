---
layout: '../../../layouts/Post.astro'
title: NGINX配置引发的HTTP标头DATE属性
description: NGINX配置引发的HTTP标头DATE属性
publishDate: 2023/08/24
featuredImage: '/assets/images/blog/nginx-http.jpg'
tags: ['HTTP', 'NGINX']
---
# 背景
- 最近开发中发现一个奇怪的问题, 因为公司所有的NGINX配置都是统一调优的(协商缓存和强制缓存结合), 也就是说不需要清除缓存, 只需要刷新一下就可以了. 同时也加了版本更新的提示框, 每次版本更新都会自动提示用户.
- 但是在一个系统中刷新后并没有更新!
## 排查问题
- 发现项目里有部分页面需要请求一个容器的问题, 而容器里又自己的NGINX, 通过请求头发现了E-Tag等字段以为只需要更改一下容器的时区即可. 但是更改时区后没有缓解.
- 开始查阅NGINX文档, 找到了一个location里的配置字段```autoindex_localtime```
```bash
  location ~ ^(\/[\d]+\.[\d]+\.[\d]+[\.|-][\d]+)?\/(web-apps)(\/.*\.json)$ {
    expires 365d;
    error_log /dev/null crit;
    gzip_static on;
    autoindex_localtime on; # 开启本地时间
    alias /var/www/onlyoffice/documentserver/$2$3;
  }
```
- 开启后日志时间恢复了正常, 但是请求头的DATE依然是GMT, 与现实差了8个小时
- 为什么没有变成CST呢? 又开始吐血翻阅NGINX文档, 但是没有找到处理方式, 除非自己强制设置DATE字段
- 最后在MDN找到答案: DATE的时间标准就是GMT!! 不影响时间的对比也就是Last-Modified的比对
- 经过实测确实如此, 有时候繁忙的业务就会导致基础的遗忘, 温故知新
- 哭泣😭