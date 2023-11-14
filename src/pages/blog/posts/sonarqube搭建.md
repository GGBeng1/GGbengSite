---
layout: '../../../layouts/Post.astro'
title: sonarqube代码质量平台的搭建
description: sonarqube代码质量平台的搭建
publishDate: 2023/11/14
featuredImage: '/assets/images/blog/sonarqube.jpg'
tags: ['Sonar', 'Sonarqube']
---
## 背景
- 关于团队的代码质量评审一直是一个耗时的问题, 首先敏捷团队如果是重业务方便, 代码规范仅仅依赖 `eslint` 和 `prettier` 是远远不够的. 因为是重业务, 更多的是追求的开发时间和效率, 对于代码的要求更多是性能及简洁等. 在易读和易重构上是不足的.
- 人员的变动也是阻碍开发效率的重要原因之一, 一个开发人员很难在持续的在一个产品上一直开发. 更多是随着业务的拓展而开发其他的产品. 这样就会导致代码的风格不统一, 代码的质量参差不齐.
- 开发人员的水平也是参差不齐的, 对于代码的易读性等的认知是不同的.

## 代码质量评审的目的
- 统一代码风格及对代码的易读性的要求的认知, 对于代码规范的要求统一, 减少代码的阅读及重构成本.

## 搭建流程
> 本文以 `docker` 方式搭建 `sonarqube` 为例

```zsh
## 搭建的sonarqube为当前最新版本10.2
## 这里需要注意的是`/opt/sonarqube/conf`默认是没有的需要临时建一个空容器cp出来
## --link postgresql是与当前已经建立的postgresql进行关联, 如果没有postgresql要先创建一个
docker run --privileged --name sonarqube --link postgresql \
	-e SONARQUBE_JDBC_USERNAME=username \
	-e SONARQUBE_JDBC_PASSWORD=password \
	-e SONARQUBE_JDBC_URL=jdbc:postgresql://postgresql:5432/sonar \
	-p 9005:9000 \
	-e TZ=Asia/Shanghai \
	-v /home/sonarqube/conf:/opt/sonarqube/conf \
	-v /home/sonarqube/data:/opt/sonarqube/data  \
	-v /home/sonarqube/extensions:/opt/sonarqube/extensions \
	-v /home/sonarqube/logs:/opt/sonarqube/logs \
	-d sonarqube:10.2.1-community
```

## 配置
```zsh
## 打开配置文件sonar.properties将环境变量的配置写入
## 记得要创建一个sonar名称的数据库
sonar.jdbc.username=username
sonar.jdbc.password=password
sonar.jdbc.url=jdbc:postgresql://postgresql:5432/sonar

```

## gitlab集成
- 在gitlab中创建一个sonarqube用户, 并生成访问令牌, 根据sonarqube提示一步一步输入个人令牌
- 选择从gitlab导入项目

## 与CI/CD集成
- 我们所有的项目都是采用Gitlab-runenr部署的, 本文将采用gitlab.yml为例
- 首先将变量 `SONAR_HOST_URL` , `SONAR_TOKEN` 写项目的CI/CD变量中
<img src='/assets/images/blog/soanr-val.jpg' />

## 编写gitlab.yml
```yml
sonarqube-check:
  stage: build
  image:
    name: sonarsource/sonar-scanner-cli:5.0
    entrypoint: [ '' ]
  variables:
    SONAR_USER_HOME: '${CI_PROJECT_DIR}/.sonar'
    GIT_DEPTH: '0' #禁止浅克隆, 重点之前因为为了提高构建速度, 采用了浅克隆, 但是会导致sonarqube无法获取到代码的历史记录
    GIT_STRATEGY: clone #克隆策略
  cache:
    key: '${CI_JOB_NAME}'
    paths:
      - .sonar/cache
  script:
    - sonar-scanner
  allow_failure: true #允许失败
  only:
    - main #触发分支
  tags:
    - runner #需要和创建runner的tags一样才会执行
```
<img src='/assets/images/blog/Xnip2023-11-14_11-21-45.jpg' />

- 这样每次主分支被合并时都会自动触发代码检查

## 最终效果
<img src='/assets/images/blog/Xnip2023-11-14_11-24-39.jpg' />