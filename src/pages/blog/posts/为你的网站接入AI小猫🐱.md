---
title: 为你的网站接入AI小猫🐱
pubDate: 2024/12/09
description: 为你的网站接入AI小猫🐱
featuredImage: /assets/images/blog/cat.png
tags:
  - AI
  - petercat
layout: ../../../layouts/Post.astro
---
## AI-Cat

* 最近给网站接入了一个AI小猫，可以快速的介绍网站，而且也非常可爱，给大家简单介绍一下接入教程

## petercat

* petercat是专为社区维护者和开发者打造的智能答疑机器人解决方案，目前采用审核的方法注册，审核通过后即可使用。

## 如何接入

* 首先登录[官网](https://petercat.ai/)注册账号，可以使用github
* 进入后选择工作台，创建自己的空间
* 可以对话生成你的网站介绍机器人
  ![](/assets/images/blog/cat-1.png)
* 生成后记录你的token

```jsx
 // petercat采用react+antd开发，本网站采用astro开发，理论上支持vue和react
 	import { Assistant } from '@petercatai/assistant';
	const Cat = () => {
		return (
			<Assistant
				token="你的token"
				apiDomain="https://api.petercat.ai"
			/>
		);
	};
	export default Cat;
	// 这里需要关注一下版本的问题，1.0.19版本之前的前端代码不是很规范，存在commonjs和esm混用问题
	// 最新的版本已经修复
	// 如果你是旧版本需要安装vite-plugin-commonjs插件解决，并加入配置
	commonjs(
		{
			filter(id) {
				if (id.includes('node_modules/@petercatai/assistant')) {
					return true
				}
			}
		}
	),
```

## 成果

![](/assets/images/blog/cat-2.png)
![](/assets/images/blog/cat-3.png)
