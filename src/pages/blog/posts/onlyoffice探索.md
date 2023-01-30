---
layout: '../../../layouts/Post.astro'
title: 探索OnlyOffice, 看看能否符合产品需求(一)
description: OnlyOffice升级到7.0版本, 新的版本带来更多的Api以及更好看的UI, 渲染速度
publishDate: 2022/11/1
featuredImage: '/assets/images/blog/onlyoffice.jpg'
tags: ['OnlyOffice']
---
### 背景
- 公司的旧版本的病例编辑器过于落后, 一直想更新一下。探索了一下开源社区, 没有开源的作品, 只能从头开始写。
- Slate 和 Prosemirro 在某种意义上很像, 都是知名的富文本编辑器, 但是病例编辑器有个致命的需求就是 A4分页和大量表格及文本, 动则上百页。在开发出demo版本测试后, 渲染性能及分页性能是在是不能符合要求 🙅🏻‍♀️
- OnlyOffice7的出现给了我希望
### 安装OnlyOffice
- [Docker安装](https://docs.docker.com/engine/install/)
- 安装启动后 打开命令行终端 输入docker -v 查看版本号, 查询成功后说明安装成功
- /var/www/onlyoffice/documentserver 要从初始容器中复制出来(因为UI视图及插件的源码都在这里, 我们要对它下手！)
- docker run -i -t -d -p 80:80 --restart=always  -v 自己的文件路径:/var/www/onlyoffice/documentserver --name onlyoffice  onlyoffice/documentserver:7.2.1.34

### 安装中文字体
- 下载中文字体包 [中文字体包](https://github.com/funggtopp/onlyoffice-chinese-fonts)

```bash
  sudo docker exec -it 容器id /bin/bash
  #进入容器后执行
  cd /usr/share/fonts/
  rm -rf *
  # 退出容器
  exit
  # 将中文字体包放入容器/usr/share/fonts/目录下
  docker cp 下载路径/mini_fonts 97a42a60e5a8:/usr/share/fonts
  # 进入容器安装字体
  sudo docker exec -it 容器id /bin/bash
  sh /usr/bin/documentserver-generate-allfonts.sh
  # 退出容器
  exit
```
- 这样基本环境就搭建好了, 我们还需要一个后端服务来接收DocumentServer保存成功后的word流, 这里要说一下Onlyoffice支持保存多种格式, 但是我强烈建议保存word格式, 因为这样我们可以获取到各个版本的差异, 和git commit一样, 每个版本的删减都能得到高亮

### 结尾
- 在(二)中我会将后端服务和封装的前端组件写出来, Onlyoffice不愧是L2级别的编辑器, 真的挺强大的^_^