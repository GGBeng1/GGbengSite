---
title: logicflow使用分享
pubDate: 2025/05/01
description: logicflow使用分享
featuredImage: /assets/images/blog/snipaste_2025-06-05_16-06-41.png
tags:
  - logicflow
  - vue
layout: ../../../layouts/Post.astro
---
# 背景

* 在最近的开发中遇到了流程大屏相关的开发
* 经过仔细思考选择了DiDi团队的logicflow作为编辑器的原型

# 遇到的问题

* 项目的编辑器架构采用的是Vue3，所以在一开始的时候就采用Vue自定义节点进行开发

```js
  // 主要引入依赖
  import { EventType } from '@logicflow/core';
  import { vueNodesMap } from '@logicflow/vue-node-registry';
  ...具体其他实现
```

* [文档地址](http://logicflow.cn/tutorial/advanced/vue)
* 但是遇到了一个锚点位置自定义的问题，我想在编辑器界面实现矩形节点各个边锚点位置数量自定义；Vue节点存在无法更新锚点的问题，经过仔细研究发现目前只有通过HTML节点才能实现具体需求，[HTML节点文档地址](http://logicflow.cn/tutorial/advanced/node#html-%E8%8A%82%E7%82%B9)
* 在实际使用过程中，在放大的情况下节点直接很难实现完美对齐，所以实现可以通过输入坐标来修正位置的逻辑；但是如何获取参考区域的坐标(区域内可能有多个节点)是个问题，最终使用Control插件的选区功能变现实现了
* 因为是大屏展示，希望可以自动实现自动漫游的功能，自动的移动焦点根据节点的分布情况；这里实现遇到了几个问题：虽然可以通过节点的坐标计算得出路线，但是每个节点的位置分散时很难全部覆盖，最终使用Z字形方式实现；logicflow移动的方式依赖坐标位置，但是每次移动时是没有动画，生硬的移动即使是缩减移动距离和频率也很难完美；最终的实现方案是该有Z字形的每个节点坐标作为路线点；修改logicflow源码或者使用css手动在移动时添加动画；退出漫游时移除动画即可

  [](http://logicflow.cn/tutorial/advanced/node#html-%E8%8A%82%E7%82%B9)
