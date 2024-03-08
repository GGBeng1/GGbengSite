---
layout: '../../../layouts/Post.astro'
title: Linux后台执行任务关闭终端后竟然停止了
description: Linux后台执行任务关闭终端后竟然停止了
pubDate: 2023/03/15
featuredImage: '/assets/images/blog/dev.png'
tags: ['Linux']
---

## 背景

- 有一个服务需要测试一下, 便放在服务器上临时跑一下, 想到为了避免终端关闭后停止, 就用nohup命令放到后台执行

## 问题

- 使用以下代码执行后, 发现关闭终端后任务停止了

```bash
nohup npm run dev &>/dev/null &
```

## 原因

- nohup命令是用来忽略SIGHUP信号的, 但是当终端关闭时, 会发送SIGHUP信号给所有子进程; 所以需要执行后使用exit命令退出任务才能继续执行
