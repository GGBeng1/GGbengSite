---
layout: '../../../layouts/Post.astro'
title: 订阅博客及更新博客的邮件通知暂停服务(已恢复)
description: sendinblue帮我账户ban了, 可恶啊！
publishDate: 2023/02/02
featuredImage: '/assets/images/blog/emailservice.jpg'
tags: ['Netlify', 'Email']
---
## 原因
- 一直以来用的sendinblue帮我管理邮件订阅, 但是最近发现我的账户被ban了, 无法发送邮件, 无奈之下只能暂停邮件订阅和博客更新的邮件通知
- 最可恶的是无故被Ban, 更换账号后还被Ban, 大概率政治原因
- 目前改成mysql + nodemailer测试一下, 发现netlify的函数云DNS有问题, 无法解析国内邮箱运营商, gmail目前过于严格, 过几天看看国外那个邮箱比较宽松再更新一下
- 可恶啊！可恶~

## 最新消息
- 感谢mailerlite提供的免费服务, 已经恢复邮件订阅和博客更新的邮件通知