---
layout: '../../../layouts/Post.astro'
title: gitlab-runner构建时间过长排查
description: gitlab-runner最近构建的时间有时候会很长, 仔细排查下原因
publishDate: 2022/10/11
featuredImage: '/assets/images/blog/gitlab-runner.jpg'
tags: ['Gitlab', 'Gitlab-runner']
---
### 背景
- 部门的代码版本管理我采用的是gitlab, 所以在CICD时候为了便捷我采用了gitlab-runner
#### 优势
1. 与gitlab绑定, 可以直接在gitlab进行版本迭代管理
2. gitlab-runner 支持docker, 拉取及交互操作便捷
3. 配置相对简单

### 问题
- 最近发现无论是产品迭代, 还是组件库的组件迭代 打包时间都慢了不止一倍

### 排查
1.因为最近将生产的node版本升级到了16, 经过排查并不是node镜像问题

2.开始仔细查看日志发现, 拉取镜像及数据缓存耗时都是正常的, 也就是构建时间变长了, 这里第一时间我想到是CPU调度及内存占用出现的问题, 于是我把gitlab及runner的核心数加了两个,内存增加了8g, 但是并没有解决😭

3.没办法, 只能查看docker及Linux的日志, 经过perf火焰图发现loop_queue_work函数调用时间过长
<img src='/assets/images/blog/fire.jpg' />
- 经过查阅docker文档, 发现存储驱动优先级的问题(吐血)。。。
- 原因是因为业务JDK的需求, 我最新升级了一下Linux内核

### 解决方式
- 1.找到原因就好解决了, docker现在默认是Overlay2, 备份数据后使用mkfs.xfs -n ftype=1 /dev/vdc1命令重新格式化磁盘，打开ftype选项。接着强制配置Docker进程使用overlay2的存储驱动
- 2.在.gitlab-ci.yml中配置
```sh
variables:
  DOCKER_DRIVER: overlay2
```