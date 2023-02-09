---
layout: '../../../layouts/Post.astro'
title: 关于docker安装mysqlconfig里没有默认mysql.cnf
description: 关于docker安装mysqlconfig里没有默认mysql.cnf
publishDate: 2023/02/09
featuredImage: '/assets/images/blog/mysql.png'
tags: ['Mysql', 'Docker']
---
## 问题
- 在执行初始化后,发现conf下没有my.cnf
```bash
docker run -d --name mysql -p 3306:3306 -v /home/mysql/data:/var/lib/mysql -v /home/mysql/conf:/etc/mysql/ -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7.35
```
- 于是重新初始化了一个容器准备拽一个
```bash
docker run -d --name mysql1 -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7.35
```
- 进入容器后发现/etc/mysql下还是没有my.cnf, 当场崩溃。。。
## 原因
- 离谱！需要加上端口映射才有, 记录一下以免再忘
```bash
docker run -d --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7.35
```

